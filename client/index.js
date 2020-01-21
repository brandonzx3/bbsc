const tabs = document.querySelector("#tabs");
const iframes = document.querySelector("#iframes");
const max_tab = tabs.children.length - 1;

//Create iframes from tabs
for (let i = 0; i <= max_tab; i++) {
    const tab = tabs.children[i];

    const iframe = document.createElement("iframe");
    iframe.src = tab.getAttribute("bind");
    iframe.setAttribute("style",`transform:translateX(${i}00%)`);
    iframes.appendChild(iframe);

    tab.addEventListener("click", function() {
        selected_tab = i;
        render();
    });  
}

let selected_tab = 0;

function render() {
    const prev_selected = tabs.querySelector(".selected");
    if (prev_selected !== null) prev_selected.classList.remove("selected");
    tabs.children[selected_tab].classList.add("selected");

    iframes.style.transform = `translateX(-${selected_tab}00%)`;
}
render();

