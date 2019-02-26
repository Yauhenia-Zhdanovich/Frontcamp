import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../core/services/news.service';
import { By } from '@angular/platform-browser';

import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { EditPageComponent } from './edit-page.component';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let newsService: NewsService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    newsService = new NewsService(httpClientSpy as any);
    newsService.postNewsArtcile = jasmine.createSpy('postNewsArtcile');
    TestBed.configureTestingModule({
      declarations: [ EditPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: Router, useValue: {} },
        { provide: NewsService, useValue: newsService},
        { provide: ActivatedRoute, useValue: { snapshot: {paramMap : { get: () => {}}}}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should update when form value changes', fakeAsync(() => {
    const fakeTitle = 'hello unicorns 🦄';
    component.newsForm.controls.title.setValue(fakeTitle);
    expect(component.newsForm.controls.title.value).toEqual(fakeTitle);
  }));

  it('should postNewsArtcile to be called', () => {
    const mockArticle = {
      title: 'hello unicorns 🦄',
      description: 'about 🦄 and 🌈',
      content: '🦄🦄🦄🦄🦄 🌈🌈🌈🌈🌈🌈',
      imageGroup: {
        typesOffiles: '🔥',
        image: '🦄'
      },
      publishedAt: Date.now(),
      author: '🦄',
      url: '🦄'
    };

    component.newsForm.setValue(mockArticle);

    const submitButtonDebugElement = fixture.debugElement.query(By.css('.submit-button'));
    console.log(submitButtonDebugElement, component.newsForm, component.currentId);
    submitButtonDebugElement.triggerEventHandler('click', null);
    expect(newsService.postNewsArtcile).toHaveBeenCalled();
  });
});
