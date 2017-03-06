// @flow

import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// External libs
import Image from 'react-native-image-progress';

// Redux
import { connect } from 'react-redux'
// Libs
import {articleText} from '../Lib/Constants'

// Styles
import styles from './Styles/ArticleScreenStyles'

const photoPlaceHolder = 'https://2ch.hk/b/arch/2016-03-15/src/120139891/14580644394070.png'

class ArticleScreen extends React.Component {

  render () {
    return (
      <ScrollView style={styles.main} >
        <Image style={styles.image} source={{uri: photoPlaceHolder}}>
          <View style={styles.overlay}/>
        </Image>
        <Text style={styles.articleTitle}>New Article about Forex Education</Text>
        <Text style={styles.articleDate}>Thu, Feb 17</Text>
        <Text style={styles.text}>{articleText}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.articles.currentArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
