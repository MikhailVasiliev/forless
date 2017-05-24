import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import TelegraphApi from '../Services/TelegraphApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ArticlesTypes } from '../Redux/ArticlesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { storeUser } from './LoginSagas'
import {
  articleFetchAttempt,
  articleFetchSuccess,
  articleFetchFailure,
  articlesListFetchAttempt,
  articlesListFetchSuccess,
  articlesListFetchFailure,
  sendFcmNotification,
  publishArticle,
  publishArticleSuccess
} from './ArticlesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()
const telegraphApi = TelegraphApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(ArticlesTypes.ARTICLE_FETCH_ATTEMPT, articleFetchAttempt, api),
    takeLatest(ArticlesTypes.ARTICLE_FETCH_SUCCESS, articleFetchSuccess, api),
    takeLatest(ArticlesTypes.ARTICLE_FETCH_FAILURE, articleFetchFailure, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_ATTEMPT, articlesListFetchAttempt, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_SUCCESS, articlesListFetchSuccess, api),
    takeLatest(ArticlesTypes.ARTICLES_LIST_FETCH_FAILURE, articlesListFetchFailure, api),
    takeLatest(ArticlesTypes.SEND_FCM_NOTIFICATION, sendFcmNotification, api),
    takeLatest(ArticlesTypes.PUBLISH_ARTICLE, publishArticle, telegraphApi),
    takeLatest(ArticlesTypes.PUBLISH_ARTICLE_SUCCESS, publishArticleSuccess, telegraphApi),
  ]
}
