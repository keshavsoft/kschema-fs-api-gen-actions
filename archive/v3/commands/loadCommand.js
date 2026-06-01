import actions from "../config/actions.json" with { type: "json" };

export default async function loadCommand(name) {
    const matched = actions.find(x => x.exportFile === name);

    if (!matched) return null;

    const module = await import(`../tasks/actions/${matched.file}.js`);

    return module.default;
};