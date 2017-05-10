// @flow

import React from 'react'
import { Text, View } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Components
import SwiperItem from '../Components/SwiperItem'
import LoadingIndicator from '../Components/LoadingIndicator'
import LeftMenu from '../Components/LeftMenu'

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'

// services
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'
import { Colors } from '../Themes'

// External libs
import Swiper from 'react-native-swiper';
import FCM from 'react-native-fcm';
import ScalingDrawer from 'react-native-scaling-drawer';

let defaultScalingDrawerConfig = {
  scalingFactor: 0.8,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

class PresentationScreen extends React.Component {

  // this.login('mr.m.vasiliev@gmail.com', '111111')
  constructor (props) {
    super(props)

    this.state = {
      articles: props.articles ? props.articles : []
    }
  }

  componentWillMount() {
    //TODO - hide splash screen after timeout to change screen if no-auth
    NavigationActions.refresh({
      onLeft: () => {
        this._drawer.open()
      }
    })
    FirebaseDB.checkForUser(() => NavigationActions.login())
    FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes, this.props.articles)
  }

  setDynamicDrawerValue = (type, value) => {
    defaultScalingDrawerConfig[type] = value;
  /** forceUpdate show drawer dynamic scaling example **/
    this.forceUpdate();
  };

  setArticlesInState (articles, themes) {
    this.props.storeArticles(articles)
    this.props.storeThemes(themes)
    this.subscribeToTopics(themes)
  }

  subscribeToTopics(themes) {
    themes.map((theme) => {
      if (theme.enabled && this.props.notificationsEnabled) {
        FCM.subscribeToTopic('/topics/' + theme.topic);
      }
    })
  }

  closeDrawer(){
    this._drawer.close()
  }

  render () {
    let articles = this.props.filteredArticles ? this.props.filteredArticles : this.props.articles

    if (articles.length > 0) {
      return (
        <ScalingDrawer
          ref={ref => this._drawer = ref}
          content={<LeftMenu close={this.closeDrawer.bind(this)}/>}
          {...defaultScalingDrawerConfig}
          onClose={() => console.tron.log('close')}
          onOpen={() => console.tron.log('open')}
        >
          <View style={styles.main}>
            <Swiper horizontal={false}
                     activeDotColor={Colors.skyBlue}
                     dot={this.renderDot('rgba(0, 0, 0, 0.2)')}
                     activeDot={this.renderDot(Colors.skyBlue)}
                     showsButtons={true}
                     buttonWrapperStyle={styles.footer}
                     nextButton={this.renderFooterButton('След. >')}
                     prevButton={this.renderFooterButton('< Назад')}
                     >
              { articles.map((article, index) => {
                return (<SwiperItem article={article} key={index}/>)
              }) }
            </Swiper>
          </View>
        </ScalingDrawer>
      )
    } else {
      return (
        <View style={styles.noArticlesContainer}>
          <LoadingIndicator
            active={true}
            text={'Загружаем данные...'}/>
        </View>
      )
    }
  }

  renderFooterButton(text){
    return (
        <Text style={styles.footerButtonText}>{text}</Text>
    )
  }

  renderDot(color) {
    return (
        <View style={[styles.dot, {backgroundColor: color}]}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    articlesListFetchAttempt: () => dispatch(ArticlesActions.articlesListFetchAttempt()),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
