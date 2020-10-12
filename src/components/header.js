import {LitElement, html, css} from 'lit-element';

export default class Header extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .header {
        width: 100%;
        background: #fff;
        position: sticky;
        top: 0;
        z-index: 9;
        padding: 5px 0 0;
        margin-bottom: 10px;
        filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 3px 2px);
      }
      .header-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 98%;
        max-width: 1280px;
        padding: 0 10px;
        margin: 0 auto;
        font-family: sans-serif;
      }
    `;
  }

  render() {
    return html`
      <div class="header">
        <div class="header-inner">
          <div class="logo">
            <img src="/src/images/logo.png" alt="logo" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('header-comp', Header);
