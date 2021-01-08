export class SharedFile {
  constructor(
    public sharedFileFileId: string,
    public sharedFileFilename: string,
    public sharedFileSize: number,
    public sharedFileLastModified: number,
    public sharedFileUserEmail: string,
    public sharedFileUserName: string,
    public sharedFileUserSurname: string,
    public message: string,
    public date: number
  ) {
  }
}
