import ViewOrder from "../../components/Order/ViewOrder";
import {Button, Result, Steps} from 'antd';
import './order.scss';
import {useState} from "react";
import Payment from "../../components/Order/Payment";
import {SmileOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const OrderPage = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    return (
        <div style={{background: '#dde8f8', padding: "20px 0"}}>
            <div className="order-container" style={{maxWidth: 1440, margin: '0 auto'}}>
                <div className="order-steps">
                    <Steps
                        size="small"
                        current={currentStep}
                        status={"finish"}
                        items={[
                            {
                                title: 'Đơn hàng',
                            },
                            {
                                title: 'Đặt hàng',
                            },
                            {
                                title: 'Thanh toán',
                            },
                        ]}
                    />
                </div>
                {currentStep === 0 &&
                    <ViewOrder setCurrentStep={setCurrentStep}/>
                }
                {currentStep === 1 &&
                    <Payment setCurrentStep={setCurrentStep}/>
                }

                {currentStep === 2 &&
                    <Result
                        icon={<SmileOutlined/>}
                        title="Đơn hàng đã được đặt thành công!"
                        extra={<Button type="primary" onClick={() => navigate('/history')}>Xem lịch sử</Button>}
                    />
                }
            </div>
        </div>
    )
}

export default OrderPage;
