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
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {this.login('mr.m.vasiliev@gmail.com', '111111')}}>
              <Text style={styles.loginBtnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginGoogleBtn}
              onPress={() => {this.loginGoogle()}}>
              <Text style={styles.loginGoogleBtnText}>Log in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginFbBtn}
              onPress={() => {this.login('mr.m.vasiliev@gmail.com', '111111')}}>
              <Text style={styles.loginFbBtnText}>Log in with Facebook</Text>
            </TouchableOpacity>
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
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this))
      // NavigationActions.presentationScreen()
      console.tron.log('Logged In!');
        // Navigate to the Home page
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  async loginGoogle() {
    try {

      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      console.tron.log('provider')
      console.tron.log(provider)

      // let user = await firebase.auth().currentUser
      // console.tron.log('user')
      // console.tron.log(user.getAuthResponse().id_token)

      let idToken = await firebase.auth().currentUser.getToken()
      console.tron.log('idToken')
      console.tron.log(idToken)
      //
      let credential = await provider.credential('350196186671-v2vsgllehd23v4blh97c823c6lkj4ma1.apps.googleusercontent.com')
      console.tron.log('credential')
      console.tron.log(credential)

      // let credentials = firebase.auth.GoogleAuthProvider().getCredential(idToken)
      // console.tron.log(credentials)

      await firebase.auth().signInWithCredential(credential).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
  // The signed-in user info.
        var user = result.user;
        console.tron.log('result')
        console.tron.log(result)
  // ...
      }).catch(function(error) {
  // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  // The email of the user's account used.
        var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
  // ...
        console.tron.log('error')
        console.tron.log(error)

      });

      var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.getAuthResponse().id_token);
      firebase.auth().signInWithCredential(credential)

  //

      console.tron.log('Logged In with Google!');
    } catch (error) {
      console.tron.log(error.toString())
    }
  }

  setArticlesInState (articles) {
    NavigationActions.presentationScreen({articles})
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
