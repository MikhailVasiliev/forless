import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    flex: 1
  },
  overlay: {
    backgroundColor: Colors.overlay,
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
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderColor: Colors.drawerLine,
    height: 50
  },
  menuTxt: {
    ...Fonts.style.normal,
    color: '#fff',
    paddingLeft: 15
  },
  profileInfo: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  name: {
    ...Fonts.style.normal,
    color: '#fff'
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 25
  },
})
