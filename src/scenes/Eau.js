
// You can write more code here

/* START OF COMPILED CODE */

class Eau extends Phaser.Scene {

	constructor() {
		super("Eau");

		/** @type {Phaser.GameObjects.Image} */
		this.mer_loin;
		/** @type {Phaser.GameObjects.Image} */
		this.algue_milieu;
		/** @type {Phaser.GameObjects.Image} */
		this.algue_proche;


		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// mer_loin
		const mer_loin = this.add.image(903, 193, "sea_background");

		// algue_milieu
		const algue_milieu = this.add.image(915, 188, "farground");

		// algue_proche
		const algue_proche = this.add.image(907, 287, "mid_background");

		// rectangle_1
		const rectangle_1 = this.add.rectangle(-528, 155, 128, 128);
		rectangle_1.isFilled = true;

		this.mer_loin = mer_loin;
		this.algue_milieu = algue_milieu;
		this.algue_proche = algue_proche;

		this.events.emit("scene-awake");
	}


	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		const width = this.scale.width
		const height = this.scale.height


		this.cameras.main.setBounds(0, 0, width * 3, height)
		this.cursors = this.input.keyboard.createCursorKeys();

		this.mer_loin
			.setScrollFactor(0)
		
		this.algue_milieu
			.setScrollFactor(0.25)
		
		this.algue_milieu
			.setScrollFactor(0.5)

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
