var async = require('async');

module.exports = function (Treasure) {
	Treasure.open = function (client, cb) {
		var ExchangeModel = Treasure.app.models.TreasureExchange;

		function draw (candidates) {
			var length = candidates.length;
			if (length >0 && Math.random() > 0.5) {
				var cursor = Math.random() * (length - 1);
				return candidates[cursor].quantity > 0 ? candidates[cursor] : null;
			} else {
				return null;
			}
		}

		function generateKey () {
			var chars = 'ABCDEFGHJKMNPQRSTWXYZ012345678';

			var key = '';
			for (var i = 0; i < 4; i ++) {
				for (var j = 0; j < 4; j ++) {
					key += chars.charAt(Math.floor(Math.random() * chars.length));
				}

				if (i<3)
					key += '-';
			}

			return key;
		}

		async.waterfall([
			function getTreasures (next) {
				Treasure.find(next);
			}, function drawTreasure (treasures, next) {
				var currentTime = new Date();
				var candidate, candidates = [];

				for (var i in treasures) {
					if (treasures[i].start_time < currentTime && treasures[i].end_time > currentTime) {
						candidates.push(treasures[i]);
					}
				}

				candidate = draw(candidates);

				next(null, candidate);

			}, function updateTreasure (treasure, next) {
				if (!!treasure) {
					treasure.quantity = treasure.quantity - 1;

					Treasure.upsert(treasure, next);
				} else {
					next(null, null);
				}
			}, function updateExchange (treasure, next) {
				if (!!treasure) {
					ExchangeModel.create({
						key: generateKey(),
						status: 'available',
						client: client,
						created: new Date(),
						treasureId: treasure.id
					}, next);
				} else {
					next(null, null);
				}
			}
		], function (err, result) {
			cb(err, result);
		})
	}

	Treasure.remoteMethod('open', {
		accepts: [
			{ arg: 'client', type: 'string' }
		],
		returns: { root: true },
		http: { path: '/open', verb: 'post' }
	})
}