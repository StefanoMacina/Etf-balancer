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
        this.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return '';
    }

    disconnectedCallback() {
        this.innerHTML = '';
    }
}