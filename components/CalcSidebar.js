import "./ReusableModal.js";

export class CalcSidebar extends HTMLElement {
  constructor() {
    super();
    this.elements = {};
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.initializeElements();
    this.initializeEventListeners();
    this.checkInitialState();
  }

  initializeElements() {
    this.elements = {
      modal: this.querySelector("#myModal"),
      addEtfButton: this.querySelector("button#add-etf-btn"),
      calcButton: this.querySelector("button#calc-allocation"),
      pacValue: this.querySelector("#pac-value"),
      increment: this.querySelector("#increment"),
      etfName: this.querySelector("#etf-name"),
      etfTarget: this.querySelector("#etf-target"),
      etfCurrent: this.querySelector("#etf-current"),
    };
  }

  initializeEventListeners() {
    this.elements.calcButton.addEventListener("click", () => {
      this.startCalc();
    });

    this.elements.addEtfButton.addEventListener("click", () => {
      this.elements.modal.open();
    });

    this.elements.modal.onSave = () => {
      this.handleSave();
    };

    document.addEventListener("etf-list-updated", (e) => {
      const itemCount = e.detail.length;
      this.elements.calcButton.hidden = itemCount < 1;
    });
  }

  checkInitialState() {
    const savedPortfolio = localStorage.getItem("portfolio");
    if (savedPortfolio) {
      const portfolio = JSON.parse(savedPortfolio);

      if (
        portfolio.etfs &&
        Array.isArray(portfolio.etfs) &&
        portfolio.etfs.length >= 1
      ) {
        this.elements.calcButton.hidden = false;
      }
    }
  }

  startCalc() {
    const {pacValue, increment } = this.getDOMdata();
    const data = {
      pfValue: pacValue,
      increment: increment
    }
    this.dispatchStartCalcEvent(data);
  }

  handleSave() {
    const domData = this.getDOMdata();
    
    if (!this.validateFormData(domData)) {
      alert("Please fill all fields");
      return;
    }

    const etfData = this.createEtfData(domData);
    this.dispatchAddEtfEvent(etfData);
    this.elements.calcButton.hidden = false;
    this.elements.modal.close();
  }

  getDOMdata() {
    return {
      pacValue: this.elements.pacValue?.value, // Fuori dalla modale
      increment: this.elements.increment?.value, // Fuori dalla modale
      etfName: this.elements.modal.querySelector("#etf-name")?.value, // Dentro la modale
      etfTarget: this.elements.modal.querySelector("#etf-target")?.value, // Dentro la modale
      etfCurrent: this.elements.modal.querySelector("#etf-current")?.value, // Dentro la modale
    };
  }

  validateFormData({ etfName, etfTarget, etfCurrent, pacValue, increment }) {
    return etfName && etfTarget && etfCurrent && pacValue && increment;
  }

  createEtfData({ etfName, etfTarget, etfCurrent, pacValue, increment }) {
    return {
      id: Date.now(),
      name: etfName,
      target: etfTarget,
      current: etfCurrent,
      portfolio: {
        pacValue: pacValue,
        increment: increment,
      }
    };
  }

  dispatchAddEtfEvent(etfData) {
    this.dispatchEvent(
      new CustomEvent("add-etf", {
        detail: etfData,
        bubbles: true,
      })
    );
  }

  dispatchStartCalcEvent(portfolioData){
    this.dispatchEvent(
      new CustomEvent("start-calc", {
        detail: portfolioData,
        bubbles: true
      })
    )
  }

  template = () => {
    return /*html*/ `
      <div class="container p-4">
        <input-component id="pac-value" title="Current PAC value" icon="bi bi-bank2"></input-component>
        <input-component id="increment" title="Increment" icon="bi bi-cash-coin"></input-component>

        <div class="d-flex gap-2 mt-3">
          <button type="button" id="add-etf-btn" class="btn btn-primary btn-md rounded-3  mx-auto add-etf-btn">
            ADD ETF
          </button>
          <button type="button" id="calc-allocation" class="btn btn-warning btn-md rounded-3  mx-auto" hidden>
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
  };
}
