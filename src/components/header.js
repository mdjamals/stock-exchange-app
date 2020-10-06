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
        width: 98%;
        max-width: 1280px;
        padding: 0 10px;
        margin: 0 auto;
        font-family: sans-serif;
      }
      .header-content {
        margin-left: auto;
        color: #24272c;
        font-size: 14px;
      }
      .header-content span:hover {
        color: #24272cb3;
        cursor: pointer;
      }
      .header-content span:last-child {
        padding-left: 20px;
      }
    `;
  }

  render() {
    return html`
      <div class="header">
        <div class="header-inner">
          <div class="logo">
            <img src="/src/images/logo.png" />
          </div>
          <div class="header-content">
            <span>Login / Register</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('header-comp', Header);
