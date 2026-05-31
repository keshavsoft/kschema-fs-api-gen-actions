import fs from "fs";
import path from "path";

const createHttpFile = ({ inTargetPath, toPath }) => {
    const relative = inTargetPath.replace(toPath, "").replace(/\\/g, "/");

    const content = `GET http://localhost:3000${relative}`;

    fs.writeFileSync(path.join(inTargetPath, "rest.http"), content);
};

export default createHttpFile;