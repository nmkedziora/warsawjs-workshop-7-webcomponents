class MockupElement extends HTMLElement{
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    const $template = MockupElement.DOCUMENT.querySelector('template');
    const $clonedTemplate = $template.cloneNode(true);

    $clonedTemplate.content.querySelector('img').setAttribute('src', this.attributes.image.value);
    $clonedTemplate.content.querySelector('h1').textContent = this.attributes.title.value;
    this.shadow.appendChild($clonedTemplate.content);
  }
}

MockupElement.DOCUMENT = document.currentScript.ownerDocument;

window.customElements.define('mockup-element', MockupElement);
