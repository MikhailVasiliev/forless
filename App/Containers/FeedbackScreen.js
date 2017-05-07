import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
// Configs

// Redux

// Components
// Styles
import styles from './FeedbackScreenStyles'
import { Colors } from '../Themes'
// Libs
// External Libs
import Toast from 'react-native-root-toast';
import { Actions as NavigationActions } from 'react-native-router-flux'
//Services
import FirebaseDB from '../Services/FirebaseDB'

export default class FeedbackScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      topic: '',
      message: ''
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <TextInput style={styles.topicInput}
            onChangeText={(topic) => this.setState({topic})}
            value={this.state.topic}
            autoCapitalize={'sentences'}
            autoCorrect={true}
            placeholder={'Тема'}
            placeholderTextColor={Colors.occurrenceSkip}
            underlineColorAndroid={Colors.transparent}
            />
        <TextInput style={styles.messageInput}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            autoCapitalize={'sentences'}
            autoCorrect={true}
            placeholder={'Отзыв'}
            placeholderTextColor={Colors.occurrenceSkip}
            multiline={true}
            underlineColorAndroid={Colors.transparent}
            />
        <TouchableOpacity style={styles.sendButton} onPress={()=> this.onSend()}>
          <Text style={styles.buttonText}>Отрправить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSend(){
    if (this.state.topic !== '' && this.state.message !== '') {
      let feedback = {
        topic: this.state.topic,
        message: this.state.message,
      }
      FirebaseDB.sendFeedback(feedback)
      NavigationActions.presentationScreen()
      Toast.show('Отзыв оптравлен')
    } else {
      Toast.show('Заполните оба поля')
    }
  }
}
