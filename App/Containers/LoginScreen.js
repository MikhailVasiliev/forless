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
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import Auth0Lock from 'react-native-lock'
var lock = new Auth0Lock({clientId: '350196186671-v2vsgllehd23v4blh97c823c6lkj4ma1.apps.googleusercontent.com', domain: 'numeric-oarlock-144410.firebaseio.com'});
import * as firebase from 'firebase';

// Services
import FirebaseDB from '../Services/FirebaseDB'
// Styles
import styles from './Styles/LoginScreenStyles'
import { Images, Colors } from '../Themes'
import Toast from 'react-native-root-toast'

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
        console.tron.log(user)
        this.onLoggedIn(user.providerData[0])
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
              placeholder={'адресс эл.почты'}
              keyboardType={'email-address'}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}/>
            <TextInput
              style={styles.passInput}
              placeholder={'пароль'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  this.login(this.state.login, this.state.password)
                }}>
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
          text={'Входим в систему...'}/>
      </View>
    )
  }

  async signup(email, pass) {
    email = email.trim()
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.tron.log('Account created');
        // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      Toast.show(error.toString())
      console.tron.log(error.toString())
    }
  }

  async login(email, pass) {
    email = email.trim()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      // this.props.storeUser({email})
      this.onLoggedIn({email})
    } catch (error) {
      if (email === '' || pass === '') {
        Toast.show('Заполните оба поля')
      } else {
        Toast.show(error.toString())
      }
    }
  }

  onLoggedIn(userProfile){
    this.props.storeUser(userProfile)
    NavigationActions.presentationScreen()
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
          alert('Отмена авторизации');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((loginResult) => {
              let userProfile = loginResult.providerData[0]
              this.onLoggedIn(userProfile)
            }, (error) => {
              console.tron.log(error)
            })
          }, (error) => {
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
                   const credential = firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
                   firebase.auth().signInWithCredential(credential).then((loginResult) => {
                     let userProfile = loginResult.providerData[0]
                     this.onLoggedIn(userProfile)
                   }, (error) => {
                     console.tron.log(error)
                   })
                 })
                 .catch(error=>{
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
