import '../src/components/stock-list';
import {expect, fixture, html} from '@open-wc/testing';

describe('Stock list and details test', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html` <stock-list-comp></stock-list-comp> `);
  });

  it('renders a stock list', () => {
    const list = el.shadowRoot.querySelector('.stock-container');
    expect(list).to.exist;
  });

  it('renders a stock details list', () => {
    const list = el.shadowRoot.querySelector('.stock-detail-container');
    expect(list).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });
});
