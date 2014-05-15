/**
 * ImportController
 *
 * @description :: Server-side logic for managing Imports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var xlsx = require('xlsx');

module.exports = {
	upload: function(req, res) {
    req.file('dataFile').upload('./.tmp/export.xlsx', function onUploadComplete(err, uploadedFiles) {
      if(err) return res.serverError(err);
      var workbook = xlsx.readFile('./.tmp/export.xlsx');
      var sheet = workbook.Sheets['Sheet1'];
      data = xlsx.utils.sheet_to_row_object_array(sheet);
      importdata = _(data).map(function(researcher) {
        return {
          lastname: researcher['Achternaam'],
          position: researcher['Medewerkerssubgroep'],
          researchid: researcher['Pers.nr.'],
          wbselements: _(data).where({'Pers.nr.': researcher['Pers.nr.']}).pluck('WBS-element').value()
        }
      }).uniq('researchid');  
      _(importdata).each(function(researcher) {
        Researcher.findOne({researchid: researcher['researchid']}).exec(function(err, user) {
          if(user === undefined) {
              Researcher.create(researcher).exec(function(err, created) {
                if(err) {
                  console.log(err);
                }
                if(created) {
                  console.log("Created a user");
                }
              });
          }
          else {
            console.log("User already found, not creating");
          }
        });
      });
    });
    return res.redirect('/');
  },
  index: function(req,res) {
    res.view('index/import');
  }
};
