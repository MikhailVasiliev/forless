// @flow
import {Platform} from 'react-native'
import {Colors, Metrics} from '../../Themes/'

export default {
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    height: Metrics.navBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  title: {
    color: Colors.snow,
    fontFamily: 'Avenir Next',
    ...Platform.select({
      ios: {
      },
      android: {
        marginTop: 4
      }
    })
  },
  leftButton: {
    tintColor: Colors.snow,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  backButton: {
    tintColor: Colors.snow,
    width: 30,
    height: 21,
    resizeMode: 'contain'
  },
  rightButton: {
    tintColor: Colors.snow,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
}
