// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.onboardingBackground
  },
  footerButtonText: {
    ...Fonts.style.normal,
    color: 'white',
  },
  footerButtonContainer: {
    backgroundColor: Colors.mainGreenTransparent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  },
  onboardingFooter: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    left: Metrics.screenWidth / 2 - 39,
    top: Metrics.screenHeight - Metrics.footerHeight,
    height: Metrics.footerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 8,
    backgroundColor: Colors.mainGreenTransparent
  },
  activeDot: {
    backgroundColor: Colors.mainGreen
  },
})
