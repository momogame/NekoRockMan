var newBG = cc.Sprite.extend({
    ctor: function(x,y) {
        this._super();
        this.initWithFile( 'images/Nbg.jpg' );
        this.x = x;
        this.y = y;

        this.setPosition( cc.p( this.x, this.y ) );
       
    }

});
