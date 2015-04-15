var app = angular.module('physics', [ 'n3-line-chart' ]);

app.controller('graphs', [ '$scope', function($scope) {
	// $scope.data = [];
      // for (var i = 0; i < 20; i++) {
      //   for (var j = 0; j < 20; j++) {
      //     var row = $scope.data[j] || {x: j};
      //     row['val_' + i] = Math.abs((i+1)*100000 + parseInt(Math.cos(j)*200000));
      //     $scope.data[j] = row;
      //   }
      // }
      // 
    var frames = obj.getFrame();
    $scope.positions = [];
    $scope.velocities = [];
    $scope.accelerations = [];

    for(var i in frames)
    {
    	$scope.velocities.push({
    		x: i,
    		val: frames[i].velocity,
    	});
    	$scope.positions.push({
    		x: i,
    		val: frames[i].distance,
    	});
    	$scope.accelerations.push({
    		x: i,
    		val: frames[i].acceleration,
    	});
    }


	$scope.options = {
		axes: {x: {type: "number", key: "x",max: frames.length}, y: {type: "linear"}},
		series: [
			{
				y: "val",
				label: "Function",
				color: "#9467bd",
				axis: "y",
				type: "line",
				thickness: "2px",
				dotSize: 3,
				id: "series"
			}
		],
		tooltip: {
			mode: "scrubber",
			formatter: function (x, y, series) {
				// return moment(x).fromNow() + ' : ' + y;
				return y;
			}
		},
		stacks: [],
		lineMode: "linear",
		tension: 0.7,
		drawLegend: true,
		drawDots: true,
		columnsHGap: 5
	};

}])