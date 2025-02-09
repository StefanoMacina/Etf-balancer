export default class InputComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.title = this.getAttribute("title");
    this.id = this.getAttribute("id");
    this.icon = this.getAttribute("icon");
    this.type = this.getAttribute("type") || "text";
    this.layout = this.getAttribute("layout") || "floating";
    this.placeholder = this.getAttribute("p-holder");
    this.mb = this.getAttribute("mb") || "3";

    this.innerHTML = this.template().trim();
  }

  get value() {
    const input = this.querySelector("input");
    return input ? input.value : "";
  }

  set value(val) {
    const input = this.querySelector("input");
    if (input) input.value = val;
  }

  template = () => {
    if (this.layout === "floating") {
      return this.floatingLabelLayout;
    }
    if (this.layout === "grouped") {
      return this.groupedLayout;
    }
  };

  get groupedLayout() {
    return /*html*/ `
      <div class="form-group row mb-${this.mb}">
        <label for="${this.id}" class="col-sm-2 col-form-label">${this.title}</label>
        <div class="col-sm-10">
          <input type="${this.type}" class="form-control" id="${this.id}" placeholder="${this.placeholder}">
        </div>
      </div>
    `;
  }

  get floatingLabelLayout() {
    return /*html*/ `
      <div class="input-group mb-3">
        <div class="form-floating">
          <input type="${this.type}" class="form-control" id="${this.id}" placeholder="">
          <label for="${this.id}">${this.title}</label>
        </div>
        <span class="input-group-text">
          <i class="${this.icon}"></i>
        </span>
      </div>
    `;
  }
}
