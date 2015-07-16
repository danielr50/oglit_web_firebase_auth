var app = angular.module('oglit.controllers', ['ui.router']);

// controladr para home
app.controller('HomeCtrl', ['$scope', '$state', function($scope, $state){
	$scope.tagLine = 'Proyectos que extienden posibilidades';

	var vm = this;
	vm.navigateTo = function(state){
		console.log('hola');
		$state.go(state);
	}
}]);

// controladr para servicios
app.controller('ServiciosCtrl', ['$scope', function($scope){
	$scope.title = 'Nuestros servicios';

}]);

// controladr para prtafolio
app.controller('PortafolioCtrl', ['$scope', function($scope){
	$scope.title = 'Nuestros clientes';
}]);

// controladr para contacto
app.controller('ContactoCtrl', ['$scope', function($scope){
	$scope.title = 'Formulario de contacto';

	$scope.sendMail = function(){
		
	}

}]);

// controllador que maneja oauth con firebase
app.controller('loginController', ['$scope', '$firebaseAuth', '$firebaseObject', '$state', 'firebaseUrl', function($scope, $firebaseAuth, $firebaseObject, $state, firebaseUrl){
	var vm = this;
	vm.isLoggedIn = false;
	// referencia firebase
	var ref = new Firebase(firebaseUrl);
	var authObj = $firebaseAuth(ref);

	//inicializar y obtener estado autenticado actual
	init();
	// definir funcion init()
	function init(){
		authObj.$onAuth(authDataCallback);
		if(authObj.$getAuth()){
			vm.isLoggedIn = true;
		}
	}
	// authDataCallback es un callback llamado cada vez que el estado de auth cambia 
	// en login o logout este metodo authDataCallback es llamado
	function authDataCallback(authData){
		if(authData){
			// authData contiene toda la info de este estado que esta autenticado
			console.log('User '+authData.uid+' esta loggeado con '+authData.provider);
			vm.isLoggedIn = true;
			//authData.uid contiene el user id devuelto por el provider eg.facebook
			var user = $firebaseObject(ref.child('usuarios').child(authData.uid));
			// checkear en firebase si existe ya el usuario y sino lo creo
			user.$loaded().then(function(){
				if(user.name == undefined){
					var newUser = {
						//???? que carajos?
						rooms: [],
						maxRooms: 5 
					};
					if(authData.facebook){
						newUser.name = authData.facebook.displayName;
					} 
					user.$ref().set(newUser);
				}
			});
		} else {
			console.log('User esta logged out');
			vm.isLoggedIn = false;
		}
	}
	vm.logout = function(){
		ref.unauth();
		$state.go('home');
	}

	//
	firebaseAuthLogin = function(provider){
		authObj.$authWithOAuthPopup(provider).then(function(authData){
			console.log('Autenticación exitosa con proveedor '+provider+' con payload (carga útil) ', authData);
		}).catch(function(error){
			console.error("LA AUTENTICACION FALLO:", error);
		});
	}
	vm.facebookLogin = function(){
		firebaseAuthLogin('facebook');
	}
}]); // fin controlador loginController



app.controller('PrivateCtrl', ['$scope', function($scope){
	
}]);	