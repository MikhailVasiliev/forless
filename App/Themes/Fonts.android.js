// @flow

const type = {
  extrathin: 'Avenir Next',
  thin: 'Avenir Next-Thin',
  base: 'Avenir Next-Regular',
  medium: 'Avenir Next-Medium',
  light: 'Avenir Next-Light',
  demi: 'Avenir Next-Demi',
  emphasis: 'Avenir Next-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.light,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.light,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.light,
    fontSize: size.h4
  },
  articleTitle: {
    fontFamily: type.light,
    fontSize: size.h4,
    lineHeight: 36
  },
  alertTitle: {
    fontFamily: type.medium,
    fontSize: 18,
  },
  alertMessage: {
    fontFamily: type.light,
    fontSize: 16,
  },
  h5: {
    fontFamily: type.light,
    fontSize: size.input
  },
  h6: {
    fontFamily: type.light,
    fontSize: size.input
  },
  normal: {
    fontFamily: type.light,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.light,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
