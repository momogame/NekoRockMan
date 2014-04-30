var Bullet = cc.Sprite.extend({
	 ctor: function( GameLayer ) {
        this._super();
        this.initWithFile( 'images/bullet_v2.gif' );

        this.gameLayer = GameLayer;
        this.NekoIsFlipped = GameLayer.Neko.getFlipped()
        this.direction = 0;
        this.v = 8;

        this.charPos = GameLayer.Neko.getPosition();

        this.enermies = GameLayer.enermies;

    },

    update: function() {
    	this.bulletDirection();

    	var pos = this.getPosition();
    	this.setPosition( new cc.Point( pos.x + (this.direction*this.v) , pos.y ) );

        if( this.bulletIsFar(pos) ) {
            this.gameLayer.removeChild(this);
        }

        for( var i = 0; i < this.enermies.length; i++ ) {
            if( this.hit( this.enermies[i] ) ) {
                this.enermies[i].bulletColision();
                this.gameLayer.removeChild(this);
            }
        }

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

    bulletIsFar: function( pos ) {
        return pos.x > this.charPos.x + 900;
    },

    hit: function( obj ) {
        var objPos = obj.getPosition();
        var pos = this.getPosition();

        return ( Math.abs(pos.x - objPos.x) <= 20 ) && ( Math.abs(pos.y - objPos.y) <= 20 );
    },


 });