/* 'yargs' options */
const yargs = require("yargs");
const title = {
    describe: "Title of the note",
    demand: true,
    alias: "t"
};
const body = {
    describe: "The main body of the note",
    demand: true,
    alias: "b"
};
const argv = yargs
    .command("add", "Add a new note", {
        title,
        body
    })
    .command("read", "Read a specific note", {
        title
    })
    .command("read_last", "Read the last note entered")
    .command("delete", "Remove a specific note", {
        title
    })
    .command("list", "List all notes")
    .command("delete_all", "Remove all notes")
    .help().argv;

module.exports = {
    argv
};
