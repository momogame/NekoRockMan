var Neko = cc.Sprite.extend({
    ctor: function( x , y) {
        this._super();
        this.initWithFile( 'images/nekoR_v3.gif' );

        this.x = x;
        this.y = y;

        this.maxVx = 3;
        //this.maxVy = 30;
        this.accX = 0.25;
        //this.accY = 5;

        this.jumpV = 18;
        this.g = -1;
        
        this.vx = 0;
        this.vy = 0;

        this.xDirection = 0;
      //  this.yDirection = 0;

        //this.moveLeft = false;
        //this.moveRight = false;
        //this.jump = false;
        
    },

    update: function( dt ) {


         this.updateXMovement();
         this.updateYMovement();
       
         this.updatePosition();

         if( this.y <= 128){ //When Neko touch the ground which is at y-axis 128
            this.vy = 0;
            this.y = 128;
        }
        else
            this.vy += this.g;
          
   //       console.log('Vy = ' + this.vy);

 //To check if the key up is move left and move right key         
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
            this.y += this.vy;
            console.log('Vy = ' + this.vy);
    },

    accelerateX: function() {     
        this.vx += this.xDirection * this.accX;  
        if ( Math.abs( this.vx ) > this.maxVx ) {
            this.vx = this.xDirection * this.maxVx;
        }
        //console.log('Vx = ' + this.vx);
        
    },


    handleKeyDown: function( e ) {
         if(  e == 65  ){ //LEFT press A
            this.xDirection = -1; //Walk Left
        }
        else if( e == 68 ){ //RIGHT press D
            this.xDirection = 1; //Walk Right
        }
        else if( e == 87 ){ // press W
            if(this.y == 128){ // In the future instead of check the position we shold check the floor topY position
              //  this.yDirection = 1;
                this.vy = this.jumpV;
            }
        }
    },

    handleKeyUp: function( e ) {

        if( e == 65 || e == 68){ //To check if the key up is move left and move right key
            this.xDirection = 0;
            this.vx = 0;
        }
        if( e == 87 ) {         
            if(this.vy > 0) {
                this.vy = 0;
            }
        }
    }
    
        
});
