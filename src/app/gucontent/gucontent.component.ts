import { TestService } from './../test.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gucontent',
  templateUrl: './gucontent.component.html',
  styleUrls: ['./gucontent.component.css']
})
export class GucontentComponent implements OnInit {

  public res!: Observable<any>;

  constructor(public testService: TestService) { }

  ngOnInit(): void {
    this.res = this.testService.test();
  }

}
