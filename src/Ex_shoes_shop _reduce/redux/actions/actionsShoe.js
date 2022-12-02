import axios from "axios";
import {
    addProduct,
    buyProduct,
    dereaseQuantity,
    getDataAPI,
    increaseQuantity,
    removeProduct,
    showDetail,
} from "../reducer/newShoeReducer";
const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
export const dataShoeAPI = () => {
    return (dispatch) => {
        axios
            .get(`${BASE_URL}/shoeShop`)
            .then((res) => {
                console.log("res: ", res);
                dispatch(getDataAPI(res.data));
            })
            .catch((err) => console.log(err));
    };
};
export const handleIncrease = (value) => {
    return increaseQuantity(value);
};

export const handleRemove = (value) => {
    return removeProduct(value);
};
export const handleBuy = () => {
    return buyProduct();
};
export const handleDecrease = (value) => {
    return dereaseQuantity(value);
};
export const handleAdd = (value) => {
    return addProduct(value);
};
export const handleDetail = (value) => {
    return showDetail(value);
};
