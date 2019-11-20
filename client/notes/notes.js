window.onload = function() {
  let saveNote = document.querySelector("#saveNote");
  let loadNote = document.querySelector("#loadNote");
  let storageCapability;
  let noteName;
  const content = document.querySelector("#content")

  if (typeof Storage !== "undefined") {
    //load
    storageCapability = true;
    content.innerHTML = localStorage.getItem("content");
  }

saveNote.onclick = function () {
  noteName = document.getElementById("noteName").value;
  localStorage.setItem(noteName, content.innerHTML);
  alert("Note Saved As " + noteName);
}

loadNote.onclick = function () {
  noteName = document.getElementById("noteName").value;
  if (storageCapability == true) {
    content.innerHTML = localStorage.getItem(noteName)
  } else {
    alert("Error: Unable to access note")
  };
}

    //save
/*    setInterval(function() {
      localStorage.setItem("content", content.innerHTML);
    }, 100);
  } else {
    alert(
      "Your browser does not support web storage, your notes will not be saved."
    );
  } */
};

