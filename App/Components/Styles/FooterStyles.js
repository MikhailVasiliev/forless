import {StyleSheet, Platform} from 'react-native'
import {Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    left: 20,
    top: Metrics.screenHeight - Metrics.footerHeight,
    height: Metrics.footerHeight,
    width: Metrics.screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  footerButtonRead: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
  },
  footerButtonText: {
    ...Fonts.style.alertMessage,
    color: 'white',
    margin: 20,
  },
  footerNumberText: {
    ...Fonts.style.alertMessage,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    margin: 20,
  }
})
