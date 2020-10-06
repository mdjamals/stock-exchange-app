import {fetchDataUrl} from '../src/components/stock-service';
import {expect, fixture, html, unsafeStatic} from '@open-wc/testing';

suite('stock-service', () => {
  test('should get stock list', () => {
    fetchDataUrl()
      .then((response) => response.json())
      .then((json) => {
        expect(json).to.be.an('object');
      });
  });
});
