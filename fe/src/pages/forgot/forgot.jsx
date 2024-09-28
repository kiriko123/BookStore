import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message, notification} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callForgot, callLogin} from "../../services/api.js";
import './forgot.scss';

const ForgotPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const {email} = values;
        setLoading(true);
        //
        const res = await callForgot({email});
        console.log(res);
        setLoading(false);
        //
        if (res?.data?.statusCode === 201) {
            message.success('Send mail successfully');
            // navigate("/");
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: res?.data?.message ? res.data.message : res.message,
                duration: 1,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h3 className="login-title">Forgot password</h3>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    className="login-form"
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        label="Email address"
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
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
                        <Input placeholder="Email" size="large"/>
                    </Form.Item>


                    <Form.Item className="login-submit">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="login-button"
                        >
                            Send
                        </Button>
                    </Form.Item>
                </Form>
                <div className="login-options">
                    <div>
                        <Link to="/auth" className="register-now">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;