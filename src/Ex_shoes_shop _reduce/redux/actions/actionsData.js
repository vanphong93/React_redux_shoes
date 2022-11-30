import axios from "axios";
import { DATA } from "../reducer/constants/shoeConstants";
const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
export const dataALl = () => {
    return (dispatch) => {
        axios
            .get(`${BASE_URL}/shoeShop`)
            .then((res) => {
                dispatch({
                    type: DATA,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        //ES6 without axios
        // fetch(`${BASE_URL}/shoeShop`, { method: "GET" })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         dispatch({
        //             type: DATA,
        //             payload: data,
        //         });
        //     })
        //     .catch((err) => console.log(err));
    };
};

//async and await
// export const dataALl = () => {
//     return async () => {
//         try {
//             let res = await fetch(`${BASE_URL}/shoeShop`, { method: "GET" });
//             let data = await res.json();
//             dispatch({
//                 type: DATA,
//             });
//         } catch (error) {
//             console.log("error: ", error);
//         }
//     };
// };
