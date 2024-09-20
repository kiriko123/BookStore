import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import './ManageAccount.css';  // Thêm file CSS để tùy chỉnh giao diện

const ManageAccount = (props) => {
    const { isModalOpen, setIsModalOpen } = props;

    const items = [
        {
            key: 'info',
            label: `Cập nhật thông tin`,
            children: <UserInfo />,
        },
        {
            key: 'password',
            label: `Đổi mật khẩu`,
            children: <ChangePassword />,
        },
    ];

    return (
        <Modal
            title="Quản lý tài khoản"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={true}
            width={"80vw"}  // Điều chỉnh chiều rộng
            bodyStyle={{ padding: '10px' }}  // Giảm padding để hiển thị tốt hơn
            centered  // Giữ modal ở giữa màn hình
            className="manage-account-modal"  // Áp dụng class CSS tùy chỉnh
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
                size="large"  // Điều chỉnh kích thước của tab
            />
        </Modal>
    );
};

export default ManageAccount;
