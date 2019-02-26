import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsService } from '../core/services/news.service';

import { MainPageComponent } from './main-page.component';
import { of } from 'rxjs';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let newsService: NewsService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    newsService = new NewsService(httpClientSpy as any);
    newsService.deleteLocalNewsArticle = jasmine.createSpy('deleteLocalNewsArticle');
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      providers: [ { provide: NewsService, useValue: newsService }],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('on Delete', () => {
  //   const compiled = fixture.componentInstance;
  //   console.log(compiled)
  // });
});
