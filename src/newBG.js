var newBG = cc.Sprite.extend({
    ctor: function(x,y) { //1600 x 600
        this._super();
        this.initWithFile( 'images/Nbg.jpg' );
        this.x = x;
        this.y = y;

        this.setPosition( cc.p( this.x, this.y ) );
       
    }

});
