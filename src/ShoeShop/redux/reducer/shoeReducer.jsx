import {
    ADD,
    ADD_DATA,
    BACK_UP,
    BUY,
    DECREASE,
    DELETE_DATA,
    DETAIL,
    GET_DATA,
    INCREASE,
    REMOVE,
    UPDATE_DATA,
} from "../constants/shoeConstants";
import { dataBackUp } from "../../../assets/dataBackUp";
import { randomNumber } from "../../Utilities/Utilities";
import { shoeSer } from "../../Services/shoeServices";

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
export let shoeReducer = (state = initialState, { type, payload, des }) => {
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
        case GET_DATA:
            return { ...state, dataShoes: payload };
        case DELETE_DATA: {
            let newData = [...state.dataShoes];
            let index = newData.findIndex((item) => {
                return item.name == payload;
            });
            let idDelete = newData[index].id;
            newData.splice(index, 1);
            shoeSer
                .deleteData(idDelete)
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

        case BACK_UP: {
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
                        shoeSer
                            .createData(item)
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
            return state;
        }
        case ADD_DATA: {
            let dataPost = {
                description: des,
                name: payload,
                price: randomNumber(900, 300),
            };
            shoeSer
                .createData(dataPost)
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
            return state;
        }
        case UPDATE_DATA: {
            let newData = [...state.dataShoes];
            let index = newData.findIndex((item) => {
                return item.name == payload;
            });
            let idUpdate = newData[index].id;
            let dataPost = { description: des };
            shoeSer
                .updateData(dataPost, idUpdate)
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
            return state;
        }

        default:
            return state;
    }
};
