// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  footerButtonText: {
    color: 'white',
    margin: 20,
    fontFamily: 'Avenir Next'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: Metrics.footerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
})
