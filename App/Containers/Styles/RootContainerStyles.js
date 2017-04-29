// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  alertTitle: {
    ...Fonts.style.alertTitle,
    marginLeft: Metrics.baseMargin,
    color: 'white',
    textAlign: 'left',
  },
  alertMessage: {
    ...Fonts.style.alertMessage,
    marginLeft: Metrics.baseMargin,
    color: 'white',
    textAlign: 'left',
  },
  alertIcon: {
    marginLeft: 10,
    padding: 8,
    width: 36,
    height:
    36,
    alignSelf: 'center'
  },
})
