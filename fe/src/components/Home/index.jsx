import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Row, Col, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs, Pagination, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { callFetchCategory, callFetchBooks } from '../../services/api';
import './home.scss';
const Home = () => {

    const [listCategory, setListCategory] = useState([]);

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=soldQuantity,desc");

    const [form] = Form.useForm();

    useEffect(() => {
        const initCategory = async () => {
            const res = await callFetchCategory();
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item.name, value: item.name }
                })
                setListCategory(d);
            }
        }
        initCategory();
    }, []);

    useEffect(() => {
        fetchBook();
    }, [current, pageSize, filter, sortQuery]);

    const fetchBook = async () => {
        setIsLoading(true)
        let query = `page=${current}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchBooks(query);

        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    const handleOnchangePage = (pagination) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }

    }

    const handleChangeFilter = (changedValues, values) => {
        // chỉ kích hoạt nếu có thay đổi trong category
        if (changedValues.category) {
            const cate = values.category;

            if (cate && cate.length > 0) {
                if (cate.length === 1) {
                    // Nếu chỉ có 1 giá trị, không thêm 'or'
                    setFilter(`filter=category.name:%27${cate[0]}%27`);
                } else {
                    // Nếu có nhiều hơn 1 giá trị, thêm 'or' giữa các giá trị
                    const f = cate.map(c => `category.name:%27${c}%27`).join(' or ');
                    setFilter(`filter=${f}`);
                }
            }
            else {
                // reset dữ liệu -> fetch tất cả
                setFilter('');
            }
        }
    };

    const onFinish = (values) => {
        let f = '';

        // kiểm tra điều kiện price range
        if (values?.range?.from >= 0 && values?.range?.to >= 0) {
            // tạo chuỗi filter cho price
            f = `filter=price>:${values?.range?.from} and price<:${values?.range?.to}`;
        }

        // nếu có category thì thêm vào filter
        if (values?.category?.length) {
            let cateFilter;
            if (values?.category.length === 1) {
                // Nếu chỉ có 1 giá trị category, không cần 'or'
                cateFilter = `category.name:%27${values.category[0]}%27`;
            } else {
                // Nếu có nhiều giá trị, thêm 'or' giữa các giá trị
                cateFilter = values?.category
                    .map(c => `category.name:%27${c}%27`)
                    .join(' or ');
            }

            // nếu f có chứa giá trị price, nối thêm filter cho category
            if (f) {
                f += ` and (${cateFilter})`;
            } else {
                // nếu không có giá trị price, chỉ thêm category vào filter
                f = `filter=(${cateFilter})`;
            }
        }

        // nếu không có filter nào hợp lệ, reset filter
        if (!f) {
            setFilter('');
        } else {
            // set filter cuối cùng
            setFilter(f);
        }
    };




    const items = [
        {
            key: "sort=soldQuantity,desc",
            label: `Phổ biến`,
            children: <></>,
        },
        {
            key: 'sort=createdAt,desc',
            label: `Hàng Mới`,
            children: <></>,
        },
        {
            key: 'sort=price,asc',
            label: `Giá Thấp Đến Cao`,
            children: <></>,
        },
        {
            key: 'sort=price,desc',
            label: `Giá Cao Đến Thấp`,
            children: <></>,
        },
    ];

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0}>
                        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span> <FilterTwoTone />
                                    <span style={{ fontWeight: 500 }}> Bộ lọc tìm kiếm</span>
                                </span>
                                <ReloadOutlined title="Reset" onClick={() => {
                                    form.resetFields();
                                    setFilter('');
                                }}
                                />
                            </div>
                            <Divider />
                            <Form
                                onFinish={onFinish}
                                form={form}
                                onValuesChange={(changedValues, values) => handleChangeFilter(changedValues, values)}
                            >
                                <Form.Item
                                    name="category"
                                    label="Danh mục sản phẩm"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            {listCategory?.map((item, index) => {
                                                return (
                                                    <Col span={24} key={`index-${index}`} style={{ padding: '7px 0' }}>
                                                        <Checkbox value={item.value} >
                                                            {item.label}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Khoảng giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <Row gutter={[10, 10]} style={{ width: "100%" }}>
                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'from']}>
                                                <InputNumber
                                                    name='from'
                                                    min={0}
                                                    placeholder="đ TỪ"
                                                    // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={2} md={0}>
                                            <div > - </div>
                                        </Col>
                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'to']}>
                                                <InputNumber
                                                    name='to'
                                                    min={0}
                                                    placeholder="đ ĐẾN"
                                                    // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Button onClick={() => form.submit()}
                                                style={{ width: "100%" }} type='primary'>Áp dụng</Button>
                                    </div>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Đánh giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text">trở lên</span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>

                    <Col md={20} xs={24} >
                        <Spin spinning={isLoading} tip="Loading...">
                            <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                                <Row >
                                    <Tabs
                                        defaultActiveKey="sort=-sold"
                                        items={items}
                                        onChange={(value) => { setSortQuery(value) }}
                                        style={{ overflowX: "auto" }}
                                    />
                                </Row>
                                <Row className='customize-row'>
                                    {listBook?.map((item, index) => {
                                        return (
                                            <div className="column" key={`book-${index}`}>
                                                <div className='wrapper'>
                                                    <div className='thumbnail'>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/book/${item.thumbnail}`} alt="thumbnail book" />
                                                    </div>
                                                    <div className='text' title={item.name}>{item.name}</div>
                                                    <div className='price'>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.price ?? 0)}
                                                    </div>
                                                    <div className='rating'>
                                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                        <span>Đã bán {item.soldQuantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </Row>
                                <div style={{ marginTop: 30 }}></div>
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    <Pagination
                                        current={current}
                                        total={total}
                                        pageSize={pageSize}
                                        responsive
                                        onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })}
                                    />
                                </Row>
                            </div>
                        </Spin>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default Home;
