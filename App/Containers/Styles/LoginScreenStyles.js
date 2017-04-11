// @flow

import { StyleSheet } from 'react-native'
import {
  Colors,
  Metrics,
  Fonts,
  ApplicationStyles
} from '../../Themes/'

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
  },
  loginInput: {
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'white',
    margin: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    borderRadius: 20,
    fontFamily: 'Avenir Next Regular'
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
    borderRadius: 20,
    fontFamily: 'Avenir Next Regular'
  },
  loginBtn: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white'
  },
  loginBtnText: {
    ...Fonts.style.h4,
    fontSize: 18,
    color: 'white'
  },
  loginGoogleBtn: {
    height: 40,
    width: 40,
    backgroundColor: Colors.transparent,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white'
  },
  loginGoogleBtnText: {
    width: 20,
    height: 20,
    tintColor: 'white'
  },
  loginFbBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white'
  },
  loginFbBtnText: {
    width: 20,
    height: 20,
    tintColor: 'white'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
})
