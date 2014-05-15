/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  require('nunjucks').configure('views', { autoescape: true });
  User.findOne()
  .where({username: 'mwillem1'})
  .then(function(user) {
    if(!user) {
    User.create({
      username: 'mwillem1',
      password: '12345'
    }).then(function(user) {
      console.log('User created succesfully')
    }).fail(function(err) {
      console.log('User generated poorly' + err)
    })
  }}).fail(function(user) {
    console.log('Something went wrong')
  });
  Cluster.findOne()
  .where({name : 'Cluster A'})
  .then(function(cluster) {
    if(!cluster) {
      Cluster.create([{
        name: 'Cluster A',
        wbselements: ['K.20560','R.2017.0013','R.2018.0013','R.2024.0002','I.2080.0095.01'],
        id: 1
      },{
        name: 'Cluster B',
        wbselements: ['I.2045.0095.01','R.2017.0011','R.2018.0011','R.2022.0002'],
        id: 2
      }, {
        name: 'Cluster C',
        wbselements: ['C.2016.0010','R.2017.0010','R.2018.0010'],
        id: 3
      }]).exec(function(err, clusters) {
        Group.create([{
          name: 'Groep A',
          groepsnummer: 1,
          cluster: 1
        },{
          name: 'Groep B',
          groepsnummer: 2,
          cluster: 1
        }, {
          name: 'Groep C',
          groepsnummer: 3,
          cluster: 2
        }, {
          name: 'Groep D',
          groepsnummer: 4,
          cluster: 2
        }, {
          name: 'Groep E',
          groepsnummer: 5,
          cluster: 3
        }, {
          name: 'Groep F',
          groepsnummer: 6,
          cluster: 3
        }]).exec(function(err,groups) {
          console.log("Groepen aangemaakt");
        })
      });
    }
  });
  cb();
};
