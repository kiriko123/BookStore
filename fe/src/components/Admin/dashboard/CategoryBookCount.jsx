import {useEffect, useState} from "react";
import {callCategoryBookCount} from "../../../services/api.js";
import {Pie} from "@ant-design/plots";

const CategoryBookCount = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callCategoryBookCount();
            if (res && res.data) {
                setData(res.data);
            }
        }
        fetchData();
    }, []);

    const config = {
        data: data,
        angleField: 'bookCount',
        colorField: 'categoryName',
        label: {
            text: 'bookCount',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };
    return <Pie {...config} />;
}
export default CategoryBookCount;