// @flow
import { downloadApp, appStorePic, appStoreLink, playMarketPic, playMarketLink } from '../Lib/Constants'

export const dataToContent = (cover, data) => {
  var content = []

  content.push(imageElement(cover))

  data.map((element, index)=>{
    if (element.pic) {
      content.push(imageElement(element.pic))
    } else {
      content.push(textElement(element.text))
    }
  })

  content.push(textElement(downloadApp))
  content.push(imageElement(appStorePic))
  content.push(linkElement(appStoreLink))
  content.push(imageElement(playMarketPic))
  content.push(linkElement(playMarketLink))

  return content;
}

const textElement = (text) => {
  return {
    tag: 'p',
    children: [
      text
    ]
  }
}


const imageElement = (pic) => {
  return {
    tag: 'figure',
    children: [
      {
        tag: 'img',
        attrs: {
          src: pic
        }
      },
      {
        tag: 'figcaption',
        children: []
      }
    ]
  }
}

const imageLinkElement = (pic, link) => {
  return {
    tag: 'figure',
    children: [
      {
        tag: 'img',
        attrs: {
          src: pic,
          href: link
        }
      },
      {
        tag: 'a',
        children: []
      }
    ]
  }
}

const linkElement = (link) => {
  return {
    tag: 'p',
    children: [
      {
        tag: 'a',
        attrs: {
          href: link,
          target: 'targetTest'
        },
        children: [link]
      }
    ]
  }
}
