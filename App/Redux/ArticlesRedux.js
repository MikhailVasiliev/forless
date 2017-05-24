// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Fabric from 'react-native-fabric';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  articleFetchAttempt: ['path'],
  articleFetchSuccess: ['article'],
  articleFetchFailure: ['error'],
  articlesListFetchAttempt: null,
  articlesListFetchSuccess: ['article'],
  articlesListFetchFailure: ['error'],
  sendFcmNotification: ['article', 'topic'],
  storeArticles: ['articles'],
  filterArticles: ['filter'],
  addArticleToFavorite: ['article'],
  removeArticleFromFavorite: ['article'],
  publishArticle: ['article'],
  publishArticleSuccess: ['sharedArticle'],
})

export const ArticlesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  currentArticle: {test: 'test'},
  fetching: false,
  filter: 'all',
  filteredArticles: [],
  markedArticles: [],
  sharedArticles: [],
})

/* ------------- Reducers ------------- */

export const articleFetchAttempt = (state) => state.merge({ fetching: true })

export const articleFetchSuccess = (state, { article }) => {
  return state.merge({ currentArticle: article, fetching: false })
}

export const articleFetchFailure = (state, {error}) =>
  state

export const articlesListFetchAttempt = (state) => state

export const articlesListFetchSuccess = (state) =>
  state

export const sendFcmNotification = (state, {article, topic}) =>
  state

export const publishArticle = (state, {article}) =>
  state

export const publishArticleSuccess = (state, {sharedArticle}) => {
  let articles = state.sharedArticles
  articles = articles.concat(sharedArticle)
  return state.merge({ sharedArticles: articles })
}

export const articlesListFetchFailure = (state, {error}) =>
  state

export const storeArticles = (state, { articles }) => {
  return state.merge({ data: articles })
}

export const filterArticles = (state, { filter }) => {
  let articles = state.data.asMutable()

  let filteredArticles = articles.filter(function(article) {

    return filter.some((filterItem)=>{
      return filterItem === article.theme
    })
  });

  return state.merge({ filter: Immutable(filter), filteredArticles: Immutable(filteredArticles) })
}

export const addArticleToFavorite = (state, { article }) => {
  Fabric.Answers.logCustom('Add article to favorites', {article: article.title});
  let articles = state.markedArticles
  articles = articles.concat(article)
  return state.merge({ markedArticles: articles })
}

export const removeArticleFromFavorite = (state, { article }) => {
  Fabric.Answers.logCustom('remove article from favorites', {article: article.title});
  var articleIndex
  let articles = state.markedArticles.asMutable()
  articles.map((arrayElement, index)=>{
    if (arrayElement.title === article.title) {
      articleIndex = index
    }
  })
  articles.splice(articleIndex, 1)
  return state.merge({ markedArticles: Immutable(articles) })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ARTICLE_FETCH_ATTEMPT]: articleFetchAttempt,
  [Types.ARTICLE_FETCH_SUCCESS]: articleFetchSuccess,
  [Types.ARTICLE_FETCH_FAILURE]: articleFetchFailure,
  [Types.ARTICLES_LIST_FETCH_ATTEMPT]: articlesListFetchAttempt,
  [Types.ARTICLES_LIST_FETCH_SUCCESS]: articlesListFetchSuccess,
  [Types.ARTICLES_LIST_FETCH_FAILURE]: articlesListFetchFailure,
  [Types.STORE_ARTICLES]: storeArticles,
  [Types.FILTER_ARTICLES]: filterArticles,
  [Types.SEND_FCM_NOTIFICATION]: sendFcmNotification,
  [Types.ADD_ARTICLE_TO_FAVORITE]: addArticleToFavorite,
  [Types.REMOVE_ARTICLE_FROM_FAVORITE]: removeArticleFromFavorite,
  [Types.PUBLISH_ARTICLE]: publishArticle,
  [Types.PUBLISH_ARTICLE_SUCCESS]: publishArticleSuccess,
})
