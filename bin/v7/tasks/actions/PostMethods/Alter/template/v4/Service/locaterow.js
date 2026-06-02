const LocateRowFunc = ({ inData, inRequestPk }) => {
    return inData.findIndex(element => {
        return element.pk === Number(inRequestPk);
    });
};

export default LocateRowFunc;