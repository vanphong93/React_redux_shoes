import { shoeSer } from "../Services/shoeServices";
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
} from "../reducer/constants/shoeConstants";
import { dataBackUp } from "../../assets/dataBackUp";
import { randomNumber } from "../../Utilities/DataInitial";

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
//CRUD
export const dataALl = () => {
    return (dispatch) => {
        shoeSer
            .getData()
            .then((res) => {
                dispatch({
                    type: GET_DATA,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const handleDelete = (shoeName, dataAllShoe) => {
    return (dispatch) => {
        let newData = [...dataAllShoe];
        let index = newData.findIndex((item) => {
            return item.name == shoeName;
        });
        let idDelete = newData[index].id;
        newData.splice(index, 1);
        shoeSer
            .deleteData(idDelete)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: DELETE_DATA,
                    payload: newData,
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    };
};
export const handleBackUp = (dataAllShoe) => {
    return (dispatch) => {
        let restData = [...dataAllShoe];
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
                dispatch({ type: BACK_UP });
            });
        };
        updateData(deletedItem);
    };
};
export const handleAddShoe = (value, des) => {
    return (dispatch) => {
        let dataPost = {
            description: des,
            name: value,
            price: randomNumber(900, 300),
        };
        shoeSer
            .createData(dataPost)
            .then((res) => {
                dispatch({
                    type: ADD_DATA,
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    };
};
export const handleUpdate = (shoeName, des, dataAllShoe) => {
    return (dispatch) => {
        let newData = [...dataAllShoe];
        let index = newData.findIndex((item) => {
            return item.name == shoeName;
        });
        let idUpdate = newData[index].id;
        let dataPost = { description: des };
        shoeSer
            .updateData(dataPost, idUpdate)
            .then((res) => {
                console.log("res: ", res);
                dispatch({ type: UPDATE_DATA });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    };
};
