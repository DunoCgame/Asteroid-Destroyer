let Escena = "GamePlay";
var TimeDraw = 0;

let Enter=13;
let Up = 38;
let Down = 40;
let Space = 32;

let Disparo = [];
let Bala = true;

var Tecla_Presionada=0;
let Score=0;

// var tecla_izquierda = 37;
// var tecla_arriba = 38;
// var tecla_derecha = 39;
// var tecla_abajo = 40;

Screen.init();
ctx = Screen.context;

KeyboardEvents();




function Interfaz_Gameplay(){ 	
	Text("hola",'100px Calibri','white',Screen.W/2-250,Screen.H/2);





 	 	 	  }

var balaX=0;
var balaY=0;
let radians=0;
var Radians=0;

const Nave = {
		draw:true,
		X:0,
		Y:0,
		W:150,
		H:100,
		Angle:0,
		Radius:50,
		live:3,
		Color:"rgba(255,0,255,0.4)",
		URL:"asset/image/Nave.png",
		
		paint:function(){
				if(Nave.draw==true){

					Radians = Nave.Angle*Math.PI / 180;
				
					Nave.X = canvas.width/2;
					Nave.Y = canvas.height/2;
					
					ctx.save();						
					ctx.translate(Nave.X, Nave.Y);
					ctx.rotate(Radians);
					ctx.fillStyle = 'rgba(0,0,0,0.2)';
					ctx.fillRect(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H);				
					
					ctx.fillStyle = 'red';
					ctx.fillRect(0, Nave.H-50, 10, 10);								
					
					ctx.restore();
					
					Debut("naveX"+":"+Nave.X+"|"+"NaveY"+":"+Nave.Y+"|"+"Nave-Radians"+":"+Radians,100,50);
				
				}
				Nave.Move();
				Nave.Pintado_disparo();
				Nave.Fire();
		},
		Move:function(){
	
			if(Keyboard[Up]==true){	  Nave.Angle+=10; }
					
			if(Keyboard[Down]==true){ Nave.Angle-=10; }
						
		},
		Disparo:function(){
				Disparo.push({
					
						x:Nave.X-2.5+balaX,
						y:Nave.Y+balaY,	
						width:5,
						height:20
				});
				
			Debut("Disparo"+":"+Disparo,100,250);	
		},	
		Pintado_disparo:function(){

			if(Bala==true){
				
				balaX -= Math.cos(Radians) * 10;
				balaY -= Math.sin(Radians) * 10;

				ctx.save();
				ctx.fillStyle = 'green';
					for(var i in Disparo){		
						var Fn1 = Disparo[i];
						ctx.translate(Fn1.x, Fn1.y);
						// ctx.translate(balaX, balaY);				
						ctx.fillRect(0, 0, Fn1.width, Fn1.height);	
					};
				ctx.restore();

				//movimiento disparo
				for (var i in Disparo){
							var Fn1 = Disparo[i];
								Fn1.y+=13;	
							var disparo = Disparo[i];						
					};
			
				Disparo = Disparo.filter(function (){return Fn1.x > 0;});
	
	
				for(var i in Disparo){
						var Fn1 = Disparo[i];
						if(Fn1.x>canvas.width || Fn1.y>canvas.height){
							Disparo.splice(i, 1);
						}	
				}
			
			}
			
			
		},
		Fire:function(){
			Debut("radians"+":"+radians,100,200);
			Debut("Disparo"+":"+Disparo.length,100,250);
			Debut("balax"+":"+balaX+" - "+"balaY"+":"+balaY,100,280);
			
			if(Keyboard[Enter] && Tecla_Presionada==0){
						
						 Tecla_Presionada+=1;	
						 Nave.Disparo();
												 
					}
					if(Keyboard[Enter]==false){ Tecla_Presionada=0;}
			
			
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
	Color:"rgba(0,0,0,0)",
	URL:"asset/image/Meteor.png",
	activo:0,
	paint:function(){
	
		if(Meteor.draw==true){
						
			Circle(Meteor.X, Meteor.Y, Meteor.Radius, 0, Meteor.Color);
			// Square(Meteor.X-Meteor.W/2, Meteor.Y-Meteor.H/2, Meteor.W, Meteor.H, Meteor.R, Meteor.Color);
			Images(Meteor.X-Meteor.W/2, Meteor.Y-Meteor.H/2, Meteor.W, Meteor.H, Meteor.URL);

		}
	
		Meteor.PosRandom();
		Meteor.Rastreo();
		
	},
	PosRandom:function(){
		
		if(!Meteor.draw && Math.floor ((Math.random()*50)+1)<4){
			Meteor.X = Math.floor(Math.random()*(canvas.width-Meteor.W));
			Meteor.Y = Math.floor(Math.random()*(canvas.height-Meteor.H));
				Meteor.draw=true;
		}
	},
	Rastreo:function(){
						if(Meteor.X<Nave.X){			
							Meteor.X+=Meteor.Speed;
							}
							if(Meteor.Y<Nave.Y){			
									Meteor.Y+=Meteor.Speed;
								}
						
						if(Meteor.Y>Nave.Y){			
							Meteor.Y-=Meteor.Speed;
							}
							if(Meteor.X>Nave.X){			
									Meteor.X-=Meteor.Speed;
								}
								
	let Collision = CircleCollision.init(Meteor.X, Meteor.Y, Nave.X, Nave.Y, 100);
		Debut("Collision"+":"+Collision,100,230);
					
		if(!Collision){	}
				 else{	Meteor.draw=false; }
		
					
		
		
		
	}
	
	
		};



function AreaNula(x1,y1,x2,y2){

}


function Intro(){
	Square(0,0,Screen.W,Screen.H,0,"grey");
	Text("hola",'70px Calibri','white',Screen.W/2-250,Screen.H/2);
}

function FondoGamplay(){
	
	Square(0,0,Screen.W,Screen.H,0,"grey");
	// Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
}

function GameOver(){
	
}




function Keyboard(){
	
	
	
}





(function LoopGame(){
	// console.log("loop");
		
switch(Escena){
		case "Intro":
			Intro();
		break;
		
		case "GamePlay":
			FondoGamplay();
			Nave.paint();		
			// Meteor.paint();
			// Debut("Meteor.draw"+":"+Meteor.draw,100,180);
			// Text(Nave.X+"-"+Nave.Y,"17px","white",100,100)
			// Text(Meteor.X+"-"+Meteor.Y,"17px","white",100,120)
			// AreaNula(Nave.X,Nave.Y,Meteor.X,Meteor.Y);
		break; 

		case "GameOver":
			GameOver();
		break;
		  
		  default:
				alert("ERROR");
}
		
		
		
		
		
		
		
	Game_loop.start(LoopGame);
	
	})();

