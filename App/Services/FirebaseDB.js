import * as firebase from 'firebase';


class Database {

    /**
     * Sets a users mobile number
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
  static setUserMobile(userId, mobile) {

    let userMobilePath = '/user/' + userId + '/details';

    return firebase.database().ref(userMobilePath).set({
      mobile: mobile
    })

  }

  static async getAllArticles(callback, themes) {

    const rootRef = firebase.database().ref().child('/articles')
    var articles = []
    themes = themes.asMutable()
    rootRef.on('value', (snap) => {
      snap.forEach((child) => {
        articles.push({
          title: child.val().title,
          data: child.val().data,
          cover: child.val().cover,
          theme: child.val().theme,
          topic: child.val().topic,
          date: child.key
        });

        let uniqueTheme = {
          name: child.val().theme,
          topic: child.val().topic,
          enabled: true
        }

        if (!themes.some((theme)=>{return theme.name === uniqueTheme.name}) ) {
          themes.push(uniqueTheme)
        }
      });

      let newTheme = {
        name: 'Новые темы',
        topic: 'new',
        enabled: true
      }

      if (!themes.some((theme)=>{return theme.name === newTheme.name}) ) {
        themes.push(newTheme)
      }
      callback(articles, themes)
    });
  }

  static fetchArticles() {

    const rootRef = firebase.database().ref().child('/articles')
    var articles = []
    rootRef.on('value', (snap) => {
      snap.forEach((child) => {
        articles.push({
          title: child.val().title,
          data: child.val().data,
          cover: child.val().cover,
          theme: child.val().theme,
          date: child.key
        });
      });
      return articles;
    });
  }

  static async getNewArticle(callback) {

    const rootRef = firebase.database().ref().child('/newArticle')
    var articles = []

    rootRef.once('value', (snap) => {
      snap.forEach((child) => {
        articles.push({
          title: child.val().title,
          data: child.val().data,
          cover: child.val().cover,
          theme: child.val().theme,
          topic: child.val().topic,
          date: child.key
        });
      });

      callback(articles[0]);
    });
  }

  static async approveNewArticle(article) {
    const ref = firebase.database().ref().child('/articles/' + article.date)
    ref.set(article)
  }
}

module.exports = Database;
