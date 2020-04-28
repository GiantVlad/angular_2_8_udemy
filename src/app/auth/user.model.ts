export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private tokenExpiration: Date
  ) {}
  get token(): string {
    if (this.tokenExpiration && this.tokenExpiration > new Date()) {
      return this._token;
    }
    return null;
  }
}
