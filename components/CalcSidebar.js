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
      const etfName = modal1.querySelector('#etf-name').value;
      const etfTarget = modal1.querySelector('#etf-target').value;
      const etfCurrent = modal1.querySelector('#etf-current').value;
    
      console.log(etfName, etfTarget, etfCurrent);

      modal1.close();
    };
    
    
  }

  template = () => {
    return /*html*/`
      <div class="container p-4">
        <input-component id="pac-value" title="Current PAC value" icon="$"></input-component>
        <input-component id="increment" title="Increment" icon="$"></input-component>

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


