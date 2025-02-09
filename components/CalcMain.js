export class CalcMain extends HTMLElement {
  constructor() {
    super();
    
    const storedPortfolio = localStorage.getItem("portfolio");
    this.portfolio = storedPortfolio ? JSON.parse(storedPortfolio) : { etfs: [] };
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.tbody = this.querySelector("#main-table-body");
    this.portfolio.etfs.forEach(etf => this.addRow(etf, false));
  }

  addRow(etfData, saveToStorage = true) {
    if (!this.tbody) return;

    const rowCount = this.tbody.children.length + 1;

    const row = document.createElement("tr");
    row.innerHTML = `
     
      <td>${etfData.name}</td>
      <td>${etfData.target}%</td>
      <td>${etfData.current}</td>
      <td>
        <button class="btn  btn-danger btn-sm remove-btn material-symbols-outlined">
          <i class="bi bi-dash-circle"></i>
        </button>
      </td>
    `;

    this.tbody.appendChild(row);

    if (saveToStorage) {
      this.portfolio.etfs.push(etfData);
      localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
    }
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
