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
    marginTop: Metrics.navBarHeight + Metrics.baseMargin,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.white,
    height: Metrics.oneLineTextInput,
    alignSelf: 'stretch',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.buttonBorder,
    borderWidth: 1,
  },
  messageInput: {
    marginTop: 0,
    margin: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    backgroundColor: Colors.white,
    height: Metrics.messageInput,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    borderRadius: Metrics.smallBorderRadius,
    borderColor: Colors.buttonBorder,
    borderWidth: 1,
  },
  sendButton: {
    width: Metrics.screenWidth - ( Metrics.baseMargin * 2 )
  }
})
