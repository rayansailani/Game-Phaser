class scene extends Phaser.Scene{
    constructor(){
        super("playGame")
    }

     preload ()
{
    this.load.image('background','assets/background.png')
    this.load.image('whale', 'assets/whale.png');
    this.load.image('boat', 'assets/boat.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('plane', 'assets/plane.png');
    this.load.image('sea','assets/sea.png')    
    this.load.image('whale_falling','assets/whale_falling.png')
    this.load.image('whale_jumping','assets/whale_jumping.png')    
}

create ()
{
        
    this.whale = this.physics.add.sprite(60, 500, 'whale');
    this.whale.setScale(3.2)
    this.whale.setBounce(0.09);
    this.whale.setCollideWorldBounds(true);


    this.sea = this.add.tileSprite(0,320,100,50,"sea")
        this.sea.setOrigin(0,0)
        this.sea.setScale(10)

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


       this.plane = this.add.sprite(700,400,"plane");              
       this.plane.setScale(2.3)
       this.plane1 = this.add.sprite(700,270,"plane");
       this.plane1.setScale(2.3)
       //this.plane2 = this.add.sprite(700,100,"plane")
       //this.plane2.setScale(2.3)
       this.boat = this.add.sprite(700,520,"boat");
       this.boat.setScale(2.6)

       

       this.projectiles = this.add.group()
       //this.enemies = this.physics.add.group()

       //this.enemies.add(this.plane)
       //this.enemies.add(this.plane1)
       //this.enemies.add(this.boat)

       this.cursors = this.input.keyboard.createCursorKeys();     
       
       //this.physics.add.collider(this.projectiles,this.enemies)
       
}

    moveenemy(enemy,speed,nameofenemy)
    {
        enemy.x-=speed
        if(enemy.x<10){
            this.resetposition(enemy,nameofenemy)
        }
    }

     resetposition(enemy,nameofenemy)
    {
        enemy.x=700
        switch(nameofenemy){
            case "plane":
                var randomy = Phaser.Math.Between(100,400)
                enemy.y=randomy
                break;
            case "boat":
                enemy.y=525
                break;    
        }
        
        
    }    

     shootbullet(){
        //var bullet = new Bullet(whale.x,whale.y,this.scenes[0])
        //var bullet = this.physics.add.sprite(whale.x,whale.y,"bullet")        
        var bullet = new Bullet(this.whale.x,this.whale.y,this)
    }

 update ()
{
    this.moveenemy(this.plane,3.1,"plane")
    this.moveenemy(this.plane1,3.1,"plane")
   // this.moveenemy(this.plane2,3.9,"plane")
    this.moveenemy(this.boat,2.67,"boat")

    for(var i=0;i<this.projectiles.getChildren().length;i++){
        var bullet = this.projectiles.getChildren()[i]
        bullet.update()
    }

    this.sea.tilePositionX += 0.5
    
    if (this.cursors.up.isDown)
    {      
        this.whale.setVelocityY(-624);        
    }
    if(this.cursors.down.isDown)
    {      
        this.whale.setVelocityY(-110); 
      this.shootbullet()        
    }  
  
}


}