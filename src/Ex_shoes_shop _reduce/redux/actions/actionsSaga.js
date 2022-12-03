import {
    BEFORE_ADD,
    BEFORE_DATA,
    BEFORE_DELETE,
    BEFORE_RESET,
    BEFORE_UPDATE,
    DATA,
    RESET,
} from "../constants/shoeConstants";
import { call, put, takeLatest } from "redux-saga/effects";
import { randomNumber } from "../../Utilities/numberRandom";
import { dataBackUp } from "../../Utilities/dataBack";
import { shoeSer } from "../../Services/SerShoe";
import { withFetchSer } from "../../Services/SerShoeFetch";
export const fetchData = () => {
    return {
        type: BEFORE_DATA,
    };
};
function* dataFromAPI() {
    try {
        const response = yield call(() => {
            return shoeSer.getData();
            //or with fetch
            // return withFetchSer.getData();
        });
        yield put({ type: DATA, payload: response });
    } catch (error) {
        console.log(error);
    }
}
export function* watcherData() {
    yield takeLatest(BEFORE_DATA, dataFromAPI);
}
export const handleDelete = (shoeName, dataAll) => {
    // let newData = dataAll;
    // let index = newData.findIndex((item) => {
    //     return item.name == shoeName;
    // });
    // if (index === -1) {
    //     alert("name is not exits");
    //     return { type: BEFORE_DELETE };
    // }
    // let idDelete = newData[index].id;
    return {
        type: BEFORE_DELETE,
        shoeName,
        dataAll,
    };
};
function* dataDeleteAPI(action) {
    try {
        // if (!action.idDelete) {
        //     return;
        // }
        const { shoeName, dataAll } = action;
        let index = dataAll.findIndex((item) => {
            return item.name == shoeName;
        });
        if (index === -1) {
            alert("name is not exits");
            return;
        }
        let idDelete = dataAll[index].id;
        yield call(() => {
            return shoeSer.deleteData(idDelete);
            //or with fetch
            // return withFetchSer.deleteData(idDelete);
        });
        yield put({ type: RESET });
    } catch (error) {
        console.log(error);
    }
}
export function* watcherDelete() {
    yield takeLatest(BEFORE_DELETE, dataDeleteAPI);
}
export const handleAddShoe = (shoeName, des) => {
    return {
        type: BEFORE_ADD,
        shoeName,
        des,
    };
};
function* dataAddAPI(action) {
    try {
        const { shoeName, des } = action;
        const dataPost = {
            description: des,
            name: shoeName,
            image: `https://i.pravatar.cc/150?img=${randomNumber(50)}`,
            price: randomNumber(1000, 300),
        };
        yield call(() => {
            return shoeSer.createData(dataPost);
            //or with fetch
            // return withFetchSer.createData(dataPost);
        });
        yield put({ type: RESET });
    } catch (error) {
        console.log("error: ", error);
    }
}
export function* watcherAdd() {
    yield takeLatest(BEFORE_ADD, dataAddAPI);
}
export const handleBackUp = (data) => {
    return { type: BEFORE_RESET, data };
};
function* resetData(action) {
    try {
        const { data } = action;
        let deletedItem = dataBackUp.filter((itemDeleted) => {
            return (
                data.findIndex((itemRest) => {
                    return itemRest.name === itemDeleted.name;
                }) === -1
            );
        });
        yield call(() => {
            let resetAllData = async (deletedItem) => {
                const promises = [];
                deletedItem.forEach((item) => {
                    promises.push(shoeSer.createData(item));
                    //or with fetch
                    // promises.push(withFetchSer.createData(item));
                });
                await Promise.all(promises).then(() => {
                    alert("Reset data");
                });
            };
            return resetAllData(deletedItem);
        });
        yield put({ type: RESET });
    } catch (error) {
        console.log("error: ", error);
    }
}

export function* watcherReset() {
    yield takeLatest(BEFORE_RESET, resetData);
}
export const handleUpdate = (shoeName, des, dataAll) => {
    return { type: BEFORE_UPDATE, shoeName, des, dataAll };
};
function* editData(action) {
    try {
        let { dataAll, shoeName, des } = action;
        let index = dataAll.findIndex((item) => {
            return item.name == shoeName;
        });
        if (index === -1) {
            alert("name is not exits");
            return;
        }
        let idUpdate = dataAll[index].id;
        let dataPost = { description: des };
        yield call(() => {
            return shoeSer.updateData(idUpdate, dataPost);
            //or with fetch
            // return withFetchSer.updateData(idUpdate, dataPost);
        });
        yield put({ type: RESET });
    } catch (error) {
        console.log("error: ", error);
    }
}
export function* watcherUpData() {
    yield takeLatest(BEFORE_UPDATE, editData);
}
