import { shoeArr } from "../../data";
import {
  ADD,
  BUY,
  DECREASE,
  DETAIL,
  INCREASE,
  REMOVE,
} from "./constants/shoeConstants";

let initialState = {
  shoeArr: shoeArr,
  detailShoe: shoeArr[0],
  gioHang: [],
};
export let shoeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DETAIL:
      {
        let newDetailShoe = { ...state.detailShoe };
        let i = state.shoeArr.findIndex((item) => {
          return item.id === payload.id;
        });
        newDetailShoe = shoeArr[i];
        state.detailShoe = newDetailShoe;
      }
      return { ...state };

    case ADD:
      {
        let newGioHang = [...state.gioHang];
        let i = state.gioHang.findIndex((item) => {
          return item.id === payload.id;
        });
        if (i === -1) {
          let newItem = { ...payload, soLuong: 1 };
          newGioHang.push(newItem);
        } else newGioHang[i].soLuong++;

        state.gioHang = newGioHang;
      }
      return { ...state };
    case INCREASE:
      {
        let newGioHang = [...state.gioHang];
        let i = state.gioHang.findIndex((item) => {
          return item.id === payload.id;
        });
        newGioHang[i].soLuong++;
        state.gioHang = newGioHang;
      }
      return { ...state };
    case DECREASE:
      {
        let newGioHang = [...state.gioHang];
        let i = state.gioHang.findIndex((item) => {
          return item.id === payload.id;
        });
        if (newGioHang[i].soLuong > 1) {
          newGioHang[i].soLuong--;
        }
        state.gioHang = newGioHang;
      }
      return { ...state };
    case REMOVE:
      {
        let newGioHang = [...state.gioHang];
        let i = state.gioHang.findIndex((item) => {
          return item.id === payload.id;
        });
        newGioHang.splice(i, 1);
        state.gioHang = newGioHang;
      }
      return { ...state };
    case BUY:
      {
        let newGioHang = [...state.gioHang];
        newGioHang.splice(0);
        state.gioHang = newGioHang;
      }
      alert("Chúc mừng bạn đặt hàng thành công");
      return { ...state };
    default:
      return state;
  }
};
