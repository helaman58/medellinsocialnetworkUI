angular.module( 'medellinSocialNetworkApp' , [])
	.controller( 'TodoListController' , function() {
    var todoList = this;
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:true},
      {text:'Deploy an AngularJS app', done:false}
    ];

    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  })
  .controller("publicacionController", function($scope,$http){
      //Aquí empezar a escribir código de controlador para sección de PUBLICACIONES
      var publicacion = this;
      $scope.publicacionList = [];
      $scope.titulo = "Título";
      $scope.texto = "Texto";

      //Para las PUBLICACIONES
      //Necesitamos definir una lista de publicaciones
      let getPublicacion = {
        method: 'GET',
        url: 'http://localhost:8080/publicacion'
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
          console.log("Error en servicio o llamado a servicio!");
      });

      //publicacion.title = "Magna sed ultrices";
      //publicacion.texto = "Morbi mattis ornare ornare. Duis quam turpis, gravida at leo elementum elit fusce accumsan dui libero, quis vehicula lectus ultricies eu. In convallis amet leo non sapien iaculis efficitur consequat lorem ipsum.";

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

      //console.log('linkList->'+publicacion.linkList);
      //console.log('imageList->'+publicacion.imageList);

      publicacion.comentarioList = [
          {
              "texto":"La plantilla de fractal realmente es genial! el color azul que utiliza me resulta fascinante.\n Podría ser bastante útil manipular su css para hacer relevantes algunos elementos del diseño. :D",
              "fecha":"2017-10-28",
              "multimediaList":[],
              "usuario":'JuanCho'
          },
          {
              "texto":"Yo no haría modificaciones del diseño, me resulta genial. Me enfocaría en implementar algunas librerías interactivas que me permitan adicionar contenido sobre las publicaciones. :P",
              "fecha":"2017-10-29",
              "multimediaList":[],
              "usuario":"PepitoRocks"
          },
          {
              "texto":"No me gusta para nada esta plantilla, a pesar de que es responsive y anda muy bien en muchos dispositivos, me parece que no maneja unos colores adecuados. :@",
              "fecha":"2017-10-30",
              "multimediaList":[],
              "usuario":"ManuelHorse"
          }
      ];

      //Necesitamos definir una lista de comentarios por publicación

      //Hacer el llamado al servicio web REST, al endpoint the publicaciones y comentarios
      //haciendo uso de GET y la url respectiva, para alimentar las listas de publicación y comentarios



  });
