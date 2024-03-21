import * as jsend from 'jsend';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, jsend.JSendObject>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<jsend.JSendObject> {
    return next.handle().pipe(map((data) => jsend.success(data)));
  }
}
