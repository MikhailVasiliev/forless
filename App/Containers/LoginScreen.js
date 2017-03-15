// @flow

import React from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { Actions as NavigationActions } from 'react-native-router-flux'

// Redux
import { connect } from 'react-redux'

// External libs
import * as firebase from 'firebase';

// Styles
import styles from './Styles/LoginScreenStyles'

class LoginScreen extends React.Component {
  constructor () {
    super()

    this.state = {
      login: '',
      password: ''
    }
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVa9_vTm7U308w4KVwpkwGvXF1xgGIT_o',
      authDomain: 'numeric-oarlock-144410.firebaseio.com',
      databaseURL: 'https://numeric-oarlock-144410.firebaseio.com',
      storageBucket: 'numeric-oarlock-144410.appspot.com'
    });
  }


  render () {
    return (
      <View style={styles.main} >
        <Text style={styles.welcomeText}>Please log in</Text>
        <TextInput
          style={styles.loginInput}
          onChangeText={(login) => this.setState({login})}
          value={this.state.login}/>
        <TextInput
          style={styles.passInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}/>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {this.login('mr.m.vasiliev@gmail.com', '111111')}}>
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>
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
      NavigationActions.presentationScreen()
      console.tron.log('Logged In!');
        // Navigate to the Home page
    } catch (error) {
      console.tron.log(error.toString())
    }
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
