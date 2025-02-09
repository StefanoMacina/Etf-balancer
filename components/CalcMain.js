export class CalcMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();
  }

  template = () => {
    return /*html*/`
        <div id="main-content" class="container p-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody id="main-table-body">
              
            </tbody>
          </table>
        </div>
    `
  }

}