import { JSONFilePreset } from 'lowdb/node'

const startFunc = async ({ inTablePath, inRequestBody }) => {
    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    return await db.data;
};

export default startFunc;
