angular.module('app.controllers', [])

.controller('noticiasCtrl', function(dataService,$scope,AdMob) {
    $scope.elementsSize = 0;
    $scope.noticias = [];

    $scope.load = function() {
      dataService.noticias("todos", function(data) {
        if(data){
          $scope.noticias = data;
          $scope.loadMore();
          AdMob.init();
          $scope.showBanner();
        }else{
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        
      });
    }

    $scope.load();
    // Load more for inifinite scrolling
    $scope.loadMore = function() {
      var nextSize = $scope.elementsSize;
      nextSize += 10;
      
      if (nextSize > $scope.noticias.length) {
          nextSize = $scope.noticias.length;
      }
      
      $scope.elementsSize = nextSize;    
      
      if (nextSize != 0) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }

    $scope.showBanner = function(){
    //console.log(frm);
    var done = AdMob.showBanner();
    if( !done ){
      AdMob.showBanner();
    }
  }
  
})

.controller('noticiaCtrl', function($scope, $stateParams,dataService,$cordovaSocialSharing) {
    dataService.find($stateParams.id, function(post) {
      $scope.post = post;
    });

    $scope.share = function(message, subject, image, link) {
      $cordovaSocialSharing
      .share(message, subject, image, link) // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
    }

    $scope.shareViaTwitter = function(message, subject, image, link) {
      $cordovaSocialSharing.shareViaTwitter(message, image, link)
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }

    $scope.shareViaFacebook = function(message, subject, image, link) {
      $cordovaSocialSharing.shareViaFacebook(message, image, link)
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }
})
   
.controller('categoriasCtrl', function(dataService,$scope,$stateParams) {
    $scope.elementsSize = 0;
    $scope.noticias = [];
    $scope.title = $stateParams.title;
    $scope.filter = $stateParams.filter;

    $scope.load = function() {
      dataService.noticias($scope.filter, function(data) {
        $scope.noticias = data;
        $scope.loadMore();
      });
    }

    $scope.load();

    // Load more for inifinite scrolling
    $scope.loadMore = function() {
      var nextSize = $scope.elementsSize;
      nextSize += 10;
      
      if (nextSize > $scope.noticias.length) {
          nextSize = $scope.noticias.length;
      }
      
      $scope.elementsSize = nextSize;    
      
      if (nextSize != 0) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    }
})

.controller('jogosCtrl', function(dataService,$scope) {
    $scope.elementsSize = 0;
    $scope.jogos = [];
    $scope.epocas= [];
    $scope.epocaAtivo=[];

    dataService.epoca(function(data) {
      $scope.epocas = data;
      $scope.epocaAtivo = $scope.epocas.filter(function(entry) {
        return entry.state == 'Activo';
      })[0];

      $scope.load($scope.epocaAtivo.name);
    });

    $scope.load = function(epoca) {
      dataService.resultados("todos","todos",epoca,function(result) {
        $scope.jogos = result;
        $scope.loadMore();
      });
    }

    // Load more for inifinite scrolling
    $scope.loadMore = function() {
        var nextSize = $scope.elementsSize;
        nextSize += 10;
        
        if (nextSize > $scope.jogos.length) {
            nextSize = $scope.jogos.length;
        }
        
        $scope.elementsSize = nextSize;    
        
        if (nextSize != 0) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }
})
   
.controller('futebolrContCtrl', function(dataService,$scope,$stateParams) {
    $scope.elementsSize = 0;
    $scope.title = $stateParams.title;
    $scope.jogos = [];
    $scope.classificacao = [];
    $scope.epocas= [];
    $scope.epocaAtivo=[];

    dataService.epoca(function(data) {
      $scope.epocas = data;
      $scope.epocaAtivo = $scope.epocas.filter(function(entry) {
        return entry.state == 'Activo';
      })[0];
      $scope.load($scope.epocaAtivo.name);
      $scope.loadClass($scope.epocaAtivo.name);
    });

    $scope.load = function(epoca) {
      dataService.resultados("regional",$stateParams.regiao,epoca,function(data) {
        $scope.jogos = data;
        $scope.loadMore();
      });
    }

    $scope.loadClass = function(epoca) {
      dataService.classificacao("regional",$stateParams.regiao,epoca,function(data) {
        $scope.classificacao = data;
      });
    }
    
    // Load more for inifinite scrolling
    $scope.loadMore = function() {
        var nextSize = $scope.elementsSize;
        nextSize += 10;
        
        if (nextSize > $scope.jogos.length) {
            nextSize = $scope.jogos.length;
        }
        
        $scope.elementsSize = nextSize;    
        
        if (nextSize != 0) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }

    $scope.update = function(epoca) {
      $scope.load(epoca);
      $scope.loadClass(epoca);
    }
})

.controller('futebolnContCtrl', function(dataService,$scope) {
    $scope.elementsSize = 0;
    $scope.jogos = [];
    $scope.epocas= [];
    $scope.epocaAtivo=[];
    $scope.classificacao = [];
    $scope.vencedores = [];
    
    dataService.epoca(function(data) {
      $scope.epocas = data;
      $scope.epocaAtivo = $scope.epocas.filter(function(entry) {
        return entry.state == 'Activo';
      })[0];

      $scope.load($scope.epocaAtivo.name);
      $scope.loadClass($scope.epocaAtivo.name);
    });

    $scope.load = function(epoca) {
      dataService.resultados2("nacional",epoca,function(data) {
        $scope.jogos = data;
        $scope.loadMore();
      });
    }

    $scope.loadClass = function(epoca) {
      dataService.classificacao2("nacional",epoca,function(data) {
        $scope.classificacao = data;
      });
    }

    $scope.loadVencedores = function() {
      dataService.vencedores("nacional",function(data) {
        $scope.vencedores = data;
        $scope.loadMoreV();
      });
    }

    $scope.loadVencedores();
    
    // Load more for inifinite scrolling
    $scope.loadMore = function() {
        var nextSize = $scope.elementsSize;
        nextSize += 10;
        
        if (nextSize > $scope.jogos.length) {
            nextSize = $scope.jogos.length;
        }
        
        $scope.elementsSize = nextSize;    
        
        if (nextSize != 0) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }

    $scope.loadMoreV = function() {
        var nextSize = $scope.elementsSize;
        nextSize += 10;
        
        if (nextSize > $scope.vencedores.length) {
            nextSize = $scope.vencedores.length;
        }
        
        $scope.elementsSize = nextSize;    
        
        if (nextSize != 0) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }
  
    $scope.update = function(epoca) {
      $scope.load(epoca);
      $scope.loadClass(epoca);
    }
   
})
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

}])