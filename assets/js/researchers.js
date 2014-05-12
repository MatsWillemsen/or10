require.config({
  paths: {
    'jquery' : '//code.jquery.com/jquery-1.11.1.min',
    'underscore' : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    'backbone' : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    'bootstrap' : '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min',
    'backgrid' : 'dependencies/backgrid.min',
    'backbone-pageable' : 'dependencies/backbone-pageable.min',
    'backgrid-paginator' : 'dependencies/backgrid-paginator.min',
    'backgrid-filter' : 'backgrid-filter/backgrid-filter.min',
    'lunr' : 'dependencies/lunr.min'
  },
  shim : {
    'underscore' : {
      exports: '_'
    },
    'backbone' : {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'bootstrap' : {
      deps: ['jquery']
    },
    'backgrid' : {
      deps: ['jquery','underscore','backbone'],
      exports: 'Backgrid'
    },
    'backbone-pageable' : {
      deps: ['backbone']
    },
    'backgrid-paginator' : {
      deps: ['backbone-pageable','backgrid']
    },
    'backgrid-filter' : {
      deps: ['backgrid','lunr']
    }
  }
});

require([
    'jquery','underscore','backbone','backgrid','backbone-pageable','backgrid-paginator','backgrid-filter'],
    function($,_,Backbone,Backgrid) {
    var Researcher = Backbone.Model.extend({});
    var Researchers = Backbone.PageableCollection.extend({
      model: Researcher,
      url: "/getResearchers",
      state: {
        pageSize: 15
      },
      mode: "client"
    });
    var ClickableRow = Backgrid.Row.extend({
      events: {
        'click' : 'onClick'
      },
      onClick: function() {
        Backbone.trigger('rowclicked',this.model)
      }
    });

    Backbone.on('rowclicked', function(model) {
      document.location.href='/researcher/' + model.get('researchid');
    })
    var researchers = new Researchers();
    var columns = [{
      name: "researchid",
      label: "#",
      cell: "string",
      editable: false
    }, {
      name: "lastname",
      label: "Achternaam",
      cell: "string",
      editable: false
    }, {
      name: "position",
      label: "Afdeling",
      cell: "string",
      editable: false
    }];
    var grid = new Backgrid.Grid({
      columns: columns,
      collection: researchers,
      className: 'table table-striped',
      row: ClickableRow
    });

    $('#researchersgrid').append(grid.render().el);

    var paginator = new Backgrid.Extension.Paginator({
      collection: researchers
    });
    $('#researchersgrid').after(paginator.render().el);
    var filter = new Backgrid.Extension.ClientSideFilter({
      collection: researchers,
      fields: ['lastname'],
      className: 'backgrid-filter form-search pull-right'
    });
    console.log(filter.render().el);
  // Render the filter
    $('#researchersgrid').before(filter.render().el);

    researchers.fetch({reset: true});
  });
