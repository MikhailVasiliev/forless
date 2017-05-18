import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
    alignItems: 'center'
  },
  scrollview: {
    flex: 1,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center'
  },
  bluredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  topicInput: {
    marginTop: Metrics.navBarHeight + Metrics.statusBarHeight + Metrics.baseMargin,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.textInput,
    height: Metrics.oneLineTextInput,
    width: Metrics.screenWidth - ( Metrics.baseMargin * 2 ),
    textAlignVertical: 'top',
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
    backgroundColor: Colors.textInput,
    height: Metrics.messageInput,
    width: Metrics.screenWidth - ( Metrics.baseMargin * 2 ),
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
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
  },
})
