import { Avatar, Badge, Descriptions, Drawer, Modal } from "antd";
import moment from 'moment';
import { AntDesignOutlined } from "@ant-design/icons";
import { useState } from 'react';

const UserViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // State để kiểm soát modal hiển thị ảnh lớn
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${dataViewDetail?.imageUrl}`;

    return (
        <>
            <Drawer
                title="User Detail"
                width={"60vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Avatar" span={2}>
                        <Avatar
                            size={100}
                            icon={<AntDesignOutlined />}
                            src={urlAvatar}
                            shape="circle"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
                            onClick={handleAvatarClick} // Thêm sự kiện click để mở modal
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Firstname">{dataViewDetail?.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Lastname">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Address">{dataViewDetail?.address}</Descriptions.Item>
                    <Descriptions.Item label="Age">{dataViewDetail?.age}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{dataViewDetail?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Enabled">
                        {dataViewDetail?.enabled ? 'Enabled' : 'Disabled'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataViewDetail?.role?.name} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedBy">
                        {dataViewDetail?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item label="UpdatedBy">
                        {dataViewDetail?.updatedBy}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>

            {/* Modal hiển thị ảnh lớn */}
            <Modal
                open={isModalOpen}
                onCancel={handleModalClose}
                footer={null}
            >
                <img
                    src={urlAvatar}
                    alt="Avatar"
                    style={{ width: '100%' }}
                />
            </Modal>
        </>
    );
}

export default UserViewDetail;
