(function(){
  'use strict';
  angular
    .module('com.module.treasure')
    .service('TreasureService', function (CoreService, $state, Treasure, Hotspot) {
      this.getTreasure = function (id) {
        return Treasure.findById({id: id}).$promise;
      }

      this.getTreasures = function () {
        return Treasure.find().$promise;
      }

      this.upsertTreasure = function (treasure, successCb, cancelCb) {
				return Treasure.upsert(treasure).$promise.then(function () {
					CoreService.alertSuccess('保存成功！', '', successCb);
				}, function (err) {
					CoreService.alertError('保存失败！', err && err.statusText, cancelCb);
				})
			}

			this.deleteTreasure = function (id, successCb, cancelCb) {
				CoreService.confirm('确定删除？', '删除后无法恢复', function () {
					Treasure.deleteById(id).$promise.then(function () {
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
              label: '名称',
  						required: true
  					}
    			}, {
            key: 'start_date',
            type: 'datepicker',
            templateOptions: {
              label: '开始日期'
            }
          }, {
            key: 'end_date',
            type: 'datepicker',
            templateOptions: {
              label: '结束日期'
            }
          }, {
            key: 'thumbnail',
            type: 'input',
            templateOptions: {
              label: '缩略图',
              required: true
            }
          }, {
            key: 'quantity',
            type: 'input',
            templateOptions: {
              label: '数量',
              required: true
            }
          }
    		]
    		return form;
    	}
    })
})();
