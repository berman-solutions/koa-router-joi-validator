"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const joi = require("joi");
const generateJoiScheme = (rootKeys, options) => {
    const schema = lodash_1.reduce(rootKeys, (prevKey, currKey) => {
        const optionKeys = Object.keys(options[currKey].options);
        const joiScheme = lodash_1.reduce(optionKeys, (prevVal, optionKey) => {
            const optionValue = options[currKey].options[optionKey];
            const optionGotArgs = !lodash_1.isBoolean(optionValue);
            const optionEnabled = optionValue === true;
            if (optionGotArgs) {
                return prevVal[optionKey](optionValue);
            }
            else if (optionEnabled) {
                return prevVal[optionKey]();
            }
            return prevVal;
        }, joi[options[currKey].type]());
        return Object.assign({}, prevKey, { [currKey]: joiScheme });
    }, {});
    return schema;
};
function validator(options) {
    if (lodash_1.isNil(options)) {
        throw new Error('Schema cannot be empty.');
    }
    const rootKeys = Object.keys(options);
    const schema = generateJoiScheme(rootKeys, options);
    return (ctx, next) => {
        if (lodash_1.isNil(ctx && ctx.request)) {
            throw new Error('Request cannot be empty.');
        }
        const result = joi.validate(ctx.request.body, schema);
        if (!result.error) {
            return next();
        }
        ctx.body = result.error;
    };
}
exports.validator = validator;
