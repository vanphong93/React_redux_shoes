import { initialization } from "../../Utilities/DataInitial";
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
} from "./constants/shoeConstants";
let initialState = {
    dataAllShoe: [],
    detailShoe: initialization[0],
    gioHang: [],
    isChanged: 1,
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
        case GET_DATA: {
            console.log(payload);
            return { ...state, dataAllShoe: payload };
        }
        case DELETE_DATA:
            return {
                ...state,
                dataAllShoe: payload,
            };
        case BACK_UP: {
            let newData = state.isChanged;
            newData++;
            return { ...state, isChanged: newData };
        }

        case ADD_DATA: {
            let newData = state.isChanged;
            newData++;
            return { ...state, isChanged: newData };
        }
        case UPDATE_DATA: {
            let newData = state.isChanged;
            newData++;
            return { ...state, isChanged: newData };
        }
        default:
            return state;
    }
};
