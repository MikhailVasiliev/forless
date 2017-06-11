// @flow

import React from 'react'
import { Text, View, BackHandler, ScrollView, Animated } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Components
import SwiperItem from '../Components/SwiperItem'
import LoadingIndicator from '../Components/LoadingIndicator'
import Footer from '../Components/Footer'

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'
import NotificationActions from '../Redux/NotificationRedux'

// services
import FirebaseDB from '../Services/FirebaseDB'

// Styles
import styles from './Styles/PresentationScreenStyles'
import { Colors, Metrics } from '../Themes'

// External libs
import Swiper from 'react-native-swiper';
import FCM from 'react-native-fcm';
import Fabric from 'react-native-fabric';
import SplashScreen from 'react-native-splash-screen'

let defaultScalingDrawerConfig = {
  scalingFactor: 0.9,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

let width = Metrics.screenWidth

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0, 0, 150] : [ 0, 0, 150];
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  })
}
const getSeparator = (i) => {
  return (
    <View key={i} style={[styles.separate, { left: (i - 1) * width - 2.5 }]} />
  )
}

class PresentationScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      animatedScroll: new Animated.Value(0),
      scrollPosition: 0,
      scrollviewContentWidth: 0
    }

    BackHandler.addEventListener('hardwareBackPress', () => {

      if (this.props.isDrawerOpened()) {
        this.props.toggleDrawer()
        return true;
      }
      return false;
    });
  }

  componentWillReceiveProps(nextProps){
    switch (nextProps.mode){
    case 'feed':
      this.articles = nextProps.articles ? nextProps.articles : []
      break;
    case 'filtered':
      this.articles = nextProps.filteredArticles
      break;
    case 'marked':
      this.articles = nextProps.markedArticles
      break;
    default:
      break;
    }
  }

  componentWillMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    //TODO - hide splash screen after timeout to change screen if no-auth
    if (this.props.mode === 'feed'){
      FirebaseDB.getAllArticles(this.setArticlesInState.bind(this), this.props.allThemes, this.articles)
    }
    NavigationActions.refresh({
      onLeft: () => {
        this.props.toggleDrawer()
      },
    })
  }

  componentDidMount(){
    this.props.blockDrawer(false)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.scrollPosition !== this.state.scrollPosition){
      return false
    }
    if (nextState.scrollviewContentWidth !== this.state.scrollviewContentWidth){
      return false
    }
    return true;
  }

  componentWillUnmount(){
    Fabric.Answers.logCustom('Presentation Screen', {user: this.props.user() ? this.props.user().email : 'unauth launch'});
    BackHandler.removeEventListener('hardwareBackPress', () => {});
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

  scrollToPrevArticle(){
    if (this.scrollview){
      this.currentPage = this.state.scrollPosition / Metrics.screenWidth
      this.currentPage = Math.round(this.currentPage)
      let prevPagePosition = this.currentPage === 0 ? this.state.scrollviewContentWidth - Metrics.screenWidth : (this.currentPage - 1) * Metrics.screenWidth
      this.scrollview.scrollTo({x: prevPagePosition, animated: true})
    }
  }

  scrollToNextArticle(){
    if (this.scrollview){
      this.currentPage = this.state.scrollPosition / Metrics.screenWidth
      this.currentPage = Math.round(this.currentPage)
      let nextPagePosition = this.currentPage === (this.props.articles.length - 1) ? 0 : (this.currentPage + 1) * Metrics.screenWidth
      this.scrollview.scrollTo({x: nextPagePosition, animated: true})
    }
  }

  render () {
    console.tron.log('render')

    if (this.articles && this.articles.length > 0) {
      return (
          <View style={styles.main}>
            <ScrollView
              style={styles.scrollview}
              ref={(scroll) => this.scrollview = scroll}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.setState({scrollviewContentWidth: contentWidth})
              }}
              pagingEnabled
              horizontal
              scrollEventThrottle={16}
              onScroll={(event) => {
                this.setState({scrollPosition: event.nativeEvent.contentOffset.x})
                // Animated.event(
                //   [{
                //     nativeEvent: {
                //       contentOffset: {
                //         x: this.state.animatedScroll
                //       }
                //     }
                //   }]
                // )
              }
              }
              >
              { this.articles.map((article, index) => {
                return (
                  <SwiperItem
                    article={article}
                    key={index}
                    translateX={getInterpolate(this.state.animatedScroll, index, this.articles.length )}
                    />
                )
              }) }
              {Array.apply(null, {length: this.articles.length + 1}).map((_, i) => getSeparator(i))}
              </ScrollView>
              <Footer
                leftButtonText={'< Назад'}
                rightButtonText={'Вперед >'}
                onPressLeftButton={() => this.scrollToPrevArticle()}
                onPressRightButton={() => this.scrollToNextArticle()}
                currentPage={Math.round(this.state.scrollPosition / Metrics.screenWidth) + 1}
                pagesAmount={this.props.articles.length}
                />

          </View>
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

  renderDot(color) {
    return (
        <View style={[styles.dot, {backgroundColor: color}]}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.data,
    markedArticles: state.articles.markedArticles,
    filteredArticles: state.articles.filteredArticles,
    allThemes: state.notification.allThemes,
    notificationsEnabled: state.notification.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    articleFetchAttempt: (path) => dispatch(ArticlesActions.articleFetchAttempt(path)),
    storeArticles: (articles) => dispatch(ArticlesActions.storeArticles(articles)),
    storeThemes: (themes) => dispatch(NotificationActions.storeThemes(themes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
