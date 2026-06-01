import { kschema } from "@keshavsoft/kschema";

const fromJsonPath = ({ inTableName, inColumnName }) => {
    const tableName = inTableName;

    const array = kschema.table(tableName).query.aggregate.distinct(inColumnName);
    const collection = array.map(str => ({ [inColumnName]: str }));

    return collection;
};

export { fromJsonPath };