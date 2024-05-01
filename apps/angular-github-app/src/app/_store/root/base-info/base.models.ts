import { ResponseErrorInterface } from '@angular-leanix/common';

/**
 * Interface for the 'Base' data
 */
export interface BaseState {
  accessToken: string | null;
  error: ResponseErrorInterface | null;
}
