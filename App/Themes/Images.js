// @flow
import {Platform} from 'react-native'
// leave off @2x/@3x
const images = {
  clearLogo: require('../Images/top_logo.png'),
  menu: require('../Images/menu.png'),
  background: require('../Images/background.jpg'),
  background2: require('../Images/background2.jpg'),
  background3: require('../Images/background3.jpg'),
  g: require('../Images/g.png'),
  f: require('../Images/f.png'),
  back: require('../Images/back.png'),
  settings: require('../Images/settings.png'),
  share: require('../Images/share.png'),
  face: require('../Images/noavatar.png'),
  marked: require('../Images/marked.png'),
  unmarked: require('../Images/unmarked.png'),
  star: require('../Images/star.png'),
  letter: require('../Images/letter.png'),
  logout: require('../Images/logout.png'),
  notifIcon: require('../Images/notifIcon.png'),
  ...Platform.select({
    ios: {
      onboarding1: require('../Images/onboarding1ios.png'),
      onboarding2: require('../Images/onboarding2ios.png'),
      onboarding3: require('../Images/onboarding3ios.png'),
    },
    android: {
      onboarding1: require('../Images/onboarding1android.png'),
      onboarding2: require('../Images/onboarding2android.png'),
      onboarding3: require('../Images/onboarding3android.png'),
    }
  })
}

export default images
