import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import styles from './Styles/SwiperItemStyles'

import { Actions as NavigationActions } from 'react-native-router-flux'


export default class SwiperItem extends React.Component {

  render() {
    const animatedStyle = {
      transform: [
        { translateX: this.props.translateX }
      ]
    }
    let article = this.props.article
    return (
      <View style={styles.container} >
        <Animated.Image
          style={[styles.image2, animatedStyle]}
          source={{uri: article.cover}}
          resizeMode="cover">
          <TouchableOpacity activeOpacity={0.95} style={styles.overlay} onPress={() => {NavigationActions.articleScreen({article})}}>
            <View style={styles.themeContainer}>
              <Text style={styles.articleTheme}>{article.theme}</Text>
            </View>
            <Text style={styles.articleDate}>{article.date}</Text>
            <Text style={styles.articleTitle}>{article.title}</Text>
          </TouchableOpacity>
        </Animated.Image>
      </View>
    )
  }
}

SwiperItem.propTypes = {
  article: React.PropTypes.object,
}
