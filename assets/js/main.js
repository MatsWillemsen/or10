require.config({
  paths: {
    'jquery' : '//code.jquery.com/jquery-1.11.1.min.js',
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
