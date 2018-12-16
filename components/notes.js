/* Add, read, list, remove notes */
const fs = require("fs");
const notesFile = "./db/notes.json";
const defaultList = {
    order: "asc",
    limit: false
};

const sortByDateAsc = (a, b) => {
    return new Date(a.date) - new Date(b.date);
};

const sortByDateDesc = (a, b) => {
    return new Date(b.date) - new Date(a.date);
};

const getAllNotes = (param = defaultList) => {
    let notes = [];
    var notesJson;
    try {
        notesJson = fs.readFileSync(notesFile);
    } catch (e) {
        console.log("No saved notes");
    }
    if (notesJson && notesJson.length) {
        notes = JSON.parse(notesJson);
    }
    if (param.order === "asc") {
        return notes.sort(sortByDateAsc);
    }
    return notes.sort(sortByDateDesc);
};

const getNoteIdx = title => {
    return getAllNotes().findIndex(note => {
        return note.title.toLowerCase() === title.toLowerCase();
    });
};

const getNote = title => {
    let idx = getNoteIdx(title);
    let allNotes = getAllNotes();
    return allNotes[idx];
};

const getLastNote = () => {
    let allNotes = getAllNotes({
        order: "desc"
    });
    return allNotes[0];
};

const deleteNote = title => {
    let foundIdx = getNoteIdx(title);
    let removedNote = false;
    if (foundIdx !== -1) {
        let allNotes = getAllNotes();
        removedNote = allNotes.splice(foundIdx, 1);
        saveNotes(allNotes);
    }
    return removedNote;
};

const deleteAllNotes = () => {
    saveNotes([]);
    return getAllNotes();
};

const saveNotes = notes => {
    fs.writeFileSync(notesFile, JSON.stringify(notes));
};

const addNote = (title, body) => {
    let notes = getAllNotes();
    let date = Date();
    let note = {
        title,
        date,
        body
    };
    const theSame = notes.find(n => {
        return note.title.toLowerCase() === n.title.toLowerCase();
    });

    if (theSame) {
        throw Error(`Title, '${title}', already exists: ${JSON.stringify(theSame)}`);
    }

    notes.push(note);
    saveNotes(notes);
    return note;
};

const printNotes = (notes = []) => {
    if (Array.isArray(notes)) {
        notes.forEach(note => {
            console.log(`Title: <${note.title}>`);
            console.log("Date : " + note.date);
            console.log("Body : " + note.body);
        });
    } else if (typeof notes === "object") {
        console.log(`Title: <${notes.title}>`);
        console.log("Date : " + notes.date);
        console.log("Body : " + notes.body);
    } else {
        console.log(notes);
    }
};

module.exports = {
    addNote,
    deleteNote,
    deleteAllNotes,
    getAllNotes,
    getNote,
    getLastNote,
    printNotes
};
