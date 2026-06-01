import serviceFunc from "./service.js";
import { ConflictError, StorageError } from "./errors.js";

const startFunc = async ({ req, res, inTablePath }) => {
    try {
        const fromService = await serviceFunc({ inTablePath });

        if (!fromService) {
            return res.status(400).send("Validation failed");
        };

        res.type("text/plain").send(fromService);
    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export default startFunc;