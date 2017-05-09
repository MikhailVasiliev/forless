import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
    alignItems: 'center'
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center'
  },
  topicInput: {
    marginTop: Metrics.navBarHeight + Metrics.statusBarHeight + Metrics.baseMargin,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: 'rgba(255,255,255, 0.10)',
    height: Metrics.oneLineTextInput,
    alignSelf: 'stretch',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.loadingIndicatorBackground,
    borderWidth: 1,
    ...Fonts.style.normal,
    color: 'white'
  },
  messageInput: {
    marginTop: 0,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: 'rgba(255,255,255, 0.10)',
    height: Metrics.messageInput,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.loadingIndicatorBackground,
    borderWidth: 1,
    ...Fonts.style.normal,
    color: 'white'
  },
  sendButton: {
    width: Metrics.screenWidth - ( Metrics.baseMargin * 2 ),
    height: Metrics.buttonHeight,
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.loadingIndicatorBackground,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  },
})
