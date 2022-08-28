
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dino
		const dino = this.add.image(400, 218, "dino");

		// Jouer
		const jouer = this.add.text(400, 408, "", {});
		jouer.setOrigin(0.5, 0.5);
		jouer.text = "JOUER";
		jouer.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// Eau
		const eau = this.add.text(401.36339477651865, 470.62087213995585, "", {});
		eau.setOrigin(0.5, 0.5);
		eau.text = "Eau";
		eau.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// dino (components)
		new PushOnClick(dino);

		this.jouer = jouer;
		this.eau = eau;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	jouer;
	/** @type {Phaser.GameObjects.Text} */
	eau;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		const self = this;
		this.jouer
			.setInteractive()
			.on('pointerdown', function () {
				self.scene.start('Jeu');
			});
		this.eau
			.setInteractive()
			.on('pointerdown', function () {
				self.scene.start('Eau');
			});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
