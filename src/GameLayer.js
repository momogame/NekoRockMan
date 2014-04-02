var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        //Create Background
        this.newBG = new newBG();
        this.newBG.setPosition( new cc.Point( 800/2, 600/2 ) );
        this.addChild(this.newBG);


        //Create floor
        /*this.floor = new Floor();
        this.floor.setAnchorPoint( cc.p( 0, 0 ) );
        this.floor.setPosition( new cc.Point( 0, 0) );
        this.addChild(this.floor);*/

        this.createFloors();



        //Create Neko character
        this.Neko = new Neko( 800/2, 128);
        //this.Neko.setPosition( new cc.Point( 800/2, 128 ) );
        this.addChild(this.Neko);


        this.setKeyboardEnabled( true );

        this.Neko.scheduleUpdate();

        return true;
    },

    createFloors: function() {
        this.floors = [];
        var groundFloor = new Floor( 0, 0, 1600, 104 );
        this.floors.push( groundFloor );


        this.floors.forEach( function( b ) {
            this.addChild( b );
        }, this );
    },

     onKeyDown: function(e){
        //console.log( 'Down: ' + e );
        this.Neko.handleKeyDown( e );
     },

     onKeyUp: function( e ){
        //console.log( 'Up: ' + e );
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

