// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
  },
  image:{
    height: Metrics.screenHeight / 3,
  },
  overlay: {
    backgroundColor: Colors.overlay,
    flex: 1,
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  articleTitle: {
    ...Fonts.style.h4,
    fontSize: 23,
    margin: 20,
    marginBottom: 15,
    fontFamily: 'Avenir Next'
  },
  articleDate: {
    ...Fonts.style.normal,
    marginLeft: 20,
    fontFamily: 'Avenir Next',
    color: 'gray'
  },
  text: {
    ...Fonts.style.normal,
    margin: 20,
    marginTop: 15,
    lineHeight: 25,
    textAlign: 'justify',
    fontFamily: 'Avenir Next'
  },
})
