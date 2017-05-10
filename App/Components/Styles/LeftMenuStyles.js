import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingLeft: 30
  },
  profile: {
    marginLeft: Metrics.screenWidth * 0.16,
    marginTop: 50
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgWrapper: {
    width: 129,
    height: 129,
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
    width: 125,
    height: 125,
    borderRadius: 62.5,
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
    borderTopWidth: 1,
    borderColor: '#fff'
  },
  menuTxt: {
    fontSize: 16,
    color: '#fff',
    paddingLeft: 10
  },
  profileInfo: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  name: {
    fontSize: 18,
    color: '#fff'
  }
})
