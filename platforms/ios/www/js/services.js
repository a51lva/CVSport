angular.module('app.services', [])
.factory('dataService', function($http) {
    var noticias = [];
    return {
      noticias: function(categoria, callback) {
        var filter;
        if(categoria!=''){
          filter = '&categoria='+categoria;
        }

        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=noticias'+filter).then(function (response){
          for ( var index in response.data ) {
            noticias.push( response.data[index]);
          }
          callback(response.data);
        });

      },
      resultados: function(competicao,regiao,epoca,callback) {
        var filter;
        filter = '&competicao='+competicao+'&regiao='+regiao;
        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=resultado&epoca='+epoca+filter).then(function (response) {
          callback(response.data);
        });
      },
      resultados2: function(competicao,epoca,callback) {
        var filter;
        filter = '&competicao='+competicao+'&epoca='+epoca;
        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=resultado'+filter).then(function (response) {
          callback(response.data);
        });
      },
      vencedores: function(competicao,callback) {
        var filter;

        if(competicao!=''){
          filter = '&competicao='+competicao;
          $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=vencedores'+filter).then(function (response) {
            callback(response.data);
          });
        }
      },
      classificacao: function(competicao,regiao,epoca,callback) {
        var filter;
        if(regiao!=''&&competicao!=''){
          filter = '&competicao='+competicao+'&regiao='+regiao;
        }

        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=classificacao&epoca='+epoca+filter).then(function (response) {
          callback(response.data);
        });
      },
      classificacao2: function(competicao,epoca,callback) {
        var filter = '&competicao='+competicao+'&epoca='+epoca;
        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=classificacao'+filter).then(function (response) {
          callback(response.data);
        });
      },
      epoca: function(callback) {
        $http.get('http://desporto.silvdgn.eu/api.json&api=v1&opcao=epoca').then(function (response) {
          callback(response.data);
        });
      },
      find: function(id, callback) {
        var post = noticias.filter(function(entry) {
          return entry.id == id;
        })[0];
        callback(post);
      }
    };
})

.service('BlankService', [function(){

}]);