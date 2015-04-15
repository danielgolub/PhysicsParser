function PhysicsParser(scenes, initialDistance, initialSpeed, initialAcceleration)
{
	// initial distance from axis
	var distance = (typeof(initialDistance) == 'undefined') ? 0 : initialDistance;

	// ticks of the whole play
	var ticks = 0;

	// frames of the whole play - combining all the scenes
	var frames = [];

	// rest periods array
	var rest = [];

	// set the initial settings of the first frame
	frames[ticks] = {
		distance: distance,
		velocity: (typeof(initialSpeed) == 'undefined') ? 0 : initialSpeed,
		acceleration: (typeof(initialAcceleration) == 'undefined') ? 0 : initialAcceleration,
	};
	ticks++;

	// iterate through the different scenes to create the whole play
	for(var i in scenes) {

		// current section
		var section = scenes[i];

		// inner clock of the scene
		var innerTick = 1;

		// acceleration = delta velocity / delta time
		var acceleration = (section.finalVelocity - section.initialVelocity) / section.time;

		// devide for frames of the current scene
		for(var tick = ticks;tick<ticks+section.time;tick++) {
			
			// add the current frame and calculate all the required parameters
			frames[tick] = {
				velocity: section.initialVelocity + acceleration * innerTick,
				acceleration: acceleration,
			};

			frames[tick].distance = distance + section.initialVelocity*innerTick + 0.5*acceleration*innerTick*innerTick;
			innerTick++; // keep the inner clock tick

		}

		// now add the distance of the current scene to the next ones
		distance = frames[frames.length-1].distance;

		// keep the global clock of the play synced
		ticks += section.time;

		// if current scene has no movement at all. delta v = 0 && delta a == 0
		// than add the final time of the scene to the rest array
		if(frames[ticks-1].velocity == 0 && acceleration == 0) {
			rest.push(frames[ticks-1]);
			rest[rest.length-1].time = ticks-1;
		}
	}

	// we increment the ticks variable each time the loop runs.
	// than the last one is meaningless
	ticks--;

	// we can print the whole frames array
	// console.log(frames);

	// we use getters to pass the relevant frame/s to the variable
	this.getFrame = function(time) {
		return (typeof(time) == 'undefined') ? frames : frames[time];
	}

	this.getDistanceWhenResting = function() {
		return rest;
	}

	this.getAverageSpeed = function(initialTime, finalTime) {
		// if no initial time set, get the average speed from 0
		if(typeof(initialTime) == 'undefined')
			initialTime = 0;

		// if no final time set, get the averate speed until the final tick of the play
		if(typeof(finalTime) == 'undefined')
			finalTime = ticks;

		// delta x / delta t
		return (frames[finalTime].distance - frames[initialTime].distance) / (finalTime - initialTime);
	}
}


var obj = new PhysicsParser([
	// every object is a scene
	{
		initialVelocity: 0,
		finalVelocity: 4,
		time: 2,
	},
	{
		initialVelocity: 4,
		finalVelocity: 4,
		time: 6,
	},
	{
		initialVelocity: 4,
		finalVelocity: 6,
		time: 4,
	},
	{
		initialVelocity: 6,
		finalVelocity: 0,
		time: 2,
	},
	{
		initialVelocity: 0,
		finalVelocity: 0,
		time: 2,
	},
	{
		initialVelocity: 0,
		finalVelocity: -4,
		time: 2,
	},
	{
		initialVelocity: -4,
		finalVelocity: -4,
		time: 6,
	},
]);

// 1)
console.log("Distance when resting first time: "+obj.getDistanceWhenResting()[0].distance);

// 2)
console.log("Acceleration after 1 second: "+obj.getFrame(1).acceleration);
console.log("Acceleration after 5 second: "+obj.getFrame(5).acceleration);
console.log("Acceleration after 10 second: "+obj.getFrame(10).acceleration);
console.log("Acceleration after 17 second: "+obj.getFrame(17).acceleration);

// 3)
//   a.
console.log("Distance after 24 seconds: "+obj.getFrame(24).distance);
console.log("Distance after 15 seconds: "+obj.getFrame(15).distance);
//   b.
console.log("Average speed for 12-16 seconds: "+obj.getAverageSpeed(12, 16));
console.log("Average speed for the whole play: "+obj.getAverageSpeed());