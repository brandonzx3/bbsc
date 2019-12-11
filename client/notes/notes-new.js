window.onload = function () {
  var regex = /^\s*$/;
  const content = document.querySelector("#content")
  let saveNote = document.querySelector("#saveNote");
  let loadNote = document.querySelector("#loadNote");
  let newNote = document.querySelector("#newNote");
  let noteInput = document.querySelector("#noteInput");
  let deleteNote = docuement.querySelector("#deleteNote");

  if (typeof Storage !== undefined) {
  } else {
    alert("Warning: Your Browser Does Not Support Local Storage. Your Notes Will Not Be Saved.");
  }

//Save Functionality
  saveNote = function () {

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