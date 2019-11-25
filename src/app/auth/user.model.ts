export class User {

  constructor(
    public userID: string,
    public email: string,
    public name: string,
    public surname: string,
    public stored: number,
    public limit: number,
    // tslint:disable-next-line:variable-name
    private _token: string,
    public expireIn: number) {
  }

  get token() {
    // if (!this.expirationTime || this.expirationTime <= new Date().getTime()) {
    //   return null;
    // }
    return this._token;
  }

}
