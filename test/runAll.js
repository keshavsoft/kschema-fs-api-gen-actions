// test/runAll.js

import fs from "fs";
import path from "path";

import actions from "../bin/v17/config/actions.json" with { type: "json" };

const run = async () => {
    const summary = [];

    for (const action of actions) {
        try {
            console.log(`\nRunning : ${action.exportFile}`);

            const mod = await import(`../index.js`);

            const func = mod[action.exportFile];

            if (typeof func !== "function") {
                throw new Error("Export not found");
            };

            await func({
                cmd: action.cmd,
                toPath: process.cwd()
            });

            summary.push({
                cmd: action.cmd,
                status: "SUCCESS"
            });

        } catch (err) {
            summary.push({
                cmd: action.cmd,
                status: "FAILED",
                reason: err.message
            });
        };
    };

    console.log("\n========================");
    console.log("TEST SUMMARY");
    console.log("========================");

    console.table(summary);
};

run();