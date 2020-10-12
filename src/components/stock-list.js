import {LitElement, html, css} from 'lit-element';
import './stock-details';
import './loader';
import {fetchDataUrl} from '../service/stock-service';

export default class StockList extends LitElement {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .main-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        max-width: 1000px;
        margin: 0px auto;
        font-family: sans-serif;
        padding-top: 10px;
      }
      .stock-container {
        min-width: 300px;
        min-height: 465px;
        /* filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 3px); */
      }
      .stock-detail-container {
        margin-left: auto;
        /* filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 3px); */
        display: none;
        opacity: 0;
        transition: all 0.4s ease-in-out;
      }
      .stock-detail-container.active {
        display: block;
        opacity: 1;
      }
      .close-icon {
        position: absolute;
        top: 20px;
        left: 20px;
        cursor: pointer;
        font-size: 1.4rem;
        color: #fff;
        display: none;
      }

      @media only screen and (max-width: 1024px) {
        .main-container {
          padding: 0 10px 70px;
        }
      }
      @media only screen and (max-width: 900px) {
        .stock-container {
          margin: 0 auto;
        }
        .stock-detail-container {
          margin-left: unset;
          background: rgba(0, 0, 0, 0.8);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          display: none;
          opacity: 0;
          transition: all 0.4s ease-in-out;
          z-index: 11;
          font-family: sans-serif;
        }
        .stock-detail-inner {
          padding: 60px 10px 10px;
        }
        .close-icon {
          display: block;
        }
      }
      @media only screen and (max-width: 400px) {
        .stock-detail-container {
          overflow-x: scroll;
        }
      }
    `;
  }

  static get properties() {
    return {
      instruments: {type: Object},
      showDetails: {type: Boolean},
      selectedStock: {type: Object},
      prevInstruments: {type: Object},
      error: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.showDetails = false;
  }

  fetchUrl(first) {
    this.error = false;
    //fetching stock data response using fetch API
    fetchDataUrl()
      .then((response) => response.json())
      .then((json) => {
        this.error = false;
        //initializing previous data with current data for the first time only for comparison
        if (first === 'first') {
          this.prevInstruments = json;
        }
        this.instruments = json;

        this.compareStocks();

        //updating previous data for the next comparison
        this.prevInstruments = json;

        //updating stock detail component with the current data
        if (this.selectedStock) {
          const {name} = this.selectedStock;
          this.selectedStock = this.instruments.instruments.find(
            (inst) => name === inst.name
          );
        }

        // console.log(this.instruments);
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
        this.instruments = [];
      });
  }

  compareStocks() {
    //comparing prev and current array of objects by taking name as unique identifier
    this.prevInstruments.instruments.forEach((prevInstrument) => {
      this.instruments.instruments.forEach((instrument) => {
        if (prevInstrument.name === instrument.name) {
          if (
            prevInstrument.currentPrice.value < instrument.currentPrice.value
          ) {
            instrument.increased = true;
          } else if (
            prevInstrument.currentPrice.value > instrument.currentPrice.value
          ) {
            instrument.decreased = true;
          }
        }
      });
    });
    // console.log(this.instruments);
  }

  // Invoked when a component is added to the document’s DOM.
  connectedCallback() {
    super.connectedCallback();
    //fetching stock data for the first time
    this.fetchUrl('first');

    //setting interval for fetching stock data every 10 seconds
    this.interval = window.setInterval(() => {
      this.fetchUrl();
    }, 10000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  firstUpdated() {}

  //for showing stock detail component
  instrumentClicked(inst) {
    this.selectedStock = inst;
    this.showDetails = true;
    // console.log(this.showDetails);
  }

  closePopup() {
    if (this.showDetails) {
      this.showDetails = !this.showDetails;
    }
  }

  renderInstruments() {
    if (this.instruments.instruments && this.instruments.instruments.length) {
      return this.instruments.instruments.map((inst) => {
        return html`
          <tr>
            <td>
              <a
                class="name"
                @click="${() => {
                  this.instrumentClicked(inst);
                }}"
                >${inst.name}</a
              >
            </td>
            <td
              class=${inst.increased
                ? 'market-positive'
                : inst.decreased
                ? 'market-negative'
                : ''}
            >
              ${inst.currentPrice.value}
            </td>
          </tr>
        `;
      });
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="/src/css/table.css" />
      <div class="main-container">
        <div class="stock-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            ${!this.instruments
              ? html` <tbody>
                  <loader-comp></loader-comp>
                </tbody>`
              : html`<tbody class="table-body">
                  ${this.renderInstruments()}
                </tbody>`}
            ${this.error
              ? html`
                  <div id="error-message">
                    The request failed. Please refresh after sometime
                  </div>
                `
              : ''}
          </table>
        </div>
        <div class="stock-detail-container ${this.showDetails ? 'active' : ''}">
          <div class="close-icon" @click="${this.closePopup}">X</div>
          <div class="stock-detail-inner">
            <stock-details-comp
              .inst=${this.selectedStock}
            ></stock-details-comp>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('stock-list-comp', StockList);
