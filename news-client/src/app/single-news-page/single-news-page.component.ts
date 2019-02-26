import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../core/services/news.service';

@Component({
  selector: 'nw-single-news-page',
  templateUrl: './single-news-page.component.html',
  styleUrls: ['./single-news-page.component.scss']
})
export class SingleNewsPageComponent implements OnInit {
  public currentId: string;
  public article;
  public isArticleLoaded: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private router: Router) {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.newsService.getSpecificArticleForEditing(this.currentId).subscribe(article => {
      this.article = article;
      this.isArticleLoaded = true;
    });
  }

  public deleteArticle(articleId: string) {
    this.newsService.deleteLocalNewsArticle(articleId)
      .subscribe(() => {
        this.router.navigate(['news']);
      },
      err => console.log(err));
  }
}
