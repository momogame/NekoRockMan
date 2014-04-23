var Bullet = cc.Sprite.extend({
	 ctor: function() {
        this._super();
        this.initWithFile( 'images/bullet_v1.gif' );

    },

    update: function() {
    	var pos = this.getPosition();
    	this.setPosition( new cc.Point( pos.x+5 , pos.y ) );
    },

 });