import { fromJsonPath } from './service.js';
import { ConflictError, StorageError } from './errors.js';

const distinctFunc = ({ req, res, inTableName }) => {
    try {
        const columnName = req.params.columnName;

        const message = fromJsonPath({
            inTableName,
            inColumnName: columnName
        });

        res.type("application/json").send(message);
    } catch (err) {
        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export default distinctFunc;