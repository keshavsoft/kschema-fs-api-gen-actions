import path from "path";
import apiCheck from "@keshavsoft/kschema-api-check";

import { locateSource } from "./PostMethods/FilterColumns/steps/locateSource.js";
import { locateDestination } from "./PostMethods/FilterColumns/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import updateEndPointsJs from "./PostMethods/FilterColumns/steps/updateEndPointsJs.js";
import createHttpFile from "./PostMethods/FilterColumns/steps/createHttpFile.js";

import { announce } from "./PostMethods/FilterColumns/steps/announce.js";

import resolveFolderName from "./PostMethods/FilterColumns/steps/resolveFolderName.js";

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true }) => {
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
        await apiCheck({
            toPath: localToPath,
            action: resolvedFolderName
        });

        createHttpFile({
            inTargetPath: path.join(localToPath, resolvedFolderName),
            toPath: process.cwd()
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;