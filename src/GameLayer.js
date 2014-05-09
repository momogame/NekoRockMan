var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.startPoint = [ 12900, 800 ];
        this.endPoint = [ 13600, 600 ]; //Point x should be multiple of 800

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
        //console.log(pos.x);

        if( pos.x >= 6000 && pos.x < 6010 ) {
            console.log('checkPoint');
            this.checkPoint = [ 6000, 800 ];
            this.passCheckPoint++;

            this.backGround[0].setPosition(7190,300);
            this.backGround[1].setPosition(8790,300);
            this.backGround[2].setPosition(10390,300);
        }

        if( pos.x >= 10240 && pos.x < 10250 ) {
            console.log('checkPoint');
            this.checkPoint = [ 10240, 800 ];
            this.passCheckPoint++;

            this.backGround[3].setPosition(11990,300);
            this.backGround[0].setPosition(13590,300);
            this.backGround[1].setPosition(15190,300); 
        }

        if( pos.x >= 13500 && pos.x < 13510 ) {
            this.STATES = GameLayer.STATES.END;
            this.Neko.moveRight = true;
        }

        if( pos.x >= 13800 ) {    
            this.gameOver(); 

            this.logLabel = cc.LabelTTF.create( 'STAGE CLEAR!', 'Arial' ,70 );
            this.logLabel.setAnchorPoint( 1,1 );
            this.logLabel.setPosition( 13450, 350 );
            this.logLabel.setFontFillColor( new cc.Color3B( 255,255,255 ) );
            this.addChild( this.logLabel,52 );

            console.log( this.HPbar.getLife() );
            if( this.HPbar.getLife() == 5 ) {
                console.log( this.HPbar.getLife );
                this.logLabel = cc.LabelTTF.create( 'Neko NEVER DIE !', 'Arial' ,30 );
                this.logLabel.setAnchorPoint( 1,1 );
                this.logLabel.setPosition( 13450, 200 );
                this.logLabel.setFontFillColor( new cc.Color3B( 255,255,255 ) );
                this.addChild( this.logLabel,52 );
        }
        }




        if( this.Neko.isDie() ) {
                this.restart();
        }

        var NekoPos = this.Neko.getPosition();

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

        var checkPole1 = new checkPole(6000,104);
        this.poles.push( checkPole1 );

        var checkPole2 = new checkPole(10240,230);
        this.poles.push( checkPole2 );

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

        var enermy13 = new Enermy(8500,400,this);
        this.enermies.push( enermy13 );

        var enermy14 = new Enermy(8600,400,this);
        this.enermies.push( enermy14 );

        var enermy15 = new Enermy(8700,400,this);
        this.enermies.push( enermy15 );

        var enermy16 = new Enermy(8900,400,this);
        this.enermies.push( enermy16 );

        var enermy17 = new Enermy(9000,400,this);
        this.enermies.push( enermy17 );

        var enermy18 = new Enermy(9100,400,this);
        this.enermies.push( enermy18 );

        var enermy19 = new Enermy(9200,400,this);
        this.enermies.push( enermy19 );

        var enermy20 = new Enermy(9300,400,this);
        this.enermies.push( enermy20 );

        var enermy21 = new Enermy(9400,400,this);
        this.enermies.push( enermy21 );

        var enermy22 = new Enermy(9500,400,this);
        this.enermies.push( enermy22 );

        var enermy23 = new Enermy(9700,400,this);
        this.enermies.push( enermy23 );

        var enermy24 = new Enermy(10600,400,this);
        this.enermies.push( enermy24 );

        var enermy24 = new Enermy(10700,400,this);
        this.enermies.push( enermy24 );

        var enermy24 = new Enermy(10800,400,this);
        this.enermies.push( enermy24 );

        var enermy24 = new Enermy(10900,400,this);
        this.enermies.push( enermy24 );

        var enermy25 = new Enermy(10800,200,this);
        this.enermies.push( enermy25 );

        var enermy25 = new Enermy(11340,200,this);
        this.enermies.push( enermy25 );

        var enermy26 = new Enermy(11770,200,this);
        this.enermies.push( enermy26 );

        var enermy27 = new Enermy(11800,200,this);
        this.enermies.push( enermy27 );



        var enermy28 = new Enermy(12800,300,this);
        this.enermies.push( enermy28 );

        var enermy29 = new Enermy(12900,300,this);
        this.enermies.push( enermy29 );

        var enermy30 = new Enermy(13000,300,this);
        this.enermies.push( enermy30 );

        var enermy31 = new Enermy(13100,300,this);
        this.enermies.push( enermy31 );

        var enermy32 = new Enermy(13200,300,this);
        this.enermies.push( enermy32 );

        var enermy33 = new Enermy(13300,300,this);
        this.enermies.push( enermy33 );


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

        var groundFloor4 = new Floor( 8400, 0, 10000, 104);
        this.floors.push( groundFloor4 );

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



        var floor13 = new Floor( 4000, 200, 5600, 250 ); //Check Point
        this.floors.push( floor13 );

        var floor14 = new Floor( 7700, 150, 8000, 200 );
        this.floors.push( floor14 );

        var floor15 = new Floor( 7900, 300, 8400, 350 );
        this.floors.push( floor15 );

        var floor16 = new Floor( 8350, 400, 8400, 450 );
        this.floors.push( floor16 );

        var floor17 = new Floor( 8650, 400, 8700, 450 );
        this.floors.push( floor17 );

        var floor18 = new Floor( 8950, 500, 9000, 550 );
        this.floors.push( floor18 );

        var floor19 = new Floor( 9250, 250, 9500, 300 );
        this.floors.push( floor19 );

        var floor20 = new Floor( 8800, 150, 9500, 200 );
        this.floors.push( floor20 );        



        var floor21 = new Floor( 10200, 180, 10300, 230 ); //Check Point
        this.floors.push( floor21 );

        var floor22 = new Floor( 10550, 110, 11000, 160 );
        this.floors.push( floor22 );

        var floor23 = new Floor( 10500, 300, 11000, 350 );
        this.floors.push( floor23 );

        var floor24 = new Floor( 11100, 250, 11200, 300 );
        this.floors.push( floor24 );

        var floor25 = new Floor( 11300, 400, 11400, 450 );
        this.floors.push( floor25 );

        var floor26 = new Floor( 11270, 100, 11400, 150 );
        this.floors.push( floor26 );

        var floor27 = new Floor( 11600, 200, 12000, 250 );
        this.floors.push( floor27 );

        var floor28 = new Floor( 12200, 320, 12250, 370 );
        this.floors.push( floor28 );

        var floor29 = new Floor( 12400, 120, 12450, 170 );
        this.floors.push( floor29 );

        var floor30 = new Floor( 12600, 220, 14200, 270 );
        this.floors.push( floor30 );

        var floor31 = new Floor( 12800, 400, 14200, 450 );
        this.floors.push( floor31 );





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

         this.enermies.forEach( function( b ) {
            b.scheduleUpdate();
        }, this );

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
            if( this.STATES == GameLayer.STATES.END ) {}
            this.Neko.handleKeyDown( e );
            this.bulletHandleKeyDown( e );
        }
    },

     onKeyUp: function( e ){
        var pos = this.Neko.getPosition();
        if( this.STATES == GameLayer.STATES.END ){}
        else 
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

