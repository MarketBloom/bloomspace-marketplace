import { Suburb } from './types';
import { SYDNEY_SUBURBS } from './sydney-suburbs';
import { MELBOURNE_SUBURBS } from './melbourne-suburbs';
import { BRISBANE_SUBURBS } from './brisbane-suburbs';

export const AUSTRALIAN_SUBURBS: Suburb[] = [
  ...SYDNEY_SUBURBS,
  ...MELBOURNE_SUBURBS,
  ...BRISBANE_SUBURBS
];