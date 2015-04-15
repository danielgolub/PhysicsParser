# PhysicsPraser
This project enables you to calculate just about any parameter of movement - position, velocity and acceleration.

## How it works?
You devide your "symfony" into scenes. Each scene has to contain the final velocity, initial velocity and the time its active that way.
For example, you can create the following scene:
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

The PhysicsParser engine will calculate all the relevant details about each second of the "symfony". It will understand you have 24 seconds, and it will calculate everything about it.
You use getters to utilize the engine.
<br />
The basic file you need to run is physicsparser.js. All other files just visualize your data thanks to the D3 proccessor and relevant AngularJS components.

### Good luck! :)