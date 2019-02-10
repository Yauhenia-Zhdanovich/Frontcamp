import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../core/services/news.service';

@Component({
  selector: 'nw-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public currentTypeOffile;
  public typesOffiles = ['URL', 'File'];
  public currentId: string;

  public newsForm: FormGroup;

  @ViewChild('inputTitle')
  public title: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private newsService: NewsService,
              private activatedRoute: ActivatedRoute) {
    this.createForm();
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    setTimeout(() => {
      this.title.nativeElement.focus();
    }, 0);
    if (this.currentId) {
      this.fetchNewsData();
    }
  }

  private fetchNewsData() {
    this.newsService.getSpecificArticleForEditing(this.currentId).subscribe((res: any) => {
      this.newsForm.setValue({
        title: res.title,
        description: res.description,
        content: res.content,
        imageGroup: {
          typesOffiles: '',
          image:  res.urlToImage
        },
        publishedAt: res.publishedAt,
        author: res.author,
        url: res.url
      });
    });
  }

  private createForm(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', Validators.required],
      imageGroup: this.formBuilder.group({
        typesOffiles: [['URL', 'File']],
        image: ['']
      }),
      publishedAt: [new Date(), [Validators.required]],
      author: ['', [Validators.required]],
      url: ['']
    });
  }

  public onSubmit() {
    if (this.newsForm.valid) {
      if (this.currentId) {
        this.newsService.updateLocalNewsItem(this.currentId, this.newsForm.value);
      } else {
        this.newsService.postNewsArtcile({...this.newsForm.value, source: 'local'});
      }
      this.router.navigate(['news']);
    }
  }

}

