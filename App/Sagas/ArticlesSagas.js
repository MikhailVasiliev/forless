import { put, call } from 'redux-saga/effects'
import ArticlesActions from '../Redux/ArticlesRedux'
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

export function * sendFcmNotification (api, action) {
  const sendMessageResponse = yield call(api.sendRemote, action.article, action.topic)
  if (sendMessageResponse.status === 200) {
    console.tron.log('success')
    // yield put(AccountsActions.registerSuccess(account))
  } else {
    console.tron.log('failure')
    // yield put(AccountsActions.registerFailure(sendMessageResponse.status))
  }
}

export function * publishArticle (api, action) {
  // let data = encodeURIComponent(action.article.data)
  let content = yield call(dataToContent, action.article.cover, action.article.data)
  console.tron.log('content')
  console.tron.log(content)
  const publishArticleResponse = yield call(api.createPage, action.article.title, content)
  if (publishArticleResponse.status === 200) {

    console.tron.log('success')
    console.tron.log(publishArticleResponse)

    let sharedArticle = publishArticleResponse.data.result
    yield put(ArticlesActions.publishArticleSuccess(sharedArticle))
  } else {
    console.tron.log('failure')
  }
}

export function * publishArticleSuccess (api, action) {
  let article = action.sharedArticle
  let shareOptions = {
    title: article.title,
    message: `Советую прочесть - ${article.title}`,
    url: article.url,
    subject: 'Subject' //  for email
  };
  // let shareResult = yield call(Share.open, shareOptions)
  yield Share.open(shareOptions).catch((error) => console.tron.log(error));

  // if (shareResult.error) {
  //   console.tron.log('share error')
  //   console.tron.log('shareResult.error')
  // }
}



















//asdasd
