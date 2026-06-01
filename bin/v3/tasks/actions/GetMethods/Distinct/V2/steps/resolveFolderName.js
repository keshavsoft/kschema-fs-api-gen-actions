import fs from "fs";

export default function resolveFolderName({ name }) {
    const defaultFolerName = "ShowAll";

    // case 1: force new → timestamp
    if (name === null) {
        name = defaultFolerName;
    };

    // case 2: user provided → strict
    if (fs.existsSync(name)) {
        return {
            KTF: false,
            KReason: `Folder already exists : ${name}`
        };
    };

    return name;
};