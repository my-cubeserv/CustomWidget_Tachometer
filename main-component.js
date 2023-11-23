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
})();
