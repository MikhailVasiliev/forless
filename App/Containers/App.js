// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../I18n/I18n' // keep before root container
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'
import codePush from 'react-native-code-push';
// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()
// production
// const codePushOptions = { updateDialog: true, deploymentKey: 'AOxdtq88esMn2G7guwIL1cCldti341a6FqYxQ', checkFrequency: codePush.CheckFrequency.ON_APP_RESUME , installMode: codePush.InstallMode.ON_NEXT_RESUME};
// staging
const codePushOptions = { updateDialog: true, deploymentKey: 'Oy-exOXIKLmgNEDZZaKjP52pmiyg41a6FqYxQ', checkFrequency: codePush.CheckFrequency.ON_APP_RESUME , installMode: codePush.InstallMode.ON_NEXT_RESUME};
/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    // codePush.sync({ deploymentKey: 'Oy-exOXIKLmgNEDZZaKjP52pmiyg41a6FqYxQ', updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default codePush(codePushOptions)(App);
