import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nw-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  public isContentOpen = false;

  @Input()
  public article;

  @Output()
  public deletedArticleId: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onArticleDeleted() {
    this.deletedArticleId.emit(this.article._id);
  }
}
