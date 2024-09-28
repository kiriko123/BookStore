import React, {useState} from 'react';
import {Button, Col, Divider, Form, Input, InputNumber, message, Modal, notification, Radio, Row} from 'antd';
import {callCreateCategory, callCreateUser} from '../../../services/api';

const UserModalCreate = (props) => {
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {name} = values;
        setIsSubmit(true);
        const res =
            await callCreateCategory({name});
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchCategorys();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false);

    };

    return (
        <>

            <Modal
                title="Thêm mới category"
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                centered
            >
                <Divider/>

                <Form
                    form={form} //quy dinh Form la form khi submit cai model se submit form luon
                    name="basic"
                    style={{maxWidth: 600}}

                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item  label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;
