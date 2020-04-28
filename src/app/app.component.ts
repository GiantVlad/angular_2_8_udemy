import {Component, OnInit} from '@angular/core';
import {IngredientModel} from './shared/ingredient.model';
import {ShoppingService} from './shopping/shopping.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Resto';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
