// let Escena = "Intro";
// let Escena = "GamePlay";
let Escena = "GameOver";
var TimeDraw = 0;

let Enter=13;
let Up = 38;
let Down = 40;
let Space = 32;

let A = 65;
let W = 87;
let S = 83;
let D = 68;

let Disparo = [];
let bullets = [];

let angle=0;
var Tecla_Presionada=0;
let Score=0;

let Frame=0;
var addFrame=0;

let GamePlataforms="";


Screen.init();
ctx = Screen.context;

KeyboardEvents();


function Interfaz_Gameplay(){ 	
			Text("Score"+" "+Score +""+Nave.live,'30px Calibri','white',Screen.W/2-50,55);
			
			
 	 	 	  }

const Nave = {
		draw:true,
		X:canvas.width/2,
		Y:canvas.height/2,
		W:100,
		H:100,
		Radius:60,
		Angle:0,
		Radians:0,
		live:3,
		Speed:20,
		Color:"rgba(255,255,255,0.2)",
		URL:"asset/image/",
		NaveImg:"Nave.png",
		ExplosionAnimacion:[
				"asset/image/Explosion1.png",
				"asset/image/Explosion2.png",
				"asset/image/Explosion3.png",
				"asset/image/Explosion4.png",
				"asset/image/Explosion5.png",
				"asset/image/Explosion6.png",
				"asset/image/Explosion7.png"
			],
			
		farmeExplocion:0,
		TimeAnimacion:0,
		StateAnimacion:false,
		
		paint:function(){	
			if(Nave.draw==true){

				ctx.save();						
				ctx.translate(Nave.X, Nave.Y);
				ctx.rotate(Nave.Radians);
	
	
			if(Nave.live==3){
				Circle(3,0, 60, 0, "red");
			}
			if(Nave.live==2){
				Circle(3,0, 40, 0, "blue");
			}
			if(Nave.live==1){
				Circle(3,0, 20, 0, "yellow");
			}

				Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.URL+Nave.NaveImg);	
				
				ctx.restore();
		
			}
			
			
			
		},
		Move:function(){
			
		Nave.Radians = Nave.Angle*Math.PI / 180;

			if(Keyboard[W]==true){	
				Nave.X -= Math.cos(Nave.Radians) * Nave.Speed;
				Nave.Y -= Math.sin(Nave.Radians) * Nave.Speed; 
				
				}
				
			if(Keyboard[A]==true){	
					Nave.Angle-=Nave.Speed; 	 
				
				}
					
			if(Keyboard[D]==true){ 
					Nave.Angle+=Nave.Speed; 
				
				}
		
			//disparo
			if(Keyboard[Enter] && Tecla_Presionada==0){
						
						Tecla_Presionada+=1;						
						Nave.Disparo();
					
				}
					
			if(Keyboard[Enter]==false){ Tecla_Presionada=0; 		}
			
			
				if (Nave.X < Nave.Radius){
						Nave.X = canvas.width;
				}
				if (Nave.X > canvas.width){
						Nave.X = Nave.Radius;
				}
				if (Nave.Y < Nave.Radius){
						Nave.Y = canvas.height;
				}
				if (Nave.Y > canvas.height){
						Nave.Y = Nave.Radius;
				}
			
		},
		Disparo:function(){		
				Disparo.push({
						x:Nave.X,
						y:Nave.Y,	
						width:10,
						height:10,
						angle:Nave.Angle
					
				});	
		},
		Paint_disparo:function(){
				ctx.save();
				for(var i in Disparo){	
					var Fn1 = Disparo[i];	
					Circle(Fn1.x, Fn1.y, 6, 0, "blue");
				};
				ctx.restore();
		},
		Fire:function(){

		//movimiento disparo		
			for(var i in Disparo){				
					var Fn1 = Disparo[i];
					let radians = Fn1.angle * Math.PI / 180
					Fn1.x -= Math.cos(radians) * 25;
					Fn1.y -= Math.sin(radians) * 25;	
				}
		//eliminar disparo al superar la ventana	
			for(var i in Disparo){				
					var Fn1 = Disparo[i];					
					if(Fn1.x<0 || Fn1.y<0){	Disparo.splice(i, 1);}
					if(Fn1.x>canvas.width || Fn1.y>canvas.height){ Disparo.splice(i, 1); }
				}
		},
		Explosion:function(){

			if(Nave.live==0){
						
						Nave.draw=false;
						Nave.StateAnimacion=true;

				if(Nave.StateAnimacion==true){
					if(Frame!=7){
						
						addFrame+=1;
						
						if(addFrame==3){
							Frame+=1;
							addFrame=0;
						}
						
					}
					
					if(Frame==0){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[0]);	
						ctx.restore();
						
					}if(Frame==1){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[1]);	
						ctx.restore();
						
					}if(Frame==2){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[2]);	
						ctx.restore();
						
					}
					if(Frame==3){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[3]);	
						ctx.restore();
						
					}
					if(Frame==4){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[4]);	
						ctx.restore();
						
					}
					if(Frame==5){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[5]);	
						ctx.restore();
						
					}
					if(Frame==6){
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[6]);	
						ctx.restore();
						
					}
					if(Frame==7){
						
						Nave.StateAnimacion=false;
								 Escena="GameOver";
						
					}
						
					
					
				}
						
			
					
						}
						
							
		},
		collision:function(){
			
			if(Nave.draw==true && Meteor.draw==true){
				let Collision = CircleCollision.init(Meteor.X, Meteor.Y, Nave.X, Nave.Y, 100);
					
					if(!Collision){	}
							 else{	
								Meteor.draw=false;
								Nave.live-=1;


							 }
			}
			
		}
		
		
	};

const Meteor = {	
	draw:false,
	X:100,
	Y:100,
	W:150,
	H:100,
	R:0,
	Radius:50,
	Speed:8,
	Color:"rgba(0,0,0,1)",
	URL:"asset/image/Meteor.png",
	activo:0,
	angle:0,
	paint:function(){
	
		if(Meteor.draw==true){
			
			ctx.save();
			ctx.translate(Meteor.X, Meteor.Y);
			ctx.rotate(Meteor.R * Math.PI / 180);	
			// Circle(0, 0, Meteor.Radius, 0, Meteor.Color);
			Images(-Meteor.W/2, -Meteor.H/2, Meteor.W, Meteor.H, Meteor.URL);
			ctx.restore();
			
			Meteor.R+=20;
		}
	
	
		
	},
	PosRandom:function(){
		
		if(!Meteor.draw && Math.floor ((Math.random()*50)+1)<4){
			Meteor.X = Math.floor(Math.random()*(canvas.width-Meteor.W));
			Meteor.Y = Math.floor(Math.random()*(canvas.height-Meteor.H));
			Meteor.angle = Math.floor(Math.random() * 359);
			
			
				setTimeout(function(){Meteor.draw=true;},50);
		}
	},
	Rastreo:function(){
		
		
		let radians = Meteor.angle / Math.PI * 180;
        Meteor.X -= Math.cos(radians) * 10;
        Meteor.Y -= Math.sin(radians) * 10;
		
		
		
		if (Meteor.X < Nave.Radius) {
            Meteor.X = canvas.width;
        }
        if (Meteor.X > canvas.width) {
            Meteor.X = Nave.Radius;
        }
        if (Meteor.Y < Nave.Radius) {
            Meteor.Y = canvas.height;
        }
        if (Meteor.Y > canvas.height) {
            Meteor.Y = Nave.Radius;
        }
		
		
		
		
		
		
		
		
		
		
						// if(Meteor.X<Nave.X){			
							// Meteor.X+=Meteor.Speed;
							// }
							// if(Meteor.Y<Nave.Y){			
									// Meteor.Y+=Meteor.Speed;
								// }
						
						// if(Meteor.Y>Nave.Y){			
							// Meteor.Y-=Meteor.Speed;
							// }
							// if(Meteor.X>Nave.X){			
									// Meteor.X-=Meteor.Speed;
								// }
								

	},
	Collision:function(){
		if(Meteor.draw==true){
			for(var i in Disparo){
				var Bala = Disparo[i];
				let Collision = CircleCollision.init(Meteor.X, Meteor.Y, Bala.x, Bala.y, 50);
		
			
				if(!Collision){}
								else{	
										Meteor.draw = false;
										Score+=1;

										}
			}
			
			

		}
	
	}
	
	
		};



function AreaNula(x1,y1,x2,y2){

}


function Intro(){
	// Square(0,0,Screen.W,Screen.H,0,"grey");
	Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
	Text("Destructor Asteroid",'70.5px Calibri','yellow',Screen.W/2-274,Screen.H/2);
	Text("Destructor Asteroid",'70px Calibri','white',Screen.W/2-270,Screen.H/2);
	
	Text("Press Enter",'50.5px Calibri','yellow',Screen.W/2-93,Screen.H-100);
	Text("Press Enter",'50px Calibri','white',Screen.W/2-90,Screen.H-100);
	
	
		if(Keyboard[Enter]){
		
		Escena = "GamePlay";
		
	}
	
}

function FondoGamplay(){
	
	Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
}

function GameOver(){
	// Square(0,0,Screen.W,Screen.H,0,"grey");
	Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
	
	Text("Game Over",'73px Calibri','red',Screen.W/2-155,Screen.H/2);
	Text("Game Over",'70px Calibri','white',Screen.W/2-150,Screen.H/2);
	
	
	
	Text("Press Enter",'50.5px Calibri','red',Screen.W/2-93,Screen.H-100);
	Text("Press Enter",'50px Calibri','white',Screen.W/2-90,Screen.H-100);
	
	if(Keyboard[Enter]){
		
		Escena = "Intro";
		
	}
	
}


function Keyboard(){
	
	
	
}




// window.load=function(){
	
(function LoopGame(){
		
	switch(Escena){
			case "Intro":
				Intro();
				// if(Frame!=6){
					// Frame+=1;
				// }
				// else{
					
					// Frame=0;
				// }
			// ctx.save();						
			// ctx.translate(Nave.X, Nave.Y);
			// ctx.rotate(Nave.Radians);
			// Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.ExplosionAnimacion[Frame]);	
			// ctx.restore();
				
				
			break;
			
			case "GamePlay":
				FondoGamplay();
				
				Nave.Move();
				Nave.collision();
				Nave.Paint_disparo();
				Nave.Fire();
				Nave.paint();
				Nave.Explosion();
				
			if(Nave.live!=0){
				
				Meteor.PosRandom();
				Meteor.Rastreo();
				Meteor.Collision();
				Meteor.paint();
				
			}
			Interfaz_Gameplay();
			break; 

			case "GameOver":
				GameOver();
			break;
			  
			  default:
					alert("ERROR");
	}
		
		
		
		
		
		
		
	Game_loop.start(LoopGame);
	
	})();

// }
