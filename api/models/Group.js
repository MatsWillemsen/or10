/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'localMongo',
  attributes: {
    name: {
      type: 'string'
    },
    cluster: {
      model: 'cluster'
    },
    groepsnummer: {
      type: 'integer'
    }
  }
};
