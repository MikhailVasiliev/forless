// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
          <Scene key="drawerChildrenWrapper" navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key="presentationScreen" component={PresentationScreen} title="Ignite" />
          </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
