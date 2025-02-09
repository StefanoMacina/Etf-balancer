import './ReusableModal.js';


export class CalcSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();

    const tbody = this.querySelector('#main-table-body');
    const modal1 = this.querySelector('#myModal');
    const addETFButton = this.querySelector('button#add-etf-btn');

    addETFButton.addEventListener('click', () => {
      modal1.open();
    });

    modal1.onSave = (e) => {
      this.handleSave();
    };
  }

  handleSave() {
    const etfName = this.querySelector("#etf-name")?.value;
    const etfTarget = this.querySelector("#etf-target")?.value;
    const etfCurrent = this.querySelector("#etf-current")?.value;

    if (!etfName || !etfTarget || !etfCurrent) {
      alert("Please fill all fields");
      return;
    }

    const etfData = {
      id: Date.now(),
      name: etfName,
      target: etfTarget,
      current: etfCurrent
    };

    this.dispatchEvent(new CustomEvent("add-etf", { 
      detail: etfData, 
      bubbles: true 
    }));

    this.modal1.close();
  }


  template = () => {
    return /*html*/`
      <div class="container p-4">
        <input-component id="pac-value" title="Current PAC value" icon="bi bi-bank2"></input-component>
        <input-component id="increment" title="Increment" icon="bi bi-cash-coin"></input-component>

        <button type="button" id="add-etf-btn" class="btn btn-primary btn-md rounded-3 d-block mx-auto add-etf-btn">
          ADD ETF
        </button>
      </div>
     
      <reusable-modal id="myModal" title="New ETF" save-text="Add">
        <form>
          <input-component layout="grouped" title="ETF" id="etf-name" p-holder="name or ISIN"></input-component>
          <input-component layout="grouped" title="Target" type="number" id="etf-target" p-holder="desired percent allocation"></input-component>
          <input-component layout="grouped" title="ETF qty" type="number" id="etf-current" p-holder="current quantity in portfolio"></input-component>
        </form>
      </reusable-modal>


    `;
  }
}


