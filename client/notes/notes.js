window.onload = function() {
    const content = document.querySelector("#content");

    if(typeof(Storage) !== "undifined") {
        //load
        content.innerHTML = localStorage.getItem("content");

        //save
        setInterval(function() {
            localStorage.setItem("content", content.innerHTML);
        }, 100);
    } else {
        alert("Your browser does not support web storage, your notes will not be saved.");
    }
}