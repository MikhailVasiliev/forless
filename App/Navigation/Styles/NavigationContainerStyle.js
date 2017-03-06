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
    paddingTop: 10,
  },
  title: {
    color: Colors.snow
  },
  leftButton: {
    tintColor: Colors.snow,
    width: 30,
    height: 30
  },
  rightButton: {
    color: Colors.snow
  }
}
