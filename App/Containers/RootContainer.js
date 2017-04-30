// @flow

import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'

// External libs
import DropdownAlert from 'react-native-dropdownalert'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Actions as NavigationActions } from 'react-native-router-flux'

class RootContainer extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    FCM.requestPermissions(); // for iOS

    FCM.getFCMToken().then(token => {
      console.log(token)
    });

    FCM.getInitialNotification().then( notif => {console.tron.log('getInitialNotification'); console.tron.log(notif) } );

    this.notificationListener = FCM.on(FCMEvent.Notification,  notif => {
      console.tron.log('notif')
      console.tron.log(notif)

      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      if (!notif.opened_from_tray){
        //this is a local notification
        Platform.OS === 'ios' ? this.dropdown.alertWithType('info', notif.notification.title, notif.articleTitle) :
        this.dropdown.alertWithType('info', notif.fcm.title, notif.articleTitle)
      }
      if (notif.opened_from_tray){
        //app is open/resumed because user clicked banner
        let newArticle = this.findArticleInState(notif.articleTitle)
        NavigationActions.articleScreen({article: newArticle})
      }
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.tron.log(token)
    // fcm token may not be available on first load, catch it here
    });

  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor={Colors.transparent}/>
        <NavigationRouter />
        <DropdownAlert
          closeInterval={4000}
          ref={(ref) => this.dropdown = ref}
          onClose={(data) => this.onClose(data)}
          translucent={true}
          titleStyle={styles.alertTitle}
          messageStyle={styles.alertMessage}
          imageStyle={styles.alertIcon}
          />
      </View>
    )
  }

  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was dismissed. returns: automatic, programmatic, tap, pan or cancel
    console.tron.log('data');
    console.tron.log(data);
    if (data.action === 'tap') {
      let newArticle = this.findArticleInState(data.message)
      NavigationActions.articleScreen({article: newArticle})
    }
  }

  findArticleInState(title) {
    let articles = this.props.articles.asMutable()
    return articles.sort((article)=> {
      return article.title === title
    })[0]
  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
