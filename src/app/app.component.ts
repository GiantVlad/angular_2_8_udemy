import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PostModel} from './post.model';
import {PostService} from './post.service';
import {subscribeOn} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.errorSubject.subscribe( error => {
      this.error = error;
    });
    this.fetchData();
  }

  onCreatePost(postData: PostModel): void {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchData();
  }

  onClearPosts() {
    this.isFetching = true;
    this.postService.delete('').subscribe(res => {
      console.log(res);
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }

  onClearPost(id: string) {
    this.isFetching = true;
    this.postService.delete(id).subscribe(res => {
      console.log(res);
      this.loadedPosts = this.loadedPosts.filter(item => item.id !== id);
      this.isFetching = false;
    });
  }

  private fetchData() {
    this.error = null;
    this.isFetching = true;
    this.postService.getData().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }
}
