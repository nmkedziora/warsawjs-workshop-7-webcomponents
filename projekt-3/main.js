class MediaProjector extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.index = 0;
    this.mediaInterval;
  }
  connectedCallback() {
    const $template = document.currentScript.ownerDocument.querySelector('template');
    const $clonedTemplate = $template.cloneNode(true);
    const $playBtn = $clonedTemplate.content.querySelector('#play');
    const $stopBtn = $clonedTemplate.content.querySelector('#stop');
    const $media = $clonedTemplate.content.querySelector('.media')

    this.shadow.appendChild($clonedTemplate.content);

    $playBtn.addEventListener('click', () => {
      this.mediaInterval = setInterval(() => {
        while ($media.hasChildNodes()) {
          $media.removeChild($media.lastChild);
        }

        $media.appendChild(this.children[this.index].cloneNode(true));

        if (this.index === this.children.length - 1) {
          this.index = 0;
        } else {
          this.index++;
        };
      }, 1000);

    });

    $stopBtn.addEventListener('click', () => {
      window.clearInterval(this.mediaInterval);
    })
  }
}
window.customElements.define('media-projector', MediaProjector);
