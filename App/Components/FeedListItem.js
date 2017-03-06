import React from 'react'
import {
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import styles from './Styles/FeedListItemStyles'

const photoPlaceHolder = 'https://facebook.github.io/react/img/logo_og.png'
export default class FeedListItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.name !== nextProps.name || this.props.onPress !== nextProps.onPress ||
    this.props.photo !== nextProps.photo || this.props.icon !== nextProps.icon ||
    this.props.source !== nextProps.source || this.props.time !== nextProps.time) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.main}>
        <View style={styles.photoWrapper}>
          <Image source={{uri: this.props.photo ? this.props.photo : photoPlaceHolder}} style={styles.photo}/>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>
            {this.props.name}
          </Text>
          <View style={styles.sourceWrapper}>
            <Image source={{uri: this.props.icon ? this.props.icon : photoPlaceHolder}} style={styles.icon}/>
            <Text style={styles.sourceText} >
              {this.props.source}
            </Text>
          </View>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.time} >
            {this.props.time}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }
}

FeedListItem.propTypes = {
  photo: React.PropTypes.string,
  name: React.PropTypes.string,
  icon: React.PropTypes.string,
  source: React.PropTypes.string,
  time: React.PropTypes.string,
  onPress: React.PropTypes.func,
}
