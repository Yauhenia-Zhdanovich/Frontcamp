import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NewsItemComponent } from './news-item.component';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ],
      providers: [{ provide: Router, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
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

  it('should header be title', () => {
    fixture.whenStable().then(() => {
      const headingDebugElement = fixture.debugElement.query(By.css('h4')).nativeElement;
      expect(headingDebugElement.innerHTML).toBe('The Best News Ever');
    });
  });

  it('should create buttons if local', () => {
    fixture.whenStable().then(() => {
      const buttonGroupDebugElementChilds = fixture.debugElement.query(By.css('.news-item__button-group')).childNodes;
      expect(buttonGroupDebugElementChilds.length).toBe(2);
    });
  });

});
