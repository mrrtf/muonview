const removeZero = (str) => {
    return str.replace(/\0/g, '')
}

const getBaseHeader = (buffer) => {
    return {
        magicString: removeZero(buffer.slice(0,4).toString('utf8')),
        headerSize: buffer.readUInt32LE(4),
        hasNextHeader: buffer.readUInt32LE(8)===1,
        headerVersion: buffer.readUInt32LE(12),
        description:   removeZero(buffer.slice(16,24).toString('utf8')),
        serialization: removeZero(buffer.slice(24,32).toString('utf8'))
    }

}

const getDataHeader = (buffer) => {
    return {
        dataDescription: removeZero(buffer.slice(0,16).toString('utf8')),
        dataOrigin: removeZero(buffer.slice(16,20).toString('utf8')),
        splitPayloadParts: buffer.readUInt32LE(10),
        payloadSerializationMethod: removeZero(buffer.slice(24,32).toString('utf8')),
        subSpecification: buffer.readUInt32LE(32),
        spitPayloadIndex: buffer.readUInt32LE(36),
        payloadSize:buffer.readBigUInt64LE(40),
        firstTForbit: buffer.readUInt32LE(48)
    }
}

const getFlowHeader = (buffer) => {
    return {
        startTime: buffer.readBigUInt64LE(0),
        duration: buffer.readBigUInt64LE(8),
        creation: buffer.readBigUInt64LE(16)
    }
}

export const isHeader = (buffer) => {
    return buffer.slice(0,4).toString('utf8')==='O2O2'
}

export const getHeader = (buffer) => {
    if (!isHeader(buffer)) {
        return null
    }
    const baseHeaderSize = 32 // bytes
    const baseHeader = getBaseHeader(buffer)
    let extraHeader = {}
    switch (baseHeader.description) {
        case 'DataHead':
            extraHeader = getDataHeader(buffer.slice(baseHeaderSize))
            break
        case 'DataFlow':
            extraHeader = getFlowHeader(buffer.slice(baseHeaderSize))
            break
        default:
            throw "do not know how to deal with header of type " + baseHeader.description
    }

    return { ...baseHeader, ...extraHeader }
}

