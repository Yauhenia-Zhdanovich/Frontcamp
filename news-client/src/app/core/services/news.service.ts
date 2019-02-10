import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  public fetchNews(page: number, source: string) {
    const urlParam: HttpParams = new HttpParams()
                                      .set('pageSize', '10')
                                      .set('page', String(page))
                                      .set('sources', source)
                                      .set('apiKey', '104b255245ef41b2a0311bc877694c67');
    if (source) {
      urlParam.set('sources', source);
    }
    const url = source === 'local' ? `http://localhost:3000/news` : `https://newsapi.org/v2/everything`;
    if (source === 'local') {
      return this.http.get(url);
    }
    return this.http.get(url, { params: urlParam });
  }

  public fetchChannels() {
    const urlParam: HttpParams = new HttpParams()
                                        .set('apiKey', '104b255245ef41b2a0311bc877694c67');
    return this.http.get('https://newsapi.org/v2/sources', { params: urlParam });
  }

  public postNewsArtcile(article) {
    this.http.post('http://localhost:3000/news',
                  {...article, urlToImage: article.imageGroup.image}).subscribe(res => console.log(res), err => console.log(err));
  }

  public getSpecificArticleForEditing(id: string) {
    return this.http.get(`http://localhost:3000/news/${id}`);
  }

  public updateLocalNewsItem(id: string, updatedArticle) {
    this.http.patch(`http://localhost:3000/news/${id}`, updatedArticle)
    .subscribe(() => {
      console.log('article has been updated');
    },
    err => {
      console.log(err);
    });
  }

  public deleteLocalNewsArticle(id: string) {
    return this.http.delete(`http://localhost:3000/news/${id}`);
  }
}
