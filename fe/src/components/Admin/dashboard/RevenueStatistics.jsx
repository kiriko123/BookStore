import {useEffect, useState} from "react";
import {callRevenueStatistics} from "../../../services/api.js";
import {Line} from "@ant-design/plots";

const RevenueStatistics = () =>{

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callRevenueStatistics();
            if (res && res.data) {
                setData(res.data);
            }
        }
        fetchData();
    }, []);

    const config = {
        data,
        xField: 'year',
        yField: 'totalRevenue',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },

    };
    return <Line {...config} />;
}
export default RevenueStatistics;