window.onload = function() {
  let saveNote = document.querySelector("#saveNote");
  let loadNote = document.querySelector("#loadNote");
  let notwName = document.querySelector("#noteName");
  let clear = document.querySelector("#clear");
  let storageCapability;
  let noteName;
  const content = document.querySelector("#content");

  var regex = /^\s*$/ ;

  if (typeof Storage !== "undefined") {
    //load
    storageCapability = true;
    content.innerHTML = localStorage.getItem("content");
  } else {
    alert("your browser does not support local storage, your progress will not be saved")
  }

saveNote.onclick = function () {
  noteName = document.getElementById("noteName").value;
  if(!regex.test(noteName)) {
    localStorage.setItem(noteName, content.innerHTML);
    alert("Note Saved As " + noteName);
  } else {
    alert("enter a name");
  }
};

loadNote.onclick = function () {
  noteName = document.getElementById("noteName").value;
  if(!regex.test(noteName)) {
    content.innerHTML = localStorage.getItem(noteName);
  } else {
    alert("enter a name");
  }
};

clear.onclick = function() {
    if(confirm("are you shure you want to do this")) {
        localStorage.clear();
    }
}

newNote.onclick = function() {
    content.innerHTML = "";
    document.getElementById("noteName").value = "";
    
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

