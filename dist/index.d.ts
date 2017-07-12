export interface OptionsModel {
    [key: string]: {
        type: 'number' | 'array' | 'string';
        options: {
            [key: string]: any;
        };
    };
}
export declare function validator(options: OptionsModel): any;
