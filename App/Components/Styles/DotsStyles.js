import {StyleSheet, Platform} from 'react-native'
import {Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: Metrics.alertWidth,
    height: Metrics.alertHeight,
    backgroundColor: 'white',
    borderRadius: Metrics.smallBorderRadius,
  },
  infoWrapper: {
    flex: 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    borderLeftWidth: 0.5,
  },
  title: {
    ...Fonts.style.alertTitle,
    marginBottom: 9
  },
  text: {
    ...Fonts.style.alertMessage,
    fontWeight: 'normal',
    marginBottom: 4,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  btnText: {
    ...Fonts.style.alertMessage,
    // fontSize: Fonts.size.alertMessage,
    fontWeight: 'normal',
  },
  deleteBtnText: {
    color: Colors.mainGreen,
    // fontWeight: 'bold',
  },
})
