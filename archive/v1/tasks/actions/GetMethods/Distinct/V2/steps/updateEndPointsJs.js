import updateImports from "./UpdateRoutesJs/updateImports/index.js";
import updateAppUse from "./UpdateRoutesJs/updateUse/index.js";

const funcName = "getFunc";

export default ({ appJsPath, endpoint }) => {
    updateImports({
        appJsPath, endpoint,
        inFuncName: funcName
    });

    updateAppUse({
        appJsPath, endpoint,
        inFuncName: funcName
    });
};