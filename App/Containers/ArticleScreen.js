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
    var article = this.props.article
    return (
      <ScrollView style={styles.main} >
        <Image style={styles.cover} source={{uri: article.cover}}>
          <View style={styles.overlay}/>
        </Image>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <View style={styles.dateContainer}>
          <View style={styles.themeContainer}>
            <Text style={styles.articleTheme}>{article.theme}</Text>
          </View>
          <Text style={styles.articleDate}>•</Text>
          <Text style={styles.articleDate}>{article.date}</Text>
        </View>
        { article.data.map((element, index) => {
          if (element.pic) {
            return (<Image style={styles.image} source={{uri: element.pic}} key={index}/>)
          } else {
            return (<Text style={styles.text} key={index}>  {element.text}</Text>)
          }
        }) }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
