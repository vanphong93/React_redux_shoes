import {
    watcherAdd,
    watcherData,
    watcherDelete,
    watcherReset,
    watcherUpData,
} from "../actions/actionsSaga";
import { all } from "redux-saga/effects";
export default function* IndexSaga() {
    yield all([
        watcherData(),
        watcherDelete(),
        watcherAdd(),
        watcherReset(),
        watcherUpData(),
    ]);
}
