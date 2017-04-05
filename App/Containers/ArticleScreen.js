// @flow

import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// External libs
import Image from 'react-native-image-progress';

// Redux
import { connect } from 'react-redux'
// Libs
// Styles
import styles from './Styles/ArticleScreenStyles'

class ArticleScreen extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredArticles !== nextProps.filteredArticles) {
      NavigationActions.presentationScreen({filteredArticles: nextProps.filteredArticles})
    }
  }

  render () {
    var article = this.props.article
    return (
      <ScrollView style={styles.main} >
        <Image style={styles.cover} source={{uri: article.cover}}>
          <View style={styles.overlay}/>
        </Image>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.themeContainer} onPress={()=>{
            this.props.filterArticles([article.theme])
          }}>
            <Text style={styles.articleTheme}>{article.theme}</Text>
          </TouchableOpacity>
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
    filteredArticles: state.articles.filteredArticles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    filterArticles: (filter) => dispatch(ArticlesActions.filterArticles(filter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
