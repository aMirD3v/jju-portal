import { EventEmitter } from 'events';

export const progressBus = new EventEmitter();

export interface ProgressPayload {
  uploadId: string;
  stage: 'upload' | 'process';
  current: number;
  total: number;
}
