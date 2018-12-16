/*
 * Command Line application to interact with my
 * notes module and notes JSON database
 */
const os = require("os");
/* Local Packages */
const argv = require("./components/options").argv;
const notes = require("./components/notes");
const user = os.userInfo();
let command = argv._[0];

if (command === "add") {
    try {
        notes.printNotes(notes.addNote(argv.title, argv.body));
    } catch (e) {
        console.log("Error: " + e);
    }
} else if (command === "list") {
    let allNotes = notes.getAllNotes();
    notes.printNotes(allNotes);
} else if (command === "delete_notes") {
    let emptyNotes = notes.deleteAllNotes();
    if (emptyNotes.length) {
        console.log("Failed deleting all notes");
    } else {
        console.log("Deleted all notes");
    }
} else if (command === "delete") {
    const removedNote = notes.deleteNote(argv.title);
    notes.printNotes(removedNote || `No note found with title ${argv.title}`);
} else if (command === "read") {
    let note = notes.getNote(argv.title);
    notes.printNotes(note || `No note found with title ${argv.title}`);
} else if (command === "read_last") {
    notes.printNotes(notes.getLastNote());
} else {
    console.log(`${user.username}, your either gave an invalid no options at all`);
}
