import { PortofolioService } from "../service/PortfolioService";

export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.pfService = new PortofolioService();
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        this.innerHTML =` 
        <section class="row g-0 m-4 rounded-4" style="border: 1px solid rgba(146, 155, 163, 0.24);">
            ${this.getTemplate()}
        </section>
        `;
    }

    getTemplate() {
        return '';
    }

    disconnectedCallback() {
        this.innerHTML = '';
    }
}