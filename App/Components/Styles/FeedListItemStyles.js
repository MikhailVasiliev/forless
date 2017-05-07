import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  main:{
    height: Metrics.feeditemHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  info: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sourceWrapper: {
    flexDirection: 'row',
  },
  sourceText: {
    color: Colors.feedItemNameColor,
    marginLeft: Metrics.smallMargin
  },
  name:{
    color: Colors.feedItemNameColor,
    marginBottom: Metrics.extraSmallMargin
  },
  icon: {
    height: Metrics.feedIcon,
    width: Metrics.feedIcon,
    alignSelf: 'center'
  },
  photoWrapper: {
    height: Metrics.feeditemHeight,
    width: Metrics.feedPhotoWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    height: Metrics.feedPhoto,
    width: Metrics.feedPhoto,
    borderRadius: Metrics.borderRadius,
  },
  timeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.feeditemHeight,
    width: Metrics.feedPhotoWidth,
  },
  time: {
    color: Colors.feedItemNameColor,
    textAlign: 'center',
  },
})
