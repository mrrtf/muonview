import * as readfile from "./readfile.js"
import expect from "expect"

describe("digitVectorFitInBuffer",()=>{
    it("digit vector should not fit in empty buffer",()=>{
        expect(readfile.digitVectorFitInBuffer(null)).toBe(false)
    })    
})

describe("getDigitVectorSize",()=> {
    it("should return 0 on empty chunk",()=>{
        expect(readfile.getDigitVectorSize(null)).toBe(0)
    })
}) 
// const getDigitVectorSize = (chunk) => {
//     const ndigits = chunk.readUInt32LE(0)
//     return [ ndigits*mch.DIGIT_SIZE, ndigits ]
// }

// const digitVectorFitInBuffer = (buffer) => {
//     if (!buffer) return false;
//     const vectorSize = getDigitVectorSize(buffer)[0]
//     if (vectorSize<=0) return false;
//     return vectorSize <= buffer.length;
// }
