export class ApplicationError extends Error { 
    data: IError;

    constructor (data: IError) {
      super(`${data.status} - ${data.point}`);
      console.warn(data.message);
      this.data = data;
    }
  }

  interface IError {
    message: any,
    point: string,
    status: number
}