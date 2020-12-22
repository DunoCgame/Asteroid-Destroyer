/****
Asteoid Destoyer 1.0.0 Game Make of HorizonFrontierJs
Developer: Luis Edgardo Duno Castellano
Lisense Mit;

***/

	
	
	let Escena = "Intro";
// let Escena = "GamePlay";
// let Escena = "GameOver";

let Nute = false;
 
var TimeDraw = 0;

let Enter=13;
let Up = 38;
let Down = 40;
let Space = 32;
let Escape=27;

let A = 65;
let W = 87;
let S = 83;
let D = 68;

let Disparo = [];
let Meteors = [];

var Tecla_Presionada=0;
let Score=0;

let Frame=0;
var addFrame=0;

let GamePlataforms="";

let  Meteor_Type_Origin = 0
let  Meteor_Width_origin = 0;
let  Meteor_Heigth_origin = 0;
let  Meteor_Color_Origin = "rgba(255,255,255,1)";


const Meteor_Frame=[
			"asset/image/MeteorExplocion1.png",
			"asset/image/MeteorExplocion2.png",
			"asset/image/MeteorExplocion3.png",
			"asset/image/MeteorExplocion4.png",
];

const Sound_url=[
			"asset/sound/AsteoidDestoyerIntro.wav",
			"asset/sound/Enter.wav",	
			"asset/sound/MeteorExplote.wav",
			"asset/sound/NaveExplosion.wav",
			"asset/sound/NaveDisparo.wav",
			"asset/sound/AsteoidDestoyer.wav",
]

var Sound_Intro;
var Sound_Enter;
var Sound_ExplocionMeteor;
var Sound_ExplocionNave;
var Sound_Disparo;
var Sound_Gameplay;

Sound_Intro = new Sound(Sound_url[0]);
Sound_ExplocionNave = new Sound(Sound_url[3]);
Sound_Gameplay = new Sound(Sound_url[5]);

var color1 = "rgba(0, 191, 255, 0)";
var color2 = "rgba(255, 255, 0, 0)";

var Pause = false;

Screen.init();
KeyboardEvents();


function ClearVariables(){
					Meteors = [];
					Disparo = [];					
					Nute = true;
					TimeDraw = 0;			
					Tecla_Presionada=0;
					Score=0;
					Frame=0;
					addFrame=0;					
					Pause = false;
}

const Nave = {
		draw:true,
		X:canvas.width/2,
		Y:canvas.height/2,
		W:80,
		H:80,
		Radius:40,
		Angle:0,
		Radians:0,
		live:3,
		addnewLive:0,
		Speed:20,
		Color:"rgba(255,255,255,0.2)",
		URL:"asset/image/",
		NaveImg:"Nave.png",
		NaveCollisionImg:"asset/image/Nave-collision2.png",
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
		colli:false,
		paint:function(){
		
				if(Nave.draw==true && Nave.colli==false){
						
				ctx.save();						
				ctx.translate(Nave.X, Nave.Y);
				ctx.rotate(Nave.Radians);

				if(Nave.live>3){
					Circle(3,0, 40, 0, "rgba(51, 153, 255, 0.7)");
					Circle(3,0, 52, 0, "rgba(255, 255, 204, 0.4)");
				}
				if(Nave.live==3){
					Circle(3,0, 40, 0, "rgba(102, 204, 255, 0.7)");
				}
				if(Nave.live==2){
					Circle(3,0, 40, 0, "rgba(102, 204, 255, 0.4)");
				}
				if(Nave.live==1){
					Circle(3,0, 40, 0, "rgba(102, 204, 255, 0.1)");
				}

					Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.URL+Nave.NaveImg);	
					ctx.restore();
			
				}
				else
					if(Nave.draw==true && Nave.colli==true){
						
						ctx.save();						
						ctx.translate(Nave.X, Nave.Y);
						ctx.rotate(Nave.Radians);
						Images(-Nave.W/2, -Nave.H/2, Nave.W, Nave.H, Nave.NaveCollisionImg);	
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
				
						Sound_Disparo = new Sound(Sound_url[4]);
						Sound_Disparo.play();

				if(Nute==true){
					Sound_Disparo.stop();
					
					
				}						
						Tecla_Presionada+=1;												
						Nave.Disparo();	

				}					
				if(Keyboard[Enter]==false){
										
						Tecla_Presionada=0;
				}
				
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
					Circle(Fn1.x, Fn1.y, 6, 0, "rgb(0, 255, 0");
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
					
					if(Nute==false){
						Sound_ExplocionNave.play();
					}
					
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
								 
								if(Nute==true){
						
					
								 Sound_ExplocionNave.stop();
								}
					}
						
					
					
				}
						
			
					
						}
						
							
		},
		collision:function(){
			
			if(Nave.draw==true && Nave.colli==false){
				
				for(var i in Meteors){
			
					var Meteor = Meteors[i];
				
					let Collision = CircleCollision.init(Meteor.X, Meteor.Y, Nave.X, Nave.Y, 100);
					
					if(!Collision){  }						
								else{
									if(Score>0){Score-=1;}		 
									Nave.live-=1;
									
									Nave.colli = true;
									Meteor.StateAnimacion=true;

									//impedir colision no eliminar asteroide
								}
				}
			}
			else
				if(Nave.colli==true){
					
					
							
							setTimeout(function (){Nave.colli=false},1000);
				}
			
		},
		Clear:function(){
				Nave.draw=true;
				Nave.X=canvas.width/2;
				Nave.Y=canvas.height/2;
				Nave.W=80;
				Nave.H=80;
				Nave.Radius=60;
				Nave.Angle=0;
				Nave.Radians=0;
				Nave.live=3;
				Nave.addnewLive=0;
				Nave.Speed=20;
				
					Nave.farmeExplocion = 0;
					Nave.TimeAnimacion = 0;
					Nave.StateAnimacion = false;
					Nave.colli = false;
			
			
		}
		
	};

const Meteor = {
	generate:function(Type,color,X,Y,W,H){

		Meteor_Type_Origin = Math.floor(Math.random() * (3 - 2)) + 2;
		 
		 if(Meteor_Type_Origin==1){
			  Meteor_Width_origin = 170;
			  Meteor_Heigth_origin = 80;
			  Meteor_Color_Origin = "rgba(0, 191, 255, 0)";
		 }
		 if(Meteor_Type_Origin==2){
			 Meteor_Width_origin = 150;
			  Meteor_Heigth_origin = 100;
			  Meteor_Color_Origin = "rgba(255, 255, 0, 0)";
			 
		 }		 
		 if(Meteor_Type_Origin==3){
			   Meteor_Width_origin = 250;
			   Meteor_Heigth_origin = 200;
			   Meteor_Color_Origin = "rgba(255, 0, 0, 0)";
			 
		 }
		 
	Meteors.push({				
		
				X:X || Math.floor(Math.random() * Screen.W),
				Y:Y || Math.floor(Math.random() * Screen.H),
				angle:Math.floor(Math.random() * 359),
				
				W:W || Meteor_Width_origin,
				H:H || Meteor_Heigth_origin,

				Type:Type || Meteor_Type_Origin,
				Radius:50,
				R:0,	
				Speed:3,
				draw:false,
				Color:color || Meteor_Color_Origin,
				URL:"asset/image/Meteor.png",
				FrameExplocionMeteor:0,
				StateAnimacion:false,
				ExplosionAnimacion:[
							Meteor_Frame[0],
							Meteor_Frame[1],
							Meteor_Frame[2],
							Meteor_Frame[3]
						]
					});
	},
	paint:function(){
		
		for(var i in Meteors){		
				var M = Meteors[i];	
					if(M.StateAnimacion==false){
							ctx.save();
							ctx.translate(M.X, M.Y);
							ctx.rotate(M.R * Math.PI / 180);	
							Circle(0, 0, M.Radius, 0, M.Color);
							Images(-M.W/2, -M.H/2, M.W, M.H, M.URL);
							ctx.restore();
					}
		}
		
	},
	Animacion:function(){
		
		for(var i in Meteors){
			
			var M = Meteors[i];	
	
			if(M.StateAnimacion==true){
				
				
					
			if(M.FrameExplocionMeteor!= M.ExplosionAnimacion.length){
							M.FrameExplocionMeteor+=1;
					}

				if(M.FrameExplocionMeteor == M.ExplosionAnimacion.length){
							
							M.StateAnimacion=false;
							M.FrameExplocionMeteor = 0;
							
							Meteors.splice(i,1);
							// Meteor.generate();							
				}					
									
			if(M.FrameExplocionMeteor==1){
	
						ctx.save();
						ctx.translate(M.X, M.Y);
						ctx.rotate(M.R * Math.PI / 180);	
						Circle(0, 0, M.Radius, 0, M.Color);
						Images(-M.W/2, -M.H/2, M.W, M.H, M.ExplosionAnimacion[0]);
						ctx.restore();
			}	
			if(M.FrameExplocionMeteor==2){

						ctx.save();
						ctx.translate(M.X, M.Y);
						ctx.rotate(M.R * Math.PI / 180);	
						Circle(0, 0, M.Radius, 0, M.Color);
						Images(-M.W/2, -M.H/2, M.W, M.H, M.ExplosionAnimacion[1]);
						ctx.restore();
			}
			if(M.FrameExplocionMeteor==3){
				
						ctx.save();
						ctx.translate(M.X, M.Y);
						ctx.rotate(M.R * Math.PI / 180);	
						Circle(0, 0, M.Radius, 0, M.Color);
						Images(-M.W/2, -M.H/2, M.W, M.H, M.ExplosionAnimacion[2]);
						ctx.restore();
				
			}
			if(M.FrameExplocionMeteor==4){
			
						ctx.save();
						ctx.translate(M.X, M.Y);
						ctx.rotate(M.R * Math.PI / 180);	
						Circle(0, 0, M.Radius, 0, M.Color);
						Images(-M.W/2, -M.H/2, M.W, M.H, M.ExplosionAnimacion[3]);
						ctx.restore();
			}	
			if(M.FrameExplocionMeteor==5){
			
						ctx.save();
						ctx.translate(M.X, M.Y);
						ctx.rotate(M.R * Math.PI / 180);	
						Circle(0, 0, M.Radius, 0, M.Color);
						Images(-M.W/2, -M.H/2, M.W, M.H, M.ExplosionAnimacion[4]);
						ctx.restore();
						
			}
		
			
			}
		}//cierre For
		
		
	},
	Move:function(){
		for(var i in Meteors){
			
				var M = Meteors[i];	
					M.R+=20;
				
				let radians = M.angle / Math.PI * 180;
					M.X -= Math.cos(radians) * M.Speed;
					M.Y -= Math.sin(radians) * M.Speed;
			
				if (M.X < Nave.Radius) {
						M.X = canvas.width;
				}
				if (M.X > Screen.W) {
						M.X = Nave.Radius;
				}
				if (M.Y < Nave.Radius) {
						M.Y = canvas.height;
				}
				if (M.Y > Screen.H) {
						M.Y = Nave.Radius;
				}
		}
	},
	Collision:function(){

	if(Meteors.length!==0){
			
		for(var i=0; i<Meteors.length; i++){
			for(var a=0; a<Disparo.length; a++){
			
				let Collision = CircleCollision.init(Disparo[a].x, Disparo[a].y, Meteors[i].X, Meteors[i].Y, 50);

						if(!Collision){  }
										else{
											Sound_ExplocionMeteor = new Sound(Sound_url[2]);
											if(Nute==false){
												
													Sound_ExplocionMeteor.play();
											}
											if(Nute==true){
												
													Sound_ExplocionMeteor.stop();
											}

											//mediano
											if(Meteors[i].Type==2){
											
											 Meteor.generate(1,color1,Meteors[i].X+40, Meteors[i].Y+40,170,80);
											 Meteor.generate(1,color1,Meteors[i].X-40, Meteors[i].Y-40,170,80);
											 Meteors.splice(i,1);
											 Disparo.splice(a,1);
											
											
											}
											// //grande
											 if(Meteors[i].Type==3){
												// // W:150,
												// // H:100,
												
												Meteor.generate(2,color2,Meteors[i].X+40, Meteors[i].Y+40,150,100);
												Meteor.generate(2,color2,Meteors[i].X-40, Meteors[i].Y-40,150,100);
												Meteors.splice(i,1);
												Disparo.splice(a,1);
											}
											
											if(Meteors[i].Type==1){
												
												Meteors[i].StateAnimacion=true;

													Score+=1;
													Nave.addnewLive+=1;														 
													Disparo.splice(a,1);

													if(Nave.addnewLive==10){
															Nave.live+=1;
															Meteor.Speed+=.5;
															Nave.addnewLive=0;
													}	
											}
												
										}
							}//for disparo
					}//for meteor
			}
			
		}//cierre funcion
	};
	
function PauseGame(){
	
	if(Keyboard[Space] && Tecla_Presionada==0){
						
				if(Pause == false){
						Pause = true;
				}
				else
					if(Pause == true){
						Text("Pause",'70px Calibri','white',Screen.W/2-100,Screen.H/2)
							Pause = false;
							
					}
								
				Tecla_Presionada+=1;
				
				}
					
			if(Keyboard[Space]==false){ Tecla_Presionada = 0; }
			
			if(Pause == true){
						Text("Pause",'70px Calibri','white',Screen.W/2-100,Screen.H/2)
						
					}
	
}

function FondoGamplay(){
	
	Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
}

function Interfaz_Gameplay(){ 	
			// Text("Score"+" "+Score +""+Nave.live,'30px Calibri','white',Screen.W/2-50,55);
			Text("Score"+" "+Score +"",'30px Calibri','white',Screen.W/2-50,55);
			// Text("Score"+" "+Score+" ",'30px Calibri','white',Screen.W/2-300,55);
			// Text("Time"+" "+Time_game+" ",'30px Calibri','white',Screen.W/2+200,55);
			
			
 	 	 	  }

let Intro = {
	Fondo:function(){
					Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");		
					},

	Text:function(){

			Time.Interval(5,10,true);	

			if(Time.state==true){
			   Text("Asteroid Destroyer",'70.5px Calibri','yellow',Screen.W/2-274,Screen.H/2);
			}

			Text("Asteroid Destroyer",'70px Calibri','white',Screen.W/2-270,Screen.H/2);
			Text("Press Enter",'50.5px Calibri','yellow',Screen.W/2-93,Screen.H-100);
			Text("Press Enter",'50px Calibri','white',Screen.W/2-90,Screen.H-100);
			
			
			Text("HorizonFrontierJs",'30px Calibri','white',Screen.W-300,Screen.H-10);

			if(Keyboard[Enter] && Tecla_Presionada==0 && Escena == "Intro"){
				Sound_Enter = new Sound(Sound_url[1]);
									
						if(Nute==false){
							
							Sound_Enter.play();
						}
						if(Nute==true){
							
							Sound_Enter.stop();
						}
						
						Tecla_Presionada+=1;
						
						setTimeout(function(){
								ClearVariables(); 
								Escena = "GamePlay";  
								},1000);	

						}					
						if(Keyboard[Enter]==false){ 
										
										
								Tecla_Presionada=0;
								
							}
					
			
		}
 }

function GameOver(){
		Images(0,0,Screen.W,Screen.H,"asset/image/Background.png");
		
		Time.Interval(5,10,true);	
		if(Time.state==true){
		   Text("Game Over",'73px Calibri','red',Screen.W/2-155,Screen.H/2);
		}
		
		Text("Game Over",'70px Calibri','white',Screen.W/2-150,Screen.H/2);
		Text("Press Enter",'50.5px Calibri','red',Screen.W/2-93,Screen.H-100);
		Text("Press Enter",'50px Calibri','white',Screen.W/2-90,Screen.H-100);

		if(Keyboard[Enter] && Tecla_Presionada==0 && Escena == "GameOver"){
					
					if(Nute==false){
					
						Sound_Enter = new Sound(Sound_url[1]);
						Sound_Enter.play();
					}if(Nute==true){
					
						
						Sound_Enter.stop();
					}
						
						Tecla_Presionada+=1;	
							ClearVariables();
						Escena = "Intro";
						
					
				}
					
			if(Keyboard[Enter]==false){ Tecla_Presionada=0; 		}
			
			
}

function AudioState(){
	if(Keyboard[Escape] && Tecla_Presionada==0){

					
				if(Nute == false){
						Nute = true;
				}
				else
					if(Nute == true){
							Nute = false;
							
					}
						
						}					
						if(Keyboard[Escape]==false && Tecla_Presionada==1){ 
										
										
								Tecla_Presionada = 0 ;
								
							}
							
				if(Nute == false){
						
						Images(50,Screen.H-50,60,60,"asset/image/Soundimg.png");
				}
				else
					if(Nute == true){
					
						Images(50,Screen.H-50,60,60,"asset/image/Nuteimg.png");
							
					}		
							
							
				// Text("Nute"+Nute,'40px Calibri','white',50,100);
}


function LoopGame(){
	
	switch(Escena){
			case "Intro":
				Sound_Gameplay.stop();
				
					Sound_Intro.play();
					
				if(Nute==true){
					Sound_Intro.stop();
				}
				Intro.Fondo();					
				if(Meteors.length==0 ){
						for(let i = 0; i < 10; i++){			
							Meteor.generate();
						}	
					}					
					Meteor.Move();
					Meteor.paint();					
					Intro.Text();	
			break;
			
			case "GamePlay":
			
				Sound_Intro.stop();
				
					if(Nute==false){
						Sound_Gameplay.play();
					}
					if(Nute==true){
					Sound_Gameplay.stop();
					}
					
				FondoGamplay();
				
				
					if(Pause == false){
						Nave.Move();
						Nave.collision();
					}
			
				Nave.Paint_disparo();
				Nave.Fire();
				Nave.paint();	
				Nave.Explosion();
				
			if(Nave.live!=0){
								
				if(Pause == false){
					
						 Meteor.Move();
						 Meteor.Collision();	
						 Meteor.Animacion();
	
						if(Meteors.length==0 ){
							for(let i = 0; i < 5; i++){	Meteor.generate(); }	
						}
					
					}	
				}
				
				Meteor.paint();
				
	
				if(Pause == false){
					Interfaz_Gameplay();
				}
				
				PauseGame();
			
			break; 

			case "GameOver":
					GameOver();
					Nave.Clear();
					
			break;
			  
			  default:
					alert("ERROR");
	}
	
	AudioState();
	// Text("Meteors"+Meteors.length,'70px Calibri','white',50,100);
	// Text("Nave.colli"+" "+Nave.colli,'40px Calibri','white',50,100);
	
	
	Game_loop.start(LoopGame);

}


window.onload = LoopGame();