export class Shared {
  constructor(
    public sharedFileID: string,
    public sharedFileFilename: string,
    public sharedFileSize: number,
    public sharedFileLastModified: number,
    public sharedUserEmail: string,
    public sharedUserName: string,
    public sharedUserSurname: string,
    public message: string,
    public shareDate: number
  ) {
  }
}
