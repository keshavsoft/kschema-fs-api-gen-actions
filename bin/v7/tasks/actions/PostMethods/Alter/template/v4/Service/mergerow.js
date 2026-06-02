const MergeRowFunc = ({
    inData,
    inRowIndex,
    inRequestBody
}) => {
    inData[inRowIndex] = {
        ...inData[inRowIndex],
        ...inRequestBody
    };
};

export default MergeRowFunc;