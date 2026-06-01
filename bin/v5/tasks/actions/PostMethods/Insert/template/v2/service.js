import fs from "fs";
import Ajv from "ajv";

import { JSONFilePreset } from 'lowdb/node'

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
    type: "object",
    properties: {
        LedgerName: { type: "string" }
    },
    required: ["LedgerName"],
    additionalProperties: true
};

const startFunc = async ({ inRequestBody, inTablePath }) => {
    return await insertData({ inTablePath, inRequestBody });
};

const insertData = async ({ inTablePath, inRequestBody }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    const validate = ajv.compile(schema);
    const valid = validate(inRequestBody)
    // if (!valid) return false;
    if (!valid) {
        console.log(validate.errors);
        return false;
    };

    const maxPk = db.data.reduce((a, b) => Math.max(a, b.pk || 0), 0);
    const newPk = maxPk + 1;

    db.data.push({ ...inRequestBody, pk: newPk });

    await db.write();

    return await newPk;
};

export { startFunc };
