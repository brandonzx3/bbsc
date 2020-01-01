window.onload = function() {
  let saveNote = document.querySelector("#saveNote");
  let loadNote = document.querySelector("#loadNote");
  let noteName = document.querySelector("#noteName");
  let clear = document.querySelector("#clear");
  let noteList;
  const content = document.querySelector("#content");
  var regex = /^\s*$/;

  /*if (localStorage.getItem(noteList.length) == null || undefined) {
    console.log("No Notes Have Been Previously Saved");
    noteList = [];
  } else {
    noteList = localStorage.getItem(noteList);
  }*/

  if (typeof Storage !== "undefined") {
  } else {
    alert(
      "Warning: Your browser does not support local storage, your progress will not be saved"
    );
  }

  newNote.onclick = function() {
    content.innerHTML = "";
    document.getElementById("noteName").value = "";
  };

  saveNote.onclick = function() {
    console.log("re")
    noteName = document.getElementById("noteName").value;
    if (!regex.test(noteName)) {
      localStorage.setItem(noteName, content.innerHTML);
      updateLocalStorageNoteList(noteName);
      alert("Note Saved As " + noteName);
      noteListUpdate();
    } else {
      alert("Please enter a valid note name to save to");
    }
    noteListUpdate(noteName);
  };

  loadNote.onclick = function() {
    noteName = document.getElementById("noteName").value;
    if (!regex.test(noteName)) {
      content.innerHTML = localStorage.getItem(noteName);
    } else {
      alert("Please enter a valid note name to load from");
    }
  };

  clear.onclick = function() {
    if (confirm("Are you sure you want to delete your notes?")) {
      localStorage.clear();
    }
  };

  let noteListUpdate = function(noteName) {
    for (i = 0; i < noteListLength; i++) {
      if (noteList == undefined || null) {
        
      } else if (noteList[i] == undefined || null) {
        delete noteList [i];
      } else if (noteList[i] == string) {

      } else {

      }
    let noteListLength = noteList.length;
    noteList.push(noteName);
    };
  }
};