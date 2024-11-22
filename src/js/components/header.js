export default class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.classList.add("block");
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        
    `;
  }
}
