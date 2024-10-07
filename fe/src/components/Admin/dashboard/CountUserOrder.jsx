import {Bar} from "@ant-design/plots";
import {useEffect, useState} from "react";
import {callCountUserOrder} from "../../../services/api.js";

const CountUserOrder = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callCountUserOrder();
            if (res && res.data) {
                setData(res.data);
            }
        }
        fetchData();
    }, []);

    const config = {
        data,
        xField: 'email',
        yField: 'value',
        // shapeField: 'hollow',
        colorField: 'value',
        legend: {
            color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
        },
    };

    return(
        <Bar {...config} />
    )
}
export default CountUserOrder