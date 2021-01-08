import {Plan} from './plan.model';

export class User {

  constructor(
    public userId: string,
    public email: string,
    public phone: string,
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

  get plan() {
    switch (this.limit) {
      case 5e+8:
        return Plan.free;
      case 6.25e+8:
        return Plan.business;
      case 1.25e+10:
        return Plan.pro;
      default:
        return Plan.free
    }
  }

}
