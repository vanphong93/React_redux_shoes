import { dataFromAPI, helloSaga } from "../actions/actionsShoe";
import { all } from "redux-saga/effects";
export default function* IndexSaga() {
    yield all([helloSaga(), dataFromAPI()]);
}
