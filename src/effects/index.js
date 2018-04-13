// @flow

import AppEffects from './app';
import APIEffects from './api';

export default [
  ...AppEffects,
  ...APIEffects
];