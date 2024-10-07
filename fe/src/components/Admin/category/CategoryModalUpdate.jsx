import React, { useEffect, useState } from 'react';
import {Button, Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Radio} from 'antd';
import {callUpdateCategory} from '../../../services/api';

const UserModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, name, active } = values;
        setIsSubmit(true)
        const res =
            await callUpdateCategory({id, name, active});
        if (res && res.data) {
            message.success('Cập nhật category thành công');
            setOpenModalUpdate(false);
            await props.fetchCategories()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật category"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    // initialValues={dataUpdate}
                >
                    <Form.Item hidden labelCol={{ span: 24 }} label="Id" name="id"  rules={[{ required: true, message: 'Vui lòng nhập id!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 24 }} label="Name" name="name"  rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Active"
                        name="active"
                        rules={[{ required: true, message: 'Please select active!' }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>Active</Radio>
                            <Radio value={false}>Inactive</Radio>
                        </Radio.Group>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default UserModalUpdate;
