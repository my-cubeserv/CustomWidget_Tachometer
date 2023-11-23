(function() {
	
let tmpl = document.createElement('template');	
tmpl.innerHTML = `
<style>      
      .chartCard {
        width: 200;
        height: 200;  
      }
      .chartBox {
        width: 200px;

      }
    </style>
<div class="chartCard" id="Tachometer">
      <div class="chartBox" id="chartBox">
        <canvas id="Tachometer" class="Tachometer" is="chart-tachometer"></canvas>
      </div>
    </div>
`;

customElements.define('chart-tachometer', class Tachometer extends HTMLElement {	
constructor() {
	super();			
	this.style.height = "100%";
	this.style.display = "block";
	this._shadowRoot = this.attachShadow({mode: "open"});
	this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
	this._shadowRoot.getElementById("Tachometer").addEventListener("submit", this._submit.bind(this));
	this._firstConnection = false;

    this.render();		
	} 

	//Draw tachometer
	async render() {
		await getScriptPromisify("https://my-cubeserv.github.io/CustomWidget_Tachometer/tachometer_functions.js);
		   const data = {
  //    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  // legend
      datasets: [{
        label: 'Percentage value',
        data: [20, 20, 10, 10, 20, 30],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
		circumference: 180,
		rotation: 270,
		cutot:'95%',
		borderRadius: 5,
		 needleValue: 55
      }]
    };
	const gaugeNeedle ={
		id: 'gaugeNeedle',
		afterDatasetsDraw(chart, args, plugins){
			const { ctx, data } = chart;
			ctx.save();
			const needleValue = data.datasets[0].needleValue;

			console.log(chart.getDatasetMeta(0).data[0].x)
			const xCenter = chart.getDatasetMeta(0).data[0].x;
			const yCenter = chart.getDatasetMeta(0).data[0].y;
			const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius -6;

			const angle = Math.PI;

			const dataTotal = data.datasets[0].data.reduce((a,b) =>
			a + b, 0);
			let circumference  = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) /data.datasets[0].data[0])* needleValue;
			const needleValueAngle = circumference + 1.5;

			ctx.translate(xCenter, yCenter);
			ctx.rotate(angle * needleValueAngle);

			//Needle
			ctx.beginPath();
			ctx.strokeStyle = 'darkgrey';
			ctx.fillStyle = 'darkgrey';

			ctx.moveTo(0 - 5, 0);

			ctx.lineTo(0, -outerRadius);
			ctx.lineTo(0 + 5, 0);
			ctx.stroke();
			ctx.fill();


			//dot
			ctx.beginPath();
			ctx.arc(0,0, 10, angle * 0 , angle *2, false)
			ctx.fill();
			ctx.restore();
		}
	}

	// config 
	const config = {
		  type: 'doughnut',
		  data,
		  options: {
		  aspectRation: 1.8,
			plugins:
			{
			legend: {
			display: false
			
			}
			}
		  },
		  plugins:[gaugeNeedle]
		};

		// render init block
		const myChart = new Chart(
		  document.getElementById('Tachometer'),
		  config
		); 
	}		
	//end function	
	}
   });
})();
