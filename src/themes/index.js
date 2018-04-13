// @flow

export type AppTheme = {
  layout: {
    headerHeightPx: number,
    contentMarginVW: number,
    contentMarginPx: number,
    mainContentMaxWidth: string,
    sideNavWidthPx: number,
    sideNavWidthDesktopPx: number,
    navLinkFontSize: number
  },
  bg: string,
  color: string,
  invColor: string,
  headerBG: string,
  headerSubBG: string,
  headerPadding: string,
  contentBG: string,
  cardBG: string,
  navTrim: string,
  trimColor: string,
  trimColorHover: string,
  loaderColor: string,
  switcherHover: string,
  buttonAction: string,
  buttonHover: string,
  buttonActionCancel: string,
  buttonActionCancelHover: string,
  buttonAuxiliary: string,
  borderRadius: string,
  type: TypeConfig,
  assetLinkBG: string,
  assetLinkHoverBG: string,
  assetLinkHoverColor: string,
  assetLinkColor: string,
  sideNavBG: string,
  typography: Typography,
  listItemBG: string
}

type Typography = {
  body: string,
  sub_text: string
}

const typography: Typography = {
  body: '12px',
  sub_text: '10px'
};

type TypeConfigSize = {
  title: string,
  subtitle: string,
  h1: string,
  h2: string,
  h3: string,
  content: string,
  subtext: string
}

type TypeConfig = {
  sm: TypeConfigSize,
  lg: TypeConfigSize,
  // new
  font: string
}

const layout = {
  headerHeightPx: 48,
  contentMarginVW: 5,
  contentMarginPx: 16,
  sideNavWidthPx: 128,
  sideNavWidthDesktopPx: 228,
  mainContentMaxWidth: '728px',
  navLinkFontSize: 14
};

const buttonAction = '#4CAF50';
const buttonHover ='#48c54c';
const buttonActionCancel = '#8f8d8c';
const buttonActionCancelHover= '#787676';
const navTrim = '#c3c0c0';

const headerPadding = '16px';
const type: TypeConfig = {
  headerFont: '"Roboto", "Arial", sans-serif',
  bodyFont: '"Roboto", "Arial", sans-serif',
  successColor: "#10c378",
  errorColor: "#e21040",
  sm: {
    title: "14px",
    subtitle: "12px",
    h1: "18px",
    h2: "16px",
    h3: "14px",
    content: "11px",
    subtext: "8px"
  },
  lg: {
    title: "16px",
    subtitle: "14px",
    h1: "26px",
    h2: "22px",
    h3: "18px",
    content: "13px",
    subtext: "10px"
  },

  //new
  font: '"Roboto", "Arial", sans-serif'
};

const lightTheme: AppTheme = {
  layout,
  type,
  headerPadding,
  buttonAction,
  buttonHover,
  buttonActionCancel,
  buttonActionCancelHover,
  navTrim,
  typography,
  buttonAuxiliary: '#dddddd',
  bg: 'white',
  color: '#000000',
  invColor: '#FFFFFF',
  headerBG: '#fbfbfb',
  headerSubBG: '#f9f9f9',
  contentBG: '#ffffff',
  cardBG: '#ffffff',
  trimColor: '#e4e4e4',
  trimColorHover: '#f0f0f0',
  loaderColor: '#4f4f59',
  switcherHover: '#efefef',
  borderRadius: "2px",
  assetLinkBG: '#ffffff',
  assetLinkHoverBG: '#607D8B',
  assetLinkHoverColor: '#ffffff',
  assetLinkColor: '#1c1c1c',
  sideNavBG: '#f4f4f4',
  editorTheme: 'github',
  listItemBG: '#f9f9f9'
};

const darkTheme: AppTheme = {
  layout,
  type,
  headerPadding,
  buttonAction,
  buttonHover,
  buttonActionCancel,
  buttonActionCancelHover,
  typography,
  navTrim: '#595959',
  buttonAuxiliary: '#a2a2a2',
  headerBG: '#363a40',
  headerSubBG: '#464c54',
  contentBG: '#23252a',
  cardBG: '#474a56',
  trimColor: '#595959',
  trimColorHover: '#6d6d6d',
  bg: '#191a1e',
  color: '#f9f9f9',
  invColor: '#000000',
  loaderColor: '#f5f5f5',
  switcherHover: '#efefef',
  borderRadius: "2px",
  assetLinkBG: '#ffffff',
  assetLinkHoverBG: '#607D8B',
  assetLinkHoverColor: '#ffffff',
  assetLinkColor: '#1c1c1c',
  sideNavBG: '#474a56',
  listItemBG: '#4d505d',
  editorTheme: 'twilight'
};

const breakPointsRaw = {
  'x-sm': 200,
  'sm': 320,
  'md': 720,
  'lg': 1444,
  'x-lg': 1600
};

const breakPoints = {
  'x-sm': breakPointsRaw['x-sm'] + 'px',
  'sm': breakPointsRaw['sm'] + 'px',
  'md': breakPointsRaw['md'] + 'px',
  'lg': breakPointsRaw['lg'] + 'px',
  'x-lg': breakPointsRaw['x-lg'] + 'px'
};

export { lightTheme, darkTheme, breakPoints, breakPointsRaw };