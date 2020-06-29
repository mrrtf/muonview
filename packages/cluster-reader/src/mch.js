import { strict as assert } from "assert"

const getDigit = (buffer) => {
    return {
        digitTime:  buffer.readBigUInt64LE(0),
        nofSamples : buffer.readUInt16LE(8),
        deid : buffer.readUInt32LE(12),
        padid : buffer.readUInt32LE(16),
        adc:  buffer.readBigUInt64LE(24)
    }
}

export const DIGIT_SIZE = 32

export const readDigitBuffer = (buffer,digitHandler) => {
    assert.ok(buffer.length%(DIGIT_SIZE)===0,`buffer length (${buffer.length}) should be a multiple of the digit size (${DIGIT_SIZE})`)
    let pos = 0
    let nofDigits = 0
    while ( pos < buffer.length ) {
        const digit = getDigit(buffer.slice(pos))
        pos+=DIGIT_SIZE
        digitHandler && digitHandler(digit)
        ++nofDigits
    }
    return nofDigits
}

