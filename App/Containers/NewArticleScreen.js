// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// External libs
import Image from 'react-native-image-progress';
import LinearGradient from 'react-native-linear-gradient';
import Share, {ShareSheet, Button} from 'react-native-share';
import Toast from 'react-native-root-toast'

// Redux
import { connect } from 'react-redux'
// Libs
// Services
import FirebaseDB from '../Services/FirebaseDB'
// Styles
import styles from './Styles/ArticleScreenStyles'

class NewArticleScreen extends React.Component {

  componentWillMount() {
    // let callback = (article) => {
    //   this.setArticle(article)
    //   NavigationActions.refresh({
    //     onBack: () => {
    //       NavigationActions.popTo('presentationScreen')
    //     }
    //   })
    // }
    // FirebaseDB.getNewArticle(callback)
  }

  setArticle(article){
    console.tron.log('***********')
    console.tron.log(article)
    let that = this
    this.article = article
    that.forceUpdate()
  }

  componentDidMount(){
    try {
      this.props.blockDrawer(true)
    } catch (error) {
      console.tron.log('error - ' + error)
    }
    let callback = (article) => {
      this.setArticle(article)
      NavigationActions.refresh({
        onBack: () => {
          NavigationActions.popTo('presentationScreen')
        }
      })
    }
    FirebaseDB.getNewArticle(callback)

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredArticles !== nextProps.filteredArticles) {
      NavigationActions.presentationScreen({filteredArticles: nextProps.filteredArticles, mode: 'filtered'})
    }
  }

  render () {
    // var article = this.props.article
    let article = this.article
    if (article){
      return (
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.5)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(0, 0, 0, 0)']}
          style={styles.linearGradient}/>
        <ScrollView style={styles.main} >
          <Image style={styles.cover} source={{uri: article.cover}} />
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.dateContainer}>
            <View style={[styles.dateContainer, styles.dateContainerInner]}>
              <TouchableOpacity style={styles.themeContainer} onPress={()=>{
                this.props.filterArticles([article.theme])
              }}>
                <Text style={styles.articleTheme}>{article.theme}</Text>
              </TouchableOpacity>
              <Text style={styles.articleDate}>  •  </Text>
              <Text style={styles.articleDate}>{article.date}</Text>
            </View>
              {article.shareLink && <View style={styles.telegraphContainer}>
                <Text style={styles.articleTheme}>Telegraph</Text>
              </View>}
          </View>
          { article.data.map((element, index) => {
            if (element.pic) {
              return (<Image style={styles.image} source={{uri: element.pic}} key={index}/>)
            } else {
              if (index === article.data.length - 1){
                return (<Text style={styles.lastTextElement} key={index}>{element.text}</Text>)
              }
              return (<Text style={styles.text} key={index}>{element.text}</Text>)
            }
          }) }
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>this.publishToTelegraph()} style={styles.applyButton}>
            <Text style={styles.btnText}>Publish to Telegraph</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={
            ()=>this.publishToDB()
            // ()=>FirebaseDB.approveNewArticle(this.props.article)
          } style={styles.applyButton}>
            <Text style={styles.btnText}>Add to DB</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.sendFcmNotification()} style={styles.applyButton}>
            <Text style={styles.btnText}>Send notification</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
    } else {
      return (<View/>)
    }
  }

  sendFcmNotification(){
    let notificationTheme = this.props.allThemes.filter((theme) => {return theme.topic === this.article.topic})
    // let notificationTheme = this.props.allThemes.filter((theme) => {return theme.topic === this.props.article.topic})
    let topic = notificationTheme.length > 0 ? notificationTheme[0].topic : 'new'
    this.props.sendFcmNotification(this.article, topic)
    // this.props.sendFcmNotification(this.props.article, topic)
  }

  publishToDB(){
    // var article = this.props.article
    let article = this.article
    if (article.shareLink){
      FirebaseDB.approveNewArticle(article)
    } else {
      Toast.show('Нет ссылки для шеринга')
    }
  }

  publishToTelegraph(){
    // var article = this.props.article
    var article = this.article
    this.props.publishArticle(article, this.props.telegraphToken)
  }
}

const mapStateToProps = (state) => {
  return {
    filteredArticles: state.articles.filteredArticles,
    allThemes: state.notification.allThemes,
    telegraphToken: state.login.telegraphToken,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    filterArticles: (filter) => dispatch(ArticlesActions.filterArticles(filter)),
    sendFcmNotification: (article, topic) => dispatch(ArticlesActions.sendFcmNotification(article, topic)),
    publishArticle: (article, telegraphToken) => dispatch(ArticlesActions.publishArticle(article, telegraphToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticleScreen)
