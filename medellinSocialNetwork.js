angular.module( 'medellinSocialNetworkApp' , [])
.controller("publicacionController", function($scope,$http){
      //Aquí empezar a escribir código de controlador para sección de PUBLICACIONES
      var publicacion = this;
      $scope.newComment = '';
      $scope.publicacionList = [];
			$scope.comentarioList = [];
      $scope.titulo = "Título";
      $scope.texto = "Texto";

      const
          PREFIX_URL = 'https://medellinsocialnetwork.herokuapp.com';
          //PREFIX_URL = 'http://localhost:8080';

      let getPublicacion = {
          method: 'GET',
          url: PREFIX_URL + '/publicacion'
      };

      let postPublicacion = {
          method: 'POST',
          url: PREFIX_URL + '/publicacion'
      };

      let getComentario = {
          method: 'GET',
          url: PREFIX_URL + '/comentario'
      };

      let postComentario = {
          method: 'POST',
          url: PREFIX_URL + '/comentario',
          headers: {
              "Content-Type": "application/json"
          },
          data: {
              'texto': ''
          }
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

      $http(getComentario).then( (response) => {
          $scope.comentarioList.pop();
          response.data.comentarios.forEach(function(el){
              console.log(el);
              $scope.comentarioList.push(el);
          });
      }, (response) => {
          console.log("Error en servicio o llamado a servicio! /comentario");
      });

      $scope.listarPublicaciones = function() {
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
      };

      $scope.listarComentarios = function () {
          $http(getComentario).then( (response) => {
              $scope.comentarioList.pop();
              response.data.comentarios.forEach(function(el){
                  console.log(el);
                  $scope.comentarioList.push(el);
              });
          }, (response) => {
              console.log("Error en servicio o llamado a servicio! /comentario");
          });
      };

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

      $scope.crearNuevoComentario = function() {
          console.log($scope.newComment);
          postComentario.data.texto = $scope.newComment;
          //Se hace el llamado para la inserción del registro en el servicio web /publicacion método POST
          $http(postComentario).then( (response) => {
              console.log(response);
              $scope.comentarioList.pop();
              $scope.listarComentarios();
              $scope.newComment = '';
          }, (response) => {
              console.log("Error en servicio o llamado a servicio! /comentario POST");
          });
          //En caso de ser exitoso, vovler a consultar los comentarios

          //En caso de fallo, notificar al usuario el resultado
      };


  });
