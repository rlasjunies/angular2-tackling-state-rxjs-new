import { Angular2TacklingStateRxjsNewPage } from './app.po';

describe('angular2-tackling-state-rxjs-new App', function() {
  let page: Angular2TacklingStateRxjsNewPage;

  beforeEach(() => {
    page = new Angular2TacklingStateRxjsNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
