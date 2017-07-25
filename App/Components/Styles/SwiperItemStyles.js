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
    ...Fonts.style.articleTitle,
    color: 'white',
    margin: 20,
    marginBottom: Metrics.articleTitleMarginBottom
  },
  articleDate: {
    ...Fonts.style.normal,
    color: 'white',
    marginLeft: 20,
  },
  themeContainer: {
    backgroundColor: Colors.mainGreen,
    justifyContent: 'center',
    height: 23,
    margin: 20,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 15
  },
  articleTheme: {
    ...Fonts.style.normal,
    color: 'white',
    textAlign: 'center',
    fontSize: 14
  },

  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    overflow: 'hidden'
  },
  image2: {
    flex: 1,
    width: null,
    height: null
  }
})
