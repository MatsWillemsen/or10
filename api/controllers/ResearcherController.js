var _ = require('lodash')

module.exports = {
  loadPage: function(req,res){
      res.view('index/researchers');
  },
  getResearchers: function(req,res) {
      Researcher.find().then(function(users) {
        res.json(users);
      }).fail(function(err) {
        res.json(err)
      });
  },
  loadData: function(req,res) {
    var id = req.param('id');
    Researcher.findOne({researchid: id}).then(function(researcher) {
      Cluster.find()
      .populateDeep('groups')
      .where({wbselements: researcher.wbselements})
      .then(function(clusters) {
        res.view('index/researcher',{researcher: researcher, clusters: _.compact(clusters)});
      })
      .fail(function(err) {
        console.log(err);
      });
    }).fail(function(err) {
      console.log(err);
      res.serverError();
    });
  },
  _config: {}

};
