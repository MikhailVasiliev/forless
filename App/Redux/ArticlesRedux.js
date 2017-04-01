// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  articleFetchAttempt: ['path'],
  articleFetchSuccess: ['article'],
  articleFetchFailure: ['error'],
  articlesListFetchAttempt: null,
  articlesListFetchSuccess: ['article'],
  articlesListFetchFailure: ['error'],
  storeArticles: ['articles'],
  filterArticles: ['filter'],
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
})
