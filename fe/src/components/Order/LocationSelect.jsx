import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input } from "antd";

const { Option } = Select;

const LocationSelect = ({ onAddressChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [street, setStreet] = useState("");

    const [selectedProvince, setSelectedProvince] = useState(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState(undefined);
    const [selectedWard, setSelectedWard] = useState(undefined);

    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/p/")
            .then((response) => {
                setProvinces(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then((response) => {
                    setDistricts(response.data.districts);
                    setWards([]);
                });
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then((response) => {
                    setWards(response.data.wards);
                });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedWard(undefined);
    };

    const handleWardChange = (value) => {
        setSelectedWard(value);
        onAddressChange(
            provinces.find((p) => p.code === selectedProvince)?.name,
            districts.find((d) => d.code === selectedDistrict)?.name,
            wards.find((w) => w.code === value)?.name,
            street
        );
    };

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
        onAddressChange(
            provinces.find((p) => p.code === selectedProvince)?.name,
            districts.find((d) => d.code === selectedDistrict)?.name,
            wards.find((w) => w.code === selectedWard)?.name,
            e.target.value
        );
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <Select
                placeholder="Chọn Tỉnh"
                value={selectedProvince}
                onChange={handleProvinceChange}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {provinces.map((province) => (
                    <Option key={province.code} value={province.code}>
                        {province.name}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Chọn Huyện"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {districts.map((district) => (
                    <Option key={district.code} value={district.code}>
                        {district.name}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Chọn Xã"
                value={selectedWard}
                onChange={handleWardChange}
                disabled={!selectedDistrict}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {wards.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                        {ward.name}
                    </Option>
                ))}
            </Select>

            <Input
                placeholder="Nhập số nhà, tên đường"
                value={street}
                onChange={handleStreetChange}
                disabled={!selectedWard}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default LocationSelect;
