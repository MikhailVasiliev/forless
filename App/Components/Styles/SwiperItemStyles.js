import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main:{
    flex: 1,
  },
  image:{
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: Metrics.footerHeight,
  },
  articleTitle: {
    ...Fonts.style.h1,
    color: 'white',
    marginLeft: 20,
    marginBottom: 20,
  },
  articleDate: {
    color: 'white',
    marginLeft: 20
  },
})
