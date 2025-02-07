export class CalcSidebar extends HTMLElement {
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
        <button type="button" class="btn btn-primary btn-md rounded-3 d-block mx-auto">ADD ETF</button>
    </div>
    `
  }

}