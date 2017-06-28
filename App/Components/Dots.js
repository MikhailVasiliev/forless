import React from 'react'
import {
  View
} from 'react-native'
import styles from './Styles/DialogStyles'
// External libs



export default class Dots extends React.Component {

  render() {
    let dots = []
    for ( let i = 1; i <= this.props.totalNumber; i++){
      dots.push({active: i === this.props.activeNumber})
    }

    return (
      <View style={{flexDirection: 'row'}}>
      {
        dots.map((dot, index)=>{
          let style = dot.active ? this.props.activeDotStyle : this.props.dotStyle
          return (<View style={style} key={index}/>)
        })
      }
      </View>
    )
  }
}

Dots.propTypes = {
  dotStyle: React.PropTypes.number,
  activeDotStyle: React.PropTypes.array,
  activeNumber: React.PropTypes.number,
  totalNumber: React.PropTypes.number,
}
