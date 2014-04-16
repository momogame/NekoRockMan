var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        //Create Background
        this.newBG = new newBG( 800, 600/2 );
        this.addChild(this.newBG);

        this.createBlocks();

        //Create Neko character
        this.Neko = new Neko( 200/2, /*128*/ 600);
        this.Neko.setBlocks( this.blocks );
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

        return true;
    },


    update: function(){
        //this.setPosition( cc.p( this.character.x  , this.y ) );
        var followPlayer = cc.Follow.create(this.Neko, cc.rect(0, 0, 3000, 600));
        this.runAction(followPlayer);
    },



    createBlocks : function() {
        this.blocks = [];
        var groundBlock1 = new Block( 0, 0, 600, 104 ); // This is a floor
        this.blocks.push( groundBlock1 );

        var groundBlock2 = new Block( 700, 0, 2000, 104);
        this.blocks.push( groundBlock2 );

        //Except for floor, each block should have a high of 50 
        var middleBlock = new Block( 0, 200, 400, 250 );
        this.blocks.push( middleBlock );

        var topBlock = new Block( 600, 400, 800, 450 );
        this.blocks.push( topBlock );

        var firstBlock = new Block( 200, 300, 400, 350 );
        this.blocks.push( firstBlock );


        this.blocks.forEach( function( b ) {
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

