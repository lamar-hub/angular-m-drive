export class File {
  constructor(
    public fileID: string,
    public filename: string,
    public size: number,
    public lastModified: number
  ) {
  }
}
