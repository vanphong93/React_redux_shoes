import { ADD, BUY, DECREASE, INCREASE, REMOVE } from "./constant";

export const CardReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD: {
            let newData = [...state.itemCart];
            let index = newData.findIndex((item) => item.id === payload.id);
            if (index === -1) {
                newData.push({ ...payload, quantityBuy: 1 });
            } else {
                newData[index].quantityBuy++;
            }

            return {
                ...state,
                itemCart: newData,
            };
        }
        case INCREASE: {
            let newData = [...state.itemCart];
            let i = newData.findIndex((item) => {
                return item.id === payload.id;
            });
            newData[i].quantityBuy++;
            return { ...state, itemCart: newData };
        }
        case DECREASE: {
            let newData = [...state.itemCart];
            let i = newData.findIndex((item) => {
                return item.id === payload.id;
            });
            if (newData[i].quantityBuy > 1) {
                newData[i].quantityBuy--;
            }
            return { ...state, itemCart: newData };
        }
        case REMOVE: {
            let newData = [...state.itemCart];
            let i = newData.findIndex((item) => {
                return item.id === payload.id;
            });
            newData.splice(i, 1);
            return { ...state, itemCart: newData };
        }

        case BUY: {
            let newData = [...state.itemCart];
            newData.splice(0);
            alert("Chúc mừng bạn đặt hàng thành công");
            return { ...state, itemCart: newData };
        }

        default:
            return state;
    }
};
