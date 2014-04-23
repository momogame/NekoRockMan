var Neko = cc.Sprite.extend({
    ctor: function( x , y) {
        this._super();
        this.initWithFile( 'images/nekoR_v3.gif' );

        this.x = x;
        this.y = y;

        this.maxVx = 3;
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

        this.updateSpritePosition();
        
    },

    ////PHYSIC ENGINE ///////////////////////////////////////////////////////

    updateSpritePosition: function() {
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },

    getPlayerRect: function() {
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
        var currentPositionRect = this.getPlayerRect();

        this.updateYMovement();
        this.updateXMovement();

        var newPositionRect = this.getPlayerRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );

        this.updateSpritePosition();

    },

    updateXMovement: function() {
        if ( this.ground ) {
            if ( ( !this.moveLeft ) && ( !this.moveRight ) ) {
                this.vx = 0;
            } else if ( this.moveRight ) {
                this.accelerateX( 1 );
            } else {
                this.accelerateX( -1 );
            }
        }
        this.x += this.vx;
        this.checkOutOfScreen();      
    },

    checkOutOfScreen: function() {

        if( this.x < 0 + 20 ) {
            this.x = 0 + 20 ;
        }
        if( this.x > 1600 - 20 ) {
            this.x = 1600 - 20;
        }

    },

    updateYMovement: function() {
        if ( this.ground ) {
            this.vy = 0;
            if ( this.jump ) {
                this.vy = this.jumpV;
                this.y = this.ground.getTopY() + 25  + this.vy;
                this.ground = null;
            }
        } else {
            this.vy += this.g;
            this.y += this.vy;
        }
    },

    isSameDirection: function( dir ) {
        return ( ( ( this.vx >=0 ) && ( dir >= 0 ) ) ||
                 ( ( this.vx <= 0 ) && ( dir <= 0 ) ) );
    },

    accelerateX: function( dir ) {
        if ( this.isSameDirection( dir ) ) {
            this.vx += dir * this.accX;
            if ( Math.abs( this.vx ) > this.maxVx ) {
                this.vx = dir * this.maxVx;
            }
        } else {
            this.vx = dir * this.accX;
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


    //////////////////////////////////////////////////////////////////////////////////////////


    
    handleKeyDown: function( e ) {
        if ( Neko.KEYMAP[ e ] != undefined ) {
            this[ Neko.KEYMAP[ e ] ] = true;
        }

        if( e == cc.KEY.space) {
           // this.shoot();
        }
    },

    handleKeyUp: function( e ) {
        if ( Neko.KEYMAP[ e ] != undefined ) {
            this[ Neko.KEYMAP[ e ] ] = false;
        }
        if(this.vy > 0) { 
             this.vy = 0;
        }
    },

    setFloors: function( floors ) {
        this.floors = floors;
    },

    getVx: function() {
        return this.vx;
    },


    shoot: function() {
        if(this.shoot) {
            this.bullet = new Bullet();

            var charPos = this.getPosition();

            this.bullet.setPosition(100,100);
            this.addChild(this.bullet);

            this.bullet.scheduleUpdate();
            
        }
    },




});

Neko.KEYMAP = {}
Neko.KEYMAP[cc.KEY.a] = 'moveLeft';
Neko.KEYMAP[cc.KEY.d] = 'moveRight';
Neko.KEYMAP[cc.KEY.w] = 'jump';
//Neko.KEYMAP[cc.KEY.space] = 'shoot';
        
