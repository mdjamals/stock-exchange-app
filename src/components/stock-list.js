import {LitElement, html, css} from 'lit-element';
import './stock-details';
import './loader';
import {fetchDataUrl} from './stock-service';

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
    };
  }

  constructor() {
    super();
    this.showDetails = false;
  }

  fetchUrl(first) {
    fetchDataUrl()
      .then((response) => response.json())
      .then((json) => {
        if (first === 'first') {
          this.prevInstruments = json;
        }
        this.instruments = json;

        this.compareStocks();

        // set local storgare
        const setInstrumentsLocal = this.instruments;
        localStorage.setItem(
          'instruments',
          JSON.stringify(setInstrumentsLocal)
        );

        this.prevInstruments = json;

        if (this.selectedStock) {
          const {name} = this.selectedStock;
          this.selectedStock = this.instruments.instruments.find(
            (inst) => name === inst.name
          );
        }

        // console.log(this.instruments);
      })
      .catch((error) => console.log(error));
  }

  compareStocks() {
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

  connectedCallback() {
    super.connectedCallback();
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      if (!localStorage.getItem('instruments')) {
        this.fetchUrl('first');
      } else {
        const userData = JSON.parse(localStorage.getItem('instruments'));
        this.instruments = userData;
        this.prevInstruments = {...userData};
      }
    }

    this.interval = window.setInterval(() => {
      this.fetchUrl();
    }, 10000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.interval);
  }

  firstUpdated() {}

  instrumentClicked(inst) {
    this.selectedStock = inst;
    this.showDetails = true;
    // console.log(this.showDetails);
  }

  togglePopup() {
    if (this.showDetails) {
      this.showDetails = !this.showDetails;
    }
  }

  renderInstruments() {
    return (
      this.instruments &&
      [...this.instruments.instruments].map((inst) => {
        return html`
          <tr>
            <td>
              <a
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
      })
    );
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
          </table>
        </div>
        <div class="stock-detail-container ${this.showDetails ? 'active' : ''}">
          <div class="close-icon" @click="${this.togglePopup}">X</div>
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
