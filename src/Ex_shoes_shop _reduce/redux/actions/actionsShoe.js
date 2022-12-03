
import {
    ADD,
    BUY,
    DECREASE,
    DETAIL,
    INCREASE,
    REMOVE,
} from "../constants/shoeConstants";
export const handleAdd = (value) => {
    return {
        type: ADD,
        payload: value,
    };
};
export const handleDetail = (value) => {
    return {
        type: DETAIL,
        payload: value,
    };
};
export const handleIncrease = (value) => {
    return {
        type: INCREASE,
        payload: value,
    };
};
export const handleDecrease = (value) => {
    return {
        type: DECREASE,
        payload: value,
    };
};
export const handleRemove = (value) => {
    return {
        type: REMOVE,
        payload: value,
    };
};
export const handleBuy = () => {
    return {
        type: BUY,
    };
};
