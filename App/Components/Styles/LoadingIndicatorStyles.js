'use strict';

import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Colors.windowTint,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicatorView: {
    // width: Metrics.screenWidth * 0.6,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.loadingIndicatorBackground,
    borderRadius: 3,
    elevation: 10
  },
  loadingAlertText: {
    ...Fonts.style.normal,
    textAlign: 'center'
  },
});
