import { kschema } from "@keshavsoft/kschema";

const filterItems = ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).query.filterByColumns(inRequestBody);
};

export { filterItems };