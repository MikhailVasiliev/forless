import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native'
import styles from './Styles/SwiperItemStyles'

import { Actions as NavigationActions } from 'react-native-router-flux'


const photoPlaceHolder = 'https://2ch.hk/b/arch/2016-03-15/src/120139891/14580644394070.png'

export default class SwiperItem extends React.Component {

  render() {
    return (
      <View style={styles.main} >
        <Image style={styles.main} source={{uri: photoPlaceHolder}}>
          <TouchableOpacity activeOpacity={0.95} style={styles.overlay} onPress={NavigationActions.articleScreen}>
            <Text style={styles.articleDate}>Thu, Feb 17</Text>
            <Text style={styles.articleTitle}>New Article about Forex Education</Text>
          </TouchableOpacity>
        </Image>
      </View>
    )
  }
}

SwiperItem.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  onPress: React.PropTypes.func,
}
