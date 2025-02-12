import { BaseComponent } from "./BaseComponent";

export class CalcComponent extends BaseComponent {
    constructor(){
        super();   
        this.editingETF = null;
    }

    connectedCallback(){
        super.connectedCallback();
        this.getActionListener();
        this.addEventListeners();
        this.updateState();
    }

    updateState(){
        const data = this.pfService.getPortfolioData();
        this.tBody.innerHTML = '';
        this.renderTable(data);
    }

    renderTable(data){
        data.etfs.forEach(etf => {
            this.addRow(etf);
        });
    }

    getActionListener(){
        this.saveButton = this.querySelector("#saveNewETF");
        this.getDataBtn = this.querySelector("#getDataBtn");
        this.calcBtn = this.querySelector("#calcAllocation");
        this.tBody = this.querySelector("#table-body");
        this.modal = new bootstrap.Modal(this.querySelector('#addETFmodal'));
    }

    addEventListeners(){
        this.saveButton.addEventListener("click", () => this.onPressSave());
        this.getDataBtn.addEventListener("click", () => this.showDatas());
        this.calcBtn.addEventListener("click", () => this.onPressCalculate());
        
        this.querySelector('#addETFmodal').addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    addRow({name, target, current}){
        const row = document.createElement("tr");
        row.className = 'cursor-pointer';
        row.innerHTML = /*html*/`
        <td>${name}</td>
        <td>${target}%</td>
        <td>${current}</td>
        <td>
            <button class="btn btn-link text-danger p-0 delete-etf">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
    `;

        row.addEventListener("click", (event) => {
            if (!event.target.closest('.delete-etf')) {
                this.onPressEditETF(name);
            }
        });

        const deleteButton = row.querySelector(".delete-etf");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation(); 
            this.onPressDeleteETF(name);
        });

        this.tBody.appendChild(row);
    }

    getTemplate() {
        return /*html*/ `
            <style>
                .cursor-pointer {
                    cursor: pointer;
                }
                .cursor-pointer:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }
            </style>
            <section class="row g-0 m-4 rounded-4" style="border: 1px solid rgba(146, 155, 163, 0.24);">
                <aside class="col-4 p-4">
                    <input-component id="pac-value" title="Current PAC value" icon="bi bi-bank2"></input-component>
                    <input-component id="increment" title="Increment" icon="bi bi-cash-coin"></input-component>

                    <div class="d-flex gap-2 mt-3">
                        <button type="button" class="btn btn-primary btn-md rounded-3  mx-auto " data-bs-toggle="modal" data-bs-target="#addETFmodal">
                                ADD ETF
                        </button>
                        <button type="button" id="getDataBtn" class="btn btn-primary btn-md rounded-3  mx-auto">
                                btn
                        </button>
                        <button type="button" id="calcAllocation" class="btn btn-warning btn-md rounded-3  mx-auto">
                                Calculate
                        </button>
                    </div>
                </aside>
                <main class="col-8 p-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ETF name</th>
                                <th scope="col">Target Allocation</th>
                                <th scope="col">Current Quantity</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="table-body"></tbody>
                    </table>
                </main>
            </section>

            <div class="modal fade" id="addETFmodal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header d-flex justify-content-between">
                        <h5 class="modal-title" id="modalLabel">Add ETF</h5>
                        <button type="button mr-0" class="bg-transparent border-0 p-0 " data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="bi bi-x-lg"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input-component layout="grouped" title="ETF Name" id="etf-name" p-holder="name or ISIN" col-label="4" col-input="8" ></input-component>
                        <input-component layout="grouped" title="Portofolio Target" type="number" id="etf-target" col-label="4" col-input="8"  p-holder="desired percent allocation"></input-component>
                        <input-component layout="grouped" title="Current Quantity" type="number" id="etf-current" col-label="4" col-input="8"  p-holder="current quantity in portfolio"></input-component>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="saveNewETF">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            `;
    }

    onPressDeleteETF(name){
        this.pfService.removeETF(name);
        this.updateState();
    }

    onPressEditETF(name){
        const etf = this.pfService.getETFByName(name);
        if (etf) {
            this.editingETF = etf;
            this.querySelector("#etf-name").value = etf.name;
            this.querySelector("#etf-target").value = etf.target;
            this.querySelector("#etf-current").value = etf.current;
            this.querySelector("#modalLabel").textContent = "Edit ETF";
            this.modal.show();
        }
    }

    onPressSave() {
        const inputData = this.getInputDatas();
    
        if (this.editingETF) {
            if (inputData.name !== this.editingETF.name) {
                const existingETF = this.pfService.getETFByName(inputData.name);
                if (existingETF) {
                    alert("ETF with this name already exists.");
                    return; 
                }
            }
            this.pfService.updateETF(this.editingETF.name, inputData);
        } else {
            const existingETF = this.pfService.getETFByName(inputData.name);
            if (existingETF) {
                alert("ETF with this name already exists.");
                return; 
            }
            this.pfService.addETF(inputData);
        }

        this.modal.hide();
        this.updateState();
    }

    resetForm() {
        this.editingETF = null;
        this.querySelector("#modalLabel").textContent = "Add ETF";
        this.querySelector("#etf-name").value = "";
        this.querySelector("#etf-target").value = "";
        this.querySelector("#etf-current").value = "";
    }

    onPressCalculate(){
        const inputData = this.getInputDatas();
        this.pfService.updatePortfolio(inputData);
    }

    getInputDatas(){
        return {
            pacValue: this.querySelector("#pac-value")?.value,
            increment: this.querySelector("#increment")?.value,
            name: this.querySelector("#etf-name")?.value,
            target: this.querySelector("#etf-target")?.value,
            current: this.querySelector("#etf-current")?.value,
        };
    }
}