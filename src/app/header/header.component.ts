import {Component, OnInit} from '@angular/core';
import {DataStoreService} from '../shared/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStoreService.updateRecipes();
  }
  onFetchData() {
    this.dataStoreService.fetchRecipes().subscribe();
  }
}
