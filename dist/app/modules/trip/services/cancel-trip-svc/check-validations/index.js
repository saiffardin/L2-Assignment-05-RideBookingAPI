"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidations = void 0;
const validateCurrentTrip_1 = require("./validateCurrentTrip");
const validateRiderCancellation_1 = require("./validateRiderCancellation");
const validateDriverCancellation_1 = require("./validateDriverCancellation");
const checkValidations = (values) => {
    const { trip, actorId, isReqFromRider, isReqFromDriver } = values;
    (0, validateCurrentTrip_1.validateCurrentTrip)(trip);
    if (isReqFromRider) {
        (0, validateRiderCancellation_1.validateRiderCancellation)(trip, actorId);
    }
    else if (isReqFromDriver) {
        (0, validateDriverCancellation_1.validateDriverCancellation)(trip, actorId);
    }
};
exports.checkValidations = checkValidations;
