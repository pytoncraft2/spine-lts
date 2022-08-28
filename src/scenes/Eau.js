
// You can write more code here

/* START OF COMPILED CODE */

class Eau extends Phaser.Scene {

	constructor() {
		super("Eau");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// sea_background
		this.add.image(903, 193, "sea_background");

		// farground
		this.add.image(915, 188, "farground");

		// mid_background
		this.add.image(907, 287, "mid_background");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		const width = this.scale.width
		const height = this.scale.height
		this.cursors = this.input.keyboard.createCursorKeys();

	}

	update() {
		const cam = this.cameras.main
		const speed = 3;

		if (this.cursors.left.isDown) {
			cam.scrollX -= speed
		}

		if (this.cursors.right.isDown) {
			cam.scrollX += speed
		}


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
