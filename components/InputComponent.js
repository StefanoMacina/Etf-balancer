export default class InputComponent extends HTMLElement {
  constructor() {
    super();

  }
  connectedCallback() {
    this.title =  this.getAttribute("title");
    this.icon = this.getAttribute("icon"); 
    this.innerHTML = this.template().trim();
  }

  template = () => {
    return /*html*/`
      <div class="input-group mb-3  ">
        <div class="form-floating">
          <input type="email" class="form-control" id="pac-value" placeholder="">
          <label for="pac-value">${this.title}</label>
        </div>
        <span class="input-group-text">${this.icon}</span>
      </div>
    `
  }

}
