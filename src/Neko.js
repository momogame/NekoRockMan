var Neko = cc.Sprite.extend({
    ctor: function( x , y ) {
        this._super();
        this.setAnchorPoint( cc.p( 0.5, 0 ) );
        //this.initWithFile( 'images/nekoR_v3.gif' );

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
        this.shoot = false;

        this.ground = null;

        this.floors = [];
        this.enermies = [];

        this.hp = null;

        //this.timer = 500;
        this.setFlippedX(true);

        this.STATUS = Neko.STATUS.STILL;
        this.createAnimation();


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

        this.flippedDirection();

        var currentPositionRect = this.getPlayerRect();

        

        this.updateYMovement();
        this.updateXMovement();

       // this.objectCollisionHandler(this.enermies);

        var newPositionRect = this.getPlayerRect();
        this.handleCollision( currentPositionRect,
                              newPositionRect );

        this.updateSpritePosition();

        this.updateAnimation();

    },

    updateXMovement: function() {

        if ( this.ground ) {
            if ( ( !this.moveLeft ) && ( !this.moveRight ) ) {
                this.vx = 0;
            } else if ( this.moveRight ) {
                this.STATUS = Neko.STATUS.MOVELEFT;
                this.accelerateX( 1 );
            } else {
                this.STATUS = Neko.STATUS.MOVERIGHT;
                this.accelerateX( -1 );
            }
        }

        if( this.isFallingDown() ){
            this.vx = 0;
        }    

        this.objectCollisionHandler( this.enermies );

        this.x += this.vx;
        this.checkOutOfScreen();  
    },

    checkOutOfScreen: function() {

        if( this.x < 0 + 20 ) {
            this.x = 0 + 20 ;
        }
        if( this.x > this.endPoint - 20 ) {
            this.x = this.endPoint - 20;
        }

    },

    updateYMovement: function() {
        if ( this.ground ) {
            this.STATUS = Neko.STATUS.STILL;
            this.vy = 0;
            if ( this.jump ) {
                this.STATUS = Neko.STATUS.JUMP;
                this.vy = this.jumpV;
                this.y = this.ground.getTopY() +  this.vy;
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
                    this.y = topFloor.getTopY() ;
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

    flippedDirection: function() {
        if( this.moveLeft ) {
            this.setFlippedX(false);
        }
        if( this.moveRight ) {
            this.setFlippedX(true);
        }
    },

    closeTo: function( obj ) {
        var objPos = obj.getPosition();
        var pos = this.getPosition();

        //var nekoRec = this.getBoundingBox();
        //var objRec = obj.getBoundingBox();

        return ( Math.abs(pos.x - objPos.x) <= 50 ) && ( Math.abs(pos.y - objPos.y) <= 40 );
        //return cc.rectIntersectsRect( nekoRec , objRec );
    },


    objectCollisionHandler: function( obj ) {
        for( var i = 0; i < obj.length; i++ ) {
            if( this.closeTo( obj[i] ) ) {

                //this.STATUS = Neko.STATUS.INJURE;

                if( this.getFlipped() ) {
                    //this.x += -50;
                    this.schedule( this.timer,0,5,0 );
                    //this.accelerateX( -1 );
                    
                }
                else{
                     //this.runAction(cc.MoveTo.create(1,cc.p(this.x+50,this.y)));
                    //this.accelerateX( 1 );
                    //this.x += 50;
                   this.schedule( this.timer,0,5,0 );
                 }
                   
                    //this.x += this.vx;

               if( !this.iscollide ) {  
                    this.hp.lostHealth();
                }
               
            }
           // else
                
        } 
        this.iscollide = false;

        //console.log(this.iscollide);
    },
    timer: function() {
        var dir = 0;
        if( this.getFlipped() ) {
            dir = 1;
            this.moveRight = false;
        }
        else {
            dir = -1
            this.moveLeft = false;
        }


        this.x -= 7*dir ;

        this.iscollide=true;
        //this.moveRight=false;
    },

    isDie: function() {
        return ( this.hp.getRemainHealth() == 0 ) || this.isFallingDown() ;
    },

    isFallingDown: function() {
        return this.y <= -100 ;
    },

    countDownTimer: function() {
        if(this.timer > 0) {
            this.timer--;
        }
    },

    bounce: function() {

    },




    //////////////////////////////////////////////////////////////////////////////////////////


    
    handleKeyDown: function( e ) {
        if( this.iscollide ) ;
        else if ( Neko.KEYMAP[ e ] != undefined ) {
            this[ Neko.KEYMAP[ e ] ] = true;
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

    setEnermies: function( enermies ) {
        this.enermies = enermies;
    },

    addEnermies: function( enermy ) {
        for( i = 0; i < this.enermies.length; i++ ) {
            this.enermies.push[ enermy ];
        }
    },

    setHP: function( HP,life ) {
        this.hp = HP;
        this.hp.setLife(life);
    },

    setEndPoint: function( endPoint ) {
        this.endPoint = endPoint;
    },

    getVx: function() {
        return this.vx;
    },

    getFlipped: function() {
        return this.isFlippedX();      
    },

    getCollide: function() {
        return this.isCollide;
    },

    ///////////////////////////////////////////////////////////

    createAnimation: function(){
        this.Action = new Array();
        this.Action[0] = this.charAnimation( "stand" , 10 );
        this.Action[1] = this.charAnimation( "move", 4 );
        this.Action[2] = this.charAnimation( "move", 4 );
        this.Action[3] = this.charAnimation( "jump", 8 );
        this.Action[4] = this.charAnimation( "shoot", 4 );

    },

    charAnimation: function( Action , num ){
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames( ani_neko[0] , ani_neko[1] );

        var animFrames = [];
        for (var i = 0; i < num; i++) {
            var str = "NK_" + Action + "_" + (i+1) + ".png";
            var frame = cache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.1);
        return cc.Animate.create(animation);
    },

    updateAnimation: function() {
        if( this.shoot ) {
            this.STATUS = Neko.STATUS.SHOOT;
        }
        if( this.lastSTATUS != this.STATUS ){
            this.lastSTATUS = this.STATUS;
            this.stopAllActions();
            this.runAction(this.Action[this.STATUS]);
        }else{
            if(this.Action[this.lastSTATUS].isDone() /*&& this.STATUS != Neko.STATUS.DEAD*/ ){
                this.runAction(this.Action[this.STATUS]);    
            }
        }
    },




});

Neko.STATUS ={
    STILL: 0,
    MOVELEFT: 1,
    MOVERIGHT: 2,
    JUMP: 3,
    SHOOT: 4,
   // INJURE: 5,
   // DEAD: 6,
};

Neko.KEYMAP = {}
Neko.KEYMAP[cc.KEY.left] = 'moveLeft';
Neko.KEYMAP[cc.KEY.right] = 'moveRight';
Neko.KEYMAP[cc.KEY.up] = 'jump';
Neko.KEYMAP[cc.KEY.space] = 'shoot';
