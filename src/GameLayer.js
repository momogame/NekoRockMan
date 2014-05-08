var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.startPoint = [ 100, 800 ];
        this.endPoint = [ 8800, 600 ]; //Point x should be multiple of 800

        this.checkPoint = [ this.startPoint[0], this.startPoint[1] ];

        this.STATES = GameLayer.STATES.FRONT;

        this.passCheckPoint = 0;

        this.createBackground();
        this.createFloors();
        this.createCheckPoint();
        this.createEnermy();
        this.createCharacter(5);

        this.setKeyboardEnabled( true );

        this.scheduleUpdate();
        

        return true;
    },


    update: function(){
        //this.newBG.scheduleUpdate();
        this.Neko.scheduleUpdate();
        this.HPbar.scheduleUpdate();
        var pos = this.Neko.getPosition();
        console.log(pos.x);

        if( pos.x >= 4000 && pos.x < 4010 ) {
            console.log('checkPoint');
            this.checkPoint = [ 4000, 800 ];
            this.passCheckPoint++;
        }


        if( pos.x >= 6000 && pos.x < 6010 ) {
            this.backGround[0].setPosition(7190,300);
            this.backGround[1].setPosition(8790,300);
            //this.backGround[2].setPosition(10390,300);
        }


        if( this.Neko.isDie() ) {
                this.restart();
        }

        var NekoPos = this.Neko.getPosition();

    },

    startGamePlay: function() {

    },

    createBackground: function() {
        this.backGround = [];

        var bg1 = new newBG( 800, 600/2 );
        this.backGround.push( bg1 );

        var bg2 = new newBG( 2390, 600/2 );
        this.backGround.push( bg2 );

        var bg3 = new newBG( 3990, 600/2 );
        this.backGround.push( bg3 );

        var bg4 = new newBG( 5590, 600/2 );
        this.backGround.push( bg4 );

        this.backGround.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

    createCheckPoint: function() {
        this.poles = [];

        var checkPole1 = new checkPole(4000,250);
        this.poles.push( checkPole1 );

        this.poles.forEach( function( b ) {
            this.addChild( b );
        }, this );

    },


    createCharacter: function( life ) {
        this.Neko = new Neko( this.checkPoint[0] , this.checkPoint[1] );

        this.HPbar = new HPbar(this.Neko, life);
        this.addChild(this.HPbar);
        
        this.Neko.setHP( this.HPbar );
        this.Neko.setFloors( this.floors );
        this.Neko.setEnermies( this.enermies );
        this.Neko.setEndPoint( this.endPoint[0] );
        this.addChild(this.Neko);

        this.followCharacter();

    },

    createEnermy: function() { 
        this.enermies = [];
        var enermy1 = new Enermy(300,400,this);
        this.enermies.push( enermy1 );

        var enermy2 = new Enermy(650,600,this);
        this.enermies.push( enermy2 );

        var enermy3 = new Enermy(1200,400,this);
        this.enermies.push( enermy3 );

        var enermy4 = new Enermy(1400,400,this);
        this.enermies.push( enermy4 );

        var enermy5 = new Enermy(1600,400,this);
        this.enermies.push( enermy5 );

        var enermy6 = new Enermy(1800,400,this);
        this.enermies.push( enermy6 );

        var enermy7 = new Enermy(2200,400,this);
        this.enermies.push( enermy7 );

        var enermy8 = new Enermy(6500,400,this);
        this.enermies.push( enermy8 );

        var enermy9 = new Enermy(6700,400,this);
        this.enermies.push( enermy9 );

        var enermy10 = new Enermy(6900,400,this);
        this.enermies.push( enermy10 );

        var enermy11 = new Enermy(7100,400,this);
        this.enermies.push( enermy11 );

        var enermy12 = new Enermy(7300,400,this);
        this.enermies.push( enermy12 );

        this.enermies.forEach( function( b ) {
            b.setFloors( this.floors );
            this.addChild( b );
        }, this );
        this.updateEnermy();
    },


    
    removeEnermyFromArray: function() {
        for( var i=0;i<this.enermies.length;i++ ) {
            if( this.enermies[i].isDie() )
                this.enermies.splice(i,1);
        }
    },

    updateEnermy: function() { 
        this.enermies.forEach( function( b ) {
            b.scheduleUpdate();
        }, this );
    },

    createFloors : function() {
        this.floors = [];
        // Ground 
        var groundFloor1 = new Floor( 0, 0, 600, 104 ); 
        this.floors.push( groundFloor1 );

        var groundFloor2 = new Floor( 1000, 0, 2000, 104);
        this.floors.push( groundFloor2 );

        var groundFloor3 = new Floor( 5900, 0, 7500, 104);
        this.floors.push( groundFloor3 );

        // Float 
        // Float floor should have a high of 50 
        var floor1 = new Floor( 0, 180, 400, 230 );
        this.floors.push( floor1 );

        var floor2 = new Floor( 200, 300, 400, 350 );
        this.floors.push( floor2 );

        var floor3 = new Floor( 600, 400, 800, 450 );
        this.floors.push( floor3 );

        var floor4 = new Floor( 800, 150, 900, 200);
        this.floors.push( floor4 );

        var floor5 = new Floor( 2100, 200, 2300, 250 );
        this.floors.push( floor5 );

        var floor6 = new Floor( 2500, 300, 2600, 350 );
        this.floors.push( floor6 );

        var floor7 = new Floor( 2800, 100, 2850, 150 );
        this.floors.push( floor7 );

        var floor8 = new Floor( 3050, 200, 3100, 250 );
        this.floors.push( floor8 );

        var floor9 = new Floor( 3300, 200, 3350, 250 );
        this.floors.push( floor9 );

        var floor10 = new Floor( 3500, 200, 3550, 250 );
        this.floors.push( floor10 );

        var floor11 = new Floor( 3700, 200, 3750, 250 );
        this.floors.push( floor11 );

        var floor12 = new Floor( 4100, 470, 5000, 520 );
        this.floors.push( floor12 );

        var floor13 = new Floor( 4000, 200, 5600, 250 );
        this.floors.push( floor13 );

        this.floors.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

    followCharacter: function() {
        var followPlayer = cc.Follow.create( this.Neko, cc.rect(0, 0, this.endPoint[0] , this.endPoint[1] ) );
        this.runAction( followPlayer );

    },

    bulletHandleKeyDown: function(e) {

        if( e == cc.KEY.space && !this.Neko.getCollide() ) {
            var charPos = this.Neko.getPosition();
            this.bullet = new Bullet( this );

            if( this.preBullet == null || this.bullet.checkPreviousBullet() ) {
                
                this.preBullet = this.bullet;
                
                this.bullet.setPosition(charPos.x + 10,charPos.y + 20 );
                this.addChild(this.bullet);

                this.bullet.scheduleUpdate();
            }
        }

    },

    removeSprite: function( sprite ) {
        this.removeChild( sprite );
        this.enermies.shift();
    },

    gameOver: function() {
        this.Neko.unscheduleUpdate();
        this.enermy.unscheduleUpdate();

    },

    restart: function() {
        var previousLife = this.HPbar.getLife();

        if( previousLife != 0 ) { 

            this.removeChild(this.Neko);
            this.removeChild(this.HPbar);
        
            this.enermies.forEach( function( b ) {
                this.removeChild( b );
            }, this );
        
            //if( this.passCheckPoint == 0 ) { 
                this.createEnermy();
            //}

            this.createCharacter( previousLife - 1 );
            this.followCharacter();
        }
        else {
            this.STATES = GameLayer.STATES.END;
            this.gameOver();
        }

    },


     onKeyDown: function(e){ 
        if( e == cc.KEY.enter ) {
            this.STATES = GameLayer.STATES.STARTED;
        }

        if( this.STATES == GameLayer.STATES.STARTED ) { 
            this.Neko.handleKeyDown( e );
            this.bulletHandleKeyDown( e );
        }
    },

     onKeyUp: function( e ){
        this.Neko.handleKeyUp( e );
    }

});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    END: 3
};


var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

