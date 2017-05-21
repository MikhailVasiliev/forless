// @flow

const type = {
  base: 'Avenir Next',
  thin: 'Avenir Next',
  bold: 'Avenir Next',
  light: 'Avenir Next',
  demi: 'Avenir Next',
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
    fontWeight: '200',
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.light,
    fontWeight: '300',
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.light,
    fontWeight: '400',
    fontSize: size.h4
  },
  articleTitle: {
    fontFamily: type.light,
    fontWeight: '300',
    fontSize: size.h3
  },
  alertTitle: {
    fontFamily: type.light,
    fontWeight: '600',
    fontSize: 18,
  },
  alertMessage: {
    fontFamily: type.light,
    fontSize: 16,
  },
  h5: {
    fontFamily: type.light,
    fontWeight: '300',
    fontSize: size.input
  },
  h6: {
    fontFamily: type.light,
    fontWeight: '600',
    fontSize: size.input
  },
  normal: {
    fontFamily: type.light,
    fontWeight: '300',
    fontSize: size.regular
  },
  description: {
    fontFamily: type.light,
    fontWeight: '300',
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
