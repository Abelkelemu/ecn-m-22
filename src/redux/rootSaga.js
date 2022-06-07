import {all, call} from 'redux-saga/effects';
import userSagas from './User/user.sagas';
import imagesSagas from './Images/images.sagas';

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(imagesSagas)
    ])
}