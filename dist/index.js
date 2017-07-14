"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var joi = require("joi");
var generateJoiScheme = function (rootKeys, options) {
    var schema = lodash_1.reduce(rootKeys, function (prevKey, currKey) {
        var optionKeys = Object.keys(options[currKey].options);
        var joiScheme = lodash_1.reduce(optionKeys, function (prevVal, optionKey) {
            var optionValue = options[currKey].options[optionKey];
            var optionGotArgs = !lodash_1.isBoolean(optionValue);
            var optionEnabled = optionValue === true;
            if (optionGotArgs) {
                return prevVal[optionKey](optionValue);
            }
            else if (optionEnabled) {
                return prevVal[optionKey]();
            }
            return prevVal;
        }, joi[options[currKey].type]());
        return __assign({}, prevKey, (_a = {}, _a[currKey] = joiScheme, _a));
        var _a;
    }, {});
    return schema;
};
function validator(options) {
    var rootKeys = Object.keys(options);
    var schema = generateJoiScheme(rootKeys, options);
    return function (ctx, next) {
        if (lodash_1.isNil(ctx && ctx.request)) {
            throw new Error('Request cannot be empty.');
        }
        var result = joi.validate(ctx.request.body, schema);
        if (!result.error) {
            return next();
        }
        ctx.body = result.error;
    };
}
exports.validator = validator;
