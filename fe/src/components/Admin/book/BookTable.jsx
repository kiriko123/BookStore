import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Popconfirm, Button, message, notification, Dropdown, Checkbox, Menu} from 'antd';
import {
    ExportOutlined,
    CloudUploadOutlined,
    PlusOutlined,
    ReloadOutlined,
    DeleteTwoTone,
    EditTwoTone
} from '@ant-design/icons';
import {callDeleteBook, callFetchBooks} from "../../../services/api.js";
import {FaEye} from "react-icons/fa";
import InputSearch from './InputSearch';
import BookViewDetail from "./BookViewDetail.jsx";
import * as XLSX from "xlsx";
import BookModalCreate from "./BookModelCreate.jsx";
import BookModalUpdate from "./BookModalUpdate.jsx";

const BookTable = () => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchBooks()
    }, [current, pageSize, filter, sortQuery]);

    const fetchBooks = async () => {
        setIsLoading(true);
        let query = `page=${current}&size=${pageSize}`;
        if (filter) query += `&${filter}`;
        if (sortQuery) query += `&${sortQuery}`;

        const res = await callFetchBooks(query);

        if (res && res.data) {
            console.log(res)
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false)
    }

    const [selectedColumns, setSelectedColumns] = useState({
        id: true,
        name: true,
        author: true,
        price: true,
        quantity: true,
        soldQuantity: true,
        active: true,
        category: true,
        createdAt: false,
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
        <Menu onClick={handleMenuClick} style={{maxHeight: '200px', overflowY: 'scroll'}}>
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
        selectedColumns.name && {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        selectedColumns.category && {
            title: 'Category',
            dataIndex: ['category', 'name'],
            sorter: true,
        },
        selectedColumns.author && {
            title: 'Author',
            dataIndex: 'author',
            sorter: true,
        },
        selectedColumns.price && {
            title: 'Price',
            dataIndex: 'price',
            sorter: true,
        },
        selectedColumns.quantity && {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
        },
        selectedColumns.soldQuantity && {
            title: 'Sold quantity',
            dataIndex: 'soldQuantity',
            sorter: true,
        },
        selectedColumns.active && {
            title: 'Active',
            dataIndex: 'active',
            sorter: true,
            render: (active) => (active ? 'Active' : 'Disabled'), // Chuyển đổi giá trị true/false
        },

        selectedColumns.createdAt && {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            sorter: true,
        },
        selectedColumns.updatedAt && {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            sorter: true,
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
                <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                    <FaEye style={{cursor: 'pointer'}} onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}/>
                    <Popconfirm
                        placement="leftTop"
                        title="Xác nhận xóa book"
                        description="Bạn có chắc chắn muốn xóa book này?"
                        onConfirm={() => handleDeleteBook(record.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{cursor: 'pointer'}}>
                            <DeleteTwoTone twoToneColor="#ff4d4f"/>
                        </span>
                    </Popconfirm>
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

    const handleDeleteBook = async (bookId) => {
        const res = await callDeleteBook(bookId);
        if (res?.data?.statusCode === 204) {
            message.success('Xóa book thành công');
            await fetchBooks()
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message,
            });
        }
    };

    const handleExportData = () => {
        if (listBook.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listBook);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportBook.csv");
        }
    }

    const renderHeader = () => (
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 15}}>
            <span>Table Books</span>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 15}}>
                <Dropdown
                    overlay={columnSelector}
                    trigger={['click']}
                    visible={dropdownVisible} // Điều khiển trạng thái hiển thị của dropdown
                    onVisibleChange={handleVisibleChange} // Xử lý khi nhấn ra ngoài thì đóng menu
                >
                    <Button icon={<EditTwoTone/>} type="primary">Select Columns</Button>
                </Dropdown>
                <Button icon={<ExportOutlined/>} type="primary" onClick={() => handleExportData()}>Export</Button>

                <Button icon={<PlusOutlined/>} type="primary" onClick={() => setOpenModalCreate(true)}>Thêm mới</Button>
                <Button type="ghost" onClick={() => {
                    setFilter("");
                    setSortQuery("");
                }}>
                    <ReloadOutlined/>
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
                                 setFilter={setFilter}/>
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}
                        columns={columns}
                        dataSource={listBook}
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
                <BookViewDetail
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    dataViewDetail={dataViewDetail}
                    setDataViewDetail={setDataViewDetail}
                />
                <BookModalCreate
                    openModalCreate={openModalCreate}
                    setOpenModalCreate={setOpenModalCreate}
                    fetchBook={fetchBooks}
                />
                <BookModalUpdate
                    openModalUpdate={openModalUpdate}
                    setOpenModalUpdate={setOpenModalUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchBook={fetchBooks}
                />
            </Row>
        </>
    );
};

export default BookTable;

