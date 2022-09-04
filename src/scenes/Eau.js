
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

		/** @type {Phaser.GameObjects.Image} */
		this.nemo;


		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// rectangle_1
		const rectangle_1 = this.add.rectangle(-228, 128, 128, 128);
		rectangle_1.isFilled = true;

		// nemo
		const nemo = this.add.image(91, 378, "nemo");
		nemo.scaleX = 0.32087044107078544;
		nemo.scaleY = 0.32087044107078544;
		nemo.flipX = true;

		this.nemo = nemo;

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


		for (let index = 0; index < 200; index++) {
			const random_x = Phaser.Math.Between(0, width * 20);
			const random_y = Phaser.Math.Between(0, height);

			// const element = array[index];
			this.add.image(random_x, random_y, 'bubble').setAlpha(0.8)
			
		}



        const n = this.physics.add.existing(this.nemo);
		n.body.setBounce(20, 20);
		n.body.setDrag(0.9);
		n.body.setVelocityX(500)
		this.nemo.setDepth(10)
		this.cameras.main.startFollow(this.nemo, false, 1, 1, -400);

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


		if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
			this.nemo.body.setVelocityY(-200)
			// this.nemo.body.setDrag(40);
		}

		if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
			this.nemo.body.setVelocityY(0)
			// this.nemo.body.setDrag(40);
		}




	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
