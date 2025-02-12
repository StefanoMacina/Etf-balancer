import { BaseComponent } from "./BaseComponent";


export class MainComponent extends BaseComponent{
    getTemplate() {
        return /*html*/`
            <section class="container border border-primary">
                <calc-component></calc-component>
            </section>
        `;
    }

}