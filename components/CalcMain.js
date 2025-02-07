export class CalcMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
  }

  template = () => {
    return /*html*/`
        <div>
            <h1>Main</h1>
        </div>
    `
  }

}