// @flow

import { Types } from '../actions';

export type SettingsState = {
  darkTheme: boolean
}

const INITIAL_STATE = {
  darkTheme: false
};

const settings = ( state: SettingsState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.SETTINGS_TOGGLE_DARK_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    default:
      return state
  }
};

export default settings