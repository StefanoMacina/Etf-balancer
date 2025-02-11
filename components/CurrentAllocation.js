export class CurrentAllocation extends HTMLElement {
    constructor() {
      super();
      this.chart = null;
    }
  
    connectedCallback() {
      this.innerHTML = this.template().trim();
      this.initializeElements();
      this.initializeChart();
    }
  
    initializeElements() {
      this.elements = {
        canvas: this.querySelector('#current-allocation-canvas'),
      };
    }
  
    template = () => {
      return /*html*/ `
        <div class="border rounded-4 p-4">
          <canvas id="current-allocation-canvas"></canvas>
        </div>
      `;
    }
  
  
    initializeChart() {
      const ctx = this.elements.canvas.getContext('2d');
      
      const portfolio = JSON.parse(localStorage.getItem('portfolio'));
      const etfs = portfolio.etfs;
      
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: etfs.map(etf => etf.name),
          datasets: [{
            label: 'current %',
            data: etfs.map(etf => etf.current),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });;
  
      
      window.addEventListener('storage', () => {
        this.updateChart();
      });
    }
  
    updateChart() {
      if (this.chart) {
        const newData = this.getChartData();
        this.chart.data = newData;
        this.chart.update();
      }
    }
  
    disconnectedCallback() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  }