var Neko = cc.Sprite.extend({
    ctor: function( x , y) {
        this._super();
        this.initWithFile( 'images/nekoR_v3.gif' );

        this.x = x;
        this.y = y;

        this.maxVx = 3;

        this.accX = 0.25;

        this.jumpV = 18;
        this.g = -1;
        
        this.vx = 0;
        this.vy = 0;

        this.xDirection = 0;

        this.onFloor = false;
        this.floor = null;

        //this.moveLeft = false;
        //this.moveRight = false;
        this.jump = false;
        
    },

    update: function( dt ) {

        var oldRect = this.getBoundingBoxToWorld();
        var oldX = this.x;
        var oldY = this.y;

         this.updateXMovement();
         this.updateYMovement();

        var dX = this.x - oldX;
        var dY = this.y - oldY;
       
        /*if( this.y <= 128){ //When Neko touch the ground which is at y-axis 128
            this.vy = 0;
            this.y = 128;
        }
        else
            this.vy += this.g; */

         this.updatePosition();
       
    },

    //Stole from A.
    updatePosition: function() {



        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },

     updateXMovement: function() {
        this.accelerateX();
        this.x += this.vx;
    },

    updateYMovement: function() {
        var oldPos = this.getBoundingBoxToWorld();

        if( this.onFloor ){
            this.vy = 0;

            if ( this.jump ) {
                this.vy = this.jumpV;
                this.y += this.vy;
                this.floor = null;
            }

        } else { //No jump          
            this.vy += this.g; 

            if( (this.y + this.vy) < 128 ) { //Check if the next fall will pass the floor or not
                this.y = 128;
            } else
                  this.y += this.vy;
        } 
    },

    accelerateX: function() {     
        this.vx += this.xDirection * this.accX;  
        if ( Math.abs( this.vx ) > this.maxVx ) {
            this.vx = this.xDirection * this.maxVx;
        }
        
    },

    onFloorHandler: function( floors ) {
        var oldPos = this.getBoundingBoxToWorld();
        var topFloor = floors.getTopY();

        if( ( oldPos.y <= topFloor ) && floors.onTop( oldPos ) ) {
            this.onFloor = true;
            this.floor = floors; 
        }
        else { 
            this.onFloor = false;
            this.floor = null;
        }

    },


    handleKeyDown: function( e ) {
         if(  e == 65  ) { //LEFT press A
            this.xDirection = -1; //Walk Left
        }
         if( e == 68 ) { //RIGHT press D
            this.xDirection = 1; //Walk Right
        }
         if( e == 87 ) { // press W
    
            if(this.onFloor) {
                this.jump = true;
                this.vy = this.jumpV;
            }
        }
    },

    handleKeyUp: function( e ) {

        if( e == 65 || e == 68) { //To check if the key up is move left and move right key
            this.xDirection = 0;
            this.vx = 0;
        }
        if( e == 87 ) { 
            this.jump = false;        
            if(this.vy > 0) {         
                this.vy = 0;
            }
        }
    }
    
        
});
