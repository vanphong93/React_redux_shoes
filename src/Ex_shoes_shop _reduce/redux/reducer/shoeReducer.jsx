import { initialization } from "../../Utilities/dataInitialization";
import {
    ADD,
    BUY,
    DATA,
    DECREASE,
    DELETE_DATA,
    DETAIL,
    INCREASE,
    REMOVE,
    RESET,
} from "../constants/shoeConstants";

let initialState = {
    detailShoe: initialization[0],
    gioHang: [],
    dataAll: initialization,
    isReset: true,
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
            alert("Okay");
            return { ...state, gioHang: newGioHang };
        }
        case DATA: {
            if (payload) {
                return { ...state, dataAll: payload, isReset: false };
            }
            return state;
        }
        case DELETE_DATA:
            return {
                ...state,
                isReset: true,
            };
        case RESET:
            return {
                ...state,
                isReset: true,
            };
        default:
            return state;
    }
};
