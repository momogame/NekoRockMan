var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBackground();
        this.createFloors();
        this.createEnermy();
        this.createCharacter();

        this.setKeyboardEnabled( true );

        this.scheduleUpdate();
        

        return true;
    },


    update: function(){
        this.newBG.scheduleUpdate();
        this.Neko.scheduleUpdate();
        this.updateEnermy();
        this.HPbar.scheduleUpdate();

        if( this.Neko.isDie() ) {
            var delay = cc.DelayTime.create(0.5);

            this.runAction(cc.Sequence.create(
                delay,
            cc.CallFunc.create(function () {
                this.restart();
            }, this)
        ));
           
        }
    },

    startGamePlay: function() {

    },

    createBackground: function() {
        this.newBG = new newBG( 800, 600/2 );
        this.addChild(this.newBG);
    },


    createCharacter: function() {
        this.Neko = new Neko( 200/2, /*128*/ 800);
        this.startPointX = 200/2;
        this.startPointY = 800;

        this.HPbar = new HPbar(this.Neko);
        this.addChild(this.HPbar);
        
        this.Neko.setHP( this.HPbar );
        this.Neko.setFloors( this.floors );
        this.Neko.setEnermies( this.enermies );
        this.addChild(this.Neko);

        this.followCharacter();

    },

    createEnermy: function() { 
        this.enermies = [];
        var enermy1 = new Enermy(300,400,this);
        this.enermies.push( enermy1 );

        var enermy2 = new Enermy(650,600,this);
        this.enermies.push( enermy2 );

        this.enermies.forEach( function( b ) {
            b.setFloors( this.floors );
            this.addChild( b );
        }, this );
    },

    updateEnermy: function() { 
        this.enermies.forEach( function( b ) {
            b.scheduleUpdate();
        }, this );
    },

    createFloors : function() {
        this.floors = [];
        var groundFloor1 = new Floor( 0, 0, 600, 104 ); // This is a floor
        this.floors.push( groundFloor1 );

        var groundFloor2 = new Floor( 1000, 0, 2000, 104);
        this.floors.push( groundFloor2 );

        //Except for floor, each floor should have a high of 50 
        var middleFloor = new Floor( 0, 200, 400, 250 );
        this.floors.push( middleFloor );

        var topFloor = new Floor( 600, 400, 800, 450 );
        this.floors.push( topFloor );

        //
        var firstFloor = new Floor( 200, 300, 400, 350 );
        this.floors.push( firstFloor );

        var secondFloor = new Floor( 800, 150, 900, 200);
        this.floors.push( secondFloor );


        this.floors.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

    followCharacter: function() {
        var followPlayer = cc.Follow.create(this.Neko, cc.rect(0, 0, 1600, 600));
        this.runAction(followPlayer);

    },

    bulletHandleKeyDown: function(e) {

        if( e == cc.KEY.space) {
            this.bullet = new Bullet( this );
            var charPos = this.Neko.getPosition();

            this.bullet.setPosition(charPos.x,charPos.y);
            this.addChild(this.bullet);

            this.bullet.scheduleUpdate();
        }

    },

    removeSprite: function( sprite ) {
        this.removeChild( sprite );
        this.enermies.shift();
    },

    gameOver: function() {
        this.enermy.unscheduleUpdate();

    },

    deleteCharacter: function() {
        this.removeChild( this);
    },

    restart: function() {
        this.Neko.setPosition(this.startPointX,this.startPointY);
        this.removeChild(this.Neko);
        this.removeChild(this.HPbar);
        
        this.enermies.forEach( function( b ) {
            b.setFloors( this.floors );
            this.removeChild( b );
        }, this );

        this.createCharacter();
        this.createEnermy();
        this.followCharacter();

    },


     onKeyDown: function(e){
        this.Neko.handleKeyDown( e );
        this.bulletHandleKeyDown( e );
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

