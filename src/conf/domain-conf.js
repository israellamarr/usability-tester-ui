// @flow

const DOMAIN_CONF = {
  "domains": [
    {
      "title": "Demo",
      "icon": "demo",
      "domain": "demo"
    }
  ],
  "businessLineNameMap": {
    "all": "All Assets",
    "demo": "Demo"
  },
  "businessLineInitialMap": {
    "all": 'all',
    "demo": 'demo'
  },
  "businessLineIconMap": {
    "demo": "demo"
  }
};

type Domain = {
  name: string, // demo
  business_line: string, // demo,
  brand_color_a: string, // #FFFFFF
  brand_color_b: string, // #000000
  home_page: string,     // "https://demo.org"

}

const domains: Domain[] = [
  {
    name: 'demo',
    business_line: 'demo',
    brand_color_a: '#FFFFFF',
    brand_color_b: '#000000',
    home_page: "https://demo.org"
  }
];

export default DOMAIN_CONF;