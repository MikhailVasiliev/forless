import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
  },
  onboardingTitle: {
    ...Fonts.style.h5,
    color: 'white',
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: Colors.transparent
  },
  onboarding1Text: {
    ...Fonts.style.h5,
    color: 'white',
    marginTop: 140,
    marginLeft: Metrics.screenWidth * 0.45,
    marginRight: 50,
    textAlign: 'right',
    backgroundColor: Colors.transparent
  },
  onboarding2Text: {
    ...Fonts.style.h5,
    position: 'absolute',
    color: 'white',
    bottom: 80,
    right: 0,
    left: 0,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    backgroundColor: Colors.transparent
  },
  onboarding3Text: {
    ...Fonts.style.h5,
    position: 'absolute',
    color: 'white',
    bottom: 70,
    right: 0,
    left: 0,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    backgroundColor: Colors.transparent
  },
})
