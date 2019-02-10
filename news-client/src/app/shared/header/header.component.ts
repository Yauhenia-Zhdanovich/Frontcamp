import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public sourceName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
