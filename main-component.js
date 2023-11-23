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
			async render() {
				alert("Hura");
			}
	});
})();
