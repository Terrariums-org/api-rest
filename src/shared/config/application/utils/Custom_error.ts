import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  private status: number;
  private messageError: string;
  constructor(status: keyof typeof HttpStatus, message: string) {
    super(`${status} : ${message}`);
  }

  public static createCustomError(message: string = 'Server error') {
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
