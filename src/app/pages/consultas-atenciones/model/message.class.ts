export class message {
  public status: boolean;
  public message: string;

  constructor(object: any) {
    this.message = object.message || null;
    this.status = false;
  }
}
