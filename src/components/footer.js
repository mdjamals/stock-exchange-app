import { LitElement, html, css } from 'lit-element'

export default class Footer extends LitElement {
  static get styles () {
    return css`
      .footer {
        width: 100%;
        background: #fff;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        padding: 4px 0;
        font-family: sans-serif;
        font-size: 12px;
        text-align: center;
        margin-top: 40px;
      }
      @media only screen and (max-width: 1024px) {
        .footer {
          position: fixed;
          bottom: 0;
        }
      }
    `
  }

  render () {
    return html`
      <div class="footer">
        <p>© 2020 StockExchange.com node deploy</p>
      </div>
    `
  }
}

customElements.define('footer-comp', Footer)
