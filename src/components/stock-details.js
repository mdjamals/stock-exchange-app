import {LitElement, html, css} from 'lit-element';

export default class StockDetails extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      inst: {type: Object},
    };
  }

  render() {
    return html`
      <link rel="stylesheet" href="/src/css/table.css" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Intraday Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${this.inst && this.inst.name}</td>
            <td
              class=${this.inst && this.inst.increased
                ? 'market-positive'
                : this.inst && this.inst.decreased
                ? 'market-negative'
                : ''}
            >
              ${this.inst && this.inst.currentPrice.value}
            </td>
            <td>${this.inst && this.inst.priceDetails.highPrice.value}</td>
            <td>${this.inst && this.inst.priceDetails.lowPrice.value}</td>
            <td>${this.inst && this.inst.intradayPriceMutation}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define('stock-details-comp', StockDetails);
