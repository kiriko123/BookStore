import { useEffect, useState } from "react";
import { callCountBookSold } from "../../../services/api.js";
import { Column } from "@ant-design/plots";

const CountBookSold = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callCountBookSold();
            if (res && res.data) {
                const modifiedData = res.data.map(item => ({
                    ...item,
                    name: item.name.length > 15 ? `${item.name.slice(0, 12)}...` : item.name,
                }));
                setData(modifiedData);
            }
        };
        fetchData();
    }, []);

    const config = {
        data,
        xField: 'name',
        yField: 'soldQuantity',
        shapeField: 'column25D',
        style: {
            fill: 'rgba(126, 212, 236, 0.8)',
        },
        slider: {
            x: {
                values: [0, 1],
            },
            y: {
                values: [0, 1],
            }
        },
    };

    return <Column {...config} />;
};

export default CountBookSold;
