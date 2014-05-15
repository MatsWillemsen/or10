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
      console.log(researcher.wbselements);
      Cluster.find().populate('groups')
      .then(function(clusters) {
        clusters = _(clusters).map(function(cluster) {
          var elements = cluster.wbselements;
          return _(elements).intersection(researcher.wbselements).value().length > 0 ? cluster : false;
        }).value();
        res.view('index/researcher',{researcher: researcher, clusters: _.compact(clusters)});
      })
      .fail(function(err) {
        console.log(err);
      })
    }).fail(function(err) {
      console.log(err);
      res.serverError();
    });
  },
  _config: {}

};
