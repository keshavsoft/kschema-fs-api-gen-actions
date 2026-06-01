import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async (cmd) => {
    const module = await import(`./bin/${getLatestVersion()}/commands/loadCommand.js`);

    return module.default(cmd); // Returns a function
};

const showAll = async ({ toPath }) => {
    const commandToSend = "ShowAll";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath,
        cmd: commandToSend
    });
};

const insert = async (...args) => {
    const commandToSend = "Insert";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        ...args,
        cmd: commandToSend,
        toPath: process.cwd()
    });
};

const distinct = async (...args) => {
    const commandToSend = "Distinct";

    const commandFunction = await load(commandToSend);

    await commandFunction({
        cmd: commandToSend,
        toPath: process.cwd()
    });
};

const alter = async (args) => {
    const commandToSend = "Alter";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        ...args,
        cmd: commandToSend,
        toPath: process.cwd()
    });
};

export {
    showAll, insert, distinct, alter
};