import Loader from '../src/components/loader';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

describe('Loader element test', () => {
  it('Loader element should be able to define', () => {
    const el = document.createElement('loader-comp');
    assert.instanceOf(el, Loader);
  });

  it('render elements', async () => {
    const el = await fixture(html`<loader-comp></loader-comp>`);
    assert.shadowDom.equal(
      el,
      ` <div class="loader">
            <img src="/src/images/spinner.gif" alt="pre-loader" />
        </div>`
    );
  });
});
