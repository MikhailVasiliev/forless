// @flow

import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 20 : 25,
  lineHeight: (Platform.OS === 'ios') ? 28 : 28,
  articleTitleMarginBottom: 20,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  },
  feedHeaderHeight: 30,
  feeditemHeight: 67.5,
  separatorHeight: 0.5,
  separatorMargin: width * 0.19,
  feedPhotoWidth: width * 0.19,
  feedPhoto: 40,
  feedIcon: 12,
  borderRadius: 20,
  footerHeight: 80,
  oneLineTextInput: 40,
  smallBorderRadius: 5,
  messageInput: height * 0.5,
  buttonHeight: 50,
  alertWidth: width * 0.73,
  alertHeight: height * 0.22,
}

export default metrics
