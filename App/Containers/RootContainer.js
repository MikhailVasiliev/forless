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
import Dialog from '../Components/Dialog'

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
      isDrawerOpened: false,
      modalVisible: false,
      openedFromTray: false,
      notif: {}
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

  isDrawerOpened(){
    return this.state.isDrawerOpened
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

    FCM.getInitialNotification().then( notif => {
      this.handleNotification(notif)
    });

    this.notificationListener = FCM.on(FCMEvent.Notification,  notif => {
      this.handleNotification(notif)
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      // fcm token may not be available on first load, catch it here
      console.tron.log(token)
    });
  }

  handleNotification(notif){
    if (this.user && !notif.opened_from_tray){
      //this is a local notification
      Platform.OS === 'ios'
          ? this.dropdown.alertWithType('info', notif.notification.title, notif.articleTitle)
          : this.dropdown.alertWithType('info', notif.fcm.title, notif.articleTitle)
    }
    if (notif.opened_from_tray){
      this.setState({openedFromTray: true, notif})
      setTimeout(() => {
        if (this.state.openedFromTray){
          this.setState({openedFromTray: false, notif: null})
        }
      }, 5000);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.notif !== this.state.notif){
      return false
    }
    if (nextState.openedFromTray !== this.state.openedFromTray){
      return false
    }
    return true
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.articles.length !== this.props.articles.length){
      if (this.state.openedFromTray){
        //todo - save notification and check for user
        this.findArticleAndOpen(this.state.notif.articleTitle, nextProps.articles)
      }
    }
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
        content={<LeftMenu openModal={(isOpen) => this.openModal(isOpen)} closeDrawer={this.toggleDrawer.bind(this)} user={this.user} markedArticles={this.props.markedArticles}/>}
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
            isDrawerOpened={() => this.isDrawerOpened()}
            user={() => {return this.user}}
            storeUser={(user) => this.storeUser(user)}
            blockDrawer={(isBlocked) => this.blockDrawer(isBlocked)}
            />
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
        <Dialog
          visible={this.state.modalVisible}
          onPress={() => {
            FirebaseDB.logout()
          }}
          dismissDialog={() => this.openModal(false)}
          />
      </ScalingDrawer>
    )
  }

  onClose(data) {
    if (data.action === 'tap' && this.user) {
      this.findArticleAndOpen(data.message)
    }
  }

  findArticleAndOpen(title, articles){
    let newArticle = this.findArticleInState(title, articles)
    if (newArticle){
      NavigationActions.articleScreen({article: newArticle})
    }
  }

  openModal(isOpen) {
    this.setState({modalVisible: isOpen})
  }

  findArticleInState(title, allArticles) {
    let articles = allArticles ? allArticles : this.props.articles.asMutable()
    return articles.filter((article) => { return article.title === title })[0]
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
    markedArticles: state.articles.markedArticles
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
