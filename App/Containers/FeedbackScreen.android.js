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
import BlurryOverlay from 'react-native-android-blurryoverlay';

//Services
import FirebaseDB from '../Services/FirebaseDB'

class FeedbackScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      topic: '',
      message: '',
      renderBlurry: false
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ renderBlurry: true })
    }, 380);
  }

  render() {
    var overlay = (this.state.renderBlurry) ? <BlurryOverlay
    radius={7} sampling={6} color="#00FFFF00"
    style={styles.blur}  /> : <View />;

    return (
      <View style={styles.main}>
      {overlay}
        <View
          style={styles.bluredOverlay}/>
        <ScrollView style={styles.scrollview} keyboardShouldPersistTaps={'handled'}>
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
        sender: this.props.user().email
      }
      FirebaseDB.sendFeedback(feedback)
      NavigationActions.pop()
      Toast.show('Отзыв отправлен')
    } else {
      Toast.show('Заполните оба поля')
    }
  }
}


export default connect(null, null)(FeedbackScreen)
