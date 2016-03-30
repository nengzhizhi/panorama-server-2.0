(function(){
	'use strict';
	angular
		.module('com.module.hotspot')
		.config(function ($stateProvider) {
			$stateProvider
				.state('app.hotspot', {
					abstract: true,
					url: '/hotspot',
					templateUrl: 'modules/hotspot/views/main.html'
				})
				.state('app.hotspot.list', {
					url: '/list',
					templateUrl: 'modules/hotspot/views/list.html',
					controllerAs: 'ctrl',
					controller: function ($state, hotspots, HotspotService) {
						this.hotspots = hotspots;
						this.hotspotType = HotspotService.hotspotType;
						this.deleteHotspot = function(id){
							HotspotService.deleteHotspot(id, function(){
								$state.go($state.current, {}, {reload: true});
							})
						}
					},
					resolve: {
						hotspots: function (HotspotService) {
							return HotspotService.getHotspots();
						}
					}
				})
				.state('app.hotspot.add', {
					url: '/add',
					templateUrl: 'modules/hotspot/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, HotspotService, hotspot) {
						this.hotspot = hotspot;
						this.formFields = HotspotService.getFormFields();
						this.formOptions = {};

						this.submit = function () {
							HotspotService.upsertHotspot(this.hotspot).then(function (hotspot) {
								$state.go('app.hotspot.edit');
							})
						}
					},
					resolve: {
						hotspot: function () {
						}
					}
				})
				.state('app.hotspot.edit', {
					url: '/edit/:id',
					templateUrl: 'modules/hotspot/views/form.html',
					controllerAs: 'ctrl',
					controller: function ($state, hotspot, HotspotService) {
						this.hotspot = hotspot;
						this.formFields = HotspotService.getFormFields();
						this.formOptions = {};
						this.submit = function () {
							HotspotService.upsertHotspot(this.hotspot).then(function () {
								$state.go($state.current, {}, { reload: true });
							})
						}
					},
					resolve: {
						hotspot: function ($stateParams, HotspotService) {
							return HotspotService.getHotspot($stateParams.id);
						}
					}
				})
		})
})();
