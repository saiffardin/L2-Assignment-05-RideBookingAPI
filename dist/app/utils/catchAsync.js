"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (asyncCB) => {
    return async (req, res, next) => {
        try {
            await asyncCB(req, res, next);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    };
};
exports.catchAsync = catchAsync;
