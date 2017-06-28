// @flow
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Components
import OnBoardingItem from '../Components/OnBoardingItem'
import Dots from '../Components/Dots'

// Redux
import { connect } from 'react-redux'
import ArticlesActions from '../Redux/ArticlesRedux'

// Styles
import styles from './Styles/OnBoardingScreenStyles'
import { Colors, Metrics } from '../Themes'

// External libs
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen'


class OnBoardingScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      scrollPosition: 0,
      scrollviewContentWidth: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.scrollPosition !== this.state.scrollPosition){
      return Math.round(nextState.scrollPosition / Metrics.screenWidth) !== Math.round(this.state.scrollPosition / Metrics.screenWidth)
    }
    if (nextState.scrollviewContentWidth !== this.state.scrollviewContentWidth){
      return false
    }
    return true;
  }

  componentDidMount(){
    SplashScreen.hide();
    this.props.blockDrawer(true)
  }

  render () {
    let page = Math.round(this.state.scrollPosition / Metrics.screenWidth) + 1
    return (
          <View style={styles.main}>
            {/*<Swiper activeDotColor={Colors.mainGreen}
                     dot={this.renderDot(Colors.mainGreenTransparent)}
                     activeDot={this.renderDot(Colors.mainGreen)}
                     showsButtons={true}
                     buttonWrapperStyle={styles.footer}
                     nextButton={this.renderFooterButton()}
                     prevButton={<View/>}
                     >*/}
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
                   console.tron.log('position - ' + event.nativeEvent.contentOffset.x)
                   this.setState({scrollPosition: event.nativeEvent.contentOffset.x})
                 }}
                 >
                  <OnBoardingItem key={1} image={1}/>
                  <OnBoardingItem key={2} image={2}/>
                  <OnBoardingItem key={3} image={3}/>
              </ScrollView>
              <View style={styles.onboardingFooter}>
                <Dots
                    dotStyle={styles.dot}
                    activeDotStyle={[styles.dot, styles.activeDot]}
                    activeNumber={page}
                    totalNumber={3}
                    />
                {page !== 3 && this.renderFooterButtonNext()}
                {page === 3 && this.renderFooterButtonStart()}
              </View>
          </View>
    )
  }

  scrollToNextArticle(){
    if (this.scrollview){
      this.currentPage = (this.state.scrollPosition / Metrics.screenWidth) + 1
      this.currentPage = Math.round(this.currentPage)
      let nextPagePosition = this.currentPage === 3 ? 1 : (this.currentPage) * Metrics.screenWidth
      this.scrollview.scrollTo({x: nextPagePosition, animated: true})
    }
  }

  renderFooterButtonNext(){
    return (
      <TouchableOpacity style={styles.footerButtonContainer} onPress={() => {this.scrollToNextArticle()}}>
        <Text style={styles.footerButtonText}>Далее</Text>
      </TouchableOpacity>
    )
  }

  renderFooterButtonStart(){
    return (
      <TouchableOpacity
        style={styles.footerButtonContainer}
        onPress={() => {
          this.props.setInitialLaunch(false)
          NavigationActions.presentationScreen()
        }}>
        <Text style={styles.footerButtonText}>Начать</Text>
      </TouchableOpacity>
    )
  }

  renderDot(color) {
    return (
        <View style={[styles.dot, {backgroundColor: color}]}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitialLaunch: (isInitial) => dispatch(ArticlesActions.setInitialLaunch(isInitial)),
  }
}

export default connect(null, mapDispatchToProps)(OnBoardingScreen)
