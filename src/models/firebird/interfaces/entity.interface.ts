export interface Attribute {
  name: string;
  lname: string;
  type: any;
}

export interface Entity {
  name: string;
  lname: string;
  attributes?: Attribute[];
}
