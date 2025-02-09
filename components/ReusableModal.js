export class ReusableModal extends HTMLElement {
  constructor() {
    super();
    this.content = this.innerHTML;
  }

  connectedCallback() {
    this.render();

    const modalElement = this.querySelector('.modal');
    this.modalInstance = new bootstrap.Modal(modalElement);

    const saveButton = this.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', (e) => {
        if (typeof this.onSave === 'function') {
          this.onSave(e);
        }
      });
    }
  }

  render() {
    const closetext = this.getAttribute('close-text') || 'Close';
    const saveText = this.getAttribute('save-Text') || 'Save';
    const modalId = this.getAttribute('id') ;
    const title = this.getAttribute('title')
    
    this.innerHTML = /*html*/`
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}-label">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="opens"></button>
            </div>
            <div class="modal-body">
              ${this.content}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${closetext}</button>
              <button type="button" class="btn btn-primary save-button">${saveText}</button>
            </div>
          </div>
        </div>
      </div>
    `;
}

  
  open() {
    this.modalInstance.show();
  }

  
  close() {
    this.modalInstance.hide();
  }

  
  set onSave(callback) {
    this._onSave = callback;
  }

  get onSave() {
    return this._onSave;
  }
}





