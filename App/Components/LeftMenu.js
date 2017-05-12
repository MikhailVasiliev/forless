import React, {
  Component
} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './Styles/LeftMenuStyles'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import FirebaseDB from '../Services/FirebaseDB'

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var profileImage = Images.face
    var profileName = this.props.user ? this.props.user.email : 'User'
    if (this.props.user && this.props.user.photoURL) {
      profileImage = {uri: this.props.user.photoURL}
      profileName = this.props.user.displayName
    }
    // let profileImage = this.props.user.photoURL ? {uri: this.props.user.photoURL} : Images.face
    return (
      <View style={styles.container}>
        <Image source={Images.background3} style={styles.imgBg}/>
        <View style={styles.profile}>
          <View style={styles.group}>
            <View style={styles.imgWrapper}>
              <Image source={profileImage} style={styles.profilePic} resizeMode={'cover'}/>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profileName}</Text>
          </View>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.col}
            onPress={() => this.props.closeDrawer()}
            activeOpacity={0.6}
            >
            <Text style={styles.menuTxt}>Избранные</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.col}
            onPress={() => {
              this.props.closeDrawer()
              NavigationActions.feedback()
            }}
            activeOpacity={0.6}
            >
            <Text style={styles.menuTxt}>Отчет об ошибке/отзыв</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.col, {borderBottomWidth: 0.5}]}
            onPress={() => {
              this.props.closeDrawer()
              FirebaseDB.logout()
            }}
            activeOpacity={0.6}
            >
            <Text style={styles.menuTxt}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

LeftMenu.propTypes = {
  closeDrawer: React.PropTypes.func.isRequired,
  user: React.PropTypes.object
};


export default LeftMenu;
