// @flow

import React from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native'

import { Actions as NavigationActions } from 'react-native-router-flux'
import LoadingIndicator from '../Components/LoadingIndicator'
// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'
// External libs
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
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
      passwordRepeat: '',
      form: 'login',
      loading: false,
    }

    this.KEYS = {
      scopes: ['https://www.googleapis.com/auth/plus.login'],
      iosClientId: '350196186671-c7hi3nigtp9101q5b1cb6o2uuqh785lr.apps.googleusercontent.com', // only for iOS
      webClientId: '350196186671-ckn9u519anj4pr0f1inb4r45763cb60v.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // clientId: '103291085862809761902',
      // webClientId: '982814521811-njdvtmlbu9r3nkv1vbhtdrdn76ma9iej.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    }
  }

  componentDidMount(){
    this.props.blockDrawer(true)
  }

  render () {
    let loginText = this.state.form === 'login' ? 'Вход' : 'Создать'
    let createAccountText = this.state.form === 'login' ? 'Еще нет аккаунта? Создайте новый' : 'Вернуться к предыдущей форме'
    return (
      <KeyboardAvoidingView style={styles.mainOuter} behavior="padding" >
        <Image style={styles.backgroundImage} source={Images.background3}>
          <View style={styles.main} >
            {this.state.form === 'login' && <Text style={styles.welcomeText}>Войти в аккаунт</Text>}
            {this.state.form === 'signup' && <Text style={styles.welcomeText}>Создайте аккаунт</Text>}
            <TextInput
              style={styles.loginInput}
              placeholder={'адрес эл.почты'}
              placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
              keyboardType={'email-address'}
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}/>
            <TextInput
              style={styles.passInput}
              placeholder={'пароль'}
              placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            {this.state.form === 'signup' && <TextInput
              style={styles.passInput}
              placeholder={'повторите пароль'}
              placeholderTextColor={'rgba(255, 255, 255, 0.4)'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              autoCorrect={false}
              underlineColorAndroid={Colors.transparent}
              onChangeText={(passwordRepeat) => this.setState({passwordRepeat})}
              value={this.state.passwordRepeat}/>}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  this.handleActionButton()
                }}>
                <Text style={styles.loginBtnText}>{loginText}</Text>
              </TouchableOpacity>
              {this.state.form === 'login' && <TouchableOpacity
                style={styles.loginGoogleBtn}
                onPress={() => {this.loginGoogle()}}>
                <Image style={styles.loginGoogleBtnText} source={Images.g}/>
              </TouchableOpacity>}
              {this.state.form === 'login' && <TouchableOpacity
                style={styles.loginFbBtn}
                onPress={() => {this.loginFacebook()}}>
                <Image style={styles.loginGoogleBtnText} source={Images.f}/>
              </TouchableOpacity>}
              {/*<TouchableOpacity
                style={styles.loginSmsBtn}
                onPress={() => {this.loginSms()}}>
                <Text style={styles.loginSmsBtnText}>SMS</Text>
              </TouchableOpacity>*/}
            </View>
            <TouchableOpacity style={styles.createAccountButton} onPress={()=> this.openSighUpForm()}>
              <Text style={styles.createAccountText}>{createAccountText}</Text>
            </TouchableOpacity>
          </View>
        </Image>
        <LoadingIndicator
          active={this.state.loading}
          />
      </KeyboardAvoidingView>
    )
  }

  // Входим в систему...

  handleActionButton(){
    this.state.form === 'login'
      ? this.login(this.state.login, this.state.password)
      : this.signup()
  }

  openSighUpForm(){
    if (this.state.form === 'login'){
      this.setState({form: 'signup'})
    } else {
      this.setState({form: 'login'})
    }
  }

  async signup() {
    let email = this.state.login
    let password = this.state.password
    let passwordRepeat = this.state.passwordRepeat
    email = email.trim()
    if (password === passwordRepeat){
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.setState({form: 'login'})
      } catch (error) {
        if (email === '' || password === '' || password === '') {
          Toast.show('Заполните все поля')
        } else {
          Toast.show(error.toString(), {duration: Toast.durations.LONG})
        }
      }
    } else {
      Toast.show('Пароли должны совпадать')
    }
  }

  async login(email, pass) {
    email = email.trim()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
      this.onLoggedIn({email})
    } catch (error) {
      if (email === '' || pass === '') {
        Toast.show('Заполните оба поля')
      } else {
        Toast.show(error.toString(), {duration: Toast.durations.LONG})
      }
    }
  }

  onLoggedIn(userProfile){
    FirebaseDB.checkForUser(
      () => {console.tron.log('checkForUser - no user'), this.props.storeUser(null)},
      (user) => {
        this.props.storeUser(user.providerData[0])
        console.tron.log('isInitialLaunch - ' + this.props.isInitialLaunch)
        if (this.props.isInitialLaunch){
          NavigationActions.onboarding()
        } else {
          NavigationActions.presentationScreen({mode: 'feed'})
        }
      }
    )
  }

  async loginSms() {
    // 'recaptcha-container' is the ID of an element in the DOM.
    console.tron.log('before applicationVerifier')
    var applicationVerifier = new firebase.auth().RecaptchaVerifier('recaptcha-container');
    console.tron.log('applicationVerifier')
    console.tron.log(applicationVerifier)
    firebase.auth().signInWithPhoneNumber('+380930600342', applicationVerifier)
    .then(function(confirmationResult) {
      console.tron.log(confirmationResult);
      var verificationCode = window.prompt('Please enter the verification ' +
          'code that was sent to your mobile device.');
      return confirmationResult.confirm(verificationCode);
    })
    .catch(function(error) {
      console.tron.log(error);
      // Handle Errors here.
    });
    console.tron.log('Logged in with sms!');
  }

  loginFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        console.tron.log('result - ')
        console.tron.log(result)
        if (result.isCancelled) {
          Toast.show('Отмена авторизации', {duration: Toast.durations.LONG})
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
            firebase.auth().signInWithCredential(credential).then((loginResult) => {
              let userProfile = loginResult.providerData[0]
              this.onLoggedIn(userProfile)
            }, (error) => {
              Toast.show(error.message, {duration: Toast.durations.LONG})
              console.tron.log(error)
            })
          }, (error) => {
            Toast.show(error.message, {duration: Toast.durations.LONG})
            console.tron.log(error)
          })
        }
      },
      function(error) {
        Toast.show('Login fail with error: ' + error, {duration: Toast.durations.LONG})
        console.tron.log(error)
      }
    );
  }

  loginGoogle() {
    this.setState({loading: true})
    try {
      GoogleSignin.hasPlayServices({ autoResolve: true })
        .then(() => {
          GoogleSignin.configure(this.KEYS)
             .then(() => {
               console.tron.log('configure')
               GoogleSignin.signIn()
                 .then((user) => {
                   console.tron.log('user - ')
                   console.tron.log(user)
                   const credential = firebase.auth.GoogleAuthProvider.credential(null, user.accessToken)
                   firebase.auth().signInWithCredential(credential).then((loginResult) => {
                     let userProfile = loginResult.providerData[0]
                     this.setState({loading: false})
                     this.onLoggedIn(userProfile)
                   }, (error) => {
                     this.setState({loading: false})
                     console.tron.log(error)
                     Toast.show(error.message, {duration: Toast.durations.LONG})
                   })
                 })
                 .catch(error=>{
                   this.setState({loading: false})
                   console.tron.log(error);
                   Toast.show(error.message, {duration: Toast.durations.LONG})
                 })
                 .done();
             });
        })
        .catch((err) => {
          Toast.show(err.message, {duration: Toast.durations.LONG})

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
    isInitialLaunch: state.articles.isInitialLaunch,
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
