import LoadDbFunc from "./loaddb.js";
import ValidateRequestFunc from "./validaterequest.js";
import LocateRowFunc from "./locaterow.js";
import MergeRowFunc from "./mergerow.js";

import {
    ValidationError,
    NotFoundError
} from "../errors.js";

const startFunc = async ({ inTablePath, inRequestBody, inRequestPk }) => {
    const db = await LoadDbFunc({ inTablePath });

    const validation = ValidateRequestFunc({ inRequestBody });

    if (!validation.KTF) {
        throw new ValidationError(validation.KReason);
    };

    const rowIndex = LocateRowFunc({
        inData: db.data,
        inRequestPk
    });

    if (rowIndex === -1) {
        throw new NotFoundError("Pk not found");
    };

    MergeRowFunc({
        inData: db.data,
        inRowIndex: rowIndex,
        inRequestBody
    });

    await db.write();

    return "Updated successfully";
};

export default startFunc;