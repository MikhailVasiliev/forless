import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyAVa9_vTm7U308w4KVwpkwGvXF1xgGIT_o',
  authDomain: 'numeric-oarlock-144410.firebaseio.com',
  databaseURL: 'https://numeric-oarlock-144410.firebaseio.com',
  storageBucket: 'numeric-oarlock-144410.appspot.com'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class Database {

    /**
     * Sets a users mobile number
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */


  static setUserMobile(userId, mobile) {

    let userMobilePath = '/user/' + userId + '/details';

    return firebaseApp.database().ref(userMobilePath).set({
      mobile: mobile
    })

  }

  static async getAllArticles(callback, themes) {

    const rootRef = firebaseApp.database().ref().child('/articles')
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
      articles = []
    });
  }

  static fetchArticles() {

    const rootRef = firebaseApp.database().ref().child('/articles')
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

    const rootRef = firebaseApp.database().ref().child('/newArticle')
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
    const ref = firebaseApp.database().ref().child('/articles/' + article.date)
    ref.set(article)
  }

  static checkForUser(callback) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user){
        callback()
      }
    })
  }
}

module.exports = Database;
