import path from "path";
import endPointsJs from "@keshavsoft/kschema-api-check";

import { locateSource } from "./GetMethods/Distinct/V2/steps/locateSource.js";
import { locateDestination } from "./GetMethods/Distinct/V2/steps/locateDestination.js";
import { createFolder } from "../core/createFolder.js";

import createHttpFile from "./GetMethods/Distinct/V2/steps/createHttpFile.js";

import { announce } from "./GetMethods/Distinct/V2/steps/announce.js";

import resolveFolderName from "./GetMethods/Distinct/V2/steps/resolveFolderName.js";

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
        await endPointsJs({
            toPath: localToPath,
            action: resolvedFolderName
        });

        createHttpFile({
            inTargetPath: path.join(localToPath, resolvedFolderName),
            toPath: process.cwd()
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolveFolderName;
};

export default startFunc