(function() {
let tmpl = document.createElement('template');	
tmpl.innerHTML = `
<div>
	<canvas id="shapes" class="PyramidChart" is="chart-shape"></canvas>
</div>
`;

customElements.define('chart-shape', class PyramidChart extends HTMLElement {
	constructor() {
		super();			
		this.style.height = "100%";
		this.style.display = "block";
		this._props = {};
		this._shadowRoot = this.attachShadow({mode: "open"});
		this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
		this._shadowRoot.getElementById("shapes").addEventListener("submit", this._submit.bind(this));
		this._firstConnection = false;
		this.wData = [];		
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
							fontsize: this.fontsize,
							bgcolor1: this.bgcolor1,
							bgcolor2: this.bgcolor2,
							bgcolor3: this.bgcolor3,
							bgcolor4: this.bgcolor4,
							bgcolor5: this.bgcolor5,
							bgcolor6: this.bgcolor6
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
		if ("bgcolor1" in oChangedProperties) {
				this.bgcolor1 = oChangedProperties["bgcolor1"];
			} 
		if ("bgcolor2" in oChangedProperties) {
				this.bgcolor2 = oChangedProperties["bgcolor2"];
			} 
		if ("bgcolor3" in oChangedProperties) {
				this.bgcolor3 = oChangedProperties["bgcolor3"];
			} 			
		if ("bgcolor4" in oChangedProperties) {
			this.bgcolor4 = oChangedProperties["bgcolor4"];
		} 
		if ("bgcolor5" in oChangedProperties) {
			this.bgcolor5 = oChangedProperties["bgcolor5"];
		} 
		if ("bgcolor6" in oChangedProperties) {
			this.bgcolor6 = oChangedProperties["bgcolor6"];
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

	//Draw pyramid
	render(nvalue, ncolor, ndata) {
		
		var tempwith = this._shadowRoot.host.offsetWidth;
		var scolor = [this.bgcolor1, this.bgcolor2, this.bgcolor3, this.bgcolor4, this.bgcolor5, this.bgcolor6];
		var number = this.value;
		var j = tempwith/number/2 - 2;
		var totalnumber = j*number + 10;
		var divwith = totalnumber + 100;

		if(ndata.length < number)
		{
			number =ndata.length;
		}
		
		
		if(this.shadowRoot.getElementById("shapes"))
		{
			this.shadowRoot.getElementById("shapes").width = totalnumber + tempwith/2;
			this.shadowRoot.getElementById("shapes").height = totalnumber + 10;
			if(ndata)
			{
				for(var i=number; i>=1; i--)
				{
					this.drawShapes(totalnumber,0,j*i,j*i, scolor[i-1], i, ndata[i-1][0]);				
				
				};	
			};			
				
		};
	}
	
	drawShapes(x,y,h,w, scolor, j, stext) {	
			
		const canvas = this.shadowRoot.getElementById("shapes");
		var width = canvas.width;
		const height = canvas.height;
		const ctx = canvas.getContext('2d')	; 
		var currfont = this.fontsize + "px serif";
		
		if (canvas.getContext) {
	
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x-w, y+h);
			ctx.lineTo(x+w, y+h);
			ctx.fillStyle = scolor;			
			ctx.fill();
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillStyle = this.color;
			ctx.font = currfont;
			var tpoint = width/2;
			ctx.fillText(stext, tpoint, y+h-20);
		}
	}	
    });
})();
