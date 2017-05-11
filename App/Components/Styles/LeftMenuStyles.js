import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    flex: 1
  },
  profile: {
    marginLeft: 25,
    marginTop: 50
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgWrapper: {
    width: 79,
    height: 79,
    borderWidth: 2,
    borderRadius: 120,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  settings: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 15
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 38,
  },
  imgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  icon: {
    fontSize: 45,
    color: '#fff'
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderColor: '#fff',
    height: 50
  },
  menuTxt: {
    fontSize: 16,
    color: '#fff',
    paddingLeft: 25
  },
  profileInfo: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  name: {
    fontSize: 16,
    color: '#fff'
  }
})
