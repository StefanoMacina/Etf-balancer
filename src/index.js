import { CalcComponent } from "./components/CalcComponent.js";
import { MainComponent } from "./components/MainComponent.js";
import InputComponent from "./micro/InputComponent.js";




customElements.define('main-component',MainComponent)
customElements.define('calc-component', CalcComponent)
customElements.define('input-component', InputComponent)