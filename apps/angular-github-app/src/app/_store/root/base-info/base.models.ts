import { ResponseError } from '@angular-leanix/common';

/**
 * Interface for the 'Base' data
 */
export interface BaseState {
  accessToken: string | null;
  error: ResponseError | null;
}
