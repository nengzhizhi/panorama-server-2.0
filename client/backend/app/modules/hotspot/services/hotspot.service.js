(function(){
  'use strict';
  angular
    .module('com.module.hotspot')
    .service('HotspotService', function (CoreService, $state, Hotspot) {
      this.getHotspot = function (id) {
        return Hotspot.findById({id: id}).$promise;
      }

      this.getHotspots = function () {
        return Hotspot.find().$promise;
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

      this.hotspotType = {
        // center_picture: '居中图片',
        // center_video: '居中视频',
        // hotspot_picture: '热点图片',
        // hotspot_video: '热点视频',
        // wx_hongbao: '微信红包'
        merchandise: '商品',
        wx_hongbao: '微信红包',
        coupon: '优惠券',
        description: '描述介绍'
      }

      this.getFormFields = function(){
    		var form = [
          {
            key: 'type',
            type: 'select',
            templateOptions: {
              label: '热点类型',
              options: [
                // {name: '居中图片', value: 'center_picture'},
                // {name: '居中视频', value: 'center_video'},
                // {name: '热点图片', value: 'hotspot_picture'},
                // {name: '热点视频', value: 'hotspot_video'},
                // {name: '微信红包', value: 'wx_hongbao'},
                { name: '商品', value: 'merchandise' },
                { name: '微信红包', value: 'wx_hongbao' },
                { name: '优惠券', value: 'coupon' },
                { name: '描述介绍', value: 'description' }
              ],
              required: true
            }
          }, {
            key: 'x',
            type: 'input',
            templateOptions: {
              label: 'X坐标',
              required: true
            }
          }, {
            key: 'y',
            type: 'input',
            templateOptions: {
              label: 'Y坐标',
              required: true
            }
          }, {
            key: 'radius',
            type: 'input',
            templateOptions: {
              label: '热点半径',
              required: true
            }
          }, {
            key: 'resource',
            type: 'textarea',
            templateOptions: {
              label: '热点素材',
              required: true
            }
          }
    		]
    		return form;
    	}
    })
})();
