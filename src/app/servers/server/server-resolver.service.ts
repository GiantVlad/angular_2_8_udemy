import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {ServersService} from '../servers.service';

interface ServerObject {
  id: number;
  name: string;
  status: string;
}
@Injectable()
export class ServerResolverService implements Resolve<ServerObject> {
  constructor(private serversService: ServersService) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ServerObject>
    | Promise<ServerObject>
    | ServerObject {
    return this.serversService.getServer(+route.params.id);
  }
}
