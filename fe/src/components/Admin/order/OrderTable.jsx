import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Dropdown, Checkbox, Menu } from 'antd';
import {
    ExportOutlined,
    CloudUploadOutlined,
    PlusOutlined,
    ReloadOutlined,
    DeleteTwoTone,
    EditTwoTone
} from '@ant-design/icons';
import {callDeleteCategory, callFetchAllCategory, callGetAllOrder} from "../../../services/api.js";
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import moment from 'moment';
import InputSearch from "./InputSearch.jsx";
import CategoryViewDetail from "../category/CategoryViewDetail.jsx";
import OrderViewDetail from "./OrderViewDetail.jsx";

const OrderTable = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [openModalImport, setOpenModalImport] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [listOrder, setlistOrder] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCategories = async () => {
        setIsLoading(true);
        let query = `page=${current}&size=${pageSize}`;
        if (filter) query += `&${filter}`;
        if (sortQuery) query += `&${sortQuery}`;
        const res = await callGetAllOrder(query);
        console.log(res);
        if (res && res.data) {
            setlistOrder(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const [selectedColumns, setSelectedColumns] = useState({
        id: true,
        receiverName: true,
        receiverPhone: true,
        totalPrice: true,
        receiverAddress: true,
        createdAt: true,
        updatedAt: false,
        createdBy: false,
        updatedBy: false,
        action: true,
    });

    const [dropdownVisible, setDropdownVisible] = useState(false); // Trạng thái hiển thị menu

    const handleMenuClick = () => {
        // Không làm gì ở đây để tránh menu đóng khi chọn
    };

    const handleVisibleChange = (flag) => {
        setDropdownVisible(flag); // Điều khiển trạng thái mở/đóng của menu
    };

    const columnSelector = (
        <Menu onClick={handleMenuClick} style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {Object.keys(selectedColumns).map((key) => (
                <Menu.Item key={key}>
                    <Checkbox
                        checked={selectedColumns[key]}
                        onChange={(e) => {
                            setSelectedColumns({
                                ...selectedColumns,
                                [key]: e.target.checked,
                            });
                        }}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        selectedColumns.id && {
            title: 'Id',
            dataIndex: 'id',
            sorter: true,
        },
        selectedColumns.receiverName && {
            title: 'Receiver name',
            dataIndex: 'receiverName',
            sorter: true,
        },
        selectedColumns.receiverPhone && {
            title: 'Receiver phone',
            dataIndex: 'receiverPhone',
            sorter: true,
        },
        selectedColumns.receiverAddress && {
            title: 'Receiver Address',
            dataIndex: 'receiverAddress',
            sorter: true,
        },
        selectedColumns.totalPrice && {
            title: 'Total price',
            dataIndex: 'totalPrice',
            sorter: true,
        },
        selectedColumns.createdAt && {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            sorter: true,
            render: (createdAt) => (moment(createdAt).format('DD-MM-YYYY hh:mm:ss')),
        },
        selectedColumns.updatedAt && {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (updatedAt) => (moment(updatedAt).format('DD-MM-YYYY hh:mm:ss')),
        },
        selectedColumns.createdBy && {
            title: 'CreatedBy',
            dataIndex: 'createdBy',
            sorter: true,
        },
        selectedColumns.updatedBy && {
            title: 'UpdatedBy',
            dataIndex: 'updatedBy',
            sorter: true,
        },
        selectedColumns.action && {
            title: 'Action',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <FaEye style={{ cursor: 'pointer' }} onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }} />

                    <EditTwoTone
                        twoToneColor="#f57800" style={{cursor: "pointer"}}
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    />
                </div>
            ),
        },
    ].filter(Boolean);

    const onChange = (pagination, filters, sorter) => {
        if (pagination.current !== current) setCurrent(pagination.current);
        if (pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field},asc` : `sort=${sorter.field},desc`;
            setSortQuery(q);
        }
    };


    const handleExportData = () => {
        if (listOrder.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listOrder);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportOrder.csv");
        }
    }


    const renderHeader = () => (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 15 }}>
            <span>Table Order</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                <Dropdown
                    overlay={columnSelector}
                    trigger={['click']}
                    visible={dropdownVisible} // Điều khiển trạng thái hiển thị của dropdown
                    onVisibleChange={handleVisibleChange} // Xử lý khi nhấn ra ngoài thì đóng menu
                >
                    <Button icon={<EditTwoTone/>} type="primary">Select Columns</Button>
                </Dropdown>
                <Button icon={<ExportOutlined />} type="primary" onClick={() => handleExportData()}>Export</Button>
                <Button type="ghost" onClick={() => {
                    setFilter("");
                    setSortQuery("");
                }}>
                    <ReloadOutlined />
                </Button>
            </div>
        </div>
    );

    const handleSearch = (query) => {
        setFilter(query);
        setCurrent(1);
    }


    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch}
                                 setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listOrder}
                        onChange={onChange}
                        rowKey="id"
                        scroll={{ x: 800 }} // Enables horizontal scrolling
                        pagination={{
                            current,
                            pageSize,
                            showSizeChanger: true,
                            total,
                            showTotal: (total, range) => <div>{range[0]}-{range[1]} trên {total} rows</div>,
                        }}
                    />
                </Col>
            </Row>
            <OrderViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    );
};

export default OrderTable;
