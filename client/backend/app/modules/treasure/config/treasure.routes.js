(function(){
	'use strict';
	angular
		.module('com.module.treasure')
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.treasure', {
					abstract: true,
					url: '/treasure',
					templateUrl: 'modules/treasure/views/main.html'
				})
				.state('app.treasure.list', {
					url: '/list',
					templateUrl: 'modules/treasure/views/list.html',
					controllerAs: 'ctrl',
					controller: function ($state, treasures, TreasureService) {
						this.treasures = treasures;
						this.deleteTreasure = function(id){
							TreasureService.deleteTreasure(id, function(){
								$state.go($state.current, {}, {reload: true});
							})
						}
					},
					resolve: {
						treasures: function (TreasureService) {
							return TreasureService.getTreasures();
						}
					}
				})
				.state('app.treasure.add', {
					url: '/add',
					templateUrl: 'modules/treasure/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, TreasureService, treasure) {
						this.treasure = treasure;
						this.formFields = TreasureService.getFormFields();
						this.formOptions = {};

						this.submit = function () {
							this.treasure.start_time = new Date(this.treasure.start_date).getTime();
							this.treasure.end_time = new Date(this.treasure.end_date).getTime();
							delete this.treasure.start_date;
							delete this.treasure.end_date;

							TreasureService.upsertTreasure(this.treasure).then(function (treasure) {
								$state.go('app.treasure.edit');
							})
						}
					},
					resolve: {
						treasure: function () {
						}
					}
				})
				.state('app.treasure.edit', {
					url: '/edit/:id',
					templateUrl: 'modules/treasure/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, treasure, TreasureService) {
						this.treasure = treasure;
						this.formFields = TreasureService.getFormFields();
						this.formOptions = {};
						this.submit = function () {
							TreasureService.upsertTreasure(this.treasure).then(function () {
								$state.go($state.current, {}, { reload: true });
							})
						}
					},
					resolve: {
						treasure: function ($stateParams, TreasureService) {
							return TreasureService.getTreasure($stateParams.id);
						}
					}
				})			
		})
})();
