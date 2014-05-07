var HPbar = cc.Sprite.extend({
	 ctor: function( character, life ) {
        this._super();
        this.initWithFile( 'images/hp_bar.gif' );
        this.scale = 0.8;
        this. setScale( this.scale );

        this.MAX_HEALTH = 15;
        this.MAX_LIFE = 5;

        this.life = life;
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
        if( this.character.x >= 400 ) //Before screen start to follow character
            this.x = 50 + (this.character.x - 400);
        if( this.character.x >= this.character.endPoint - 400 ) //Before screen stop to follow character
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
        this.lives = [];

        for( var i = 0; i < this.life; i++ ) {
            this.lives.push( new Life(i*40) );
            this.addChild( this.lives[i] );
        }
    },

    lostHealth: function() {
        this.removeChild(this.health.pop());
    },

    gainHealth: function() {
        this.addChild(this.health.push( new HP(i*7) ) );
    },

    getRemainHealth: function() {
        return this.health.length;
    },

    getLife: function() {
        return this.lives.length;
    },

    setLife: function() {

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