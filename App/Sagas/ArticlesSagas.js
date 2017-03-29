import { put, call } from 'redux-saga/effects'
import ArticlesActions from '../Redux/ArticlesRedux'
import FirebaseDB from '../Services/FirebaseDB'

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
  yield call(Toast.show, 'Failed to fetch article', { duration: 6000 })
}

export function * articlesListFetchAttempt (api, action) {
  // FirebaseDB.getAllArticles(this.setArticlesInState.bind(this))
  const fetchArticlesListResponse = yield call(FirebaseDB.fetchArticles)
  if (fetchArticlesListResponse.length > 0) {
    console.tron.log(fetchArticlesListResponse)
    yield call(NavigationActions.presentationScreen, {articles: fetchArticlesListResponse})
  //   yield put(ArticlesActions.articlesListFetchSuccess(fetchArticlesListResponse.result))
  // } else {
  //   yield put(ArticlesActions.articlesListFetchFailure())
  }
}

export function * articlesListFetchSuccess (api, action) {
  yield call(NavigationActions.refresh, {event: action.event})
}

export function * articlesListFetchFailure (api, action) {
  yield call(Toast.show, 'Failed to fetch article', { duration: 6000 })
}
