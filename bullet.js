class Bullet extends Phaser.GameObjects.Sprite {
    constructor(whalex, whaley, scene) {

        var x = whalex + 30
        var y = whaley - 30

        super(scene, x, y, "bullet")

        scene.add.existing(this);

        //scene.physics.world.enableBody(this);
        //this.body.velocity.x=-10


        scene.projectiles.add(this)
    }

    update() {
        this.x += 30
        if (this.x > 740) {
            this.destroy()
        }
    }
}
