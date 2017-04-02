import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
  },
  image:{
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: Metrics.footerHeight,
  },
  articleTitle: {
    ...Fonts.style.h3,
    color: 'white',
    margin: 20,
    marginBottom: Metrics.articleTitleMarginBottom
  },
  articleDate: {
    color: 'white',
    marginLeft: 20,
    fontFamily: 'Avenir Next'
  },
  themeContainer: {
    backgroundColor: Colors.skyBlue,
    justifyContent: 'center',
    height: 23,
    margin: 20,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  articleTheme: {
    ...Fonts.style.normal,
    color: 'white',
    textAlign: 'center',
    fontSize: 12
  },
})
