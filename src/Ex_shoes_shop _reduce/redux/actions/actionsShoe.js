import { call, put } from "redux-saga/effects";
import { DATA } from "../constants/shoeConstants";
export function* helloSaga() {
    console.log("Hello Sagas!");
}
async function getData() {
    try {
        const res = await fetch(
            "https://62db6ca4d1d97b9e0c4f338f.mockapi.io/shoeShop",
            {
                method: "GET",
            }
        );

        return await res.json();
    } catch (err) {
        console.log(err);
    }
}
export function* dataFromAPI() {
    try {
        const response = yield call(getData);
        yield put({ type: DATA, payload: response });
    } catch (error) {
        console.log(error);
    }
}
