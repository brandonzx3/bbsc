let notes = [];
let tmpl_note_entry = null;
let selected_note = null;
let need_save = 0;

window.onload = function() {
    //Pry out tempaltes
    tmpl_note_entry = document.querySelector("#notes_list template").content.children[0].cloneNode(true);

    //Add event listeners
    document.querySelector("#new_note").addEventListener("click", new_note);
    document.querySelector("#save_note").addEventListener("click", save_note);
    document.querySelector("#delete_note").addEventListener("click", delete_note);
    document.querySelector("#noteContent").addEventListener("keyup", () => { need_save++; });

    //Ctrl+S Keyboard Shortcut
    window.addEventListener("keydown", saveShortcut);

    //Load from local storage
    notes = JSON.parse(localStorage.getItem("notes"));
    if (notes === null || notes === undefined) notes = [];
    
    render();
};

function new_note() {
    if (need_save > 0 && selected_note !== null) if (confirm("Save current note?")) save_note();
    selected_note = notes.push({name: `Note ${notes.length + 1}`, id: (new Date()).valueOf()}) - 1;
    render();
}

function save_note() {
    if (selected_note === null) return;
    const note = notes[selected_note];
    note.name = document.querySelector("#note_name").value;
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("note" + note.id, document.querySelector("#noteContent").innerHTML);
    need_save = 0;
    render();
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
    const note_content = document.querySelector("#noteContent");
    if (selected_note === null) {
      note_name.disabled = true;
      note_content.contentEditable = false;
      note_name.value = "";
    } else {
      note_name.disabled = false;
      note_content.contentEditable = true;
      note_name.value = notes[selected_note].name;
    }

    
    if (selected_note === null) note_content.innerHTML = "";
    else {
      const content = localStorage.getItem("note" + notes[selected_note].id);
      if (content !== null && content !== undefined) note_content.innerHTML = content;
      else note_content.innerHTML = "";
    }
}

function saveShortcut (keyEvent) {
    let key = keyEvent.key;
    if (keyEvent.ctrlKey == true) {
        if (key == 's') {
            keyEvent.preventDefault();
            save_note();
            need_save = -2;
            return false;
        }
    }
}

function select_note() {
  if (need_save > 0 && selected_note !== null) if (confirm("Save current note?")) save_note();
  need_save = 0;
  selected_note = this.ref;
  render();
}

function delete_note() {
  if (selected_note === null) return;
  let note = notes[selected_note];
  notes.splice(selected_note, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.removeItem("note" + note.id);
  selected_note = selected_note === 0 ? null : selected_note - 1;
  render();
}
