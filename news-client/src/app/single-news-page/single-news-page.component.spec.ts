import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../core/services/news.service';
import { SingleNewsPageComponent } from './single-news-page.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SingleNewsPageComponent', () => {
  let component: SingleNewsPageComponent;
  let fixture: ComponentFixture<SingleNewsPageComponent>;
  let newsService: Partial<NewsService>;

  beforeEach(async(() => {
    newsService = {
      deleteLocalNewsArticle: jasmine.createSpy('deleteLocalNewsArticle'),
      getSpecificArticleForEditing: () => of(true)
    };

    TestBed.configureTestingModule({
      declarations: [ SingleNewsPageComponent ],
      providers: [
        { provide: NewsService, useValue: newsService },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: {paramMap : { get: () => {}}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNewsPageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const mockArticle = {
      title: 'The Best News Ever',
      description: 'Components are the fundamental building block of Angular applications.',
      content: 'An Angular application is therefore just a tree of such Components, when each Compo renders',      publishedAt: Date.now(),
      source: 'local'
    };
    component.article = mockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('shoud call delete method on newsService', () => {
    fixture.whenStable().then(() => {
      const deleteButtonDebugElementButton = fixture.debugElement.query(By.css('.nw-single__wrapper_btn-group_delete'));
      deleteButtonDebugElementButton.triggerEventHandler('click', null);
      expect(newsService.deleteLocalNewsArticle).toHaveBeenCalled();
    });
  });
});
