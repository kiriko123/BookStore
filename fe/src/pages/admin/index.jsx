import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, ShoppingCartOutlined, BookOutlined } from "@ant-design/icons";
import { callCountAllUserOrderAndBook } from "../../services/api.js";
import RevenueStatistics from "../../components/Admin/dashboard/RevenueStatistics.jsx";
import './AdminPage.css';

const AdminPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        totalOrder: 0,
        totalUser: 0,
        totalBook: 0,
    });

    useEffect(() => {
        initDashboard();
    }, []);

    const initDashboard = async () => {
        const res = await callCountAllUserOrderAndBook();
        if (res && res.data) {
            setDataDashboard(res.data);
        }
    };

    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                                <UserOutlined style={{ marginRight: "8px" }} />
                                Tổng Users
                            </span>
                        }
                        bordered={false}
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <Statistic
                            value={dataDashboard.totalUser}
                            formatter={formatter}
                            valueStyle={{ fontSize: "24px", color: "#3f8600" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                                <ShoppingCartOutlined style={{ marginRight: "8px" }} />
                                Tổng Đơn Hàng
                            </span>
                        }
                        bordered={false}
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <Statistic
                            value={dataDashboard.totalOrder}
                            precision={2}
                            formatter={formatter}
                            valueStyle={{ fontSize: "24px", color: "#cf1322" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                                <BookOutlined style={{ marginRight: "8px" }} />
                                Tổng Sách
                            </span>
                        }
                        bordered={false}
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <Statistic
                            value={dataDashboard.totalBook}
                            formatter={formatter}
                            valueStyle={{ fontSize: "24px", color: "#3f8600" }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={24}>
                    <RevenueStatistics />
                </Col>
            </Row>
        </>
    );
};

export default AdminPage;
