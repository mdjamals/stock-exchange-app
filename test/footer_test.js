import Footer from '../src/components/footer';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('Footer element test', () => {
  test('Footer element should be able to define', () => {
    const el = document.createElement('footer-comp');
    assert.instanceOf(el, Footer);
  });

  test('render elements', async () => {
    const el = await fixture(html`<footer-comp></footer-comp>`);
    assert.shadowDom.equal(
      el,
      `<div class="footer">
        <p>© 2020 StockExchange.com</p>
       </div>`
    );
  });
});
