import React from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Text,
} from 'react-native'
import styles from './Styles/DialogStyles'
// External libs



export default class Dialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {fadeAnim: new Animated.Value(0)}
  }

  componentDidMount() {
    this._animate(this.props);
  }

  componentWillReceiveProps(newProps) {
    this._animate(newProps);
  }

  _animate(newProps){
    return Animated.timing(this.state.fadeAnim, {
      toValue: newProps.visible ? 0.5 : 0,
      duration: 300
    }).start();
  }

  render() {

    if (this.props.visible) {
      return (
        <Animated.View style={[styles.overlay, {opacity: this.state.fadeAnim}]}>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={()=>{ this.props.dismissDialog() }}
            visible={true}>
            <View style={styles.main}>
                <View style={styles.dialog}>
                  <View style={styles.infoWrapper}>
                    <Text style={styles.title}>Выйти?</Text>
                    <Text style={styles.text}>Вы действительно хотите выйти из учетной записи?</Text>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.props.dismissDialog}>
                      <Text style={styles.btnText}>Отмена</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => {
                      this.props.onPress()
                      this.props.dismissDialog()
                    }}>
                      <Text style={[styles.btnText, styles.deleteBtnText]}>Да, выйти</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </Modal>
        </Animated.View>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

Dialog.propTypes = {
  visible: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  dismissDialog: React.PropTypes.func,
}
