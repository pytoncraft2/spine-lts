
// You can write more code here

class Guepe extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'guepe');

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);

        //  Set some default physics properties
		this.setScale(0.2)
        this.setBounce(1, 1);
		this.setFlipX(true)

        this.body.onWorldBounds = true;

    }


	preUpdate(time, delta) {
	     super.preUpdate(time, delta);
		// this.setVelocityX(900)
	}

}

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
		this.groupeGuepe = this.add.group()
		this.barre_vie.setScrollFactor(0);
		const startAnim = 'idle'
		this.spineBoy = this.createSpineBoy(startAnim)
		this.platformes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});

		this.createPlatformes()
		this.configEau()
		for (var i = 0; i < 102; i++) {
			const g = new Guepe(this, Phaser.Math.Between(2064, 2736), Phaser.Math.Between(100, 500));
			this.groupeGuepe.add(g)
		}
		this.physics.world.setBoundsCollision(true, true, false, true)

		this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeGuepe, this.spineBoy,
			function (_boule, _ennemie) {
				_ennemie.setAlpha(0.1)
				this.vie.scaleX -= 0.5
				if (this.vie.scaleX <= 0) {
					_ennemie.play('death')
					this.vie.scaleX = 2.5167755991269636;
				}
				_boule.destroy(true)
				this.time.delayedCall(200, () => {
				_ennemie.setAlpha(1)
				}, null, this);

			}, null, this);

	}

	createPlatformes() {
		const p1 = this.physics.add.existing(this.rectangle);
		const p2 = this.physics.add.existing(this.rectangle_1);
		const p3 = this.physics.add.existing(this.rectangle_7);
		const p4 = this.physics.add.existing(this.rectangle_6);
		const p5 = this.physics.add.existing(this.rectangle_5);
		this.platformes.addMultiple([p1, p2, p4, p5, p3], true);

		this.physics.add.collider([p1, p2, p4, p5, p3], this.spineBoy);
		this.physics.add.collider([p1, p2, p4, p5, p3], this.groupeGuepe);

	}

	preload() {
		this.load.setPath('assets/spine/images')
		this.load.spine('spineboy', 'spineboy-pro.json', 'spineboy-pro.atlas')
		this.load.setPath('assets/')
		this.load.image('guepe', 'guepe.png')
	}

	createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(110, 547, SPINEBOY_KEY, startAnim, true)
		spineBoy.setDepth(1)
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

	configEau() {
		this.eau.setDepth(10)
		// this.rect = this.add.rectangle(this.eau.x, this.eau.y, this.eau.width, this.eau.height).setStrokeStyle(2, 0xffff00).setScale(this.eau.scaleX, this.eau.scaleY);

		var graphics = this.add.graphics();

		this.rect = new Phaser.Geom.Rectangle(this.eau.getLeftCenter().x, this.eau.getLeftCenter().y - 370, this.eau.displayWidth, this.eau.displayHeight);



	}

	update() {
		const { right, left, up, down, space, A, Z, E, R, TAB } = this.keyboard

				if (right.isDown) this.spineBoy.body.setVelocityX(500)
		if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
		if (Phaser.Input.Keyboard.JustDown(space)) this.spineBoy.body.setVelocityY(-600);

        if(this.rect.contains(this.spineBoy.x, this.spineBoy.y)) {
			this.spineBoy.body.velocity.x = this.spineBoy.body.velocity.x / 2
			this.spineBoy.body.velocity.y -= 10
		}

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
		this.rectangle;
		/** @type {Phaser.GameObjects.Container} */
		this.barre_vie;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.vie;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_9;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_10;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_11;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_12;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_13;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.eau;
		/** @type {Phaser.GameObjects.Rectangle} */
		this.rectangle_3;
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

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 642, 128, 128);
		rectangle_1.scaleX = 50.984369120904816;
		rectangle_1.scaleY = 0.4705141956426765;
		rectangle_1.setOrigin(0, 0.5);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 2978887;
		rectangle_1.fillAlpha = 0.8;

		// rectangle
		const rectangle = this.add.rectangle(102, -482, 128, 128);
		rectangle.scaleX = 1.562311471077136;
		rectangle.scaleY = 1.5150110407617778;
		rectangle.isFilled = true;

		// barre_vie
		const barre_vie = this.add.container(0, 0);

		// rectangle_8
		const rectangle_8 = this.add.rectangle(-400.6985142724708, -709, 128, 128);
		rectangle_8.scaleX = 12.510914285507356;
		rectangle_8.scaleY = 0.4336068130918529;
		rectangle_8.setOrigin(0, 0.5);
		rectangle_8.isFilled = true;
		rectangle_8.fillColor = 13638684;
		barre_vie.add(rectangle_8);

		// vie
		const vie = this.add.rectangle(-403.94078060112474, -709, 128, 128);
		vie.scaleX = 12.561574696892574;
		vie.scaleY = 0.5585114918996077;
		vie.setOrigin(0, 0.5);
		vie.isFilled = true;
		vie.fillColor = 1025578;
		barre_vie.add(vie);

		// text_2
		const text_2 = this.add.text(113, -467, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "?";
		text_2.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// rectangle_9
		const rectangle_9 = this.add.rectangle(8561, -609, 128, 128);
		rectangle_9.scaleX = 1.562311471077136;
		rectangle_9.scaleY = 1.5150110407617778;
		rectangle_9.isFilled = true;

		// text_4
		const text_4 = this.add.text(9163, -495, "", {});
		text_4.setOrigin(0.5, 0.5);
		text_4.text = "?";
		text_4.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// rectangle_10
		const rectangle_10 = this.add.rectangle(12340, -500, 128, 128);
		rectangle_10.scaleX = 1.562311471077136;
		rectangle_10.scaleY = 1.5150110407617778;
		rectangle_10.isFilled = true;

		// text_5
		const text_5 = this.add.text(12339, -495, "", {});
		text_5.setOrigin(0.5, 0.5);
		text_5.text = "?";
		text_5.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// rectangle_11
		const rectangle_11 = this.add.rectangle(15628, -500, 128, 128);
		rectangle_11.scaleX = 1.562311471077136;
		rectangle_11.scaleY = 1.5150110407617778;
		rectangle_11.isFilled = true;

		// text_6
		const text_6 = this.add.text(15627, -495, "", {});
		text_6.setOrigin(0.5, 0.5);
		text_6.text = "?";
		text_6.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// rectangle_12
		const rectangle_12 = this.add.rectangle(18898, -500, 128, 128);
		rectangle_12.scaleX = 1.562311471077136;
		rectangle_12.scaleY = 1.5150110407617778;
		rectangle_12.isFilled = true;

		// text_7
		const text_7 = this.add.text(18897, -495, "", {});
		text_7.setOrigin(0.5, 0.5);
		text_7.text = "?";
		text_7.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// rectangle_13
		const rectangle_13 = this.add.rectangle(21235, -500, 128, 128);
		rectangle_13.scaleX = 1.562311471077136;
		rectangle_13.scaleY = 1.5150110407617778;
		rectangle_13.isFilled = true;

		// text_8
		const text_8 = this.add.text(21234, -495, "", {});
		text_8.setOrigin(0.5, 0.5);
		text_8.text = "?";
		text_8.setStyle({ "color": "#000000ff", "fontSize": "96px" });

		// container_1
		const container_1 = this.add.container(72.93180084228516, 509.4454650878906);

		// dark_grass
		const dark_grass = this.add.image(511.06819915771484, 20.554534912109375, "dark_grass");
		container_1.add(dark_grass);

		// dark_grass_1
		const dark_grass_1 = this.add.image(594.0681991577148, 23.554534912109375, "dark_grass");
		container_1.add(dark_grass_1);

		// dark_grass_2
		const dark_grass_2 = this.add.image(676.7113876342773, 23.556793212890625, "dark_grass");
		container_1.add(dark_grass_2);

		// dark_grass_3
		const dark_grass_3 = this.add.image(748.7795639038086, 23.556793212890625, "dark_grass");
		container_1.add(dark_grass_3);

		// dark_grass_4
		const dark_grass_4 = this.add.image(878.5022811889648, 19.438629150390625, "dark_grass");
		container_1.add(dark_grass_4);

		// dark_grass_5
		const dark_grass_5 = this.add.image(1009.2546005249023, 19.438629150390625, "dark_grass");
		container_1.add(dark_grass_5);

		// dark_grass_6
		const dark_grass_6 = this.add.image(1141.0363388061523, 16.350006103515625, "dark_grass");
		container_1.add(dark_grass_6);

		// dark_grass_7
		const dark_grass_7 = this.add.image(1270.7591171264648, 30.763641357421875, "dark_grass");
		container_1.add(dark_grass_7);

		// dark_grass_8
		const dark_grass_8 = this.add.image(1050.4363632202148, 48.265899658203125, "dark_grass");
		container_1.add(dark_grass_8);

		// dark_grass_9
		const dark_grass_9 = this.add.image(820.8477401733398, 41.059051513671875, "dark_grass");
		container_1.add(dark_grass_9);

		// dark_grass_10
		const dark_grass_10 = this.add.image(350.34545135498047, 61.649993896484375, "dark_grass");
		container_1.add(dark_grass_10);

		// dark_grass_11
		const dark_grass_11 = this.add.image(246.36138153076172, 34.881805419921875, "dark_grass");
		container_1.add(dark_grass_11);

		// dark_grass_12
		const dark_grass_12 = this.add.image(139.28865814208984, 44.147735595703125, "dark_grass");
		container_1.add(dark_grass_12);

		// dark_grass_13
		const dark_grass_13 = this.add.image(395.64546966552734, 30.763641357421875, "dark_grass");
		container_1.add(dark_grass_13);

		// dark_grass_14
		const dark_grass_14 = this.add.image(0, 37.497711181640625, "dark_grass");
		container_1.add(dark_grass_14);

		// dark_grass_15
		const dark_grass_15 = this.add.image(80.3045425415039, 16.906829833984375, "dark_grass");
		container_1.add(dark_grass_15);

		// dark_grass_16
		const dark_grass_16 = this.add.image(930.0681991577148, 42.554534912109375, "dark_grass");
		container_1.add(dark_grass_16);

		// dark_grass_17
		const dark_grass_17 = this.add.image(1150.8796005249023, 28.936370849609375, "dark_grass");
		container_1.add(dark_grass_17);

		// dark_grass_18
		const dark_grass_18 = this.add.image(1364.3227157592773, 39.556793212890625, "dark_grass");
		container_1.add(dark_grass_18);

		// dark_grass_19
		const dark_grass_19 = this.add.image(1204.7432479858398, 43.675018310546875, "dark_grass");
		container_1.add(dark_grass_19);

		// dark_grass_20
		const dark_grass_20 = this.add.image(1461.1000595092773, 10.729522705078125, "dark_grass");
		container_1.add(dark_grass_20);

		// dark_grass_21
		const dark_grass_21 = this.add.image(1486.8387069702148, 56.029510498046875, "dark_grass");
		container_1.add(dark_grass_21);

		// dark_grass_22
		const dark_grass_22 = this.add.image(1596.9999618530273, 23.084075927734375, "dark_grass");
		container_1.add(dark_grass_22);

		// dark_grass_23
		const dark_grass_23 = this.add.image(1710.2499618530273, 39.556793212890625, "dark_grass");
		container_1.add(dark_grass_23);

		// dark_grass_24
		const dark_grass_24 = this.add.image(1826.5885848999023, 33.379547119140625, "dark_grass");
		container_1.add(dark_grass_24);

		// dark_grass_25
		const dark_grass_25 = this.add.image(1976.9021835327148, 27.202239990234375, "dark_grass");
		container_1.add(dark_grass_25);

		// dark_grass_26
		const dark_grass_26 = this.add.image(1733.9295272827148, 21.024993896484375, "dark_grass");
		container_1.add(dark_grass_26);

		// dark_grass_27
		const dark_grass_27 = this.add.image(1559.9363632202148, 66.32498168945312, "dark_grass");
		container_1.add(dark_grass_27);

		// dark_grass_28
		const dark_grass_28 = this.add.image(2043.4500350952148, 19.561370849609375, "dark_grass");
		container_1.add(dark_grass_28);

		// dark_grass_29
		const dark_grass_29 = this.add.image(1932.2591171264648, 18.531829833984375, "dark_grass");
		container_1.add(dark_grass_29);

		// dark_grass_30
		const dark_grass_30 = this.add.image(2217.443199157715, 46.329559326171875, "dark_grass");
		container_1.add(dark_grass_30);

		// dark_grass_31
		const dark_grass_31 = this.add.image(2076.39559173584, 44.270416259765625, "dark_grass");
		container_1.add(dark_grass_31);

		// dark_grass_32
		const dark_grass_32 = this.add.image(2286.422691345215, 0, "dark_grass");
		container_1.add(dark_grass_32);

		// dark_grass_33
		const dark_grass_33 = this.add.image(2393.495445251465, 71.03860473632812, "dark_grass");
		container_1.add(dark_grass_33);

		// dark_grass_34
		const dark_grass_34 = this.add.image(2563.370445251465, 29.856781005859375, "dark_grass");
		container_1.add(dark_grass_34);

		// dark_grass_35
		const dark_grass_35 = this.add.image(2337.89998626709, 57.654510498046875, "dark_grass");
		container_1.add(dark_grass_35);

		// dark_grass_36
		const dark_grass_36 = this.add.image(2534.543296813965, 47.359100341796875, "dark_grass");
		container_1.add(dark_grass_36);

		// dark_grass_37
		const dark_grass_37 = this.add.image(2705.83406829834, 24.324981689453125, "dark_grass");
		container_1.add(dark_grass_37);

		// dark_grass_38
		const dark_grass_38 = this.add.image(2562.727378845215, 67.56588745117188, "dark_grass");
		container_1.add(dark_grass_38);

		// dark_grass_39
		const dark_grass_39 = this.add.image(2749.075035095215, 59.329559326171875, "dark_grass");
		container_1.add(dark_grass_39);

		// dark_grass_40
		const dark_grass_40 = this.add.image(2895.27059173584, 58.299957275390625, "dark_grass");
		container_1.add(dark_grass_40);

		// dark_grass_41
		const dark_grass_41 = this.add.image(3016.75691986084, 44.915924072265625, "dark_grass");
		container_1.add(dark_grass_41);

		// dark_grass_42
		const dark_grass_42 = this.add.image(3145.450035095215, 43.886322021484375, "dark_grass");
		container_1.add(dark_grass_42);

		// dark_grass_43
		const dark_grass_43 = this.add.image(2981.752281188965, 49.034088134765625, "dark_grass");
		container_1.add(dark_grass_43);

		// dark_grass_44
		const dark_grass_44 = this.add.image(2840.70467376709, 42.856781005859375, "dark_grass");
		container_1.add(dark_grass_44);

		// dark_grass_45
		const dark_grass_45 = this.add.image(2581.259117126465, 53.152252197265625, "dark_grass");
		container_1.add(dark_grass_45);

		// dark_grass_46
		const dark_grass_46 = this.add.image(3260.759117126465, 43.886322021484375, "dark_grass");
		container_1.add(dark_grass_46);

		// dark_grass_47
		const dark_grass_47 = this.add.image(3073.38191986084, 56.240875244140625, "dark_grass");
		container_1.add(dark_grass_47);

		// dark_grass_48
		const dark_grass_48 = this.add.image(3405.015953063965, 29.472686767578125, "dark_grass");
		container_1.add(dark_grass_48);

		// dark_grass_49
		const dark_grass_49 = this.add.image(3622.25008392334, 48.004547119140625, "dark_grass");
		container_1.add(dark_grass_49);

		// dark_grass_50
		const dark_grass_50 = this.add.image(3823.01131439209, 34.620452880859375, "dark_grass");
		container_1.add(dark_grass_50);

		// dark_grass_51
		const dark_grass_51 = this.add.image(3450.31600189209, 42.856781005859375, "dark_grass");
		container_1.add(dark_grass_51);

		// dark_grass_52
		const dark_grass_52 = this.add.image(3515.17733001709, 58.299957275390625, "dark_grass");
		container_1.add(dark_grass_52);

		// dark_grass_53
		const dark_grass_53 = this.add.image(3717.997886657715, 58.299957275390625, "dark_grass");
		container_1.add(dark_grass_53);

		// dark_grass_54
		const dark_grass_54 = this.add.image(3318.53426361084, 49.034088134765625, "dark_grass");
		container_1.add(dark_grass_54);

		// container
		const container = this.add.container(3914, -13);
		container_1.add(container);

		// dark_grass_55
		const dark_grass_55 = this.add.image(511.06819915771484, 20.554534912109375, "dark_grass");
		container.add(dark_grass_55);

		// dark_grass_56
		const dark_grass_56 = this.add.image(594.0681991577148, 23.554534912109375, "dark_grass");
		container.add(dark_grass_56);

		// dark_grass_57
		const dark_grass_57 = this.add.image(676.7113876342773, 23.556793212890625, "dark_grass");
		container.add(dark_grass_57);

		// dark_grass_58
		const dark_grass_58 = this.add.image(748.7795639038086, 23.556793212890625, "dark_grass");
		container.add(dark_grass_58);

		// dark_grass_59
		const dark_grass_59 = this.add.image(878.5022811889648, 19.438629150390625, "dark_grass");
		container.add(dark_grass_59);

		// dark_grass_60
		const dark_grass_60 = this.add.image(1009.2546005249023, 19.438629150390625, "dark_grass");
		container.add(dark_grass_60);

		// dark_grass_61
		const dark_grass_61 = this.add.image(1141.0363388061523, 16.350006103515625, "dark_grass");
		container.add(dark_grass_61);

		// dark_grass_62
		const dark_grass_62 = this.add.image(1270.7591171264648, 30.763641357421875, "dark_grass");
		container.add(dark_grass_62);

		// dark_grass_63
		const dark_grass_63 = this.add.image(1050.4363632202148, 48.265899658203125, "dark_grass");
		container.add(dark_grass_63);

		// dark_grass_64
		const dark_grass_64 = this.add.image(820.8477401733398, 41.059051513671875, "dark_grass");
		container.add(dark_grass_64);

		// dark_grass_65
		const dark_grass_65 = this.add.image(350.34545135498047, 61.649993896484375, "dark_grass");
		container.add(dark_grass_65);

		// dark_grass_66
		const dark_grass_66 = this.add.image(246.36138153076172, 34.881805419921875, "dark_grass");
		container.add(dark_grass_66);

		// dark_grass_67
		const dark_grass_67 = this.add.image(139.28865814208984, 44.147735595703125, "dark_grass");
		container.add(dark_grass_67);

		// dark_grass_68
		const dark_grass_68 = this.add.image(395.64546966552734, 30.763641357421875, "dark_grass");
		container.add(dark_grass_68);

		// dark_grass_69
		const dark_grass_69 = this.add.image(0, 37.497711181640625, "dark_grass");
		container.add(dark_grass_69);

		// dark_grass_70
		const dark_grass_70 = this.add.image(80.3045425415039, 16.906829833984375, "dark_grass");
		container.add(dark_grass_70);

		// dark_grass_71
		const dark_grass_71 = this.add.image(930.0681991577148, 42.554534912109375, "dark_grass");
		container.add(dark_grass_71);

		// dark_grass_72
		const dark_grass_72 = this.add.image(1150.8796005249023, 28.936370849609375, "dark_grass");
		container.add(dark_grass_72);

		// dark_grass_73
		const dark_grass_73 = this.add.image(1364.3227157592773, 39.556793212890625, "dark_grass");
		container.add(dark_grass_73);

		// dark_grass_74
		const dark_grass_74 = this.add.image(1204.7432479858398, 43.675018310546875, "dark_grass");
		container.add(dark_grass_74);

		// dark_grass_75
		const dark_grass_75 = this.add.image(1461.1000595092773, 10.729522705078125, "dark_grass");
		container.add(dark_grass_75);

		// dark_grass_76
		const dark_grass_76 = this.add.image(1486.8387069702148, 56.029510498046875, "dark_grass");
		container.add(dark_grass_76);

		// dark_grass_77
		const dark_grass_77 = this.add.image(1596.9999618530273, 23.084075927734375, "dark_grass");
		container.add(dark_grass_77);

		// dark_grass_78
		const dark_grass_78 = this.add.image(1710.2499618530273, 39.556793212890625, "dark_grass");
		container.add(dark_grass_78);

		// dark_grass_79
		const dark_grass_79 = this.add.image(1826.5885848999023, 33.379547119140625, "dark_grass");
		container.add(dark_grass_79);

		// dark_grass_80
		const dark_grass_80 = this.add.image(1976.9021835327148, 27.202239990234375, "dark_grass");
		container.add(dark_grass_80);

		// dark_grass_81
		const dark_grass_81 = this.add.image(1733.9295272827148, 21.024993896484375, "dark_grass");
		container.add(dark_grass_81);

		// dark_grass_82
		const dark_grass_82 = this.add.image(1559.9363632202148, 66.32498168945312, "dark_grass");
		container.add(dark_grass_82);

		// dark_grass_83
		const dark_grass_83 = this.add.image(2043.4500350952148, 19.561370849609375, "dark_grass");
		container.add(dark_grass_83);

		// dark_grass_84
		const dark_grass_84 = this.add.image(1932.2591171264648, 18.531829833984375, "dark_grass");
		container.add(dark_grass_84);

		// dark_grass_85
		const dark_grass_85 = this.add.image(2217.443199157715, 46.329559326171875, "dark_grass");
		container.add(dark_grass_85);

		// dark_grass_86
		const dark_grass_86 = this.add.image(2076.39559173584, 44.270416259765625, "dark_grass");
		container.add(dark_grass_86);

		// dark_grass_87
		const dark_grass_87 = this.add.image(2286.422691345215, 0, "dark_grass");
		container.add(dark_grass_87);

		// dark_grass_88
		const dark_grass_88 = this.add.image(2393.495445251465, 71.03860473632812, "dark_grass");
		container.add(dark_grass_88);

		// dark_grass_89
		const dark_grass_89 = this.add.image(2563.370445251465, 29.856781005859375, "dark_grass");
		container.add(dark_grass_89);

		// dark_grass_90
		const dark_grass_90 = this.add.image(2337.89998626709, 57.654510498046875, "dark_grass");
		container.add(dark_grass_90);

		// dark_grass_91
		const dark_grass_91 = this.add.image(2534.543296813965, 47.359100341796875, "dark_grass");
		container.add(dark_grass_91);

		// dark_grass_93
		const dark_grass_93 = this.add.image(2562.727378845215, 67.56588745117188, "dark_grass");
		container.add(dark_grass_93);

		// dark_grass_100
		const dark_grass_100 = this.add.image(2581.259117126465, 53.152252197265625, "dark_grass");
		container.add(dark_grass_100);

		// container_2
		const container_2 = this.add.container(7866, 485);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(2683, 289, 128, 128);
		rectangle_2.scaleX = 0.735351842308086;
		rectangle_2.scaleY = 3.9709443828112088;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 6961924;

		// ellipse_1
		const ellipse_1 = this.add.ellipse(2683, -149, 128, 128);
		ellipse_1.scaleX = 3.4999596101303423;
		ellipse_1.scaleY = 3.4999596101303423;
		ellipse_1.isFilled = true;
		ellipse_1.fillColor = 3322133;
		ellipse_1.isStroked = true;

		// ellipse
		const ellipse = this.add.ellipse(2799, -206, 128, 128);
		ellipse.scaleX = 3.4999596101303423;
		ellipse.scaleY = 3.4999596101303423;
		ellipse.isFilled = true;
		ellipse.fillColor = 3322133;
		ellipse.isStroked = true;

		// ellipse_2
		const ellipse_2 = this.add.ellipse(2746, -103, 128, 128);
		ellipse_2.scaleX = 3.4999596101303423;
		ellipse_2.scaleY = 3.4999596101303423;
		ellipse_2.isFilled = true;
		ellipse_2.fillColor = 3322133;
		ellipse_2.isStroked = true;

		// rectangle_4
		const rectangle_4 = this.add.rectangle(2593, 231, 128, 128);
		rectangle_4.scaleX = 0.20686189443241787;
		rectangle_4.scaleY = 2.027240392379049;
		rectangle_4.angle = 129;
		rectangle_4.isFilled = true;
		rectangle_4.fillColor = 6961924;

		// ellipse_3
		const ellipse_3 = this.add.ellipse(2491, 133, 128, 128);
		ellipse_3.isFilled = true;
		ellipse_3.fillColor = 3322133;

		// eau
		const eau = this.add.rectangle(9940, 1097, 128, 128);
		eau.scaleX = 48.58964385606921;
		eau.scaleY = 6.3038784361710505;
		eau.isFilled = true;
		eau.fillColor = 2278121;
		eau.fillAlpha = 0.3;

		// rectangle_3
		const rectangle_3 = this.add.rectangle(13076, 572, 128, 128);
		rectangle_3.scaleX = 50.984369120904816;
		rectangle_3.scaleY = 0.4705141956426765;
		rectangle_3.setOrigin(0, 0.5);
		rectangle_3.isFilled = true;
		rectangle_3.fillColor = 2978887;
		rectangle_3.fillAlpha = 0.8;

		// rectangle_5
		const rectangle_5 = this.add.rectangle(6826, 1531, 128, 128);
		rectangle_5.scaleX = 48.685184752806194;
		rectangle_5.scaleY = 0.36130642977123606;
		rectangle_5.setOrigin(0, 0.5);
		rectangle_5.isFilled = true;
		rectangle_5.fillColor = 2978887;
		rectangle_5.fillAlpha = 0.8;

		// rectangle_6
		const rectangle_6 = this.add.rectangle(6802, 649, 128, 128);
		rectangle_6.scaleX = 6.998038697480819;
		rectangle_6.scaleY = 0.34032481198905895;
		rectangle_6.angle = 90;
		rectangle_6.setOrigin(0, 0.5);
		rectangle_6.isFilled = true;
		rectangle_6.fillColor = 2978887;
		rectangle_6.fillAlpha = 0.8;

		// rectangle_7
		const rectangle_7 = this.add.rectangle(13068, 585, 128, 128);
		rectangle_7.scaleX = 7.324540763045077;
		rectangle_7.scaleY = 0.40963352187253926;
		rectangle_7.angle = 90;
		rectangle_7.setOrigin(0, 0.5);
		rectangle_7.isFilled = true;
		rectangle_7.fillColor = 2978887;
		rectangle_7.fillAlpha = 0.8;

		this.rectangle_1 = rectangle_1;
		this.rectangle = rectangle;
		this.barre_vie = barre_vie;
		this.vie = vie;
		this.rectangle_9 = rectangle_9;
		this.rectangle_10 = rectangle_10;
		this.rectangle_11 = rectangle_11;
		this.rectangle_12 = rectangle_12;
		this.rectangle_13 = rectangle_13;
		this.eau = eau;
		this.rectangle_3 = rectangle_3;
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
		this.groupeGuepe = this.add.group()
		this.barre_vie.setScrollFactor(0);
		const startAnim = 'idle'
		this.spineBoy = this.createSpineBoy(startAnim)
		this.platformes = this.physics.add.group({
			allowGravity: false,
			immovable: true
		});

		this.createPlatformes()
		this.configEau()
		for (var i = 0; i < 102; i++) {
			const g = new Guepe(this, Phaser.Math.Between(2064, 2736), Phaser.Math.Between(100, 500));
			this.groupeGuepe.add(g)
		}
		this.physics.world.setBoundsCollision(true, true, false, true)

		this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeGuepe, this.spineBoy,
			function (_boule, _ennemie) {
				_ennemie.setAlpha(0.1)
				this.vie.scaleX -= 0.5
				if (this.vie.scaleX <= 0) {
					_ennemie.play('death')
					this.vie.scaleX = 2.5167755991269636;
				}
				_boule.destroy(true)
				this.time.delayedCall(200, () => {
				_ennemie.setAlpha(1)
				}, null, this);

			}, null, this);

	}

	createPlatformes() {
		const p1 = this.physics.add.existing(this.rectangle);
		const p2 = this.physics.add.existing(this.rectangle_1);
		const p3 = this.physics.add.existing(this.rectangle_7);
		const p4 = this.physics.add.existing(this.rectangle_6);
		const p5 = this.physics.add.existing(this.rectangle_5);
		this.platformes.addMultiple([p1, p2, p4, p5, p3], true);

		this.physics.add.collider([p1, p2, p4, p5, p3], this.spineBoy);
		this.physics.add.collider([p1, p2, p4, p5, p3], this.groupeGuepe);

	}

	preload() {
		this.load.setPath('assets/spine/images')
		this.load.spine('spineboy', 'spineboy-pro.json', 'spineboy-pro.atlas')
		this.load.setPath('assets/')
		this.load.image('guepe', 'guepe.png')
	}

	createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(110, 547, SPINEBOY_KEY, startAnim, true)
		spineBoy.setDepth(1)
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

	configEau() {
		this.eau.setDepth(10)
		// this.rect = this.add.rectangle(this.eau.x, this.eau.y, this.eau.width, this.eau.height).setStrokeStyle(2, 0xffff00).setScale(this.eau.scaleX, this.eau.scaleY);

		var graphics = this.add.graphics();

		this.rect = new Phaser.Geom.Rectangle(this.eau.getLeftCenter().x, this.eau.getLeftCenter().y - 370, this.eau.displayWidth, this.eau.displayHeight);



	}

	update() {
		const { right, left, up, down, space, A, Z, E, R, TAB } = this.keyboard

				if (right.isDown) this.spineBoy.body.setVelocityX(500)
		if (Phaser.Input.Keyboard.JustDown(A)) console.log("AAAAAAAAAAAAAA");
		if (Phaser.Input.Keyboard.JustDown(space)) this.spineBoy.body.setVelocityY(-600);

        if(this.rect.contains(this.spineBoy.x, this.spineBoy.y)) {
			this.spineBoy.body.velocity.x = this.spineBoy.body.velocity.x / 2
			this.spineBoy.body.velocity.y -= 10
		}

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

