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
                title="Category Detail"
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
                    <Descriptions.Item label="Name">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                        {dataViewDetail?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};

export default CategoryViewDetail;
