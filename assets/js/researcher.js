require.config({
  paths: {
    'jquery' : '//code.jquery.com/jquery-1.11.1.min',
    'underscore' : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    'bootstrap' : '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min',
    'datatables' : '//cdn.datatables.net/1.10.0/js/jquery.dataTables',
    'datatables-bootstrap' : '//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap'
  },
  shim : {
    'underscore' : {
      exports: '_'
    },
    'bootstrap' : {
      deps: ['jquery']
    }
  }
});
