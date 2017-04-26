// @flow

import React from 'react'
import { Text, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Components
import SwiperItem from '../Components/SwiperItem'
import LoadingIndicator from '../Components/LoadingIndicator'

// External libs
import Swiper from 'react-native-swiper';
import * as firebase from 'firebase';
import FCM from 'react-native-fcm';

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'

// Redux
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'
import { Colors } from '../Themes'

class PresentationScreen extends React.Component {

  // this.login('mr.m.vasiliev@gmail.com', '111111')
  constructor (props) {
    super(props)

    this.state = {
      articles: props.articles ? props.articles : []
    }
  }

  componentWillMount() {
    NavigationActions.refresh({
      onLeft: () => {
        NavigationActions.login()
      },
      onRight: () => {
        NavigationActions.settings()
      },
    })
  }

  componentDidMount(){
    FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes, this.props.articles)
  }

  setArticlesInState (articles, themes) {
    this.props.storeArticles(articles)
    this.props.storeThemes(themes)
    this.subscribeToTopics(themes)
  }

  subscribeToTopics(themes) {
    themes.map((theme) => {
      if (theme.enabled && this.props.notificationsEnabled) {
        FCM.subscribeToTopic('/topics/' + theme.topic);
      }
    })
  }

  render () {
    let articles = this.props.filteredArticles ? this.props.filteredArticles : this.props.articles

    if (articles.length > 0) {
      return (
        <View style={styles.main}>
          <Swiper horizontal={false}
                   activeDotColor={Colors.skyBlue}
                   dot={this.renderDot('rgba(0, 0, 0, 0.2)')}
                   activeDot={this.renderDot(Colors.skyBlue)}
                   showsButtons={true}
                   buttonWrapperStyle={styles.footer}
                   nextButton={this.renderFooterButton('След. >')}
                   prevButton={this.renderFooterButton('< Назад')}
                   >
            { articles.map((article, index) => {
              return (<SwiperItem article={article} key={index}/>)
            }) }
          </Swiper>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <LoadingIndicator
            active={true}
            text={'Идет синхронизация с сервером...'}/>
        </View>
      )
    }
  }

  renderFooterButton(text){
    return (
          <Text style={styles.footerButtonText}>{text}</Text>
    )
  }

  renderDot(color) {
    return (
      <View style={{
        backgroundColor: color,
        width: 6,
        height: 6,
        borderRadius: 2,
        margin: 2,
      }}/>
    )
  }

  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.tron.log('Account created');
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  async login(email, pass) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      console.tron.log('Logged In!');
        // Navigate to the Home page
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
        // Navigate to login view
    } catch (error) {
      console.tron.log(error);
    }
  }

}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    articlesListFetchAttempt: () => dispatch(ArticlesActions.articlesListFetchAttempt()),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
