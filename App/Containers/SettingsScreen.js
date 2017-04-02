// @flow

import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'

// External libs
import Image from 'react-native-image-progress';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import FCM from 'react-native-fcm'
// Redux
import { connect } from 'react-redux'
// Libs
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
    }
  }

  componentWillMount() {

    NavigationActions.refresh({
      onLeft: () => {
        NavigationActions.pop()
      }
    })
  }

  render () {
    let allThemes = this.props.allThemes
    return (
      <ScrollView style={styles.main}  >
        <View style={styles.switchContainer} >
          <Text style={styles.switchComponentText}>Enable notifications</Text>
          <Switch
              onValueChange={(notificationsEnabled) => this.setState({notificationsEnabled})}
              style={styles.switchComponent}
              value={this.state.notificationsEnabled}
              />
        </View>
        { allThemes.map((theme, index) => {
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
                <Text style={{ color: 'white' }}>Y</Text>
            </CheckboxField>
          </View>
        })
        }
      </ScrollView>
    )
  }

  handleCheckboxClick(theme){
    if (theme.enabled){
      FCM.unsubscribeFromTopic('/topics/$(theme.topic)');
      console.tron.log('unsubscribeFromTopic(/topics/$(theme.topic))')
    } else {
      FCM.subscribeToTopic('/topics/$(theme.topic)');
      console.tron.log('subscribeFromTopic(/topics/$(theme.topic))')
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
