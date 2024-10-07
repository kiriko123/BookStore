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

        if (values.fullName) {
            queryParts.push(`name~%27${values.fullName}%27`);
        }
        if (values.firstName) {
            queryParts.push(`firstName~%27${values.firstName}%27`);
        }
        if (values.email) {
            queryParts.push(`email~%27${values.email}%27`);
        }
        if (values.phoneNumber) {
            queryParts.push(`phoneNumber~%27${values.phoneNumber}%27`);
        }
        if (values.address) {
            queryParts.push(`address~%27${values.address}%27`);
        }
        if (values.enabled) {
            queryParts.push(`enabled~%27${values.enabled}%27`);
        }
        if (values.role) {
            queryParts.push(`role.id~%27${values.role}%27`);
        }
        if (values.gender) {
            queryParts.push(`gender:%27${values.gender}%27`);
        }

        if (queryParts.length > 0) {
            const query = `filter=${queryParts.join('%20and%20')}`;
            console.log("Search query:", query);
            props.handleSearch(query);
        }
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish} >
            <Row gutter={24} justify={"center"}>
                <Col xs={12} sm={12} md={8} lg={4}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`firstName`}
                        label={`Firstname`}
                    >
                        <Input placeholder="Please input firstname!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={8} lg={4}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`fullName`}
                        label={`Lastname`}
                    >
                        <Input placeholder="Please input lastname!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={5}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="Please input email!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={5}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`phoneNumber`}
                        label={`Phone number`}
                    >
                        <Input placeholder="Please input phone number!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`address`}
                        label={`Address`}
                    >
                        <Input placeholder="Please input address!" />
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={8} lg={4}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`enabled`}
                        label={`Status`}
                    >
                        <Select placeholder="Select status">
                            <Option value="true">Active</Option>
                            <Option value="false">Disable</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={8} lg={4}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`role`}
                        label={`Role`}
                    >
                        <Select placeholder="Select role">
                            <Option value="2">User</Option>
                            <Option value="1">Admin</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={8} lg={4}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`gender`}
                        label={`Gender`}
                    >
                        <Select placeholder="Select gender">
                            <Option value="MALE">Male</Option>
                            <Option value="FEMALE">Female</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
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
