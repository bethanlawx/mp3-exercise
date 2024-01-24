const processMp3File = (data: Buffer) => {
    let numFrames = 0;
    let offset = 0;
    let startOfHeader = findIndexFirstHeader(data);
    const firstFrameHeader = data.subarray(startOfHeader, startOfHeader+4);
    console.log(firstFrameHeader.toString('hex'));

    while (startOfHeader <= data.length) { //TODO: change to something nicer
        try {
            const lastByte = data[startOfHeader+3];
            if (data.subarray(startOfHeader, startOfHeader + 2).equals(firstFrameHeader.subarray(0, 2))
             && getLastBits(lastByte) == getLastBits(firstFrameHeader[3])
             && getLastBits(data[startOfHeader+2]) == getLastBits(firstFrameHeader[2])) { //TODO: simplify long if statement
                numFrames++;
            }
        } catch (err) {
            console.log(err);
        }
        startOfHeader++;
    }
    return numFrames;
}

function getLastBits(hexNumber: number): string {
    const binaryString = (hexNumber & 0b11111111).toString(2).padStart(8, '0');
    return binaryString.substring(5);
}

const findIndexFirstHeader = (data: Buffer) => {
    return data.indexOf(255);
}

export default processMp3File;