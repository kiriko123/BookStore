import { Badge, Descriptions, Divider, Space, Table, Tag, Drawer } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { callOrderHistory } from "../../services/api";
import { useSelector } from "react-redux";
import { EyeOutlined } from '@ant-design/icons';

const History = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const user = useSelector(state => state.account.user);

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await callOrderHistory(user.id);
            if (res && res.data) {
                setOrderHistory(res.data);
            }
        }
        fetchHistory();
    }, [user.id]);

    const showDrawer = (record) => {
        setSelectedOrder(record);
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (item) => {
                return moment(item).format('DD-MM-YYYY hh:mm:ss');
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item);
            }
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiverName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'receiverAddress',
        },
        {
            title: 'Trạng thái',
            render: () => (
                <Tag color={"green"}>
                    Thành công
                </Tag>
            )
        },

        {
            title: 'Chi tiết',
            key: 'action',
            render: (_, record) => (
                <EyeOutlined onClick={() => showDrawer(record)} style={{ cursor: 'pointer' }} />
            ),
        },
    ];

    return (
        <div>
            <div style={{ margin: "15px 0" }}>Lịch sử đặt hàng:</div>
            <Table
                columns={columns}
                dataSource={orderHistory}
                pagination={false}
                rowKey="id"
                scroll={{ x: 800 }} // Enables horizontal scrolling
            />

            <Drawer
                title="Chi tiết đơn hàng"
                placement="right"
                width={'70%'} // 70% width for responsive drawer
                onClose={closeDrawer}
                visible={openDrawer}
            >
                {selectedOrder && (
                    <Descriptions bordered>
                        {selectedOrder.orderDetails.map((item, index) => (
                            <Descriptions.Item key={index} label={`STT ${index + 1} - ${item.bookName}`} span={3}>
                                Số lượng: {item.quantity}, Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                )}
            </Drawer>
        </div>
    );
}

export default History;
