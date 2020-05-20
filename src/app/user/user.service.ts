export class UserService {
  private _user = {name: 'Vlad'};
  get user() {
    return this._user;
  }
}
