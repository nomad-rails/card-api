import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

export async function bridgecardReq<T>(
  req: T,
): Promise<T extends () => Promise<any> ? ReturnType<T> : T> {
  if (typeof req !== 'function') throw new Error('Invalid request function');
  try {
    return await req();
  } catch (error) {
    const err = error as AxiosError<BridgeCardApiErrorResponse>;
    throw new HttpException(
      err.response?.data?.message || err.message || 'Unknown error',
      err.status || 500,
    );
  }
}
