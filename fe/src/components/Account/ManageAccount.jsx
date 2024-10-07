import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import './ManageAccount.css';
import { useSelector } from "react-redux";  // Thêm file CSS để tùy chỉnh giao diện

const ManageAccount = (props) => {
    const { isModalOpen, setIsModalOpen } = props;
    const user = useSelector(state => state.account.user);

    const items = [
        {
            key: 'info',
            label: `Cập nhật thông tin`,
            children: <UserInfo />,
        },
    ];

    if (!user.googleAccount) {
        items.push({
            key: 'password',
            label: `Đổi mật khẩu`,
            children: <ChangePassword />,
        });
    }

    return (
        <Modal
            title="Quản lý tài khoản"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={true}
            width={"70vw"}
            bodyStyle={{ padding: '10px' }}
            centered
            className="manage-account-modal"
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
                size="large"
            />
        </Modal>
    );
};

export default ManageAccount;
