import { Col, Divider, Form, Radio, Row, message, notification } from 'antd';
import { DeleteTwoTone, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doPlaceOrderAction } from '../../redux/order/orderSlice';
import { Input } from 'antd';
import { AiOutlineRollback } from "react-icons/ai";
import CheckoutModal from './CheckoutModal';
import { callPlaceOrder } from "../../services/api.js";
import PhantomCheckoutModal from "./PhantomCheckoutModal.jsx";
const { TextArea } = Input;

const Payment = (props) => {
    const carts = useSelector(state => state.order.carts);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
    const [isPhantomModalVisible, setIsPhantomModalVisible] = useState(false);
    const user = useSelector(state => state.account.user);
    const [form] = Form.useForm();

    useEffect(() => {
        if (carts && carts.length > 0) {
            const sum = carts.reduce((acc, item) => acc + item.quantity * item.detail.price, 0);
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts]);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async (paymentIntent = null) => {
        setIsSubmit(true);
        const detailOrder = carts.map(item => ({
            bookName: item.detail.name,
            quantity: item.quantity,
            bookId: item._id,
            price: item.detail.price,
        }));

        const data = {
            receiverName: form.getFieldValue('name'),
            receiverAddress: form.getFieldValue('address'),
            receiverPhone: form.getFieldValue('phone'),
            totalPrice: totalPrice,
            userId: user.id,
            orderDetails: detailOrder,
            paymentIntentId: paymentIntent?.id ?? null
        };

        const res = await callPlaceOrder(data);
        if (res && res.data) {
            message.success('Đặt hàng thành công !');
            dispatch(doPlaceOrderAction());
            props.setCurrentStep(2);
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            });
        }
        setIsSubmit(false);
    };

    const onFinish = (values) => {
        if (paymentMethod === 'cod') {
            handlePlaceOrder();
        } else if (paymentMethod === 'online') {
            setIsCheckoutModalVisible(true);
        } else if (paymentMethod === 'phantom') {
            setIsPhantomModalVisible(true);
        }
    };

    // Function to convert VND to Phantom coin equivalent (you'll need to implement this)
    const convertToPhantom = (vnd) => {
        // Just an example conversion rate, you should fetch the actual rate from an API
        const conversionRate = 0.000043; // Example rate, 1 VND = 0.000043 Phantom Coin
        return vnd * conversionRate;
    };

    return (
        <Row gutter={[20, 20]}>
            <Col md={16} xs={24}>
                {carts?.map((book, index) => {
                    const currentBookPrice = book?.detail?.price ?? 0;
                    return (
                        <div className='order-book' key={`index-${index}`}>
                            <div className='book-content'>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/book/${book?.detail?.thumbnail}`} />
                                <div className='title'>{book?.detail?.name}</div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice)}
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>Số lượng: {book?.quantity}</div>
                                <div className='sum'>
                                    Tổng:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice * (book?.quantity ?? 0))}
                                </div>
                                <DeleteTwoTone
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(doDeleteItemCartAction({ _id: book._id }))}
                                    twoToneColor="#eb2f96"
                                />
                            </div>
                        </div>
                    );
                })}
            </Col>
            <Col md={8} xs={24}>
                <div className='order-sum'>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <AiOutlineRollback onClick={() => props.setCurrentStep(0)} size={'30px'} style={{ cursor: 'pointer' }} />
                    </div>
                    <Form onFinish={onFinish} form={form}>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Tên người nhận"
                            name="name"
                            initialValue={user?.name}
                            rules={[{ required: true, message: 'Tên người nhận không được để trống!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user?.phoneNumber}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Địa chỉ"
                            name="address"
                            initialValue={user?.address}
                            rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}>
                            <TextArea rows={4} />
                        </Form.Item>

                        <div className='method'>
                            <div>Hình thức thanh toán</div>
                            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
                                <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                                <Radio value="online">Thanh toán trực tuyến</Radio>
                                {/*<Radio value="phantom">Thanh toán qua ví Phantom</Radio>*/}
                            </Radio.Group>
                        </div>
                    </Form>

                    <Divider style={{ margin: "5px 0" }} />
                    <div className='calculate'>
                        <span>Tổng tiền</span>
                        <span className='sum-final'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                        </span>
                        {paymentMethod === 'phantom' && (
                            <div>
                                <span>Equivalent in Phantom: </span>
                                <span className='sum-final'>
                                    {convertToPhantom(totalPrice).toFixed(6)} Phantom
                                </span>
                            </div>
                        )}
                    </div>
                    <Divider style={{ margin: "5px 0" }} />
                    <button  onClick={() => form.submit()}
                            disabled={isSubmit || carts.length===0}
                    >
                        {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                        Đặt Hàng ({carts?.length ?? 0})
                    </button>
                </div>
            </Col>

            <CheckoutModal
                isModalVisible={isCheckoutModalVisible}
                setIsModalVisible={setIsCheckoutModalVisible}
                onPaymentSuccess={handlePlaceOrder}
                amount={totalPrice}
            />
            {/*<PhantomCheckoutModal*/}
            {/*    isModalVisible={isPhantomModalVisible}*/}
            {/*    setIsModalVisible={setIsPhantomModalVisible}*/}
            {/*    onPaymentSuccess={handlePlaceOrder}*/}
            {/*    amount={convertToPhantom(totalPrice)} // Chuyển đổi sang Phantom*/}
            {/*/>*/}
        </Row>
    );
};

export default Payment;
