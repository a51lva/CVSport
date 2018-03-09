angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    
  .state('tabsController', {
    url: '/app',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.noticias', {
    url: '/noticias',
    views: {
      'tab1': {
        templateUrl: 'templates/noticias.html',
        controller: 'noticiasCtrl'
      }
    }
  })

  .state('tabsController.noticia', {
    url: '/noticia/:id',
    views: {
      'tab1': {
        templateUrl: 'templates/noticia.html',
        controller: 'noticiaCtrl'
      }
    }
  })

  .state('tabsController.categorias', {
    url: '/categorias/:filter/:title',
    views: {
      'tab1': {
        templateUrl: 'templates/categorias.html',
        controller: 'categoriasCtrl'
      }
    }
  })

  .state('tabsController.jogos', {
    url: '/jogos',
    views: {
      'tab2': {
        templateUrl: 'templates/jogos.html',
        controller: 'jogosCtrl'
      }
    }
  })

  .state('tabsController.futebolr', {
    url: '/futebolr',
    views: {
      'tab2': {
        templateUrl: 'templates/futebolr.html'
      }
    }
  })

  .state('tabsController.futebolrCont', {
    url: '/futebolrCont/:regiao/:title',
    views: {
      'tab2': {
        templateUrl: 'templates/futebolrCont.html',
        controller: 'futebolrContCtrl'
      }
    }
  })

  .state('tabsController.futeboln', {
    url: '/futeboln',
    views: {
      'tab2': {
        templateUrl: 'templates/futeboln.html',
        controller: 'futebolnContCtrl'
      }
    }
  })

  .state('tabsController.sobre', {
    url: '/sobre',
    views: {
      'tab3': {
        templateUrl: 'templates/sobre.html'
      }
    }
  })

$urlRouterProvider.otherwise('/app/noticias')

});