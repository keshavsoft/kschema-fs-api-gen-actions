import path from "path";
import endPointsJs from "@keshavsoft/kschema-api-check";

import { locateSource } from "./PostMethods/Alter/steps/locateSource.js";
import { locateDestination } from "./PostMethods/Alter/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import updateEndPointsJs from "./PostMethods/Alter/steps/updateEndPointsJs.js";
import createHttpFile from "./PostMethods/Alter/steps/createHttpFile.js";

import { announce } from "./PostMethods/Alter/steps/announce.js";

import resolveFolderName from "./PostMethods/Alter/steps/resolveFolderName.js";

const startFunc = async ({ cmd = "", toPath, isAnnounce = true,
    checkBeforeCreate = true, showLog = false }) => {

    // console.log("-------- : ", showLog);

    const localToPath = toPath;

    const resolvedFolderName = resolveFolderName({
        name: cmd
    });

    if (resolvedFolderName.KTF === false) {
        console.log(resolvedFolderName.KReason);

        return;
    };

    const source = locateSource();
    const destination = locateDestination({
        inResolvedFolderName: resolvedFolderName,
        toPath: localToPath
    });

    const createFolderResponse = createFolder({
        source, destination,
        isAnnounce, checkBeforeCreate
    });

    if (createFolderResponse.KTF) {
        const fromEndPointsJs = await endPointsJs({
            toPath: localToPath,
            action: resolvedFolderName
        });

        if (showLog) console.log("fromEndPointsJs : ", fromEndPointsJs);

        createHttpFile({
            inTargetPath: path.join(localToPath, resolvedFolderName),
            toPath: process.cwd()
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;