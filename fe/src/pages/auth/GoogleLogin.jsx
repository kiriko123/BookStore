import React, {useState} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {Button, message} from 'antd';
import axios from 'axios';
import {FcGoogle} from 'react-icons/fc';
import {useNavigate} from "react-router-dom";
import {doLoginAction} from "../../redux/account/accountSlice.js";
import {useDispatch} from "react-redux"; // Icon Google từ react-icons

const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const signIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                console.log('Token Response:', tokenResponse);

                // // Lấy thông tin người dùng từ Google UserInfo endpoint
                // const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                //     headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                // });
                // console.log('User Info:', userInfo.data);

                // Gửi access_token về backend để xác thực
                const response = await axios.post('http://localhost:8080/api/v1/auth/google', {
                    accessToken: tokenResponse.access_token
                }, {
                    withCredentials: true // Bao gồm credentials để nhận cookie từ server
                });

                const data = response.data;
                console.log('User authenticated', data);

                // Lưu access token vào localStorage và điều hướng người dùng nếu cần
                localStorage.setItem('access_token', data.data.access_token);
                dispatch(doLoginAction(data.data.user));
                message.success("Đăng nhập thành công");
                navigate("/");
                //window.location.href = '/';
            } catch (error) {
                console.error('Login failed', error);
                setLoading(false);
                message.error(error.response.data.message);
            }
        },
        onError: (error) => {
            console.error('Google login failed', error);
        },
    });

    return (
        <Button
            type="primary"
            shape="round"
            loading={loading}
            size="large"
            onClick={() => signIn()}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <FcGoogle style={{marginRight: '8px'}}/> {/* Icon Google */}
            Sign in with Google
        </Button>
    );
};

export default GoogleLogin;
