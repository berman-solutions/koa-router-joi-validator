export interface ptionsModel {
  [key: string]: {
    type: string;
    options: {
      [key: string]: any;
    };
  };
}
export declare function validator(options: OptionsModel): any
