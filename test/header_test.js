import {fixture, html} from '@open-wc/testing';
import Header from '../src/components/header';

const assert = chai.assert;

describe('Header element test', () => {
  it('Header element should be able to define', () => {
    const el = document.createElement('header-comp');
    assert.instanceOf(el, Header);
  });

  it('render elements', async () => {
    const el = await fixture(html`<header-comp></header-comp>`);
    assert.shadowDom.equal(
      el,
      `<div class="header">
        <div class="header-inner">
          <div class="logo">
            <img src="/src/images/logo.png" alt="logo"/>
          </div>
        </div>
      </div>`
    );
  });
});
