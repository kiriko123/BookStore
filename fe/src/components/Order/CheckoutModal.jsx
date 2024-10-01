import React, { useState } from 'react';
import { Modal, Form, Divider, message, notification, Button, Typography, Input, Select } from 'antd';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { callCheckOut } from '../../services/api.js';
import './CheckoutModal.scss'; // Import file SCSS riêng cho modal

const { Title, Text } = Typography;
const { Option } = Select;

const CheckoutModal = ({ isModalVisible, setIsModalVisible, onPaymentSuccess, amount }) => {
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [form] = Form.useForm();

    const handleOk = async () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        setProcessing(true);
        try {
            const response = await callCheckOut({ amount });
            const clientSecret = response.data.clientSecret;

            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: form.getFieldValue('email'),   // Email từ form
                        name: form.getFieldValue('nameOnCard'),   // Tên từ form
                        address: {
                            country: form.getFieldValue('country')   // Quốc gia từ form
                        }
                    }
                },
            });

            if (error) {
                notification.error({
                    message: 'Payment Error',
                    description: error.message,
                });
            } else if (paymentIntent.status === 'succeeded') {
                message.success('Payment succeeded');
                onPaymentSuccess(paymentIntent);
                setIsModalVisible(false);
            }
        } catch (err) {
            notification.error({
                message: 'Checkout Error',
                description: err.message,
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal
            className="checkout-modal"
            title={<Title level={3}>Stripe Payment</Title>}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: processing }}
            okText={processing ? "Processing..." : `Pay ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}`}  // Hiển thị tổng tiền trong nút thanh toán
            cancelText="Cancel"
            centered
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={processing} onClick={handleOk}>
                    {processing ? 'Processing...' : 'Pay'}
                </Button>,
            ]}
        >
            <div className="modal-content">
                <Text>Please enter your payment details to complete the transaction.</Text>
                <Divider />
                <Form
                    form={form}
                    name="checkoutForm"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/* Email field */}
                    <Form.Item
                        label={<Text strong>Email</Text>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email.",
                            },
                            {
                                type: "email",
                                message: "Your email is invalid.",
                            },
                        ]}
                    >
                        <Input  placeholder="test@example.com" />
                    </Form.Item>

                    {/* Card details field */}
                    <Form.Item
                        label={<Text strong>Card Information</Text>}
                        name="card"
                        rules={[{ required: true, message: 'Please enter card details!' }]}
                    >
                        <CardElement
                            className="card-element"
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                        padding: '0px',
                                        fontFamily: 'Arial, sans-serif',
                                        fontSmoothing: 'antialiased',
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </Form.Item>

                    {/* Name on card field */}
                    <Form.Item
                        label={<Text strong>Name on card</Text>}
                        name="nameOnCard"
                        rules={[{ required: true, message: 'Please enter the name on the card!' }]}
                    >
                        <Input placeholder="Zhang San" />
                    </Form.Item>

                    {/* Country/region and postal code fields */}
                    <Form.Item
                        label={<Text strong>Country or region</Text>}
                        name="country"
                        rules={[{ required: true, message: 'Please select your country!' }]}
                    >
                        <Select placeholder="Select country">
                            <Option value="US">United States</Option>
                            <Option value="VN">Việt Nam</Option>
                            <Option value="CN">China</Option>
                            {/* Add more country options as needed */}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CheckoutModal;
