import { MasterDetailPrimeNgPage } from './app.po';

describe('master-detail-prime-ng App', function() {
  let page: MasterDetailPrimeNgPage;

  beforeEach(() => {
    page = new MasterDetailPrimeNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
