import React, {
  Component
} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './Styles/LeftMenuStyles'
import { Images } from '../Themes'

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.background3}
               style={styles.imgBg}/>
        <View style={styles.profile}>
          <View style={styles.group}>
            <View style={styles.imgWrapper}>
              <Image source={Images.face}
                     style={styles.profilePic}
                     resizeMode={'cover'}
              />
            </View>
            <Image source={Images.settings}
              style={styles.settings}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Михаил Васильев</Text>
          </View>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.col}
            onPress={() => this.props.close()}
            activeOpacity={0.6}
          >
            <Text style={styles.menuTxt}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.col}
            onPress={() => this.props.close()}
            activeOpacity={0.6}
          >
            <Text style={styles.menuTxt}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.col, {borderBottomWidth: 1}]}
            onPress={() => this.props.close()}
            activeOpacity={0.6}
          >
            <Text style={styles.menuTxt}>Greteractions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

LeftMenu.propTypes = {
  close: React.PropTypes.func.isRequired,
};


export default LeftMenu;
