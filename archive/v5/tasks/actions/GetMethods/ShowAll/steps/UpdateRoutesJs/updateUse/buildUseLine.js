const appOrRouter = "router";

const buildUseLine = ({ inEndpoint, inFuncName }) => {
    return `${appOrRouter}.get('/${inEndpoint}', (req, res) => ${inFuncName}({ res, inTableName : tableName}));`;

    // return `${appOrRouter}.use("/${inEndpoint}", ${inFuncName});`;
};

export default buildUseLine;