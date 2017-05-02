// @flow

import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// External libs
import Image from 'react-native-image-progress';
import LinearGradient from 'react-native-linear-gradient';
import Share, {ShareSheet, Button} from 'react-native-share';
// Redux
import { connect } from 'react-redux'
// Libs
// Services
import FirebaseDB from '../Services/FirebaseDB'
// Styles
import styles from './Styles/ArticleScreenStyles'

class NewArticleScreen extends React.Component {

  componentWillMount() {
    NavigationActions.refresh({
      onBack: () => {
        NavigationActions.popTo('presentationScreen')
      }
    })
  }

  onShare(){
    var article = this.props.article

    let shareOptions = {
      title: article.title,
      message: 'Советую прочесть - "' + article.title + '"',
      url: article.cover,
      subject: 'Subject' //  for email
    };
    Share.open(shareOptions).catch((error) => console.tron.log(error));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredArticles !== nextProps.filteredArticles) {
      NavigationActions.presentationScreen({filteredArticles: nextProps.filteredArticles})
    }
  }

  render () {
    var article = this.props.article
    return (
      <View style={{flex: 1}}>
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
            <TouchableOpacity style={styles.themeContainer} onPress={()=>{
              this.props.filterArticles([article.theme])
            }}>
              <Text style={styles.articleTheme}>{article.theme}</Text>
            </TouchableOpacity>
            <Text style={styles.articleDate}>  •  </Text>
            <Text style={styles.articleDate}>{article.date}</Text>
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
          <TouchableOpacity onPress={()=>FirebaseDB.approveNewArticle(this.props.article)} style={styles.applyButton}>
            <Text style={styles.btnText}>PUBLISH ARTICLE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.sendFcmNotification()} style={styles.applyButton}>
            <Text style={styles.btnText}>SEND NOTIFICATION</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  sendFcmNotification(){
    let notificationTheme = this.props.allThemes.filter((theme) => {return theme.topic === this.props.article.topic})
    let topic = notificationTheme.length > 0 ? notificationTheme[0].topic : 'new'
    this.props.sendFcmNotification(this.props.article, topic)
  }
}

const mapStateToProps = (state) => {
  return {
    filteredArticles: state.articles.filteredArticles,
    allThemes: state.notification.allThemes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    filterArticles: (filter) => dispatch(ArticlesActions.filterArticles(filter)),
    sendFcmNotification: (article, topic) => dispatch(ArticlesActions.sendFcmNotification(article, topic)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticleScreen)
