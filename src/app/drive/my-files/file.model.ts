export class File {
  constructor(
    public fileId: string,
    public filename: string,
    public type: string,
    public size: number,
    public lastModified: number
  ) {
  }
}
