import { Descriptions, Drawer, Modal, Grid } from "antd";
import moment from 'moment';

const { useBreakpoint } = Grid;

const CategoryViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // Ant Design's responsive grid system
    const screens = useBreakpoint();

    // Đóng Drawer và xóa dữ liệu
    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    };

    return (
        <>
            <Drawer
                title="Order Detail"
                width={screens.xs ? "100%" : screens.sm ? "80%" : screens.md ? "60%" : "40%"} // Responsive width
                onClose={onClose}
                open={openViewDetail}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Descriptions
                    bordered
                    column={screens.xs ? 1 : screens.sm ? 2 : 3}  // Responsive columns
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="receiverName">{dataViewDetail?.receiverName}</Descriptions.Item>
                    <Descriptions.Item label="receiverAddress" span={3}>
                        {dataViewDetail?.receiverAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="receiverPhone">
                        {dataViewDetail?.receiverPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="totalPrice">
                        {dataViewDetail?.totalPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="userID">
                        {dataViewDetail?.user?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="userEmail">
                        {dataViewDetail?.user?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created by">
                        {dataViewDetail?.createdBy}
                    </Descriptions.Item>
                    <Descriptions.Item span={6}>
                        <h3>Chi tiết hóa đơn</h3>
                    </Descriptions.Item>
                    {
                        dataViewDetail?.orderDetails.map((item, index) => (
                            <Descriptions.Item  key={index} label={`STT ${index + 1} - ${item.bookName}`} span={3}>
                                Số lượng: {item.quantity}, Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            </Descriptions.Item>
                        ))
                    }
                </Descriptions>
            </Drawer>
        </>
    );
};

export default CategoryViewDetail;
