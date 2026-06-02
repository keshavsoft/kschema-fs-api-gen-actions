import service from "./Service/index.js";

import {
    ValidationError,
    NotFoundError,
    ConflictError,
    StorageError
} from "./errors.js";

const postFunc = async ({ req, res, inTablePath }) => {
    try {
        const inRequestBody = req.body;
        const inRequestPk = req.params.pk;

        const fromService = await service({
            inRequestBody,
            inTablePath,
            inRequestPk
        });

        res.type("text/plain").send(fromService);
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).send(err.message);
        };

        if (err instanceof NotFoundError) {
            return res.status(404).send(err.message);
        };

        if (err instanceof ConflictError) {
            return res.status(409).send(err.message);
        };

        if (err instanceof StorageError) {
            return res.status(500).send("Failed to persist data");
        };

        console.error(err);

        return res.status(500).send("Unexpected error");
    };
};

export default postFunc;