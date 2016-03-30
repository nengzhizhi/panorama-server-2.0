(function(){
  'use strict';
  angular
    .module('com.module.entrance')
    .service('EntranceService', function (CoreService, $state, Entrance, Hotspot) {
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

      this.getHotspots = function (entranceId) {
        return Hotspot.find({
          entranceId: entranceId
        }).$promise;
      }

      this.getHotspot = function (id) {
        return Hotspot.findById({
          id: id
        }).$promise;
      }     

      this.upsertHotspot = function (hotspot, successCb, cancelCb) {
        return Hotspot.upsert(hotspot).$promise.then(function () {
          CoreService.alertSuccess('保存成功！', '', successCb);
        }, function (err) {
          CoreService.alertError('保存失败！', err && err.statusText, cancelCb);
        })        
      }

      this.deleteHotspot = function (id, successCb, cancelCb) {
        CoreService.confirm('确定删除？', '删除后无法恢复', function () {
          Hotspot.deleteById(id).$promise.then(function () {
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
            key: 'source_type',
            type: 'select',
            templateOptions: {
              label: '源类型',
              options: [
                {name: '视频点播', value: 'vod'},
                {name: '视频直播', value: 'live'},
                {name: '全景图片', value: 'picture'}
              ],
              required: true
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

      this.getHotspotFormFields = function(){
        var form = [
          {
            key: 'type',
            type: 'select',
            templateOptions: {
              label: '热点类型',
              options: [
                {name: '居中图片', value: 'center_picture'},
                {name: '居中视频', value: 'center_video'},
                {name: '热点图片', value: 'hotspot_picture'},
                {name: '热点视频', value: 'hotspot_video'},
                {name: '微信红包', value: 'wx_hongbao'},
              ],
              required: true
            }
          }, {
            key: 'x',
            type: 'input',
            templateOptions: {
              label: 'X坐标',
              required: true,
              type: 'input'
            }
          }, {
            key: 'y',
            type: 'input',
            templateOptions: {
              label: 'Y坐标',
              required: true,
              type: 'input'
            }
          }, {
            key: 'radius',
            type: 'input',
            templateOptions: {
              label: '热点半径',
              required: true,
              type: 'input'
            }
          }, {
            key: 'resource',
            type: 'input',
            templateOptions: {
              label: '热点素材',
              required: true,
              type: 'input'
            }
          }
        ]
        return form;
      }

    })
})();
