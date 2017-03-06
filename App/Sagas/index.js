import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ArticlesTypes } from '../Redux/ArticlesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import {
  articleFetchAttempt,
  articleFetchSuccess,
  articleFetchFailure,
  articlesListFetchAttempt,
  articlesListFetchSuccess,
  articlesListFetchFailure
} from './ArticlesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(ArticlesTypes.ARTICLE_FETCH_ATTEMPT, articleFetchAttempt, api),
    takeLatest(ArticlesTypes.ARTICLE_FETCH_SUCCESS, articleFetchSuccess, api),
    takeLatest(ArticlesTypes.ARTICLE_FETCH_FAILURE, articleFetchFailure, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_ATTEMPT, articlesListFetchAttempt, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_SUCCESS, articlesListFetchSuccess, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_FAILURE, articlesListFetchFailure, api),
  ]
}
