var HPbar = cc.Sprite.extend({
	 ctor: function( character ) {
        this._super();
        this.initWithFile( 'images/hp_bar.gif' );
        this.scale = 0.8;
        this. setScale( this.scale );
        
        this.x = 50;
        this.y = 520;
        this.setPosition( cc.p( 50, 520 ) );


        this.character = character;
        //this.GameLayer = GameLayer;

        //var followPlayer = cc.Follow.create(this.GameLayer);
        
        //this.runAction(followPlayer);

      
    },

    update: function() {
        this.followCharacter();
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );



    },

    followCharacter: function() {
        if( this.character.x >= 400 ) 
            this.x = 50 + (this.character.x - 400);
        if( this.character.x >= 1200 )
            this.x = 50 + 800;
    },


 });