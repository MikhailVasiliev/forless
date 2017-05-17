// @flow

import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Platform
} from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import LeftMenu from '../Components/LeftMenu'

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'

// External libs
import DropdownAlert from 'react-native-dropdownalert'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Actions as NavigationActions } from 'react-native-router-flux'
import ScalingDrawer from 'react-native-scaling-drawer';

// services
import FirebaseDB from '../Services/FirebaseDB'

let defaultScalingDrawerConfig = {
  scalingFactor: 0.9,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

class RootContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isDrawerOpened: false
    }
  }

  setDynamicDrawerValue = (type, value) => {
    defaultScalingDrawerConfig[type] = value;
    /** forceUpdate show drawer dynamic scaling example **/
    this.forceUpdate();
  };

  toggleDrawer(){
    this.state.isDrawerOpened
      ? this._drawer.close()
      : this._drawer.open()
  }

  componentWillMount() {
    //TODO - hide splash screen after timeout to change screen if no-auth
    FirebaseDB.checkForUser(() => NavigationActions.login(), user => this.storeUser(user))
  }

  storeUser(user){
    this.user = user
  }

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
      if (this.user && !notif.opened_from_tray){
        //this is a local notification
        Platform.OS === 'ios'
            ? this.dropdown.alertWithType('info', notif.notification.title, notif.articleTitle)
            : this.dropdown.alertWithType('info', notif.fcm.title, notif.articleTitle)
      }
      if (this.user && notif.opened_from_tray){
        //app is open/resumed because user clicked banner
        let newArticle = this.findArticleInState(notif.articleTitle)
        NavigationActions.articleScreen({article: newArticle})
      }
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      // fcm token may not be available on first load, catch it here
      console.tron.log(token)
    });
  }

  blockDrawer(isBlocked) {
    if (this._drawer){
      this._drawer.blockSwipeAbleDrawer(isBlocked)
    }
  }

  render () {
    return (
      <ScalingDrawer
        ref={ref => this._drawer = ref}
        content={<LeftMenu closeDrawer={this.toggleDrawer.bind(this)} user={this.user} markedArticles={this.props.markedArticles}/>}
        {...defaultScalingDrawerConfig}
        onClose={() => this.setState({isDrawerOpened: false})}
        onOpen={() => this.setState({isDrawerOpened: true})}
        >
        <View style={styles.applicationView}>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={Colors.transparent}/>
          <NavigationRouter
            toggleDrawer={() => this.toggleDrawer()}
            user={this.user}
            storeUser={(user) => this.storeUser(user)}
            blockDrawer={(isBlocked) => this.blockDrawer(isBlocked)}/>
        </View>
        <DropdownAlert
          closeInterval={4000}
          ref={(ref) => this.dropdown = ref}
          onClose={(data) => this.onClose(data)}
          translucent={true}
          titleStyle={styles.alertTitle}
          messageStyle={styles.alertMessage}
          imageStyle={styles.alertIcon}
          />
      </ScalingDrawer>
    )
  }

  onClose(data) {
    if (data.action === 'tap' && this.user) {
      let newArticle = this.findArticleInState(data.message)
      NavigationActions.articleScreen({article: newArticle})
    }
  }

  findArticleInState(title) {
    let articles = this.props.articles.asMutable()
    return articles.filter((article)=> {
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
    markedArticles: state.articles.markedArticles,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
