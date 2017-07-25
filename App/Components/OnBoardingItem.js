import React from 'react'
import {
  Text,
  Image,
  View,
} from 'react-native'
import styles from './Styles/OnBoardingItemStyles'

import { Images } from '../Themes'


export default class OnBoardingItem extends React.Component {

  render() {
    let image, textStyle, text, title
    switch (this.props.image){
    case 1:
      title = 'ВСТУПЛЕНИЕ'
      text = 'Все начинающие трейдеры найдут это приложение полезным путеводителем в интересный мир финансовых законов и верным помощником в торговле'
      image = Images.onboarding1
      textStyle = styles.onboarding1Text
      break;
    case 2:
      title = 'УРОК'
      text = 'Кликайте на карточку для прочтения'
      image = Images.onboarding2
      textStyle = styles.onboarding2Text
      break;
    case 3:
      title = 'ИЗБРАННЫЕ'
      text = 'Понравился урок? Добавь в избранные и поделись с друзьями'
      image = Images.onboarding3
      textStyle = styles.onboarding3Text
      break;
    default:
      break;
    }
    return (
      <View style={styles.container} >
        <Image
          style={styles.image}
          source={image}
          resizeMode="cover" >
          <Text style={styles.onboardingTitle}>{title}</Text>
          <Text style={textStyle}>{text}</Text>
        </Image>
      </View>
    )
  }
}
