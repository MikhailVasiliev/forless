// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
    paddingBottom: 15
  },
  cover:{
    height: Metrics.screenHeight / 3,
    resizeMode: 'cover'
  },
  image:{
    height: Metrics.screenHeight / 3,
    resizeMode: 'cover',
    marginTop: 15,
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
  },
  articleDate: {
    ...Fonts.style.description,
    marginLeft: 20,
    color: 'gray'
  },
  text: {
    ...Fonts.style.normal,
    margin: 20,
    marginTop: 15,
    marginBottom: 0,
    lineHeight: 25,
    textAlign: 'justify',
  },
})
