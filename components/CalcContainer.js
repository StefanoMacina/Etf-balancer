export class CalcContainer extends HTMLElement {
  constructor() {
    super();
    this.value = 0;
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.addEventListeners();
  }

  template = () => {
    return /*html*/ `
            <section class="border border-primary w-75 vh-100  mx-auto my-2 ">
              <div class="row h-100 g-0">
                <div class="col-4 border border-secondary">
                COL-1
                </div>
                <div class="col-8 border border-secondary">
                COL-2
                </div>
              </div>
            </section>
        `;
  };

  addEventListeners() {
    
  }

}
