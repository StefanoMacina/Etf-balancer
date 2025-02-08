import { CalcContainer } from "./components/CalcContainer.js";
import { CalcMain } from "./components/CalcMain.js";
import { CalcSidebar } from "./components/CalcSidebar.js";
import InputComponent from "./components/InputComponent.js";
import { ReusableModal } from "./components/ReusableModal.js";


customElements.define("calc-container", CalcContainer);
customElements.define("calc-sidebar", CalcSidebar);
customElements.define("calc-main", CalcMain);   
customElements.define("input-group", InputComponent);
customElements.define('reusable-modal', ReusableModal);