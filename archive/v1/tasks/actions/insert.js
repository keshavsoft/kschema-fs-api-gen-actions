import path from "path";
import endPointsJs from "@keshavsoft/kschema-api-check";

import { locateSource } from "./PostMethods/Insert/steps/locateSource.js";
import { locateDestination } from "./PostMethods/Insert/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import updateEndPointsJs from "./PostMethods/Insert/steps/updateEndPointsJs.js";
import createHttpFile from "./PostMethods/Insert/steps/createHttpFile.js";

import { announce } from "./PostMethods/Insert/steps/announce.js";

import resolveFolderName from "./PostMethods/Insert/steps/resolveFolderName.js";

export default ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true }) => {
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
        endPointsJs({
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