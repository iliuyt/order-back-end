'use strict';

const assign = require('object-assign');
const moment = require('moment');
const checkPropTypes = require('./checkPropTypes');


module.exports = function () {

    /*eslint-disable no-self-compare*/
    function is(x, y) {
        // SameValue algorithm
        if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        }

        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }

    /**
     * 判断是否为symbol
     * @param propType
     * @param propValue
     * @returns {boolean}
     */
    function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
            return true;
        }

        // // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        // if (propValue[ '@@toStringTag' ] === 'Symbol') {
        //     return true;
        // }

        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
            return true;
        }

        return false;
    }

    // 判断是否为array，object（包含正则）
    function getPropType(propValue) {
        let propType = typeof propValue;

        if (Array.isArray(propValue)) {
            return 'array';
        }
        if (propValue instanceof RegExp) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return 'object';
        }
        if (isSymbol(propType, propValue)) {
            return 'symbol';
        }
        return propType;
    }

    /**
     * 判断是否必须
     * @param validate
     * @returns {any}
     */
    function createChainableTypeChecker(validate) {
        function checkType(isRequired, props, propName) {

            if (!props) {
                let expectedType = validate(props, propName);

                expectedType.isRequired = isRequired;
                return expectedType;
            }

            if (typeof props[ propName ] === 'undefined' || props[ propName ] === null || props[ propName ] === '') {
                if (isRequired) {
                    return { errMsg: propName + '为必填项' };
                }
                return true;
            }
            return validate(props, propName);

        }

        let chainedCheckType = checkType.bind(null, false);

        chainedCheckType.isRequired = checkType.bind(null, true);

        return chainedCheckType;
    }

    /**
     * 基础属性检查
     * @param expectedType
     * @returns {any}
     */
    function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType
                };
            }

            let propValue = props[ propName ];
            let propType = getPropType(propValue);

            if (propType !== expectedType) {
                return { errMsg: propName + '的类型必须为' + expectedType };
            }
            return true;
        }

        return createChainableTypeChecker(validate, expectedType);
    }

    /**
     * 数字类型检查，并检查范围
     * @param expectedValues
     * @returns {any}
     */
    function createNumberOfRangeChecker(min, max) {


        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'numberRange'
                };
            }

            let expectedType = 'number';

            if (min !== null && getPropType(min) !== expectedType) {
                throw new Error('范围类型必须为数字或null');
            }

            if (max !== null && getPropType(max) !== expectedType) {
                throw new Error('范围类型必须为数字或null');
            }

            if (min !== null && max !== null && min >= max) {
                throw new Error('min必须小于max范围');
            }

            let propValue = props[ propName ];
            let propType = getPropType(propValue);

            if (propType !== expectedType) {
                return { errMsg: propName + '的类型必须为' + expectedType };
            }

            if (min !== null && propValue < min) {
                return { errMsg: propName + '必须大于等于' + min };
            }

            if (max !== null && propValue > max) {

                return { errMsg: propName + '必须小于等于' + max };
            }

            return true;
        }

        return createChainableTypeChecker(validate);
    }

    /**
     * 枚举类型检查
     * @param expectedValues
     * @returns {any}
     */
    function createEnumTypeChecker(expectedValues) {
        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'oneOf'
                };
            }

            if (!Array.isArray(expectedValues)) {
                throw new Error('枚举不可为空');
            }

            let propValue = props[ propName ];

            for (let i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[ i ])) {
                    return true;
                }
            }
            return { errMsg: propName + '内容不合法' };
        }

        return createChainableTypeChecker(validate);
    }

    function emptyFunctionThatReturnsNull(props) {
        if (!props) {
            return {
                expectedType: 'any'
            };
        }
        return true;
    }

    function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }


    /**
     * 判断是否为时间格式
     * @returns {any}
     */
    function createTimeTypeChecker() {
        function validate(props, propName) {
            if (!props) {
                return {
                    expectedType: 'date'
                };
            }
            let propValue = props[ propName ];

            let propType = getPropType(propValue);

            if (propType !== 'string') {
                return { errMsg: propName + '的类型必须为时间字符串' };
            }
            try {

                if (!moment(propValue).isValid()) {
                    // 要检查的值必须为数组
                    return { errMsg: propName + '必须为时间格式' };
                }
                return true;
            } catch (e) {
                return { errMsg: propName + '必须为时间格式' };
            }

        }

        return createChainableTypeChecker(validate);
    }


    function createArrayOfTypeChecker(typeChecker) {


        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'arrayOf'
                };
            }

            if (typeof typeChecker !== 'function') {
                throw new Error('参数检查方法不可为空');
            }

            let propValue = props[ propName ];

            if (!Array.isArray(propValue)) {
                // 要检查的值必须为数组
                return { errMsg: propName + '必须为数组' };
            }
            for (let i = 0; i < propValue.length; i++) {
                let result = typeChecker(propValue, i);

                if (result.errMsg) {
                    return { errMsg: propName + '内容不合法,' + result.errMsg };
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {


        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'objectOf'
                };
            }

            if (typeof typeChecker !== 'function') {
                throw new Error('参数检查方法不可为空');
            }

            let propValue = props[ propName ];
            let propType = getPropType(propValue);

            if (propType !== 'object') {
                // 要检查的值必须为对象
                return { errMsg: propName + '必须为对象' };
            }
            for (let key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                    let result = typeChecker(propValue, key);

                    if (result.errMsg) {
                        return { errMsg: propName + '内容不合法,' + result.errMsg };
                    }
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }


    function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'shape'
                };
            }

            let propValue = props[ propName ];
            let propType = getPropType(propValue);

            if (propType !== 'object') {
                // 检查的值必须为对象
                return { errMsg: propName + '必须为对象' };
            }
            for (let key in shapeTypes) {
                let checker = shapeTypes[ key ];

                if (!checker) {
                    continue;
                }

                let result = checker(propValue, key);

                if (result.errMsg) {
                    return { errMsg: propName + '内容不合法,' + result.errMsg };
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }

    function createArrayShapeTypeChecker(shapeTypes) {
        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'arrayShape'
                };
            }

            if (!Array.isArray(props[ propName ])) {
                return { errMsg: propName + '必须为数组' };
            }

            for (let i in props[ propName ]) {
                let propValue = props[ propName ][ i ];
                let propType = getPropType(propValue);

                if (propType !== 'object') {
                    // 要检查的值必须为对象
                    return { errMsg: propName + '的每个项目必须为对象' };
                }
                for (let key in shapeTypes) {
                    let checker = shapeTypes[ key ];

                    if (!checker) {
                        continue;
                    }

                    let result = checker(propValue, key);

                    if (result.errMsg) {
                        return { errMsg: propName + '内容不合法,' + result.errMsg };
                    }
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'shape'
                };
            }

            let propValue = props[ propName ];
            let propType = getPropType(propValue);

            if (propType !== 'object') {
                // 要检查的值必须为对象
                return { errMsg: propName + '必须为对象' };
            }
            // We need to check all keys in case some are required but missing from
            // props.
            let allKeys = assign({}, props[ propName ], shapeTypes);

            for (let key in allKeys) {
                let checker = shapeTypes[ key ];

                if (!checker) {
                    // 有属性未匹配检查
                    return { errMsg: key + '为非法属性' };
                }
                let result = checker(propValue, key);

                if (result.errMsg) {
                    return { errMsg: propName + '内容不合法,' + result.errMsg };
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }


    /**
     * 多个类型检查
     * @param arrayOfTypeCheckers
     * @returns {*}
     */
    function createUnionTypeChecker(arrayOfTypeCheckers) {

        function validate(props, propName) {

            if (!props) {
                return {
                    expectedType: 'oneOfType',
                };
            }

            if (!Array.isArray(arrayOfTypeCheckers)) {
                throw new Error('检查类型必须为数组');
            }

            for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
                let checker = arrayOfTypeCheckers[ i ];

                if (typeof checker !== 'function') {
                    throw new Error('参数检查方法不可为空');
                }
            }


            for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
                let checker = arrayOfTypeCheckers[ i ];
                let result = checker(props, propName);

                if (result.errMsg) {
                    return { errMsg: propName + '内容不合法,' + result.errMsg };
                }
            }
            return true;
        }

        return createChainableTypeChecker(validate);
    }

    let PropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        date: createTimeTypeChecker(),
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        numberRange: createNumberOfRangeChecker,
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        arrayShape: createArrayShapeTypeChecker,
        objectOf: createObjectOfTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
    };

    PropTypes.checkPropTypes = checkPropTypes;
    PropTypes.PropTypes = PropTypes;

    return PropTypes;
};