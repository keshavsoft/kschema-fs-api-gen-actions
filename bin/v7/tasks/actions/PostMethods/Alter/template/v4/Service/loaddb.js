import { JSONFilePreset } from "lowdb/node";

const LoadDbFunc = async ({ inTablePath }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    return db;
};

export default LoadDbFunc;