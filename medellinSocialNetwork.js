angular.module( 'medellinSocialNetworkApp' , [])
  .controller("publicacionController", function($scope,$http){
      //Aquí empezar a escribir código de controlador para sección de PUBLICACIONES
      var publicacion = this;
      $scope.publicacionList = [];
			$scope.comentarioList = [];
      $scope.titulo = "Título";
      $scope.texto = "Texto";

      //Para las PUBLICACIONES
      //Necesitamos definir una lista de publicaciones
      let getPublicacion = {
        method: 'GET',
        url: 'https://medellinsocialnetwork.herokuapp.com/publicacion'
      };

      $http(getPublicacion).then( (response) => {
          $scope.publicacionList.pop();
          var i = 0;
          response.data.publicaciones.forEach(function(el){
              console.log(el);
              $scope.publicacionList.push(el);
              if(i==0){
                  $scope.titulo = el.titulo;
                  $scope.texto = el.texto;
              }
              i++;
          });
      }, (response) => {
          console.log("Error en servicio o llamado a servicio! /publicacion");
      });

			let getComentario = {
        method: 'GET',
        url: 'https://medellinsocialnetwork.herokuapp.com/comentario'
      };

			$http(getComentario).then( (response) => {
          $scope.comentarioList.pop();
          response.data.comentarios.forEach(function(el){
              console.log(el);
              $scope.publicacionList.push(el);
          });
      }, (response) => {
          console.log("Error en servicio o llamado a servicio! /comentario");
      });

      publicacion.multimediaList = [
          {
              "tipo": "link",
              "ubicacion": "http://html5up.net",
              "texto": "HTML5 UP"
          },
          {
              "tipo": "image",
              "ubicacion": "images/screen.jpg",
              "texto": "Iphone Device"
          }
      ];

      //console.log('multimediaList->'+publicacion.multimediaList);

      publicacion.imageList = publicacion.multimediaList.filter(function(el){return el.tipo === "image"});
      publicacion.linkList = publicacion.multimediaList.filter(function(el){return el.tipo === "link"});


  });
