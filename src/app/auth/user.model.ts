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
    public expirationTime: number) {
  }

  get token() {
    // if (!this.expirationTime || this.expirationTime <= new Date().getTime()) {
    //   return null;
    // }
    return this._token;
  }

}
