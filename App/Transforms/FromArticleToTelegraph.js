// @flow


export const dataToContent = (cover, data) => {
  var content = []

  let contentItem = {
    tag: 'figure',
    children: [
      {
        tag: 'img',
        attrs: {
          src: cover
        }
      },
      {
        tag: 'figcaption',
        children: []
      }
    ]
  }
  content.push(contentItem)


  data.map((element, index)=>{
    if (element.pic) {
      contentItem = {
        tag: 'figure',
        children: [
          {
            tag: 'img',
            attrs: {
              src: element.pic
            }
          },
          {
            tag: 'figcaption',
            children: []
          }
        ]
      }
      content.push(contentItem)
    } else {
      contentItem = {
        tag: 'p',
        children: [
          element.text
        ]
      }
      content.push(contentItem)
    }
  })

  return content;
}
