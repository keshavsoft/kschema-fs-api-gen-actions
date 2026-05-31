import { kschema } from "@keshavsoft/kschema";

const startFunc = async ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    const insertedPk = await kschema.table(tableName).mutate.insertGenPk(inRequestBody);

    return await insertedPk;
};

export { startFunc };
