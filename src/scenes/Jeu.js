
// You can write more code here

const SPINEBOY_KEY = 'spineboy'
class S extends Phaser.Scene {

  constructor() {
    super({
      key: "Jeu",
      pack: {
        files: [{
          type: 'scenePlugin',
          key: 'SpinePlugin',
          url: 'SpinePlugin.min.js',
          sceneKey: 'spine'
        }]
      }
    });

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		console.log("class sssssssssssssss");
	}

	/* END-USER-CODE */
}


/* START OF COMPILED CODE */

class Jeu extends S {

	constructor() {
		super("Jeu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// text_1
		const text_1 = this.add.text(32, 21, "", {});
		text_1.text = "Jeuxxxxxx";

		// text
		const text = this.add.text(697, 24, "", {});
		text.text = "Abeilles";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	preload() {
		this.load.setPath('assets/spine/images')
		this.load.spine('spineboy', 'spineboy-pro.json', 'spineboy-pro.atlas')
	}

	// Write your code here

	create() {
		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E,R,TAB")
		const startAnim = 'idle'
		this.spineBoy = this.createSpineBoy(startAnim)
	}

	createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(1000, 647, SPINEBOY_KEY, startAnim, true)
		spineBoy.setSize(280, 680);
		this.physics.add.existing(spineBoy);
		spineBoy.body.allowGravity = false
		// spineBoy.body.setOffset(0, 50);

		var anims = spineBoy.getAnimationList();
		console.log(anims);

		spineBoy.scaleX = 0.5
		spineBoy.scaleY = 0.5

		return spineBoy
	}

	update() {
		const { right, left, up, down, space, A, Z, E, R, TAB } = this.keyboard

		if (right.isDown) this.spineBoy.body.setVelocityX(300)
		if (left.isDown) this.spineBoy.body.setVelocityX(-300)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

