(function() {
let tmpl = document.createElement('template');	
tmpl.innerHTML = `
<div class="Tachometer" id="Tachometer">
      <div class="chartBox" id="chartBox">
        <canvas id="Tachometer"></canvas>
      </div>
    </div>
    <script type="text/javascript" src="tachometer_new.js"></script>

`;

customElements.define('chart-tachometer', class Tachometer extends HTMLElement {
	constructor() {
		super();			
		this.style.height = "100%";
		this.style.display = "block";
		this._props = {};
		this._shadowRoot = this.attachShadow({mode: "open"});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this._shadowRoot.getElementById("Tachometer").addEventListener("submit", this._submit.bind(this));
		this._firstConnection = false;
		this.wData = [];
		this.properties = {
	       color: "#000000",
	       value: 5,
		   fontsize: 20,
		   bgcolor: "#F12712"
		};
				
	}
	get selection() {
            const result = { ...this._selection, ...(this._selection || {}).measures_0 };
            return Object.values(result).length > 0 ? result : undefined;
        }
	_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							value: this.value,
							color: this.color,
							fontsize: this.fontsize
						}
					}
			}));
	}
	//When the widget is added to the html DOM of the page
	connectedCallback(){
		this._firstConnection = true;
		this.redraw();
	}

	 //When the widget is removed from the html DOM of the page
	disconnectedCallback(){
		this._connected = false;
	}
	 //When the custom widget is updated
	onCustomWidgetBeforeUpdate(oChangedProperties) {
		this._props = { ...this._props, ...oChangedProperties };
	}

     //When the custom widget is updated
	onCustomWidgetAfterUpdate(oChangedProperties) {
		this._needsRedraw = true;
		this._selection = {};
		if (oChangedProperties.myDataSource && !this._props.designMode) {
			// trigger onResultChanged event
			this.dispatchEvent(new Event("onResultChanged"));
		}
		
		if ("value" in oChangedProperties) {
				this.value = oChangedProperties["value"];
			}
		if ("color" in oChangedProperties) {
				this.color = oChangedProperties["color"];
			} 
		if ("fontsize" in oChangedProperties) {
				this.fontsize = oChangedProperties["fontsize"];
			} 
		this.redraw();
    }
     redraw() {
		if (!this._shadowRoot) { return; }
	   this._shadowRoot.textContent = "";
	   // check the result state (could be "loading", "success" or "error")
		const myDataSource = this._props.myDataSource;
		if (myDataSource)
		{
			switch (myDataSource.state) {
				case "loading": {
					this._shadowRoot.innerHTML = "Loading...";
					return;
				}
				case "error": {
					if (myDataSource.messages.length) {
						this._shadowRoot.innerHTML = "<h1>Could not render chart</h1>" + (myDataSource.messages || []).map(m => `<b>${m.level}</b>: ${m.message}`).join("br");
					} else {
						// in case of no data an appropriate message will be show
						this._shadowRoot.innerHTML = "<h1>No data</h1>";
					}
					return;
				} case "success": {
					this.redrawChart();
					return;
				}
			}
		}
	}
	redrawChart() {            
		// indicate result state: "error" and an appropriate message
		const myDataSource = this._props.myDataSource;
		if (!myDataSource.data.length
			|| Object.keys(myDataSource.metadata.dimensions).length === 0
			|| Object.keys(myDataSource.metadata.mainStructureMembers).length === 0) {
			this._shadowRoot.innerHTML = "<h1>No data</h1>";
			return;
		}
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		
		const data = myDataSource.data;
		
		if(data)
		{
			this.wData = this.parseData(JSON.parse(JSON.stringify(data)));
							
			if (this.wData.length === 0) {
				this._shadowRoot.innerHTML = "<h1>Select \"Include Parent Elements\" in Hierarchy Menu.</h1>";
				return;
			}
			this.render(this.value, this.color, this.wData);
		}
	}
	
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }
	//When the custom widget resized
	onCustomWidgetResize(ndata) {
            this.width = this._shadowRoot.host.offsetWidth;
            this.height = this._shadowRoot.host.offsetHeight;
            this._needsRedraw = true;
			this.redraw();
        }
	//Collect data array
	parseData(ndata){	
		
		let alldata = [];
		
		ndata.forEach(function (item) {
			if(item.dimensions_0 && item.measures_0)
			{
				alldata.push([item.measures_0.raw, item.dimensions_0.id ]);
			}					
		 });
		 alldata.sort(function(a, b){return b[0] - a[0]});			
		return 	alldata;
	}

	//Draw tachometer
	render(nvalue, ncolor, ndata) {
		
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
    const Tachometer = new Chart(
      document.getElementById('Tachometer'),
      config
    ); 
	}
		
	}	
   });
})();
