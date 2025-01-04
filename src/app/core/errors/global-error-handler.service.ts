import { ErrorHandler, inject, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: Error) {
    console.error('error', error.message);
  }
}
