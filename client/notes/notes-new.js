window.onload = function () {
  var regex = /^\s*$/;
  let saveNote = document.querySelector("#saveNote");
  let loadNote = document.querySelector("#loadNote");
  let newNote = document.querySelector("#newNote");
  let noteInput = document.querySelector("#noteInput");
  let deleteNote = document.querySelector("#deleteNote");
  const noteContent = document.querySelector("#content");
  let noteName = document.getElementById('noteName').value = "";
  let currentNoteSaved = {name:""}

  if (typeof Storage !== undefined) {
  } else {
    alert("Warning: Your Browser Does Not Support Local Storage. Your Notes Will Not Be Saved.");
  }

//Save Functionality
  saveNote = function () {
    if (!regex.test(noteName)) {
      localStorage.setItem(noteContent, content);
      alert('Your Current Note Has Been Saved As' + noteName);
    } else {

    }
  }
//Load Functionality
  loadNote = function () {

  }
//Note Input Functionality
  noteInput = function () {

  }
//Delete Note Functionality
  deleteNote = function () {

  }
//New Note Functionality
  newNote = function () {
    content.innerHTML = "";
    document.getElementById("noteName").value = "";
  }

}