import { NewsService } from './news.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('News Service', () => {
  let httpClientSpy: {get: jasmine.Spy };
  let newsService: NewsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    newsService = new NewsService(httpClientSpy as any);
  });

  it('should return expected news', () => {
    const expectedNews = [
      {
        _id : '5c72d4edf9e17b5ee8f5d14a',
        title : 'Something great happen🦄',
        description : 'Something great happen🦄Конечно улучшать, дописывать проверки, но… Вы уже поняли принцип, не правда ли?',
        content : 'sdfseffdf',
        urlToImage : 'no-image',
        url : 'https://learn.javascript.ru/descriptors-getters-setters',
        author : 'nice person',
        source : 'local',
        publishedAt : '2019-02-24T00:00:00.000Z'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedNews));

    newsService.getSpecificArticleForEditing('local').subscribe(
      res => expect(res).toEqual(expectedNews, 'expected News'),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    newsService.fetchNews(1, '').subscribe(
      res => fail('errror was expected, not news'),
      error => expect(error.message).toContain('404 Not Found')
    );
  });

  // it('should delete an item', () => {

  // });
});
