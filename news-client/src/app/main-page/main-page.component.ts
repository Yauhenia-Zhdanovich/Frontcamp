import { Component, OnInit } from '@angular/core';

import { NewsService } from '../core/services/news.service';
import { NewsSearchPipe } from '../core/pipes/news-search.pipe';

import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'nw-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [NewsSearchPipe]
})
export class MainPageComponent implements OnInit {
  public news;
  public filteredNews = [];
  public currentPageHeading: string;
  public currentChannelId: string;
  public pageCount: number;
  public searchValue: string;

  public dynamicNewsUpload: ReplaySubject<any> = new ReplaySubject();

  constructor(private newsService: NewsService, private newsSearchPipe: NewsSearchPipe) { }

  public ngOnInit(): void {
    this.dynamicNewsUpload.pipe(
      switchMap((newsInfo: any) => this.newsService.fetchNews(newsInfo.page, newsInfo.source))
    ).subscribe((data: any) => {
        if (this.pageCount === 1) {
          this.news = [...data.articles];
        } else {
          this.news = this.news.concat(data.articles);
        }
      }
    );
  }

  public onLoadNews(newsChannel?) {
    if (newsChannel) {
      this.pageCount = 1;
      this.currentPageHeading = newsChannel.name;
      this.currentChannelId = newsChannel.id;

      if (newsChannel.id === 'all') {
        this.getMixedNews(newsChannel);
        return;
      }
    }

    this.pageCount = newsChannel ? 1 : ++this.pageCount;
    this.dynamicNewsUpload.next({page: this.pageCount, source: this.currentChannelId});
  }

  public onSearchValueChanges(searchValue) {
    this.searchValue = searchValue;
    if (this.searchValue) {
      this.filteredNews = this.newsSearchPipe.transform(this.news, searchValue);
    }
  }

  public getMixedNews(newsChannel) {
    const arrayOfPromises = [];
    arrayOfPromises.push(this.newsService.fetchNews(this.pageCount, newsChannel).toPromise());
    arrayOfPromises.push(this.newsService.fetchNews(this.pageCount, 'local').toPromise());
    Promise.all(arrayOfPromises).then(res => {
      const combinedArticles = res[0].articles.concat(res[1].articles);
      this.news = this.shuffleArray(combinedArticles);
    });
  }

  // move to helpers
  public shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  public onLocalOnlyFilter(checkboxValue: boolean) {
    if (checkboxValue) {
      this.news = this.news.filter(news => news.source === 'local');
    } else {
      this.dynamicNewsUpload.next({page: this.pageCount, source: this.currentChannelId});
    }
  }

  public deleteLocalArticle(articleId: string) {
    this.newsService.deleteLocalNewsArticle(articleId)
      .subscribe(() => {
        this.dynamicNewsUpload.next({page: this.pageCount, source: this.currentChannelId});
      },
      err => console.log(err));
  }
}
