import axios from "axios";
import { getDataAPI } from "../reducer/newShoeReducer";
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
