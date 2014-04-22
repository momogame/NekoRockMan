var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        //Create Background
        this.newBG = new newBG( 800, 600/2 );
        this.addChild(this.newBG);

        this.createFloors();

        //Create Neko character
        this.Neko = new Neko( 200/2, /*128*/ 600);
        this.Neko.setFloors( this.floors );
        this.addChild(this.Neko);


        //this.newBG.setPlayer(this.Neko);


        //Create floor
        /* this.floor = new Floor();
        this.floor.setAnchorPoint( cc.p( 0, 0 ) );
        this.floor.setPosition( new cc.Point( 0, 0) );
        this.addChild(this.floor); */


        this.setKeyboardEnabled( true );

        this.newBG.scheduleUpdate();
        this.Neko.scheduleUpdate();

        this.scheduleUpdate();

        //Screen follow character
        var followPlayer = cc.Follow.create(this.Neko, cc.rect(0, 0, 1600, 600));
        this.runAction(followPlayer);

        return true;
    },


    update: function(){
        //this.setPosition( cc.p( this.character.x  , this.y ) );

    },



    createFloors : function() {
        this.floors = [];
        var groundFloor1 = new Floor( 0, 0, 600, 104 ); // This is a floor
        this.floors.push( groundFloor1 );

        var groundFloor2 = new Floor( 700, 0, 2000, 104);
        this.floors.push( groundFloor2 );

        //Except for floor, each floor should have a high of 50 
        var middleFloor = new Floor( 0, 200, 400, 250 );
        this.floors.push( middleFloor );

        var topFloor = new Floor( 600, 400, 800, 450 );
        this.floors.push( topFloor );

        var firstFloor = new Floor( 200, 300, 400, 350 );
        this.floors.push( firstFloor );


        this.floors.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

     onKeyDown: function(e){
        this.Neko.handleKeyDown( e );
     },

     onKeyUp: function( e ){
        this.Neko.handleKeyUp( e );
     }

});



var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

