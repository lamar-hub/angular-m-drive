export class File {
  constructor(
    public fileID: string,
    public filename: string,
    public type: string,
    public size: number,
    public lastModified: number
  ) {
  }
}
