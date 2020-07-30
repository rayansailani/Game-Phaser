class scene extends Phaser.Scene {
    constructor() {
        super("playGame")

        this.planespeed = 3.1
        this.plane1speed = 3.1
        this.boatspeed = 2.67
    }


    preload() {
        this.load.image('background', 'assets/background.png')
        this.load.image('whale', 'assets/whale.png');
        this.load.image('boat', 'assets/boat.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('plane', 'assets/plane.png');
        this.load.image('sea', 'assets/sea.png');
        this.load.image('whale_falling', 'assets/whale_falling.png');
        this.load.image('whale_jumping', 'assets/whale_jumping.png');
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    }

    create() {
        this.score = 0;
        this.whale = this.physics.add.sprite(60, 500, 'whale');
        this.whale.setGravityY(2000)
        this.whale.setScale(3.2)
        this.whale.setBounce(0.09);
        this.whale.setCollideWorldBounds(true);


        this.sea = this.add.tileSprite(0, 320, 100, 50, "sea");
        this.sea.setOrigin(0, 0);
        this.sea.setScale(10);

        //  whale falling anim
        this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('whale_falling'),
            frameRate: 10,
            repeat: -1
        });

        //  whale jumping anim
        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('whale_jumping'),
            frameRate: 10,
            repeat: -1
        });

        //  whale swimming anim
        this.anims.create({
            key: 'swimming',
            frames: this.anims.generateFrameNumbers('whale'),
            frameRate: 10,
            //repeat: -1
        });


        this.plane = this.physics.add.sprite(700, 400, "plane");
        this.plane.setScale(2.1);
        this.plane.setGravity(0.001);
        this.plane1 = this.physics.add.sprite(700, 270, "plane");
        this.plane1.setScale(2.1);
        this.plane1.setGravity(0.001);
        this.boat = this.physics.add.sprite(700, 520, "boat");
        this.boat.setScale(2.55);
        this.boat.setGravity(0.001);



        this.projectiles = this.physics.add.group();
        this.enemies = this.add.group();

        this.enemies.add(this.plane);
        this.enemies.add(this.plane1);
        this.enemies.add(this.boat);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " + this.score, 30);
    }

    moveenemy(enemy, speed, nameofenemy) {
        enemy.x -= speed
        if (enemy.x < 10) {
            this.resetposition(enemy, nameofenemy);
        }
    }


    resetposition(enemy, nameofenemy) {
        enemy.x = 900
        switch (nameofenemy) {
            case "plane":
                var randomy = Phaser.Math.Between(50, 450);
                enemy.y = randomy
                if (this.planespeed < 4.65) {
                    this.planespeed += 0.5;
                }
                break;
            case "plane1":
                var randomy = Phaser.Math.Between(50, 450);
                enemy.y = randomy
                if (this.plane1speed < 4.65) {
                    this.plane1speed += 0.5;
                }
                break;
            case "boat":
                enemy.y = 525
                if (this.boatspeed < 4.65) {
                    this.boatspeed += 0.5
                }
                break;
        }


    }

    shootbullet() {
        var bullet = new Bullet(this.whale.x, this.whale.y, this);
    }


    update() {


        if (this.physics.overlap(this.projectiles, this.plane)) {
            this.resetposition(this.plane, "plane", this.planespeed);
            this.score += 15;
            this.scoreLabel.text = "SCORE: " + this.score;
        }
        if (this.physics.overlap(this.projectiles, this.plane1)) {
            this.resetposition(this.plane1, "plane1", this.plane1speed);
            this.score += 15;
            this.scoreLabel.text = "SCORE: " + this.score;
        }
        if (this.physics.overlap(this.projectiles, this.boat)) {
            this.resetposition(this.boat, "boat", this.boatspeed);
            this.score += 20;
            this.scoreLabel.text = "SCORE: " + this.score;

        }

        if (this.physics.overlap(this.whale, this.boat)) {
            this.whale.disableBody(true, true);
            this.plane1.disableBody(true, true);
            this.plane.disableBody(true, true);
            this.boat.disableBody(true, true);
            this.add.bitmapText(config.width / 2 - 50, config.height / 2, "pixelFont", "GAME OVER", 50);
            this.score = 0;
            this.scoreLabel.text = "SCORE: " + this.score;
            this.add.bitmapText(490, 5, "pixelFont", "Refresh to start new Game ", 30);
        }
        if (this.physics.overlap(this.whale, this.plane)) {
            this.whale.disableBody(true, true);
            this.plane1.disableBody(true, true);
            this.plane.disableBody(true, true);
            this.boat.disableBody(true, true);
            this.add.bitmapText(config.width / 2 - 50, config.height / 2, "pixelFont", "GAME OVER", 50);
            this.score = 0;
            this.scoreLabel.text = "SCORE: " + this.score;
            this.add.bitmapText(490, 5, "pixelFont", "Refresh to start new Game ", 30);
        }
        if (this.physics.overlap(this.whale, this.plane1)) {
            this.whale.disableBody(true, true);
            this.plane1.disableBody(true, true);
            this.plane.disableBody(true, true);
            this.boat.disableBody(true, true);
            this.add.bitmapText(config.width / 2 - 50, config.height / 2, "pixelFont", "GAME OVER", 50);
            this.score = 0;
            this.scoreLabel.text = "SCORE: " + this.score;
            this.add.bitmapText(490, 5, "pixelFont", "Refresh to start new Game ", 30);
        }



        this.moveenemy(this.plane, this.planespeed, "plane");
        this.moveenemy(this.plane1, this.plane1speed, "plane");
        this.moveenemy(this.boat, this.boatspeed, "boat");


        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var bullet = this.projectiles.getChildren()[i]
            bullet.update();
        }

        this.sea.tilePositionX += 0.5

        if (this.cursors.up.isDown) {
            this.whale.setVelocityY(-624);
        }
        if (this.cursors.down.isDown) {
            this.whale.setVelocityY(-110);
            this.shootbullet()
        }

    }


}