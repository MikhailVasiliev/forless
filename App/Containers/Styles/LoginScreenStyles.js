// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  welcomeText: {
    ...Fonts.style.h4,
    fontSize: 23,
    margin: 20,
    marginBottom: 15,
    fontFamily: 'Avenir Next'
  },
  loginInput: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    margin: 15,
  },
  passInput: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    margin: 15,
  },
  loginBtn: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'black',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    ...Fonts.style.h4,
    fontSize: 23,
    fontFamily: 'Avenir Next',
    color: 'white'
  },
})
