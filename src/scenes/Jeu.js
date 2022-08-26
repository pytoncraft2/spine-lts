
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
		this.editorCreate()
		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E,R,TAB")
		const startAnim = 'idle'
		this.spineBoy = this.createSpineBoy(startAnim)
		this.platformes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});

		this.createPlatformes()
	}

	createPlatformes() {
		const p1 = this.physics.add.existing(this.rectangle);
		const p2 = this.physics.add.existing(this.rectangle_1);
		const p3 = this.physics.add.existing(this.rectangle_2);
		const p4 = this.physics.add.existing(this.rectangle_3);
		this.platformes.addMultiple([p1, p2, p3, p4], true);   // array of game objects

		this.physics.add.collider([p1, p2, p3, p4], this.spineBoy);

	}

	preload() {
		this.load.setPath('assets/spine/images')
		this.load.spine('spineboy', 'spineboy-pro.json', 'spineboy-pro.atlas')
	}

	createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(1000, 547, SPINEBOY_KEY, startAnim, true)
		// spineBoy.setSize(280, 680);
		this.physics.add.existing(spineBoy);
		// spineBoy.body.allowGravity = false
		// spineBoy.body.setOffset(0, 50);

		var anims = spineBoy.getAnimationList();
		console.log(anims);
		this.cameras.main.startFollow(spineBoy, true);
		this.cameras.main.setZoom(0.4)
		// camera.originY = 0.5;

		// camera.originY = 0.5;

		this.cameras.main.originY = 0.8

		// spineBoy.scaleX = 0.5
		// spineBoy.scaleY = 0.5

		return spineBoy
	}

	update() {
		const { right, left, up, down, space, A, Z, E, R, TAB } = this.keyboard

				if (right.isDown) this.spineBoy.body.setVelocityX(500)
		if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
		if (Phaser.Input.Keyboard.JustDown(space)) this.spineBoy.body.setVelocityY(-600);




    // const size = this.animationNames.length
    const startAnim = this.spineBoy.getCurrentAnimation().name
    const bounds = this.spineBoy.getBounds()
    const width = bounds.size.x
    const height = bounds.size.y
    let velocityR;
    let walk2 = false;

    if (A.isDown && startAnim !== 'shoot') {
      this.spineBoy.play('shoot')
    }

    // if (TAB.isDown && startAnim !== 'run') {
      // this.spineBoy.play('run')
    // }

    if (right.isDown) {

      if (startAnim === 'jump') return;

      if (startAnim !== 'walk' && walk2 === false) {
        //   this.spineBoy.body.setSize(280, 680)
      if (TAB.isDown) {
          this.spineBoy.body.setVelocityX(1000)
          if (startAnim !== 'run') {
          this.spineBoy.play('run')
          }
        } else {
          this.spineBoy.body.setVelocityX(500)
          if (startAnim !== 'walk') {
          this.spineBoy.play('walk')
          }
        }
        //   this.spineBoy.scaleX = 0.5;
        //   this.spineBoy.body.setOffset(0 , 0)
          this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
          this.spineBoy.body.setVelocityX(0)
        })
      }
    }

    if (left.isDown) {

      if (startAnim === 'jump') return;
      walk2 = true;
      if (startAnim !== 'walk' && walk2 === true) {
      if (TAB.isDown) {
          this.spineBoy.body.setVelocityX(-800)
          if (startAnim !== 'run') {
          this.spineBoy.play('run')
          }
        } else {
          this.spineBoy.body.setVelocityX(-500)
          if (startAnim !== 'walk') {
          this.spineBoy.play('walk')
          }
        }
        //   this.spineBoy.scaleX = -0.5;
        //   this.spineBoy.body.setOffset(280 , 0)
          this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
          this.spineBoy.body.setVelocityX(0)
          walk2 = false;
        })
      }
    }

    if (space.isDown) {
      if (startAnim !== 'jump') {
        this.spineBoy.play('jump');
        this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
        })
      }
    }
		// if (right.isDown) this.spineBoy.body.setVelocityX(300)
		// if (left.isDown) this.spineBoy.body.setVelocityX(-300)
		// if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
	}

	/* END-USER-CODE */
}


/* START OF COMPILED CODE */

class Jeu extends S {

	constructor() {
		super("Jeu");

		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_1;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_2;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_3;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_4;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_5;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_6;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_7;


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

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 642, 128, 128);
		rectangle_1.scaleX = 245.77442353486657;
		rectangle_1.scaleY = 0.46001435037811433;
		rectangle_1.setOrigin(0, 0.5);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 2978887;
		rectangle_1.fillAlpha = 0.8;

		// rectangle_2
		const rectangle_2 = this.add.rectangle(115, 387, 128, 128);
		rectangle_2.isFilled = true;

		// rectangle
		const rectangle = this.add.rectangle(5051, 368, 128, 128);
		rectangle.isFilled = true;

		// rectangle_3
		const rectangle_3 = this.add.rectangle(9320, 435, 128, 128);
		rectangle_3.isFilled = true;

		// rectangle_4
		const rectangle_4 = this.add.rectangle(15668.007278312867, 469.24294012694793, 128, 128);
		rectangle_4.isFilled = true;

		// rectangle_5
		const rectangle_5 = this.add.rectangle(20692.5606809858, 448.9306140583136, 128, 128);
		rectangle_5.isFilled = true;

		// rectangle_6
		const rectangle_6 = this.add.rectangle(24903.73512643745, 489.6182898597788, 128, 128);
		rectangle_6.isFilled = true;

		// rectangle_7
		const rectangle_7 = this.add.rectangle(28321.499893760527, 489.6182898597788, 128, 128);
		rectangle_7.isFilled = true;

		this.rectangle_1 = rectangle_1;
		this.rectangle_2 = rectangle_2;
		this.rectangle = rectangle;
		this.rectangle_3 = rectangle_3;
		this.rectangle_4 = rectangle_4;
		this.rectangle_5 = rectangle_5;
		this.rectangle_6 = rectangle_6;
		this.rectangle_7 = rectangle_7;

		this.events.emit("scene-awake");
	}


	/* START-USER-CODE */

	// Write your code here

	create() {
		console.log("class sssssssssssssss");
		this.editorCreate()
		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E,R,TAB")
		const startAnim = 'idle'
		this.spineBoy = this.createSpineBoy(startAnim)
		this.platformes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});

		this.createPlatformes()
	}

	createPlatformes() {
		const p1 = this.physics.add.existing(this.rectangle);
		const p2 = this.physics.add.existing(this.rectangle_1);
		const p3 = this.physics.add.existing(this.rectangle_2);
		const p4 = this.physics.add.existing(this.rectangle_3);
		this.platformes.addMultiple([p1, p2, p3, p4], true);   // array of game objects

		this.physics.add.collider([p1, p2, p3, p4], this.spineBoy);

	}

	preload() {
		this.load.setPath('assets/spine/images')
		this.load.spine('spineboy', 'spineboy-pro.json', 'spineboy-pro.atlas')
	}

	createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(1000, 547, SPINEBOY_KEY, startAnim, true)
		// spineBoy.setSize(280, 680);
		this.physics.add.existing(spineBoy);
		// spineBoy.body.allowGravity = false
		// spineBoy.body.setOffset(0, 50);

		var anims = spineBoy.getAnimationList();
		console.log(anims);
		this.cameras.main.startFollow(spineBoy, true);
		this.cameras.main.setZoom(0.4)
		// camera.originY = 0.5;

		// camera.originY = 0.5;

		this.cameras.main.originY = 0.8

		// spineBoy.scaleX = 0.5
		// spineBoy.scaleY = 0.5

		return spineBoy
	}

	update() {
		const { right, left, up, down, space, A, Z, E, R, TAB } = this.keyboard

				if (right.isDown) this.spineBoy.body.setVelocityX(500)
		if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
		if (Phaser.Input.Keyboard.JustDown(space)) this.spineBoy.body.setVelocityY(-600);




    // const size = this.animationNames.length
    const startAnim = this.spineBoy.getCurrentAnimation().name
    const bounds = this.spineBoy.getBounds()
    const width = bounds.size.x
    const height = bounds.size.y
    let velocityR;
    let walk2 = false;

    if (A.isDown && startAnim !== 'shoot') {
      this.spineBoy.play('shoot')
    }

    // if (TAB.isDown && startAnim !== 'run') {
      // this.spineBoy.play('run')
    // }

    if (right.isDown) {

      if (startAnim === 'jump') return;

      if (startAnim !== 'walk' && walk2 === false) {
        //   this.spineBoy.body.setSize(280, 680)
      if (TAB.isDown) {
          this.spineBoy.body.setVelocityX(1000)
          if (startAnim !== 'run') {
          this.spineBoy.play('run')
          }
        } else {
          this.spineBoy.body.setVelocityX(500)
          if (startAnim !== 'walk') {
          this.spineBoy.play('walk')
          }
        }
        //   this.spineBoy.scaleX = 0.5;
        //   this.spineBoy.body.setOffset(0 , 0)
          this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
          this.spineBoy.body.setVelocityX(0)
        })
      }
    }

    if (left.isDown) {

      if (startAnim === 'jump') return;
      walk2 = true;
      if (startAnim !== 'walk' && walk2 === true) {
      if (TAB.isDown) {
          this.spineBoy.body.setVelocityX(-800)
          if (startAnim !== 'run') {
          this.spineBoy.play('run')
          }
        } else {
          this.spineBoy.body.setVelocityX(-500)
          if (startAnim !== 'walk') {
          this.spineBoy.play('walk')
          }
        }
        //   this.spineBoy.scaleX = -0.5;
        //   this.spineBoy.body.setOffset(280 , 0)
          this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
          this.spineBoy.body.setVelocityX(0)
          walk2 = false;
        })
      }
    }

    if (space.isDown) {
      if (startAnim !== 'jump') {
        this.spineBoy.play('jump');
        this.spineBoy.on('complete', (spine) => {
          this.spineBoy.play('idle');
        })
      }
    }
		// if (right.isDown) this.spineBoy.body.setVelocityX(300)
		// if (left.isDown) this.spineBoy.body.setVelocityX(-300)
		// if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

