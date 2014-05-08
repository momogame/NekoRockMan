var Enermy = cc.Sprite.extend({
    ctor: function( x , y, GameLayer) {
        this._super();
        this.initWithFile( 'images/bot1.png' );

        this.x = x;
        this.y = y;

        this.life = 3;

        this.maxVx = 2;
        this.accX = 0.05;

        this.jumpV = 12;
        this.g = -0.5;
        
        this.vx = 0;
        this.vy = 0;

        this.randomMove();
        //this.autoMove();
        //this.moveLeft = false;
        //this.moveRight = false;
        this.jump = false;

        this.ground = null;

        this.floors = [];


        this.gameLayer = GameLayer;

        this.schedule(this.swapDirection,0.75);
        

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
        if ( this.ground ) {



            if ( ( !this.moveLeft ) && ( !this.moveRight ) ) {
                this.vx = 0;
            } else if ( this.moveRight ) {  
               this.vx = this.maxVx;
            } else {
                this.vx = (-1)*this.maxVx;
            }

            this.x += this.vx;
        }
               
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


    bulletColision: function() {
        
        if( this.isDie() ) {
            this.gameLayer.removeEnermyFromArray();
            this.gameLayer.removeChild( this );
        }
        else
            --this.life;
        
    },

    isDie: function() {
        return (this.life == 0);
    },


    randomMove: function() {
        var random = Math.round(Math.random());

        if( random == 0 ) {
            this.moveLeft = false;
            this.moveRight = true;
        }
        else {
            this.moveLeft = true;
            this.moveRight = false;
        }

    },

    swapDirection: function() {
        if( this.moveLeft ) {
            this.moveLeft = false;
            this.moveRight = true;
        }
        else {
            this.moveRight = false;
            this.moveLeft = true;
        }
    },

});