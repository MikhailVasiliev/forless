// @flow

import React from 'react'
import { ScrollView, Text, View, ListView, TouchableOpacity } from 'react-native'
import { Images, Metrics } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// Components
import SwiperItem from '../Components/SwiperItem'

// External libs
import Image from 'react-native-image-progress';
import Swiper from 'react-native-swiper';
import * as firebase from 'firebase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

// Redux
import { connect } from 'react-redux'

// Redux
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'

class PresentationScreen extends React.Component {

  // this.login('mr.m.vasiliev@gmail.com', '111111')
  constructor (props) {
    super(props)

    this.state = {
      articles: props.articles ? props.articles : []
    }
  }

  componentWillMount() {

    if (!this.props.articles) {
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this))
    }
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyAVa9_vTm7U308w4KVwpkwGvXF1xgGIT_o',
    //   authDomain: 'numeric-oarlock-144410.firebaseio.com',
    //   databaseURL: 'https://numeric-oarlock-144410.firebaseio.com',
    //   storageBucket: 'numeric-oarlock-144410.appspot.com'
    // });
    //
    NavigationActions.refresh({onLeft: () => {
      NavigationActions.login()
    }})
  }

  componentDidMount(){
    FCM.requestPermissions(); // for iOS

    FCM.getFCMToken().then(token => {
      console.tron.log(token)
            // store fcm token in your server
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      console.tron.log('notif')
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (notif.local_notification){
              //this is a local notification
      }
      if (notif.opened_from_tray){
              //app is open/resumed because user clicked banner
      }

    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.tron.log(token)
    // fcm token may not be available on first load, catch it here
    });
  }

  setArticlesInState (articles) {
    this.setState({articles})
  }

  render () {
    let articles = this.state.articles

    if (articles.length > 0) {
      return (
        <View style={styles.main}>
          <Swiper horizontal={false}  >
            { articles.map((article, index) => {
              return (<SwiperItem article={article} key={index}/>)
            }) }
          </Swiper>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
              <Text style={styles.footerButtonText}>Read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
              <Text style={styles.footerButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (<View style={{flex: 1, backgroundColor: 'green'}}/>)
    }
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

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
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

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
