var Enermy = cc.Sprite.extend({
    ctor: function( x , y, GameLayer) {
        this._super();
        this.initWithFile( 'images/blackBox.gif' );
        
        this.x = x;
        this.y = y;

        this.maxVx = 5;
        this.accX = 0.25;

        this.jumpV = 12;
        this.g = -0.5;
        
        this.vx = 0;
        this.vy = 0;

        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;

        this.ground = null;

        this.floors = [];

        this.playerPos = GameLayer.Neko.getPosition();

    },


   updateSpritePosition: function() {
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },

    getEnermyRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
    
    update: function() {

        var currentPositionRect = this.getEnermyRect();

        this.updateYMovement();
        this.updateXMovement();

        var newPositionRect = this.getEnermyRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );

        this.updateSpritePosition();

    },

    updateXMovement: function() {
        if ( this.ground ) {console.log('hello');}
               
    },

    updateYMovement: function() {
        if ( this.ground ) {
            this.vy = 0;
            
        } else {
            this.vy += this.g;
            this.y += this.vy;
        }
    },


    handleCollision: function( oldRect, newRect ) {
        if ( this.ground ) { // is on the Ground
            if ( !this.ground.onTop( newRect ) ) {
                this.ground = null;
            }
        } else {
            if ( this.vy <= 0 ) {
                var topFloor = this.findTopFloor( this.floors,
                                                  oldRect,
                                                  newRect );
                
                if ( topFloor ) {
                    this.ground = topFloor;
                    this.y = topFloor.getTopY() + 25;
                    this.vy = 0;
                }
            }
        }
    },
    
    findTopFloor: function( floors, oldRect, newRect ) {
        var topFloor = null;
        var topFloorY = -1;
        
        floors.forEach( function( b ) {
            if ( b.hitTop( oldRect, newRect ) && ( b.getTopY() > topFloorY )) {
                topFloorY = b.getTopY();
                topFloor = b;
            }
        }, this );
        
        return topFloor;
    },

    setFloors: function( floors ) {
        this.floors = floors;
    },

});