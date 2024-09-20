import React, {useState} from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Dropdown, Space, message, Avatar} from 'antd';
import {Outlet, useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {callLogout} from "../../services/api.js";
import {doLogoutAction} from "../../redux/account/accountSlice.js";
import './layout.scss';
import {FaUserCircle, FaUserEdit} from "react-icons/fa";
import {RiAdminFill, RiLogoutBoxFill} from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import ManageAccount from "../Account/ManageAccount.jsx";

const {Content, Sider} = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined/>
    },
    {
        label: <Link to='/admin/user'>Manage Users</Link>,
        key: 'user',
        icon: <UserOutlined/>,
    },
    {
        label: <Link to='/admin/book'>Manage ....</Link>,
        key: 'book',
        icon: <ExceptionOutlined/>
    },
    {
        label: <Link to='/admin/order'>Manage ....</Link>,
        key: 'order',
        icon: <DollarCircleOutlined/>
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showManageAccount, setShowManageAccount] = useState(false);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.statusCode === 200) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const itemsDropdown = [
        {
            label: <label style={{cursor: 'pointer'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={() => setShowManageAccount(true)}>
                    <FaUserEdit />
                    <span>Edit profile</span>
                </div>
            </label>,
            key: 'account',
        },
        {
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => navigate('/')}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaHome />
                    <span>Home page</span>
                </div>
            </label>,
            key: 'homepage',
        },
        {
            label: <label
                style={{cursor: 'pointer'}}
                onClick={() => handleLogout()}
            >
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <RiLogoutBoxFill />
                    <span>Logout</span>
                </div>
            </label>,
            key: 'logout',
        },
    ];

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${user?.imageUrl}`;

    return (
        <Layout
            style={{minHeight: '100vh', backgroundColor: '#f5f5f5'}} // Nền sáng nhẹ cho toàn bộ trang
            className="layout-admin"
        >
            <Sider
                theme='dark'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{backgroundColor: '#1f1f1f'}} // Sidebar màu xám tối
            >
                <div style={{height: 32, margin: 16, textAlign: 'center', color: '#fff', fontSize: 16}}>
                    Admin
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                    style={{backgroundColor: '#1f1f1f'}} // Màu nền sidebar menu đồng nhất
                />
            </Sider>
            <Layout>
                <div className='admin-header' style={{backgroundColor: '#4c2b5a', color: '#fff', padding: '0 16px'}}>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: {color: '#fff'}, // Icon màu trắng cho dễ nhìn
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{items: itemsDropdown}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()} style={{color: '#fff'}}>
                            <Space style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <Avatar src={urlAvatar}/>
                                <span>
                                    <span>Welcome {user?.name} </span>
                                    <DownOutlined/>
                                </span>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        backgroundColor: '#fff', // Vùng content nền trắng sáng
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
            <ManageAccount
                isModalOpen={showManageAccount}
                setIsModalOpen={setShowManageAccount}
            />
        </Layout>
    );
};

export default LayoutAdmin;
