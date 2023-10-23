export class IntegrationError extends Error { 
    data: IError;

    constructor (data: IError) {
      super(`${data.integration} - ${data.service} - ${data.status}`);

      Error.captureStackTrace(this, this.constructor);

      this.data = data;
      if (data.request) {
        console.warn(data.request);
      }
      console.error(data.message);
    }
  }

  interface IError {
    integration: string,
    request?: any,
    service: string,
    message: any,
    status: number
}