export class CalcMain extends HTMLElement {
  constructor() {
    super();
    const storedPortfolio = localStorage.getItem("portfolio");
    this.portfolio = storedPortfolio ? JSON.parse(storedPortfolio) : { 
      etfs: [], 
      funds: { pacValue: 0, increment: 0 } 
    };
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.tbody = this.querySelector("#main-table-body");
    this.portfolio.etfs.forEach(etf => this.addRow(etf, false));
    this.addEventListeners();
  }

  addEventListeners() {
    this.tbody.addEventListener("click", (e) => {
      if (e.target.closest(".remove-btn")) {
        this.removeRow(e);
      }
    });
    
    document.addEventListener("start-calc", (e) => {
      this.updateFunds(e.detail);
    });
  }

  updateFunds(fundsData) {
    this.portfolio.funds = {
      pacValue: fundsData.pfValue,
      increment: fundsData.increment
    };
    localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
  }

  addRow(etfData, saveToStorage = true) {
    if (!this.tbody) return;
    
    const row = document.createElement("tr");
    row.innerHTML = /*html*/`
      <td hidden>${etfData.id}</td>
      <td>${etfData.name}</td>
      <td>${etfData.target}%</td>
      <td>${etfData.current}</td>
      <td>
        <button class="btn delete-row btn-danger btn-sm remove-btn">
          <i class="bi bi-dash-circle"></i>
        </button>
      </td>
    `;
    this.tbody.appendChild(row);

    if (saveToStorage) {
      // Only update ETFs array, don't touch funds
      this.portfolio.etfs.push({
        id: etfData.id,
        name: etfData.name,
        target: etfData.target,
        current: etfData.current
      });
      
      localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
    }
  }

  removeRow(e) {
    const row = e.target.closest("tr");
    const etfId = Number(row.cells[0].textContent);
    row.remove();
   
    this.portfolio.etfs = this.portfolio.etfs.filter(etf => etf.id !== etfId);
    localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
    
    const updatedList = JSON.parse(localStorage.getItem('portfolio')).etfs;
    document.dispatchEvent(new CustomEvent('etf-list-updated', {
      detail: updatedList,
      bubbles: true
    }));
  }
 
  template = () => {
    return /*html*/ `
      <div id="main-content" class="container p-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ETF Name</th>
              <th scope="col">Target %</th>
              <th scope="col">Current Qty</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="main-table-body">
          </tbody>
        </table>
      </div>
    `;
  };
}