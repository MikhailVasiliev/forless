import React, {
  Component
} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles/FooterStyles'

class Footer extends Component {

  render(){
    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => this.props.onPressLeftButton()}>
          <Text style={styles.footerButtonText}>{this.props.leftButtonText}</Text>
        </TouchableOpacity>
        <Text style={styles.footerNumberText}>{`${this.props.currentPage}/${this.props.pagesAmount}`}</Text>
        <TouchableOpacity onPress={() => this.props.onPressRightButton()}>
          <Text style={styles.footerButtonText}>{this.props.rightButtonText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Footer.propTypes = {
  leftButtonText: React.PropTypes.string,
  rightButtonText: React.PropTypes.string,
  onPressLeftButton: React.PropTypes.func,
  onPressRightButton: React.PropTypes.func,
  currentPage:  React.PropTypes.number,
  pagesAmount:  React.PropTypes.number,
};

export default Footer;
