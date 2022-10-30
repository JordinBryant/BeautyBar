const chai = require('chai');
const assert = chai.assert;
const findError = require('../errorTest/findError');

describe("the findError function", ()=>{
    it("should be defined as a function", ()=>{
        assert.exists(findError, "findError exists");
        assert.isFunction(findError, "findError is a function");
    });
});

// it("should return the correct maximum", ()=>{
//     assert.equal(findError([1,3,2]), 3);
//     assert.equal(findError([-1,-2,-3]), -1);
// })

