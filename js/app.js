var app = angular.module('oglit', ['oglit.controllers', 'oglit.services', 'firebase'])
	.constant('firebaseUrl', 'https://oglit-web.firebaseio.com/');

//Configuración de rutas de la aplicacion web
app.config(function($stateProvider, $urlRouterProvider, firebaseUrl){
	
	// defino rutas
	$stateProvider
		// ruta para el home principal
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'mainVm'
		})
		// ruta para la pagina de servicios
		.state('servicios', {
			url: '/servicios',
			templateUrl: 'partials/servicios.html',
			controller: 'ServiciosCtrl'
		})
		// ruta para el portafolio de servicios
		.state('portafolio',{
			url: '/portafolio',
			templateUrl: 'partials/portafolio.html',
			controller: 'PortafolioCtrl'
		})
		// ruta para el formulario de contacto
		.state('contacto',{
			url: '/contacto',
			templateUrl: 'partials/contacto.html',
			controller: 'ContactoCtrl'
		})

		// ruta exclusiva para miembros ingresados
		.state('private', {
			url: '/private',
			templateUrl: 'partials/private.html',
			controller: 'PrivateCtrl',
			// prueba para exigir authenticacion 
			resolve: {
				'currentAuth': ['$firebaseAuth', function($firebaseAuth){
					// $requireAuth retorna promesa si esta autenticado, rechaza sino
					var ref = new Firebase(firebaseUrl);
					var authObj = $firebaseAuth(ref);

					return authObj.$requireAuth();
				}]
			}
		});


		// si no ingresan ninguna de las rutas anteriores lo mando por default al home
		$urlRouterProvider.otherwise('/');

});