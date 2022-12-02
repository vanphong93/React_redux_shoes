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
export const handleDelete = (value) => {
    return {
        type: DELETE_DATA,
        payload: value,
    };
};
export const handleBackUp = () => {
    return {
        type: BACK_UP,
    };
};
export const handleAddShoe = (value, des) => {
    return {
        type: ADD_DATA,
        payload: value,
        des,
    };
};
export const handleUpdate = (value, des) => {
    return {
        type: UPDATE_DATA,
        payload: value,
        des,
    };
};
export const getDataFromAPI = (data) => ({
    type: GET_DATA,
    payload: data,
});
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
