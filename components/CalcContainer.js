export class CalcContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
    this.addEventListeners();
  }

  template = () => {
    return /*html*/ `
      <section class="border rounded-4 w-75 mx-auto  mt-4" style="--bs-border-opacity: .5; height: 50vh" >
        <div class="row h-100 g-0">
          <div class="col-3">
            <calc-sidebar></calc-sidebar>
          </div>
          <div class="col-9 border-start">
            <calc-main></calc-main>   
          </div>
        </div>
      </section>
    `;
  };


  addEventListeners() {
    this.addEventListener("add-etf", (event) => {
      const calcMain = this.querySelector("calc-main");
      if (calcMain) {
        calcMain.addRow(event.detail);
      }
    });

    this.addEventListener("start-calc", e => {
      console.log(e.detail)
    })


  }
}
