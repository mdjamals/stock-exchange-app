import {LitElement, html, css} from 'lit-element';

export default class Loader extends LitElement {
  static get styles() {
    return css`
      .loader {
        position: relative;
        left: 120px;
        top: 20px;
      }
      .loader img {
        display: flex;
        align-items: center;
      }
    `;
  }

  render() {
    return html`
      <div class="loader">
        <img src="/src/images/spinner.gif" alt="pre-loader" />
      </div>
    `;
  }
}

customElements.define('loader-comp', Loader);
