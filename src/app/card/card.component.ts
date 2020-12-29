import { Component, OnInit, Input } from '@angular/core';

import { Task, DetailTask } from '../interface/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'task',
  }
})
export class CardComponent implements OnInit {

  @Input()
  taskModel: DetailTask;

  constructor() { }

  ngOnInit(): void {
  }

}
