let tmpl = document.createElement('template');	
tmpl.innerHTML = `
<style>

	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.speedometer{
	width: 300px;
	height: 300px;
	border: 2px solid black;
	border-radius: 50%;
	margin: 50px auto;
	position: relative;	
}
.center-point{
	width: 20px;
	height: 20px;
	background-color: black;
	border-radius: 50%;
	position: absolute;
	top: 137px;
	left: 137px;
	z-index: 10;
}
.speedometer-scale{
width: 10px;
height: 280px;
background-color: black;
position: absolute;
left: 143px;
top: 7px;
}
.speedometer-text{
	width: 180px;
	position: absolute;
	z-index: 20;
	left: 58px;
	top: 60px;
	text-align: center;
	font-weight: bold;	
}
.static{
	font-size: 18px;
}
.dynamic{
	margin-top: 10px;
}
.km{
	font-size: 32px;
}
.unit{
	 font-size: 14px;
	 margin-left: 5px;
}
.speedometer-scale-1{
	transform: rotate(-90deg);
}
.speedometer-scale-2{
	transform: rotate(-80deg);
}
.speedometer-scale-3{
	transform: rotate(-70deg);
}
.speedometer-scale-4{
	transform: rotate(-60deg);
}
.speedometer-scale-5{
	transform: rotate(-50deg);
}
.speedometer-scale-6{
	transform: rotate(-40deg);
}
.speedometer-scale-7{
	transform: rotate(-30deg);
}
.speedometer-scale-8{
	transform: rotate(-20deg);
}
.speedometer-scale-9{
	transform: rotate(-10deg);
}
.speedometer-scale-10{
	transform: rotate(0deg);
}
.speedometer-scale-11{
	transform: rotate(10deg);
}
.speedometer-scale-12{
	transform: rotate(20deg);
}
.speedometer-scale-13{
	transform: rotate(30deg);
}
.speedometer-scale-14{
	transform: rotate(40deg);
}
.speedometer-scale-15{
	transform: rotate(50deg);
}
.speedometer-scale-16{
	transform: rotate(60deg);
}
.speedometer-scale-17{
	transform: rotate(70deg);
}
.speedometer-scale-18{
	transform: rotate(80deg);
}
.speedometer-scale-19{
	transform: rotate(90deg);
	height: 244px;
	top: 25px;
	left: 161px;
	
}
.speedometer-scale-1.active{
	background-color: green;
}
.speedometer-scale-2.active{
	background-color: green;
}
.speedometer-scale-3.active{
	background-color: green;
}
.speedometer-scale-4.active{
	background-color: green;
}
.speedometer-scale-5.active{
	background-color: green;
}
.speedometer-scale-6.active{
	background-color: green;
}
.speedometer-scale-7.active{
	background-color: green;
}
.speedometer-scale-8.active{
	background-color: yellow;
}
.speedometer-scale-9.active{
	background-color: yellow;
}
.speedometer-scale-10.active{
	background-color: yellow;
}
.speedometer-scale-11.active{
	background-color: yellow;
}
.speedometer-scale-12.active{
	background-color: yellow;
}
.speedometer-scale-13.active{
	background-color: red;
}
.speedometer-scale-14.active{
	background-color: red;
}
.speedometer-scale-15.active{
	background-color: red;
}
.speedometer-scale-16.active{
	background-color: red;
}
.speedometer-scale-17.active{
	background-color: red;
}
.speedometer-scale-18.active{
	background-color: red;
}
.speedometer-scale-19.active{
	background-color: red;
}


.speedometer-center_hide{
	width: 250px;
	height: 250px;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	top: 22px;
	left: 22px;
	z-index: 9; 
}
.speedometer-bottom_hide{
	width: 320px;
	 height: 250px;
	 background-color: white;
	 position: absolute;
	 z-index: 11; 
	 top: 160px;
	  left: -14px;
	  border-top: 1px solid;	 
}
.arrow-contaner{
	width: 160px;
	height: 160px;
	background-color: transparent;
    position: absolute;
	z-index: 12;
	top: 67px;
	left: 67px;
 
}
.arrow-wrapper{
	width: 160px;
	height: 160px;
	background-color: transparent;
	position: relative;
	transition: all 0.4s;
 
}
.arrow{
	width: 110px;
	height: 4px;
	background-color: black;
	position: absolute;
	left: -30px;
	top: 78px;	
}
.arrow-right{
  width: 0px; 
  height: 0px;
  border-right: 100px solid black; 
  border-bottom: 15px solid transparent; 
  position: absolute;
	left: -27px;
	top: 72px;	
}

.speed-0{
	transform: rotate(0deg);
}
.speed-10{
	transform: rotate(10deg);
}
.speed-20{
	transform: rotate(20deg);
}
.speed-30{
	transform: rotate(30deg);
}
.speed-40{
	transform: rotate(40deg);
}
.speed-50{
	transform: rotate(50deg);
}
.speed-60{
	transform: rotate(60deg);
}
.speed-70{
	transform: rotate(70deg);
}
.speed-80{
	transform: rotate(80deg);
}
.speed-90{
	transform: rotate(90deg);
} 	
.speed-100{
	transform: rotate(100deg);
}
.speed-110{
	transform: rotate(110deg);
}
.speed-120{
	transform: rotate(120deg);
}
.speed-130{
	transform: rotate(130deg);
}
.speed-140{
	transform: rotate(140deg);
}
.speed-150{
	transform: rotate(150deg);
}
.speed-160{
	transform: rotate(160deg);
}
.speed-170{
	transform: rotate(170deg);
}
.speed-180{
	transform: rotate(180deg);
}
</style>

<div class="speedometer" id="Speedometer">
<div class="speedometer-text">
	<div class="static">Speed</div>
	<div class="dymanic">
		<span class="km">0</span>
		<span class="unit">KMPH</span>
	</div>
</div>
<div class="center-point"></div>
<div class="speedometer-center_hide"></div>
<div class="speedometer-bottom_hide"></div>
<div class="arrow-contaner">
	<div class="arrow-wrapper speed-0">
	<div class="arrow-right"></div>
	</div>
</div>
<div class="speedometer-scale speedometer-scale-1 active"></div>
<div class="speedometer-scale speedometer-scale-2 active"></div>
<div class="speedometer-scale speedometer-scale-3 active"></div>
<div class="speedometer-scale speedometer-scale-4 active"></div>
<div class="speedometer-scale speedometer-scale-5 active"></div>
<div class="speedometer-scale speedometer-scale-6 active"></div>
<div class="speedometer-scale speedometer-scale-7 active"></div>
<div class="speedometer-scale speedometer-scale-8 active"></div>
<div class="speedometer-scale speedometer-scale-9 active"></div>
<div class="speedometer-scale speedometer-scale-10 active"></div>
<div class="speedometer-scale speedometer-scale-11 active"></div>
<div class="speedometer-scale speedometer-scale-12 active"></div>
<div class="speedometer-scale speedometer-scale-13 active"></div>
<div class="speedometer-scale speedometer-scale-14 active"></div>
<div class="speedometer-scale speedometer-scale-15 active"></div>
<div class="speedometer-scale speedometer-scale-16 active"></div>
<div class="speedometer-scale speedometer-scale-17 active"></div>
<div class="speedometer-scale speedometer-scale-18 active"></div>
<div class="speedometer-scale speedometer-scale-19 active"></div>
<div class="speedometer-scale speedometer-scale-20 active"></div>
<div class="speedometer-scale speedometer-scale-21 active"></div>
<div class="speedometer-scale speedometer-scale-22 active"></div>
<div class="speedometer-scale speedometer-scale-23 active"></div>
<div class="speedometer-scale speedometer-scale-24 active"></div>
<div class="speedometer-scale speedometer-scale-25 active"></div>
<div class="speedometer-scale speedometer-scale-26 active"></div>
<div class="speedometer-scale speedometer-scale-27 active"></div>
<div class="speedometer-scale speedometer-scale-28 active"></div>
<div class="speedometer-scale speedometer-scale-29 active"></div>
<div class="speedometer-scale speedometer-scale-30 active"></div>
<div class="speedometer-scale speedometer-scale-31 active"></div>

</div>	
`;

class speedometer extends HTMLElement {	
constructor() {
	super();			
	this.style.height = "100%";
	this.style.display = "block";
	this._shadowRoot = this.attachShadow({mode: "open"});
	this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

	this._firstConnection = false;
	
	} 
	
		
	//When the widget is added to the html DOM of the page
	connectedCallback() {
   		//this._firstConnection = true;
  	}

	//When the widget is removed from the html DOM of the page
	disconnectedCallback() {
  // this._connected = false;
  }
  //When the custom widget is updated
 onCustomWidgetBeforeUpdate(oChangedProperties) {

	}
	
 //When the custom widget is updated
 onCustomWidgetAfterUpdate(oChangedProperties) {

    }
	
};
	customElements.define("chart-speedometer", Speedometer); 