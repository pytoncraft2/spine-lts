
// You can write more code here

const createAligned = (scene, totalWidth, texture, scrollFactor) => {
	const w = scene.textures.get(texture).getSourceImage().width
	const count = Math.ceil(totalWidth / w) * scrollFactor

	let x = 0;
	for (let i = 0; i < count; i++) {
		// const element = array[i];

		const m = scene.add.image(x, scene.scale.height, texture)
			.setScrollFactor(scrollFactor)
			.setOrigin(0, 1)
		x += m.width
	}
}

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

		// rectangle_1
		const rectangle_1 = this.add.rectangle(-295, 118, 128, 128);
		rectangle_1.isFilled = true;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		const width = this.scale.width
		const height = this.scale.height

		const totalWidth = width * 20


		this.cameras.main.setBounds(0, 0, width * 20, height)
		this.cursors = this.input.keyboard.createCursorKeys();

		createAligned(this, totalWidth, "sea_background", 0.1)
		createAligned(this, totalWidth, "farground", 0.25)
		createAligned(this, totalWidth, "mid_background", 0.5)

	}

	update() {
		const cam = this.cameras.main
		const speed = 20;

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
