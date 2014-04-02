var Floor = cc.Sprite.extend({
    ctor: function( x1, y1, x2, y2 ) {
        this._super();
        this.initWithFile( 'images/NFloor.jpg',
        					cc.rect( 0, 0, x2-x1, y2 - y1 ) );
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.setPosition( cc.p( x1, y1 ) );
        
         },
        
});
