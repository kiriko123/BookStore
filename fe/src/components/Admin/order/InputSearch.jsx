import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, theme } from 'antd';
const { Option } = Select;

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: '100%',
        padding: '20px',
        background: `#fff`,
        boxShadow: '0 4px 12px #0f3460',
        color: '#222',
        fontWeight: 'bold',
        marginBottom: '24px',
        borderRadius: '20px',
    };

    const onFinish = (values) => {
        let queryParts = [];

        if (values.receiverName) {
            queryParts.push(`receiverName~%27${values.receiverName}%27`);
        }
        if (values.receiverPhone) {
            queryParts.push(`receiverPhone~%27${values.receiverPhone}%27`);
        }
        if (values.receiverAddress) {
            queryParts.push(`receiverAddress~%27${values.receiverAddress}%27`);
        }
        if (values.email) {
            queryParts.push(`user.email~%27${values.email}%27`);
        }
        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            props.handleSearch(query);
        }
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24} justify={"center"}>
                <Col xs={12} sm={12} md={8} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`receiverName`}
                        label={`Receiver name`}
                    >
                        <Input placeholder="Please input receiver name!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={8} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`receiverPhone`}
                        label={`Receiver phone`}
                    >
                        <Input placeholder="Please input receiver phone!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`receiverAddress`}
                        label={`Receiver address`}
                    >
                        <Input placeholder="Please input receiver address!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="Please input user email!" />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InputSearch;
