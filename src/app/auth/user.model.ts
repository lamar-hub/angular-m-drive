export class User {

  constructor(
    public userId: string,
    // tslint:disable-next-line:variable-name
    private _token: string) {
  }

  get token() {
    return this._token;
  }

}
