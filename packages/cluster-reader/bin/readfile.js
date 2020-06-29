#!/usr/bin/env node

import fs from "fs";
import * as aliceo2 from "../src/aliceo2.js";
import * as mch from "../src/mch.js";
import { strict as assert } from "assert"
import yargs from "yargs";

export const getDigitVectorSize = (chunk) => {
    if (!chunk) return 0
    const ndigits = chunk.readUInt32LE(0)
    return [ ndigits*mch.DIGIT_SIZE, ndigits ]
}

const defaultDigitHandler = (digit) => {
    console.log(digit)
};

export const digitVectorFitInBuffer = (buffer) => {
    if (!buffer) return false;
    const vectorSize = getDigitVectorSize(buffer)[0]
    if (vectorSize<=0) return false;
    return vectorSize <= buffer.length;
}

const readBinaryDigits = (filename,digitHandler=defaultDigitHandler) => {
    return new Promise((resolve,reject) => {

        const stream = fs.createReadStream(filename,
            {
                highWaterMark: 64*1024
            });

        const digitBuffer = { buffer:null }

        stream.on("data", chunk => onData(stream,chunk,digitBuffer,digitHandler))
        stream.on("end",resolve)
        stream.on("error",reject)

    })
}

const onData = (stream,chunk,digitBuffer,digitHandler) => {

    if (digitBuffer.buffer) {
        digitBuffer.buffer = Buffer.concat([digitBuffer.buffer,chunk])
    } else {
        digitBuffer.buffer=chunk
    }

    if ( digitVectorFitInBuffer(digitBuffer.buffer) ) {
        const bytesUsed = decodeDigitBuffer(digitBuffer.buffer,digitHandler)
        const remaining = digitBuffer.buffer.length - bytesUsed
        assert(remaining>=0, `remaining should be >=0 but is ${remaining}`)
        if ( remaining > 0 ) {
            const r = Buffer.from(digitBuffer.buffer.slice(bytesUsed))
            assert(r.length===remaining)
            digitBuffer.buffer=null
            stream.unshift(r);
        }
    }
}

const decodeDigitBuffer = (buffer,digitHandler) => {
    let pos = 0
    for(;;) {
        if (pos >= buffer.length) {
            break
        }
        const vectorSize = getDigitVectorSize(buffer.slice(pos))[0]
        if (pos+vectorSize>buffer.length) {
            break;
        }
        pos+=4
        mch.readDigitBuffer(buffer.slice(pos,pos+vectorSize),digitHandler)
        pos += vectorSize;
    }
    return pos
}

const readDPLDigits = filename => {
    const readOptions = {
        highWaterMark: 640 * 1024
    };
    const readable = fs.createReadStream(filename, readOptions);

    let maxsize = 0;
    let bytesRead = 0;
    readable.on("data", chunk => {
        let posInChunk = 0
        bytesRead += chunk.length;
        const h = aliceo2.getHeader(chunk.slice(posInChunk))
        posInChunk += h.headerSize
        console.log("h=", h);
        const h2 = aliceo2.getHeader(chunk.slice(posInChunk))
        console.log("h2=", h2);
        posInChunk += h2.headerSize
        console.log("posInChunk=", posInChunk);
        const h3 = aliceo2.getHeader(chunk.slice(posInChunk))
        if (h3 !== null) {
            throw "got unexpected header";
        }
        console.log("h3=", h3);
        // here should limit the chunk slice to the size of the o2 message
        mch.readDigitBuffer(chunk.slice(posInChunk), digit => {
            console.log(digit);
        });
        if (bytesRead > maxsize) {
            process.exit(1);
        }
    });

    readable.on("end", () => {
        console.log("this is the end my friend");
    });
};

const readDigits = (filename) => {
    let ndigits = 0

    readBinaryDigits(filename,() => {
        ndigits++;
        if (ndigits%10000===0) {
            console.log("ndigits=",ndigits)
        }

    }).then(() => {
        console.log("total digits",ndigits)})
}

yargs.command('digits <digitfile> [dpl]', 'read digit file',
    (yargs)=> {
        yargs.positional('digitfile',{
            describe: "binary digit file to read from",
            type: 'string'
        }).positional('dpl',{
            describe: "whether the input digit file is in DPL format, i.e. consisting of O2 messages",
            type: 'boolean',
            default: false
        })
    },
    (argv) => {
        if (argv.dpl) {
            readDPLDigits(argv.digitfile)
        } else {
            readDigits(argv.digitfile)
        }
    })
    .help()
    .argv
