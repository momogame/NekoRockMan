var HPbar = cc.Sprite.extend({
	 ctor: function( character ) {
        this._super();
        this.initWithFile( 'images/hp_bar.gif' );
        this.scale = 0.8;
        this. setScale( this.scale );

        this.MAX_HEALTH = 15;
        this.MAX_LIFE = 5;
        this.createHealth();
        this.createLife();

        this.x = 50;
        this.y = 520;
        this.setPosition( cc.p( 50, 520 ) );

       

        this.character = character;
      
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

    createHealth: function() {
        this.health = [];

        for( var i = 0; i < this.MAX_HEALTH; i++ ) {
            this.health.push( new HP(i*7) );
            this.addChild( this.health[i] );
        }
    },

    createLife: function() {
        this.life = [];

        for( var i = 0; i < this.MAX_LIFE; i++ ) {
            this.life.push( new Life(i*40) );
            this.addChild( this.life[i] );
        }
    },

    lostHealth: function() {
        this.removeChild(this.health.pop());
        if( this.health.length == 0 ) {
            this.lostLife();

           // this.createHealth();
        }
    },

    lostLife: function() {
        this.removeChild(this.life.pop());
    },

    gainHealth: function() {
        this.addChild(this.health.push( new HP(i*7) ) );
    },

    getRemainLife: function() {
        return this.health.length;
    },

 });

var HP = cc.Sprite.extend({
    ctor: function(y) {
        this._super();
        this.initWithFile( 'images/health.jpg' );
        this.standardX = 23;
        this.standardY = 56;

        this.addY = y;

        this.setPosition( cc.p( this.standardX , this.standardY + this.addY ));
    }


});

var Life = cc.Sprite.extend({
    ctor: function(x) {

        this._super();
        this.initWithFile( 'images/life_head.png' );
        this.standardX = 900;
        this.standardY = 150;

        this.addX = x;

        this.setPosition( cc.p( this.standardX - this.addX , this.standardY ));
    }
});