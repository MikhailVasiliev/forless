// @flow

import React from 'react'
import { ScrollView, Text, View, ListView, TouchableOpacity } from 'react-native'
import { Images, Metrics, Colors } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ArticlesActions from '../Redux/ArticlesRedux'

// Components
import SwiperItem from '../Components/SwiperItem'

import ArticleScreen from './ArticleScreen'

// External libs
import Image from 'react-native-image-progress';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/EvilIcons'
import {OffCanvas3D} from 'react-native-off-canvas-menu'

// Redux
import { connect } from 'react-redux'

// Styles
import styles from './Styles/PresentationScreenStyles'

class PresentationScreen extends React.Component {

  constructor () {
    super()

    this.state = {
      menuOpen: false
    }
  }

  componentDidMount() {
    NavigationActions.refresh({onLeft: this.handleMenu.bind(this)})
  }

  render () {
    return (
      <View style={styles.main}>
        <OffCanvas3D
          active={this.state.menuOpen}
          onMenuPress={this.handleMenu.bind(this)}
          backgroundColor={'#222222'}
          menuTextStyles={{color: 'white', marginTop: 40, backgroundColor: Colors.transparent}}
          handleBackPress={true}
          menuItems={[
            {
              title: 'Menu 1',
              icon: <Icon name="camera" size={35} color="#ffffff" style={{marginTop: 40}} />,
              renderScene: <SwiperItem/>
            },
            {
              title: 'ArticleScreen',
              icon: <Icon name="bell" size={35} color="#ffffff" style={{marginTop: 40}}/>,
              renderScene: <ArticleScreen/>
            }
          ]}>
        <Swiper horizontal={false}  >
          <SwiperItem/>
          <SwiperItem/>
          <SwiperItem/>
          <SwiperItem/>
        </Swiper>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
            <Text style={styles.footerButtonText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButtons} onPress={() => {console.tron.log('Footer buttom pressed')}}>
            <Text style={styles.footerButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        </OffCanvas3D>
      </View>
    )
  }

  handleMenu() {
    const {menuOpen} = this.state
    this.setState({
      menuOpen: !menuOpen
    })
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.articles.currentArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
