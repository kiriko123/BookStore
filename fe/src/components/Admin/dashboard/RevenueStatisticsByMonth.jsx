import {useEffect, useState} from "react";
import {Area} from "@ant-design/plots";
import {callFindRevenueStatisticsByMonthAndYear} from "../../../services/api.js";

const RevenueStatisticsByMonth = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callFindRevenueStatisticsByMonthAndYear();
            if (res && res.data) {
                setData(res.data);
            }
        }
        fetchData();
    }, []);

    const config = {
        data: data,
        xField: 'monthYear',
        yField: 'totalRevenue',
    };
    return <Area {...config} />;
}
export default RevenueStatisticsByMonth;