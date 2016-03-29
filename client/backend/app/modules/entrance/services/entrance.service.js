(function(){
  'use strict';
  angular
    .module('com.module.entrance')
    .service('EntranceService', function (CoreService, $state, Entrance) {
      this.getEntrance = function (id) {
        return Entrance.findById({id: id}).$promise;
      }

      this.getEntrances = function () {
        return Entrance.find().$promise;
      }

      this.upsertEntrance = function (entrance, successCb, cancelCb) {
				return Entrance.upsert(entrance).$promise.then(function () {
					CoreService.alertSuccess('保存成功！', '', successCb);
				}, function (err) {
					CoreService.alertError('保存失败！', err && err.statusText, cancelCb);
				})
			}

			this.deleteEntrance = function (id, successCb, cancelCb) {
				CoreService.confirm('确定删除？', '删除后无法恢复', function () {
					Entrance.deleteById(id).$promise.then(function () {
						CoreService.alertSuccess('删除成功！', '', successCb);
					}, function (err) {
						CoreService.alertError('删除失败！', err, cancelCb);
					});
				})
			}


      this.getFormFields = function(){
    		var form = [
    			{
  					key: 'title',
  					type: 'input',
  					templateOptions: {
              label: '入口名称',
  						required: true,
  						type: 'input'
  					}
    			}, {
            key: 'thumbnail',
            type: 'input',
            templateOptions: {
              label: '缩略图',
              required: true,
              type: 'input'
            }
          }, {
            key: 'source_value',
            type: 'input',
            templateOptions: {
              label: '源地址',
              required: true,
              type: 'input'
            }
          }
    		]
    		return form;
    	}
    })
})();
