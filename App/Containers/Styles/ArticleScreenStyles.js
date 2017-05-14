// @flow

import { StyleSheet } from 'react-native'
import {
  Colors,
  Metrics,
  Fonts
} from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
    paddingBottom: 15
  },
  mainContainer:{
    flex: 1
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
    ...Fonts.style.articleTitle,
    color: '#303030',
    fontSize: 28,
    margin: 20,
    marginBottom: 25,
  },
  articleDate: {
    ...Fonts.style.description,
    marginLeft: 10,
    color: 'gray'
  },
  text: {
    ...Fonts.style.normal,
    margin: 20,
    color: '#303030',
    marginTop: 15,
    marginBottom: 0,
    lineHeight: Metrics.lineHeight,
    textAlign: 'justify',
  },
  lastTextElement: {
    ...Fonts.style.normal,
    margin: 20,
    color: '#303030',
    marginTop: 15,
    marginBottom: 15,
    lineHeight: Metrics.lineHeight,
    textAlign: 'justify',
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1
  },
  themeContainer: {
    backgroundColor: Colors.skyBlue,
    justifyContent: 'center',
    height: 23,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  articleTheme: {
    ...Fonts.style.normal,
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  },
  applyButton: {
    backgroundColor: Colors.skyBlue,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    marginHorizontal: 1,
    width: Metrics.screenWidth / 2
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 36,
    right: 70,
    width: 30,
    height: 30,
    zIndex: 11
  },
  backIconContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 22,
    height: 22,
    zIndex: 11
  },
  shareIconContainer: {
    position: 'absolute',
    top: 36,
    right: 20,
    width: 30,
    height: 30,
    zIndex: 11
  },
  icon:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  backIcon:{
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
})
