export class Select {
  constructor(rootElement, options) {
    this.rootElement = rootElement;
    this.options = options;

    this.#render();
  }

  #getTemplate(placeholder = 'Placeholder', items = []) {
    const itemElements = items.map(item => `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`)
      .join('');
    return (
      `<div class="select" data-type="select">
      <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
          <span data-type="value">${placeholder}</span>
          <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
          <ul class="select__list" data-type="list">
            ${itemElements}
          </ul>
        </div>
      </div>`
    );
  }

  #setup() {
    this.backdropElement = this.rootElement.querySelector('[data-type="backdrop"]');
    this.selectElement = this.rootElement.querySelector('[data-type="select"]');
    this.inputElement = this.rootElement.querySelector('[data-type="input"]');
    this.valueElement = this.rootElement.querySelector('[data-type="value"]');
    this.arrowElement = this.rootElement.querySelector('[data-type="arrow"]');
    this.listElement = this.rootElement.querySelector('[data-type="list"]');

    this.backdropClickHandler = this.backdropClickHandler.bind(this);
    this.backdropElement.addEventListener('click', this.backdropClickHandler);

    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.inputElement.addEventListener('click', this.inputClickHandler);

    this.listClickHandler = this.listClickHandler.bind(this);
    this.listElement.addEventListener('click', this.listClickHandler);
  }

  backdropClickHandler() {
    this.close();
  }

  inputClickHandler() {
    this.toggle();
  }

  listClickHandler(evt) {
    this.select(evt.target.dataset.id);
    this.close();
  }

  #render() {
    const {placeholder, selectItems, selectedId} = this.options;
    this.rootElement.innerHTML = this.#getTemplate(placeholder, selectItems);

    this.#setup();

    if (selectedId) {
      this.select(selectedId);
    }
  }

  get isOpen() {
    return this.selectElement.classList.contains('opened');
  }

  get currentItem() {
    return this.options.selectItems.find(item => item.id === this.selectedId);
  }

  destroy() {
    this.backdropElement.removeEventListener('click', this.backdropClickHandler);
    this.inputElement.removeEventListener('click', this.inputClickHandler);
    this.listElement.removeEventListener('click', this.listClickHandler);
    this.rootElement.innerHTML = '';
  }

  open() {
    this.selectElement.classList.add('opened');
    this.arrowElement.classList.remove('fa-chevron-down');
    this.arrowElement.classList.add('fa-chevron-up');
  }

  close() {
    this.selectElement.classList.remove('opened');
    this.arrowElement.classList.remove('fa-chevron-up');
    this.arrowElement.classList.add('fa-chevron-down');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  select(id) {
    this.selectedId = id;
    this.valueElement.textContent = this.currentItem.value;
    this.selectElement.querySelectorAll('[data-type="item"').forEach(element => {
      element.classList.remove('selected');
    })
    this.selectElement.querySelector(`[data-id="${id}"]`).classList.add('selected');

    if (typeof this.options.onSelect === "function") {
      this.options.onSelect(this.currentItem);
    }
  }
}