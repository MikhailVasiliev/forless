import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
// Configs

// Redux
import { connect } from 'react-redux'
// Components
// Styles
import styles from './Styles/FeedbackScreenStyles'
import { Colors } from '../Themes'
// Libs
// External Libs
import Toast from 'react-native-root-toast';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { BlurView, VibrancyView } from 'react-native-blur';
//Services
import FirebaseDB from '../Services/FirebaseDB'

class FeedbackScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      topic: '',
      message: '',
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <BlurView
            style={styles.blur}
            blurType="dark"
            blurAmount={10}/>
        <ScrollView style={styles.scrollview}>
            <TextInput style={styles.topicInput}
                onChangeText={(topic) => this.setState({topic})}
                value={this.state.topic}
                autoCapitalize={'sentences'}
                autoCorrect={true}
                placeholder={'Тема'}
                placeholderTextColor={Colors.textInputPlaceholder}
                underlineColorAndroid={Colors.transparent}
                />
            <TextInput style={styles.messageInput}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
                autoCapitalize={'sentences'}
                autoCorrect={true}
                placeholder={'Отзыв'}
                placeholderTextColor={Colors.textInputPlaceholder}
                multiline={true}
                underlineColorAndroid={Colors.transparent}
                />
            <TouchableOpacity style={styles.sendButton} onPress={()=> this.onSend()}>
              <Text style={styles.buttonText}>Отправить</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>

    );
  }

  onSend(){
    if (this.state.topic !== '' && this.state.message !== '') {
      let feedback = {
        topic: this.state.topic,
        message: this.state.message,
        sender: this.props.user.email
      }
      FirebaseDB.sendFeedback(feedback)
      NavigationActions.presentationScreen()
      Toast.show('Отзыв отправлен')
    } else {
      Toast.show('Заполните оба поля')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, null)(FeedbackScreen)
