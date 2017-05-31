import { put, call } from 'redux-saga/effects'
import ArticlesActions from '../Redux/ArticlesRedux'
import LoginActions from '../Redux/LoginRedux'
import FirebaseDB from '../Services/FirebaseDB'
import {dataToContent} from '../Transforms/FromArticleToTelegraph'
import Share, {ShareSheet, Button} from 'react-native-share';

// External libs
import { Actions as NavigationActions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

export function * articleFetchAttempt (api, action) {
  const fetchArticleResponse = yield call(api.getPage, action.path)
  if (fetchArticleResponse.ok) {
    console.tron.log(fetchArticleResponse.data.result)
    yield put(ArticlesActions.articleFetchSuccess(fetchArticleResponse.data.result))
  } else {
    yield put(ArticlesActions.articleFetchFailure())
  }
}

export function * articleFetchSuccess (api, action) {
  console.tron.log(action)
  yield call(NavigationActions.refresh, {article: action.article})
}

export function * articleFetchFailure (api, action) {
  yield call(Toast.show, 'Failed to fetch article', { duration: 2000 })
}

export function * articlesListFetchAttempt (api, action) {
  // FirebaseDB.getAllArticles(this.setArticlesInState.bind(this))
  const fetchArticlesListResponse = yield call(FirebaseDB.fetchArticles)
  if (fetchArticlesListResponse.length > 0) {
    console.tron.log(fetchArticlesListResponse)
    yield call(NavigationActions.presentationScreen, {articles: fetchArticlesListResponse})
  }
}

export function * articlesListFetchSuccess (api, action) {
  yield call(NavigationActions.refresh, {event: action.event})
}

export function * articlesListFetchFailure (api, action) {
  yield call(Toast.show, 'Failed to fetch article', { duration: 6000 })
}

export function * sendFcmNotification (api, action) {
  const sendMessageResponse = yield call(api.sendRemote, action.article, action.topic)
  if (sendMessageResponse.status === 200) {
    console.tron.log('success')
    yield call(Toast.show, 'Push notification оправлен', { duration: 2000 })
  } else {
    console.tron.log('failure')
  }
}

export function * publishArticle (api, action) {
  // let data = encodeURIComponent(action.article.data)
  let content = yield call(dataToContent, action.article.cover, action.article.data)
  console.tron.log('content')
  console.tron.log(content)
  const publishArticleResponse = yield call(api.createPage, action.article.title, content, action.telegraphToken)
  if (publishArticleResponse.status === 200) {
    if (publishArticleResponse.data.ok){
      console.tron.log('success')
      console.tron.log(publishArticleResponse)

      let sharedArticle = publishArticleResponse.data.result
      yield put(ArticlesActions.publishArticleSuccess(sharedArticle, action.article.date))
    } else {
      yield put(ArticlesActions.publishArticleFailure(publishArticleResponse, action.article, content))
    }
  } else {
    console.tron.log('failure')
  }
}

export function * publishArticleSuccess (api, action) {
  FirebaseDB.setShareLink(action.sharedArticle.url, action.date)
  yield call(Toast.show, 'Опубликовано в Telegraph', { duration: 2000 })
}

export function * publishArticleFailure (api, action) {
  if (action.publishArticleResponse.data.error === 'ACCESS_TOKEN_INVALID'){
    yield put(LoginActions.createTelegraphAccount(action.publishArticleResponse, action.article, action.content))
  } else {
    yield call(Toast.show, action.publishArticleResponse.data.error, { duration: 6000 })
  }
}
