import './ReusableModal.js';

export class CalcSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.template().trim();

    // Get a reference to the reusable modal component.
    const modal = this.querySelector('reusable-modal');

    // Get the button that should trigger the modal.
    // (Note: remove any Bootstrap data attributes if you plan to handle it manually.)
    const addETFButton = this.querySelector('button.add-etf-btn');
    if (addETFButton && modal) {
      addETFButton.addEventListener('click', () => {
        modal.open();
      });
    }

    // Set up the save callback for the modal.
    if (modal) {
      modal.onSave = (e) => {
        console.log("Save action triggered in CalcSidebar", e);
        // Put your custom save logic here (e.g., form validation, data submission, etc.)
        
        // Optionally, close the modal after saving.
        modal.close();
      };
    }
  }

  template = () => {
    return /*html*/`
      <div class="container p-4">
        <input-group title="Current PAC value" icon="$"></input-group>
        <input-group title="Increment" icon="$"></input-group>
        <!-- Note: we removed data attributes so we can handle the modal manually -->
        <button type="button" class="btn btn-primary btn-md rounded-3 d-block mx-auto add-etf-btn">
          ADD ETF
        </button>
      </div>
      <!-- Include the reusable modal component -->
      <reusable-modal id="myModal" title="My Custom Modal">
        <p>TCustomize it as needed.</p>
      </reusable-modal>
    `;
  }
}


