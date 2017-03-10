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

// Redux
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PresentationScreenStyles'

class PresentationScreen extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVa9_vTm7U308w4KVwpkwGvXF1xgGIT_o',
      authDomain: 'numeric-oarlock-144410.firebaseio.com',
      databaseURL: 'https://numeric-oarlock-144410.firebaseio.com',
      storageBucket: 'numeric-oarlock-144410.appspot.com'
    });

    NavigationActions.refresh({onLeft: () => {
      console.tron.log('onLeft'),
      this.login('mr.m.vasiliev@gmail.com', '111111')
    } })
  }

  render () {
    return (
      <View style={styles.main}>
        <Swiper horizontal={false}  >
          <SwiperItem/>
          <SwiperItem/>
          <SwiperItem/>
          <SwiperItem/>
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
    article: state.articles.currentArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
