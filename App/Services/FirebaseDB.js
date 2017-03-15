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

  static async getAllArticles(callback) {

    const rootRef = firebase.database().ref().child('/articles')
    var articles = []
    rootRef.on('value', (snap) => {
      snap.forEach((child) => {
        articles.push({
          title: child.val().title,
          data: child.val().data,
          cover: child.val().cover,
          date: child.key
        });
        console.tron.log(articles)
      });
      callback(articles)
    });
  }

  // snapshot.forEach((child) => {
  //   console.tron.log('child - ' + child.val().title)
  //   articles.push({
  //     title: child.val().title,
  //     data: child.val().data,
  //     date: child.key
  //   });
  // });


}

module.exports = Database;
