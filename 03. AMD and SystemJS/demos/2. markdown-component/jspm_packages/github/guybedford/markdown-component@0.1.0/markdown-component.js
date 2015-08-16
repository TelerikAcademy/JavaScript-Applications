import showdown from 'showdown';
import prism from 'prism';

import 'prism/themes/prism-okaidia.css!';

var converter = new showdown.converter();

class XMarkdownComponent extends HTMLElement {
  createdCallback() {
    this.innerHTML = converter.makeHtml(
      this.innerHTML.split('\n').map((line) => line.trim()).join('\n')
    );
    prism.highlightAll(this.querySelectorAll('code'));
  }
}

document.registerElement('x-markdown-component', XMarkdownComponent);
