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

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'
// External libs
import * as firebase from 'firebase';
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
      password: ''
    }

    this.KEYS = {
      scopes: ['https://www.googleapis.com/auth/plus.login'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
      webClientId: '350196186671-smt2gvh2gc92d9q7ge5q3t3a74qusm56.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
      accountName: '', // [Android] specifies an account name on the device that should be used
      hostedDomain: 'numeric-oarlock-144410.firebaseapp.com' // [Android] specifies a hosted domain restriction
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
                onPress={() => {this.login('mr.m.vasiliev@gmail.com', '111111')}}>
                <Image style={styles.loginGoogleBtnText} source={Images.f}/>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
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
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes)
      // NavigationActions.presentationScreen()
      console.tron.log('Logged In!');
        // Navigate to the Home page
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  onGoogleLoginSuccess(user) {
    var token = user.idToken;
    var provider = firebase.auth.GoogleAuthProvider;
    var credential = provider.credential('350196186671-v2vsgllehd23v4blh97c823c6lkj4ma1.apps.googleusercontent.com');
    firebase.auth().signInWithCredential(credential)
      .then((data)=>console.tron.log('SUCCESS', data))
      .catch((error)=>{console.tron.log('ERROR'), console.tron.log(error)});
  }

  async loginGoogle() {

    // try {
    //
    //   GoogleSignin.hasPlayServices({ autoResolve: true })
    //     .then(() => {
    //       GoogleSignin.configure(this.KEYS)
    //          .then(() => {
    //            GoogleSignin.signIn()
    //              .then((user) => {this.onGoogleLoginSuccess(user)})
    //              .catch(error=>{})
    //              .done();
    //          });
    //     })
    //     .catch((err) => {
    //       console.log('Play services error', err.code, err.message);
    //     })
    //
    //   console.tron.log('Logged In with Google!');
    // } catch (error) {
    //   console.tron.log(error.toString())
    // }
  }

  setArticlesInState (articles, themes) {
    this.props.storeArticles(articles)
    this.props.storeThemes(themes)
    NavigationActions.presentationScreen({articles})
  }
}

const mapStateToProps = (state) => {
  return {
    allThemes: state.notification.allThemes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articlesListFetchAttempt: () => dispatch(ArticlesActions.articlesListFetchAttempt()),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
