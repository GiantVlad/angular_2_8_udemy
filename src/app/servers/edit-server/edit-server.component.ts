import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router, UrlTree} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (qParams: Params) => { this.allowEdit = qParams['allow-edit'] === '1'; }
    );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(+this.route.snapshot.params.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    } else if (
      (this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
      return confirm('Do you want discard these changes?');
    } else {
      return true;
    }
  }
}
