import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { isIP } from "net";
import { isRange } from "range_check";
import { Observable, of } from "rxjs";

@Injectable()
export class VerifyIpInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;
    if (!isIP(request.body.ipAddress) && !isRange(request.body.ipAddress)) {
      const response = context.switchToHttp().getResponse() as Response;
      response.statusCode = 400;
      response.statusMessage = "Invalid IP or Range";
      return of("Invalid IP or Range"); // Message isn't read by data provider :(
    }
    return next.handle();
  }
}
