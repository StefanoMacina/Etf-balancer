export class CalcSidebar extends HTMLElement {
  modalId =  "add-etf-modal";
  constructor() {
    super();
    
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
  }

  template = () => {
    return /*html*/`
    <div class="container p-4">
        <input-group title="Current PAC value" icon="$" ></input-group>
        <input-group title="Increment" icon="$" ></input-group>
        <button type="button" data-bs-toggle="modal" data-bs-target="#${this.modalId}" class="btn btn-primary btn-md rounded-3 d-block mx-auto">ADD ETF</button>
    </div>
    <modal-component title="Add ETF" modal-id="${this.modalId}">
      <h1>im here</h1>
    </modal-component>
    `
  }

}