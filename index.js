import {LitElement, html, css} from 'lit-element';
import './src/components/header';
import './src/components/footer';
import './src/components/stock-list';

export default class AppStockExchange extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html`
      <header-comp></header-comp>
      <stock-list-comp></stock-list-comp>
      <footer-comp></footer-comp>
    `;
  }
}

customElements.define('app-stock-exchange', AppStockExchange);
