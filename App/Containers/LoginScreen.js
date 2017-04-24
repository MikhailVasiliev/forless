// @flow

import React from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native'

import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import LoginActions from '../Redux/LoginRedux'
import NotificationActions from '../Redux/NotificationRedux'
// External libs
import * as firebase from 'firebase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Auth0Lock from 'react-native-lock'
var lock = new Auth0Lock({clientId: '350196186671-v2vsgllehd23v4blh97c823c6lkj4ma1.apps.googleusercontent.com', domain: 'numeric-oarlock-144410.firebaseio.com'});
// Services
import FirebaseDB from '../Services/FirebaseDB'
// Styles
import styles from './Styles/LoginScreenStyles'
import { Images, Colors } from '../Themes'


class LoginScreen extends React.Component {
  constructor () {
    super()

    this.state = {
      login: '',
      password: '',
      user: {},
      loading: false,
    }

    this.KEYS = {
      // scopes: ['email', 'profile', 'https://www.googleapis.com/auth/plus.login'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId: '350196186671-c7hi3nigtp9101q5b1cb6o2uuqh785lr.apps.googleusercontent.com', // only for iOS
      webClientId: '350196186671-ckn9u519anj4pr0f1inb4r45763cb60v.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
      // accountName: '', // [Android] specifies an account name on the device that should be used
    }
  }

  componentWillMount() {
    try {
      firebase.initializeApp({
        apiKey: 'AIzaSyAVa9_vTm7U308w4KVwpkwGvXF1xgGIT_o',
        authDomain: 'numeric-oarlock-144410.firebaseio.com',
        databaseURL: 'https://numeric-oarlock-144410.firebaseio.com',
        storageBucket: 'numeric-oarlock-144410.appspot.com'
      });
    } catch (err) {
      console.tron.log(err)
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        console.tron.log('onAuthStateChanged')
        console.tron.log(user)
        this.onLoggedIn()
      }
    })
  }

  render () {
    return (
      <View style={styles.mainOuter} >
        <Image style={styles.backgroundImage} source={Images.background3}>
          <View style={styles.main} >
            <Text style={styles.welcomeText}>Please log in</Text>
            <TextInput
              style={styles.loginInput}
              placeholder={'login'}
              autoCapitalize={'none'}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}/>
            <TextInput
              style={styles.passInput}
              placeholder={'password'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {this.login('mr.m.vasiliev@gmail.com', '111111')}}>
                <Text style={styles.loginBtnText}>Log in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginGoogleBtn}
                onPress={() => {this.loginGoogle()}}>
                <Image style={styles.loginGoogleBtnText} source={Images.g}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginFbBtn}
                onPress={() => {this.loginFacebook()}}>
                <Image style={styles.loginGoogleBtnText} source={Images.f}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginSmsBtn}
                onPress={() => {this.loginSms()}}>
                <Text style={styles.loginSmsBtnText}>SMS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
        <LoadingIndicator
          active={this.state.loading}
          text={'Logging in...'}/>
      </View>
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
      this.onLoggedIn()
      console.tron.log('Logged In!');
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  onLoggedIn(){
    this.setState({loading: true})
    FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes)
  }

  loginSms() {
    lock.show({
      connections: ['sms']
    }, (err, profile, token) => {
      console.tron.log('Logged in with sms!');
    });
  }

  loginFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((loginResult) => {
              console.tron.log('Logged in with Facebook')
              let userProfile = loginResult.providerData[0]
              console.tron.log(loginResult)

              this.props.storeUser(userProfile)
              this.onLoggedIn()
            }, (error) => {
              console.tron.log('error1')
              console.tron.log(error)
            })
          }, (error) => {
            console.tron.log('error2')
            console.tron.log(error)
          })
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
        console.tron.log(error)
      }
    );
  }

  loginGoogle() {

    try {

      GoogleSignin.hasPlayServices({ autoResolve: true })
        .then(() => {
          GoogleSignin.configure(this.KEYS)
             .then(() => {
               GoogleSignin.signIn()
                 .then((user) => {
                   console.tron.log('Logged In with Google!');
                   const credential = firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
                   firebase.auth().signInWithCredential(credential).then((loginResult) => {
                     console.tron.log('Logged in with Google')
                     let userProfile = loginResult.providerData[0]
                     console.tron.log(loginResult)

                     this.props.storeUser(userProfile)
                     this.onLoggedIn()
                   }, (error) => {
                     console.tron.log('error logging into Firebase')
                     console.tron.log(error)
                   })
                 })
                 .catch(error=>{
                   console.tron.log('Error while logging with Google');
                   console.tron.log(error);
                 })
                 .done();
             });
        })
        .catch((err) => {
          console.tron.log('Play services error - ');
          console.tron.log(err);
        })

    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  setArticlesInState (articles, themes) {
    this.props.storeArticles(articles)
    this.props.storeThemes(themes)
    this.subscribeToTopics(themes)
    this.setState({loading: false})
    NavigationActions.presentationScreen({articles})
  }

  subscribeToTopics(themes) {
    themes.map((theme) => {
      if (theme.enabled && this.props.notificationsEnabled) {
        FCM.subscribeToTopic('/topics/' + theme.topic);
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articlesListFetchAttempt: () => dispatch(ArticlesActions.articlesListFetchAttempt()),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
    storeUser: (user) => dispatch(LoginActions.storeUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
