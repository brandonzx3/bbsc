let notes = [];
let tmpl_note_entry = null;
let selected_note = null;

window.onload = function() {
    //Pry out tempaltes
    tmpl_note_entry = document.querySelector("#notes_list template").content.children[0].cloneNode(true);

    //Add event listeners
    document.querySelector("#new_note").addEventListener("click", new_note);

    //Ctrl+S Keyboard Shortcut
    window.addEventListener("keydown", saveShortcut);

    //Load from local storage
    
    
    render();
};

function new_note() {
    save_note();
    selected_note = notes.push({name: `Note ${notes.length + 1}`, id: (new Date()).valueOf()}) - 1;
    render();
}

function save_note() {
    if (selected_note === null) return;
    const note = notes[selected_note];
    note.name = document.querySelector("#note_name").value;
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("note" + note.id, document.querySelector("#noteContent").innerHTML);
}

function render() {
    const notes_list = document.querySelector("#notes_list");
    notes_list.innerHTML = "";
    notes.forEach((note, i) => {
        const my_note = tmpl_note_entry.cloneNode(true);
        my_note.innerText = note.name;
        my_note.ref = i;
        if (selected_note === i) my_note.classList.add("selected");
        my_note.addEventListener("click", select_note);
        notes_list.appendChild(my_note);
    });
    
    const note_name = document.querySelector("#note_name");
    if (selected_note === null) {
      note_name.disabled = true;
      note_name.value = "";
    } else {
      note_name.disabled = false;
      note_name.value = notes[selected_note].name;
    }

    const note_content = document.querySelector("#noteContent");
    if (selected_note === null) note_content.innerHTML = "";
    else {
      const content = localStorage.getItem("note" + selected_note.id);
      if (content !== null && content !== undefined) note_content.innerHTML = content;
    }
}

function saveShortcut (keyEvent) {
    let key = keyEvent.key;
    if (keyEvent.ctrlKey == true) {
        if (key == 's') {
            keyEvent.preventDefault();
            save_note();
            return false;
        }
    }
}

function select_note() {
  save_note();
  selected_note = this.ref;
  render();
}