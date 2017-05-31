// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Switch,
  TouchableOpacity,
  InteractionManager,
  findNodeHandle
} from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'
// Redux
import { connect } from 'react-redux'
// Libs
import FirebaseDB from '../Services/FirebaseDB'
import { adminEmail } from '../Lib/Constants'

// External libs
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import FCM from 'react-native-fcm'
import LinearGradient from 'react-native-linear-gradient';
import BlurryOverlay from 'react-native-android-blurryoverlay';
// Styles
import styles from './Styles/SettingsScreenStyles'

class SettingsScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      notificationsEnabled: true,
      selectedOverall: false,
      selectedIntro: false,
      selectedTech: false,
      renderBlurry: false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ renderBlurry: true })
    }, 340);
  }

  render () {
    let allThemes = this.props.allThemes
    let isAdmin = this.props.user() && (this.props.user().email === adminEmail)
    var overlay = (this.state.renderBlurry)
                  ? <BlurryOverlay
                      radius={7} sampling={6} color="#00FFFF00"
                      style={styles.blur}  />
                  : <View />;
    return (
      <View style={styles.main}>
      {overlay}
        <View
          style={styles.bluredOverlay}/>
        <ScrollView style={styles.main}  >
          <LinearGradient
            colors={[
              'rgba(50, 50, 50, 0)',
              'rgba(50, 50, 50, 0.4)',
              'rgba(50, 50, 50, 0.7)',
              'rgba(50, 50, 50, 0.7)',
              'rgba(50, 50, 50, 0.4)',
              'rgba(50, 50, 50, 0)']}
            locations={[0, 0.2, 0.45, 0.55, 0.8, 1]}
            style={styles.gradientFirst}>
            <Text style={styles.topicsSticker}>Уведомить о новой статье</Text>
          </LinearGradient>
          <View style={styles.switchContainer} >
            <Text style={styles.switchComponentText}>Уведомления</Text>
            <Switch
                onValueChange={(notificationsEnabled) => this.handleSwitchToggle(notificationsEnabled)}
                style={styles.switchComponent}
                value={this.state.notificationsEnabled}
                />
          </View>
          <LinearGradient
            colors={[
              'rgba(50, 50, 50, 0)',
              'rgba(50, 50, 50, 0.4)',
              'rgba(50, 50, 50, 0.7)',
              'rgba(50, 50, 50, 0.7)',
              'rgba(50, 50, 50, 0.4)',
              'rgba(50, 50, 50, 0)']}
            locations={[0, 0.2, 0.45, 0.55, 0.8, 1]}
            style={styles.gradient}>
            <Text style={styles.topicsSticker}>Уведомлять по темам:</Text>
          </LinearGradient>
          { allThemes.map((theme, index) => {
            if (theme.enabled){ var yn = '+' } else { yn = '-' }
            return <View style={styles.checkboxContainer} key={index}>
              <CheckboxField
                  label={theme.name}
                  onSelect={()=>{this.handleCheckboxClick(theme)}}
                  disabled={!this.state.notificationsEnabled}
                  disabledColor="grey"
                  selected={theme.enabled}
                  defaultColor={'white'}
                  selectedColor="green"
                  containerStyle={styles.containerStyle}
                  labelStyle={styles.labelStyle}
                  checkboxStyle={styles.checkboxStyle}
                  labelSide="left">
                  <Text style={styles.checkboxText}>{yn}</Text>
              </CheckboxField>

            </View>
          })
          }
        </ScrollView>
        {isAdmin && <TouchableOpacity onPress={this.fetchNewArticle.bind(this)} style={styles.applyButton}>
          <Text style={styles.btnText}>ОТКРЫТЬ КОНСОЛЬ АДМИНА</Text>
        </TouchableOpacity>}
      </View>
    )
  }

  fetchNewArticle(){
    let callback = (article) => NavigationActions.newArticle({article})
    FirebaseDB.getNewArticle(callback)
  }

  handleSwitchToggle(enabled){
    this.setState({notificationsEnabled: enabled})
    this.props.toggleNotifications(enabled)
    this.props.allThemes.map((theme)=> {
      if (theme.enabled) {
        if (enabled){
          FCM.subscribeToTopic('/topics/' + theme.topic);
        } else {
          FCM.unsubscribeFromTopic('/topics/' + theme.topic);
        }
      }
    })
  }

  handleCheckboxClick(theme){
    if (theme.enabled){
      FCM.unsubscribeFromTopic('/topics/' + theme.topic);
    } else {
      FCM.subscribeToTopic('/topics/' + theme.topic);
    }
    this.props.toggleThemeNotification(theme.name, theme.enabled)
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.articles.filter,
    allThemes: state.notification.allThemes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterArticles: (filter) => dispatch(ArticlesActions.filterArticles(filter)),
    toggleThemeNotification: (name, enabled) => dispatch(NotificationActions.toggleThemeNotification(name, enabled)),
    toggleNotifications: (enabled) => dispatch(NotificationActions.toggleNotifications(enabled)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
