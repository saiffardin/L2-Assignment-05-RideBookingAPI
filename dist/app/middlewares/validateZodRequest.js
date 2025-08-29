"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateZodRequest = void 0;
const validateZodRequest = (zodSchema) => async (req, res, next) => {
    try {
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateZodRequest = validateZodRequest;
