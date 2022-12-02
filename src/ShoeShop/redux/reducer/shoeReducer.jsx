import {
    ADD,
    BUY,
    DECREASE,
    DETAIL,
    INCREASE,
    REMOVE,
} from "../constants/shoeConstants";
// import axios from "axios";
import { BASE_URL } from "../../ListShoes";
import axios from "axios";
import { dataBackUp } from "../../../assets/dataBackUp";

let initialization = [
    {
        id: 1,
        name: "Adidas Prophere",
        alias: "adidas-prophere",
        price: 350,
        description:
            "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.",
        shortDescription:
            "The midsole contains 20% more Boost for an amplified Boost feeling.",
        quantity: 995,
        image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
    },
];
let initialState = {
    detailShoe: initialization[0],
    gioHang: [],
    dataShoes: initialization,
};
export let shoeReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DETAIL:
            return { ...state, detailShoe: payload };
        case ADD: {
            let newGioHang = [...state.gioHang];
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            if (i === -1) {
                let newItem = { ...payload, soLuong: 1 };
                newGioHang.push(newItem);
            } else newGioHang[i].soLuong++;
            return { ...state, gioHang: newGioHang };
        }
        case INCREASE: {
            let newGioHang = [...state.gioHang];
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            newGioHang[i].soLuong++;
            return { ...state, gioHang: newGioHang };
        }
        case DECREASE: {
            let newGioHang = [...state.gioHang];
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            if (newGioHang[i].soLuong > 1) {
                newGioHang[i].soLuong--;
            }
            return { ...state, gioHang: newGioHang };
        }
        case REMOVE: {
            let newGioHang = [...state.gioHang];
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            newGioHang.splice(i, 1);
            return { ...state, gioHang: newGioHang };
        }
        case BUY: {
            let newGioHang = [...state.gioHang];
            newGioHang.splice(0);
            alert("Chúc mừng bạn đặt hàng thành công");
            return { ...state, gioHang: newGioHang };
        }
        case "getData":
            return { ...state, dataShoes: payload };
        case "deleteData": {
            let newData = [...state.dataShoes];
            let index = newData.findIndex((item) => {
                return item.name == payload;
            });
            let idDelete = newData[index].id;
            newData.splice(index, 1);
            axios({
                url: `${BASE_URL}/shoeShop/${idDelete}`,
                method: "DELETE",
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
            return {
                ...state,
                dataShoes: newData,
            };
        }

        case "backUp": {
            let restData = [...state.dataShoes];
            let deletedItem = dataBackUp.filter((itemDeleted) => {
                return (
                    restData.findIndex((itemRest) => {
                        return itemRest.name === itemDeleted.name;
                    }) === -1
                );
            });
            //reload after multiple axios requests
            let updateData = async (deletedItem) => {
                const promises = [];
                deletedItem.forEach((item) => {
                    promises.push(
                        axios({
                            url: `${BASE_URL}/shoeShop`,
                            method: "POST",
                            data: item,
                        })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log("err: ", err);
                            })
                    );
                });
                await Promise.all(promises).then(() => {
                    alert("Reset data");
                    window.location.reload();
                });
            };
            updateData(deletedItem);
        }
        case "addShoe":
            axios({
                url: `${BASE_URL}/shoeShop`,
                method: "POST",
                data: {
                    name: payload,
                    alias: payload,
                    price: 350,
                    description:
                        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.",
                    shortDescription:
                        "The midsole contains 20% more Boost for an amplified Boost feeling.",
                    quantity: 995,
                    image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
                },
            })
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
        default:
            return state;
    }
};
