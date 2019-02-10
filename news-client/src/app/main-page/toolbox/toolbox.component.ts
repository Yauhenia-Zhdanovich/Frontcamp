import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NewsService } from '../../core/services/news.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'nw-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  public newsChannels = [];
  public selectedSource = [];
  public searchValue = new FormControl('');
  public isLocalOnly = false;

  @Output()
  public currentChannel: EventEmitter<any> = new EventEmitter();

  @Output()
  public searchValueChanges: EventEmitter<string> = new EventEmitter();

  @Output()
  public filterLocalOnly: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('ngSelect')
  ngSelect: NgSelectComponent;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.searchValue.valueChanges.subscribe(value => this.searchValueChanges.emit(value));
    this.newsService.fetchChannels().subscribe((data: any) => {
      this.newsChannels = data.sources.map(source => {
        return {
          id: source.id,
          name: source.name,
          url: source.url,
          description: source.description,
          origin: 'worldwide'
        };
      });
      this.newsChannels = [
        {id: 'all', name: 'All', url: '', description: ''},
        {id: 'local', name: 'LocalNews', url: '', description: ''},
        ...this.newsChannels];
      setTimeout(() => {
        const selectedItem = this.ngSelect.itemsList.findByLabel('CNN');
        this.ngSelect.select(selectedItem);
        this.ngSelect.detectChanges();
      }, 0);
    });
  }

  public onChannelChange(channel) {
    this.currentChannel.emit(channel);
  }

  public onLocalFilter(change) {
    this.filterLocalOnly.emit(change.checked);
  }
}
