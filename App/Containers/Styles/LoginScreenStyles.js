// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  mainOuter:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.overlay
  },
  backgroundImage:{
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    resizeMode: 'cover'
  },
  welcomeText: {
    ...Fonts.style.h4,
    fontSize: 23,
    margin: 20,
    color: 'white',
    marginBottom: 15,
    fontFamily: 'Avenir Next'
  },
  loginInput: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'white',
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    borderRadius: 15
  },
  passInput: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'white',
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
  },
  loginBtn: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'black',
    margin: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  loginBtnText: {
    ...Fonts.style.h4,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: 'white'
  },
  loginGoogleBtn: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: Colors.google,
    margin: 15,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  loginGoogleBtnText: {
    ...Fonts.style.h4,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: 'white'
  },
  loginFbBtn: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: Colors.facebook,
    margin: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  loginFbBtnText: {
    ...Fonts.style.h4,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: 'white'
  },
})
