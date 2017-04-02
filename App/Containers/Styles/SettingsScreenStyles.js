// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  switchContainer: {
    marginTop: Metrics.navBarHeight + Metrics.statusBarHeight * 2,
    flexDirection: 'row',
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchComponent: {
    margin: 10,
  },
  switchComponentText: {
    ...Fonts.style.h5,
    marginLeft: 20,
    color: 'white'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  labelStyle: {
    flex: 1,
    color: 'white',
    fontFamily: 'Avenir Next'
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5
  }
})
