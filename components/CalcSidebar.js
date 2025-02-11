import './ReusableModal.js';


export class CalcSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();

    this.modal1 = this.querySelector('#myModal');
    const addETFButton = this.querySelector('button#add-etf-btn');

    addETFButton.addEventListener('click', () => {
      this.modal1.open();
    });

    this.modal1.onSave = (e) => {
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

    console.log("evennt dispatched " + JSON.stringify(etfData));
    this.modal1.close();
  }


  template = () => {
    return /*html*/`
      <div class="container p-4">
        <input-component id="pac-value" title="Current PAC value" icon="bi bi-bank2"></input-component>
        <input-component id="increment" title="Increment" icon="bi bi-cash-coin"></input-component>

        <div class="d-flex gap-2 mt-3">
          <button type="button" id="add-etf-btn" class="btn btn-primary btn-md rounded-3  mx-auto add-etf-btn">
            ADD ETF
          </button>
          <button type="button" id="calc-allocation" class="btn btn-warning btn-md rounded-3  mx-auto">
            Calculate
          </button>
        </div>
      </div>
     
      <reusable-modal id="myModal" title="New ETF" save-text="Add">
        <form>
          <input-component layout="grouped" title="ETF Name" id="etf-name" p-holder="name or ISIN" col-label="4" col-input="8" ></input-component>
          <input-component layout="grouped" title="Portofolio Target" type="number" id="etf-target" col-label="4" col-input="8"  p-holder="desired percent allocation"></input-component>
          <input-component layout="grouped" title="Current Quantity" type="number" id="etf-current" col-label="4" col-input="8"  p-holder="current quantity in portfolio"></input-component>
        </form>
      </reusable-modal>


    `;
  }
}


