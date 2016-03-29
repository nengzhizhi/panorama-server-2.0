(function(){
	'use strict';
	angular
		.module('com.module.entrance')
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.entrance', {
					abstract: true,
					url: '/entrance',
					templateUrl: 'modules/entrance/views/main.html'
				})
				.state('app.entrance.list', {
					url: '/list',
					templateUrl: 'modules/entrance/views/list.html',
					controllerAs: 'ctrl',
					controller: function ($state, entrances, EntranceService) {
						this.entrances = entrances;
						this.deleteEntrance = function(id){
							EntranceService.deleteEntrance(id, function(){
								$state.go($state.current, {}, {reload: true});
							})
						}
					},
					resolve: {
						entrances: function (EntranceService) {
							return EntranceService.getEntrances();
						}
					}
				})
				.state('app.entrance.add', {
					url: '/add',
					templateUrl: 'modules/entrance/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, EntranceService, entrance) {
						this.entrance = entrance;
						this.formFields = EntranceService.getFormFields();
						this.formOptions = {};

						this.submit = function () {
							EntranceService.upsertEntrance(this.entrance).then(function (entrance) {
								$state.go('app.entrance.edit');
							})
						}
					},
					resolve: {
						entrance: function () {
						}
					}
				})
				.state('app.entrance.edit', {
					url: '/edit/:id',
					templateUrl: 'modules/entrance/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, entrance, EntranceService) {
						this.entrance = entrance;
						this.formFields = EntranceService.getFormFields();
						this.formOptions = {};
						this.submit = function () {
							EntranceService.upsertEntrance(this.entrance).then(function () {
								$state.go($state.current, {}, { reload: true });
							})
						}
					},
					resolve: {
						entrance: function ($stateParams, EntranceService) {
							return EntranceService.getEntrance($stateParams.id);
						}
					}
				})
		})
})();
