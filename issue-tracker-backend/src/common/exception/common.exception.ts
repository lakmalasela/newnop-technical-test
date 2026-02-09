import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}
