import {Component, OnInit} from '@angular/core';
import {DataAccess} from '../http/data-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-complete';
  data: any[];
  constructor(private dataService: DataAccess) {
    this.dataService.getDataFullResponse().subscribe(
      value => console.log('val', value)
    );
  }
  ngOnInit(): void {
    this.dataService.getData().subscribe(
      value => this.data = value
    );
  }
}
