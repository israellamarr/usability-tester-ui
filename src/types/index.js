// @flow
export type StatusMessage = {
  success: boolean,
  response: any
};

export type AssetType = string;
export type BusinessLine = string;

/**
 * Data about a running test
 */
export interface Build {
  test_id: string;
  build_id: string;
  start_time: Date;
}

/**
 * Data about a finished test
 */
export interface Test {
  results: string;
  test_id: string;
  duration: number;
  start: Date;
  end: Date;
  passed: number;
  failed: number;
  skipped: number;
  browser: string;
  screenshots?: [ string ];
  test_path: string;
}

/**
 * Data about an asset
 */
export type Asset = {
  asset_id: string;
  asset_type: AssetType;
  business_line: BusinessLine;
  path: string;
  version: string;
  description: string;
  url: string;
  test_id: string;
  proof_url?: string;
  active_builds?: Array<Build>; // Agg field from controller
  completed_tests?: Array<Test>; // Agg field from controller,
  asset_health?: {
    pass_rate: number
  };
  personas: Array<Persona>
}

export type Persona = {
  persona_id: string;
  persona_name: string;
  data: Object;
}

export type PathAssertions = Array<Object>

export type Resolution = {
  name: string,
  x: number,
  y: number
}