// @flow

import React, { Component } from 'react'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import { Images, Colors } from '../Themes'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import ArticleScreen from '../Containers/ArticleScreen'
import NewArticleScreen from '../Containers/NewArticleScreen'
import LoginScreen from '../Containers/LoginScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import FeedbackScreen from '../Containers/FeedbackScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const getSceneStyle = () => {
  const style = {
    backgroundColor: Colors.transparent,
  };
  return style;
};


class NavigationRouter extends Component {
  render () {
    return (
      <Router
            toggleDrawer={() => this.props.toggleDrawer()}
            isDrawerOpened={() => this.props.isDrawerOpened()}
            blockDrawer={(isBlocked) => this.props.blockDrawer(isBlocked)}
            storeUser={(user) => this.props.storeUser(user)}
            user={()=>this.props.user()}
            onExitApp={() => {}}>
          <Scene key="drawerChildrenWrapper"
                 navigationBarStyle={Styles.navBar}
                 backButtonImage={Images.back}
                 titleStyle={Styles.title}
                 leftButtonIconStyle={Styles.leftButton}
                 rightButtonTextStyle={Styles.rightButton}>
            <Scene key="login"
                   hideNavBar
                   titleStyle={Styles.title}
                   type={ActionConst.REPLACE}
                   component={LoginScreen}
                   title="Login" />
            <Scene initial key="presentationScreen"
                   type={ActionConst.REPLACE}
                   component={PresentationScreen}
                   title="Статьи"
                   titleStyle={Styles.title}
                   mode="feed"
                   leftButtonImage={Images.menu}
                   leftButtonIconStyle={Styles.leftButton}
                   onLeft={() => {}}
                   /*onRight={() => {Actions.settings()}}*/ />
            <Scene key="articleScreen"
                   hideNavBar
                   component={ArticleScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.backButton}
                   rightButtonStyle={Styles.rightButtonContainer}
                   rightButtonImage={Images.share}
                   rightButtonIconStyle={Styles.rightButton}
                   onRight={() => {}}
                   onBack={() => {Actions.pop(); this.props.blockDrawer(false)}} />
            <Scene key="settings"
                   animationStyle={animationStyle}
                   direction="vertical"
                   getSceneStyle={getSceneStyle}
                   title="Настройки"
                   component={SettingsScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.backButton}
                   onBack={() => {Actions.pop()}} />
            <Scene key="newArticle"
                   component={NewArticleScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.backButton}
                   onBack={() => {Actions.pop(); this.props.blockDrawer(false)}} />
            <Scene key="filteredArticles"
                   component={PresentationScreen}
                   title="Избранные"
                   onBack={() => {Actions.pop()}} />
            <Scene key="feedback"
                   animationStyle={animationStyle}
                   direction="vertical"
                   getSceneStyle={getSceneStyle}
                   title="Обратная связь"
                   component={FeedbackScreen}
                   leftButtonImage={Images.back}
                   leftButtonIconStyle={Styles.backButton}
                   onBack={() => {Actions.pop(); this.props.blockDrawer(false)}} />
          </Scene>
      </Router>
    )
  }
}

let animationStyle = (props) => {
  const { layout, position, scene } = props;

  const direction = (scene.navigationState && scene.navigationState.direction) ?
        scene.navigationState.direction : 'horizontal';

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const width = layout.initWidth;
  const height = layout.initHeight;

  const opacity = position.interpolate({
    inputRange,
        //default: outputRange: [1, 1, 0.3],
    outputRange: [1, 1, 0.5],
  });

  const scale = position.interpolate({
    inputRange,
        //default: outputRange: [1, 1, 0.95],
    outputRange: [1, 1, 1],
  });

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
  case 'horizontal':
    translateX = position.interpolate({
      inputRange,
                //default: outputRange: [width, 0, -10],
      outputRange: [width, 0, 0],
    });
    break;
  case 'vertical':
    translateY = position.interpolate({
      inputRange,
                //default: outputRange: [height, 0, -10],
      outputRange: [height, 0, 0],
    });
    break;
  }

  return {
    opacity,
    transform: [
            { scale },
            { translateX },
            { translateY },
    ],
  };
};

export default NavigationRouter
