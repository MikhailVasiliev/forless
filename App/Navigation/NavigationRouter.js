// @flow

import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import { Images } from '../Themes'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import ArticleScreen from '../Containers/ArticleScreen'
import LoginScreen from '../Containers/LoginScreen'
import SettingsScreen from '../Containers/SettingsScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
          <Scene key="drawerChildrenWrapper"
                 navigationBarStyle={Styles.navBar}
                 leftButtonImage={Images.back}
                 backButtonImage={Images.back}
                 titleStyle={Styles.title}
                 leftButtonIconStyle={Styles.leftButton}
                 rightButtonTextStyle={Styles.rightButton}>
            <Scene key="login"
                   hideNavBar
                   type={ActionConst.REPLACE}
                   component={LoginScreen}
                   title="Login" />
            <Scene initial key="presentationScreen"
                   type={ActionConst.REPLACE}
                   component={PresentationScreen}
                   title="Feed"
                   leftButtonImage={Images.menu}
                   leftButtonIconStyle={Styles.leftButton}
                   rightButtonImage={Images.settings}
                   rightButtonIconStyle={Styles.rightButton}
                   onLeft={() => {}}
                   onRight={() => {}} />
            <Scene key="articleScreen"
                   component={ArticleScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.leftButton}
                   onLeft={() => {}} />
            <Scene key="settings"
                   title="Settings"
                   component={SettingsScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.leftButton}
                   onLeft={() => {}} />
          </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
