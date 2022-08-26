
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		type: Phaser.AUTO,
		parent: 'phaser-example',
		scale: {
			mode: Phaser.Scale.CENTER_BOTH,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		backgroundColor: '#1b1e20',
		width: 1500,
		height: 720,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 900 },
				debug: false
			}
		},
		pack: {
			files: [
				{ type: 'scenePlugin', key: 'SpinePlugin', url: 'SpinePlugin.min.js', sceneKey: 'spine' }
			]
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Jeu", Jeu);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}