// ReusableModal.js
export class ReusableModal extends HTMLElement {
  constructor() {
    super();
    this.content = this.innerHTML;
  }

  connectedCallback() {
    // Render modal HTML structure
    this.render();

    // Initialize Bootstrap's Modal for the rendered element
    const modalElement = this.querySelector('.modal');
    this.modalInstance = new bootstrap.Modal(modalElement);

    // Attach click handler for the "Save changes" button
    const saveButton = this.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', (e) => {
        // If a save callback has been provided, call it.
        if (typeof this.onSave === 'function') {
          this.onSave(e);
        }
      });
    }
  }

  render() {
    const modalId = this.getAttribute('id') || 'reusableModal';
    const title = this.getAttribute('title') || 'Modal Title';
    
    // Set the modal structure while preserving the original content
    this.innerHTML = /*html*/`
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}-label">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${this.content}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary save-button">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;
}

  // Public method to open the modal.
  open() {
    this.modalInstance.show();
  }

  // Public method to close the modal.
  close() {
    this.modalInstance.hide();
  }

  // Define a property for the save callback.
  set onSave(callback) {
    this._onSave = callback;
  }

  get onSave() {
    return this._onSave;
  }
}

// Define the custom element.



