import { put, call } from 'redux-saga/effects'

import LoginActions from '../Redux/LoginRedux'
import Toast from 'react-native-root-toast';

export function * login ({ username, password }) {
  if (password === '') {
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    yield put(LoginActions.loginSuccess(username))
  }
}

export function * createTelegraphAccount (api, action) {
  const createAccountResponse = yield call(api.createAccount)
  if (createAccountResponse.status === 200) {
    if (createAccountResponse.data.ok){
      yield put(LoginActions.createTelegraphAccountSuccess(
        createAccountResponse.data.result.access_token,
        action.article,
        action.content))
    } else {
      yield call(Toast.show, createAccountResponse.data.error, { duration: 6000 })
    }
  } else {
    yield call(Toast.show, createAccountResponse.data.error, { duration: 6000 })
  }
}

export function * createTelegraphAccountSuccess (api, action) {

}
