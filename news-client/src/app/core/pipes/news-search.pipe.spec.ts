import { NewsSearchPipe } from './news-search.pipe';

describe('Pipe: NewsSearch', () => {
  let pipe: NewsSearchPipe;

  beforeEach(() => {
    pipe = new NewsSearchPipe();
  });

  it('filters list', () => {
    const mockArray = [
      {title: 'love'},
      {title: 'fun'},
      {title: 'unicorn' }
    ];
    expect(pipe.transform(mockArray, 'fun' )[0].title).toBe('fun');
  });

  it('no value on empty input', () => {
    expect(pipe.transform(undefined, 'fun')).toBeFalsy();
  });
});
