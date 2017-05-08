import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topicInput: {
    marginTop: Metrics.navBarHeight + Metrics.statusBarHeight,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.loadingIndicatorBackground,
    height: Metrics.oneLineTextInput,
    alignSelf: 'stretch',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.loadingIndicatorBackground,
    borderWidth: 1,
  },
  messageInput: {
    marginTop: 0,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.loadingIndicatorBackground,
    height: Metrics.messageInput,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.loadingIndicatorBackground,
    borderWidth: 1,
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
