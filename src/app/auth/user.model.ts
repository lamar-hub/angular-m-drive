export class User {

  constructor(
    public userId: string,
    public email: string,
    public name: string,
    public surname: string,
    public stored: number,
    public limit: number) {
  }

}
