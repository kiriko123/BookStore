import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {Avatar, Button, Col, Form, Input, Row, Upload, message, notification, InputNumber, Radio, Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { callUpdateInfo, callUploadFile } from "../../services/api.js";
import { doUpdateUserInfoAction, doUploadAvatarAction } from "../../redux/account/accountSlice.js";

const UserInfo = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user);
    const tempAvatar = useSelector(state => state.account.tempAvatar);

    const [userAvatar, setUserAvatar] = useState(user?.imageUrl ?? "");
    const [isSubmit, setIsSubmit] = useState(false);

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${tempAvatar || user?.imageUrl}`;

    const [previewOpen, setPreviewOpen] = useState(false);

    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFile(file, 'avatar');
        if(res && res.data){
            const newAvatar = res.data.fileName;
            dispatch(doUploadAvatarAction({ avatar: newAvatar }));
            setUserAvatar(newAvatar);
            onSuccess('ok');
        } else {
            onError('Đã có lỗi khi upload file');
        }
    };

    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`Upload file thành công`);
            } else if (info.file.status === 'error') {
                message.error(`Upload file thất bại`);
            }
        },
    };

    const onFinish = async (values) => {
        const { id, firstName, name, gender, age, phoneNumber, address } = values;
        setIsSubmit(true);
        const res = await callUpdateInfo({ id, firstName, name, userAvatar, gender, age, phoneNumber, address });
        if (res && res.data) {
            dispatch(doUpdateUserInfoAction({ id, firstName, name, imageUrl: userAvatar, gender, age, phoneNumber, address }));
            message.success("Cập nhật thông tin user thành công");
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            });
        }
        setIsSubmit(false);
    };

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        setPreviewOpen(true);
    };

    return (
        <div style={{ minHeight: 400, padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Row gutter={40}>
                <Col sm={24} md={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                        size={{ xs: 80, sm: 100, md: 120, lg: 150, xl: 180 }}
                        icon={<AntDesignOutlined />}
                        src={urlAvatar}
                        shape="circle"
                        onClick={handlePreview}
                        style={{ marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    />
                    <Upload {...propsUpload}>
                        <Button icon={<UploadOutlined />} type="primary" style={{ backgroundColor: '#1890ff', borderRadius: '8px' }}>
                            Upload Avatar
                        </Button>
                    </Upload>
                </Col>
                <Col sm={24} md={14} >
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        form={form}
                        style={{ backgroundColor: '#fff', padding: '0px', borderRadius: '8px' }}
                    >
                        <Form.Item
                            hidden
                            label="Id"
                            name="id"
                            initialValue={user?.id}
                        >
                            <Input disabled hidden />
                        </Form.Item>


                        <Form.Item
                            label="Email"
                            name="email"
                            labelCol={{ span: 24 }}
                            initialValue={user?.email}
                        >
                            <Input disabled style={{ borderRadius: '8px' }} />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Firstname"
                                    name="firstName"
                                    initialValue={user?.firstName}
                                    rules={[{ required: true, message: 'FirstName không được để trống!' }]}
                                >
                                    <Input style={{ borderRadius: '8px' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Lastname"
                                    name="name"
                                    initialValue={user?.name}
                                    rules={[{ required: true, message: 'Lastname không được để trống!' }]}
                                >
                                    <Input style={{ borderRadius: '8px' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Gender"
                            name="gender"
                            initialValue={user?.gender}

                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Radio.Group>
                                <Radio value="MALE">Male</Radio>
                                <Radio value="FEMALE">Female</Radio>
                                <Radio value="OTHER">Other</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone number"
                                    name="phoneNumber"
                                    initialValue={user?.phoneNumber}
                                    rules={[{ required: true, message: 'Phone number không được để trống!' }]}
                                >
                                    <Input style={{ borderRadius: '8px' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Age"
                                    name="age"
                                    initialValue={user?.age}
                                    rules={[{ required: true, message: 'Please enter your age!' }]}
                                >
                                    <InputNumber min={0} max={120} style={{ width: '100%', borderRadius: '8px' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Address"
                            name="address"
                            initialValue={user?.address}
                            rules={[{ required: true, message: 'Address không được để trống!' }]}
                        >
                            <Input style={{ borderRadius: '8px' }} />
                        </Form.Item>



                        <Button loading={isSubmit} onClick={() => form.submit()} type="primary" style={{ width: '100%', borderRadius: '8px', backgroundColor: '#1890ff' }}>
                            Cập nhật
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Modal open={previewOpen} title={urlAvatar} footer={null} onCancel={handleCancel} centered>
                <img alt="example" style={{ width: '100%' }} src={urlAvatar} />
            </Modal>
        </div>
    );
};

export default UserInfo;
