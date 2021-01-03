export class User {

  constructor(
    public userId: string,
    public email: string,
    public name: string,
    public surname: string,
    public stored: number,
    public limit: number,
    // tslint:disable-next-line:variable-name
    private _token: string,
    public twoFactorVerification: boolean,
    public active: boolean) {
  }

  get token() {
    return this._token;
  }

}
