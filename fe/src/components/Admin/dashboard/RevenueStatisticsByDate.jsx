import {useEffect, useState} from "react";
import {callRevenueStatistics, callRevenueStatisticsByDate} from "../../../services/api.js";
import {Area} from "@ant-design/plots";

const RevenueStatisticsByDate = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callRevenueStatisticsByDate();
            if (res && res.data) {
                setData(res.data);
            }
        }
        fetchData();
    }, []);

    const config = {
        data: data,
        xField: 'date',
        yField: 'totalRevenue',
        style: {
            fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
        },
        axis: {
            y: { labelFormatter: '~s' },
        },
        line: {
            style: {
                stroke: 'darkgreen',
                strokeWidth: 2,
            },
        },
        slider: {
            x: {
                values: [0, 1],
            }
        },
    };

    return <Area {...config} />;

}
export default RevenueStatisticsByDate;