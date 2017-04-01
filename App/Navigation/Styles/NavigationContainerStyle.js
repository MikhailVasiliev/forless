// @flow

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
  },
  leftButton: {
    tintColor: Colors.snow,
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  rightButton: {
    color: Colors.snow
  }
}
