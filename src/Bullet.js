var Bullet = cc.Sprite.extend({
	 ctor: function( NekoIsFlipped ) {
        this._super();
        this.initWithFile( 'images/bullet_v2.gif' );

        this.NekoIsFlipped = NekoIsFlipped;
        this.direction = 0;
        this.v = 5;

    },

    update: function() {
    	this.bulletDirection();

    	var pos = this.getPosition();
    	this.setPosition( new cc.Point( pos.x + (this.direction*this.v) , pos.y ) );
    },

    bulletDirection: function() {
    	this.setFlippedX(this.NekoIsFlipped);
    	if( this.NekoIsFlipped ) {
    		this.direction = -1;
    	}
    	else {
    		this.direction = 1;
    	}
    },

 });