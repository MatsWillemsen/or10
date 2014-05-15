/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'localMongo',
  attributes: {
    researchid: {
      type: 'string',
    },
    lastName: {
      type: 'string'
    },
    position: {
      type: 'string'
    },
    researchtime: {
      type: 'float'
    },
    wbselements: {
      type: 'array'
    }
  }
};
