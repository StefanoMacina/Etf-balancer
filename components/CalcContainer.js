export class CalcContainer extends HTMLElement {
  constructor() {
    super();
    this.elements = {};
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.initializeElements();
    this.initializeEventListeners();
  }

  initializeElements() {
    this.elements = {
      container: this.querySelector('#super-container'),
      template : this.querySelector('#calc-template')
    };
  }

  getDOMdata() {
    
  }

  template = () => {
    return /*html*/ `
      <section class="border border-warning p-4" id="super-container" >

        <div class="border rounded-4 row g-0">
          <div class="col-3">
            <calc-sidebar></calc-sidebar>
          </div>
          <div class="col-9 border-start">
            <calc-main></calc-main>   
          </div>
        </div>

      </section>

      <template id="calc-template">
      <div id="calc-section" class="border rounded-4 row g-0 mt-3">
        <div class="col-6">
          tab1
        </div>
        <div class="col-6 border-start">
          tab2
        </div>
      </div>
    </template>
    `;
  };


  initializeEventListeners() {
    this.addEventListener("add-etf", (event) => {
      const calcMain = this.querySelector("calc-main");
      if (calcMain) {
        calcMain.addRow(event.detail);
      }
    });

    this.addEventListener("start-calc", e => {
     this.createCalcComponent(e)
    })
  }

  createCalcComponent(e){
    const oldComponent = this.querySelector('#calc-section')
    if(oldComponent) oldComponent.remove();
    const template = this.elements.template;
    const clone = template.content.cloneNode(true);
    this.elements.container.appendChild(clone);
    console.log(e.detail);


  
  }
}
