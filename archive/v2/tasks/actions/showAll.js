import path from "path";
import endPointsJs from "@keshavsoft/kschema-api-check";

import { locateSource } from "./GetMethods/ShowAll/steps/locateSource.js";
import { locateDestination } from "./GetMethods/ShowAll/steps/locateDestination.js";
import { createFolder } from "../core/createFolder.js";

import createHttpFile from "./GetMethods/ShowAll/steps/createHttpFile.js";

import { announce } from "./GetMethods/ShowAll/steps/announce.js";

import resolveFolderName from "./GetMethods/ShowAll/steps/resolveFolderName.js";

export default async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true }) => {
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