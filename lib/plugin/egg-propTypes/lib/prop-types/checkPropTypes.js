/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @private
 */
function checkPropTypes(typeSpecs, values) {
    for (let typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
            let error = null;

            try {
                if (typeof typeSpecs[ typeSpecName ] !== 'function') {
                    throw new Error(typeSpecName + '字段没有检查方法');
                }
                error = typeSpecs[ typeSpecName ](values, typeSpecName);
            } catch (ex) {
                error = ex;
            }

            if (error !== true) {
                if (error.errMsg) {
                    return error;
                }
                if (error.message) {
                    return { errMsg: error.message };
                }

                return false;
            }
        }
    }
    return true;
}

module.exports = checkPropTypes;
