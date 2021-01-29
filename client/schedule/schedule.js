let status = null;
let edit_button = null;
let edit_schedule = null;
let table = null;

let row_index = 1;
const whitespace_regex = /^\s*$/;

//add some admin account shit to this
const summer = false;

const not_here_days = [];

var is_not_here_day = false;

var m = new Date();

const schedule_times = [
    [26100, 28200], //7:15 7:55 : 0
    [28800, 31200], //8:00 8:40 : 1
    [31500, 33900], //8:45 9:25 : 2
    [34200, 36600], //9:30 10:10 : 3
    [36900, 39300], //10:15 10:55 : 4
    [39600, 42000], //11:00 11:40 : 5
    [42300, 44700], //11:45 12:25 : 6
    [45000, 47400], //12:30 1:10 : 7
];

const schedule_times_origional = [
    [24600, 28200], //6:50 7:50
    [28800, 31800], //8:00 8:50
    [32100, 35100], //8:55 9:45
    [35400, 37500], //9:50 10:25
    [37800, 40800], //10:30 11:20
    [41100, 44100], //11:25 12:15
    [44400, 47400], //12:20 1:10
    [47700, 50700], //1:15 2:05
    [51000, 54000] //2:10 3:00
];
const table_start_times_old = ["6:50 AM", "8:00 AM", "8:55 AM", "9:50 AM", "10:30 AM", "11:25 AM", "12:20 PM", "1:15 PM", "2:10 PM"]; //later pull times off of shchedule times and convert back to AM/PM
const table_start_times = ["7:15 AM", "8:00 AM", "8:45 AM", "9:30 AM", "10:15 AM", "11:00 AM", "11:45 AM", "12:30 PM"];
let time_offset = -5;
let schedule_start_time = 1;
let has_0_hour = false;

function get_zero_hour_setting() {
	return localStorage.getItem("0_hour") === "true";
}
function set_zero_hour_setting(has_0_hour) {
	localStorage.setItem("0_hour", has_0_hour ? "true" : "false");
}

window.onload = function() {
    //Fetch elements
    status = document.querySelector("#status");
    edit_button = document.querySelector("#edit_button");
    edit_schedule = document.querySelector("#tab");
    table = document.querySelector("#table");
    zero_hour_toggle = document.querySelector("#hour");

    //Initialize display
    edit_schedule.style.display = "none";
    if(localStorage.getItem("schedule") !== null) {
        table.innerHTML = localStorage.getItem("schedule");
    } else {
        table.innerHTML = '<tbody><tr><th>Class</th><th>Room #</th><th>Start Time</th></tr></tbody>';
    }

    select_row_to_input();
    setInterval(function(){ update_status(); }, 300);
    
    //Add event listeners
    edit_button.onclick = on_edit_button;
    document.querySelector("#table_add").onclick = add_schedule_row;
    document.querySelector("#table_remove").onclick = remove_table_row;
    document.querySelector("#table_edit").onclick = activate_edit_schedule;
    
	has_0_hour = get_zero_hour_setting();
	zero_hour_toggle.checked = has_0_hour;
}

function elapsed_from_seconds(seconds) {
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (hours > 0) return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
    if (minutes > 0) return `${minutes} minutes and ${seconds} seconds`;
    return seconds + " seconds";
}

function update_status() {
    try {
        const date = new Date();
        var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate();
        let ssm = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();
        let day = date.getDay();

        ssm += time_offset;

        for(let i = 0; i < not_here_days.length; i++) {
            dateString === not_here_days[i].toString() ? is_not_here_day = true : is_not_here_day = false;
        }

        if(!summer) {
            if(!is_not_here_day) {
                //before school
                if(ssm < schedule_times[schedule_start_time][0]) status.innerHTML = `Status: School starts in ${elapsed_from_seconds(schedule_times[schedule_start_time][0] - ssm)}`;
        
                for (let i = schedule_start_time; i < schedule_times.length; i++) {
                    //In class
                    if (schedule_times[i][0] <= ssm && ssm < schedule_times[i][1])
                    status.innerHTML = `Status: In class. Class ends in ${elapsed_from_seconds(schedule_times[i][1] - ssm)}`;
                    //Passing period
                    const ip = i + 1;
                    if (ip < schedule_times.length) {
                        if (schedule_times[i][1] <= ssm && ssm < schedule_times[ip][0]) {
                            status.innerHTML = `Status: Heading to Class. Class starts in ${elapsed_from_seconds(schedule_times[ip][0] - ssm)}`;
                        }
                    }
                }
                //after school
                if(ssm > schedule_times[7][1]) status.innerHTML = "Status: after school";

                //weekend
                if(day === 6 || day === 0) {
                    status.innerHTML = "Status: Weekend";
                }
            } else {
                status.innerHTML = "Day off"
            }
        } else {
            status.innerHTML = "Summer Break"
        }

    } catch (err) {
        console.log(err);
        status.innerHTML = `error fetching status: ${err}`;
    }
}

function calculate_start_times() {
    let classes;

    if(has_0_hour) {
        classes = 10;
    } else {
        classes = 9;
    }

    classes -= 1;
    let offset = classes - 1;

    for(var i = 1; i < table.rows.length; i++) {
        if(table.rows.length > classes) {
            table.rows[i + offset].cells[2].innerHTML = "After school";
        } else {
            if(has_0_hour) {
                table.rows[i].cells[2].innerHTML = table_start_times[i - 1].toString();
            } else {
                table.rows[i].cells[2].innerHTML = table_start_times[i].toString();
            }
        }
    }
}

function add_schedule_row() {
    if(!whitespace_regex.test(document.querySelector("#class").value) && !whitespace_regex.test(document.querySelector("#room").value)) {
        add_table_row();
    } else {
        alert("this field cannot be left blank");
    }
}

function activate_edit_schedule() {
    if(!whitespace_regex.test(document.querySelector("#class").value) && !whitespace_regex.test(document.querySelector("#room").value)) {
        edit_table_row();
    } else {
        alert("this field cannot be left blank");
    }
}

function on_edit_button() {
    if(edit_schedule.style.display === "none") {
        edit_schedule.style.display = "inline-block";
        edit_button.innerHTML = "Save Schedule";
    } else {
        edit_schedule.style.display = "none";
        edit_button.innerHTML = "Edit Schedule";
        localStorage.setItem("schedule", table.innerHTML);
        Update_zero_hour();
        calculate_start_times();
    }
};

function Update_zero_hour() {
    has_0_hour = zero_hour_toggle.checked;
	set_zero_hour_setting(has_0_hour);
}

function add_table_row() {
    var new_row = table.insertRow(table.length),
    cell1 = new_row.insertCell(0),
    cell2 = new_row.insertCell(1),
    schedule_class = document.querySelector("#class").value,
    schedule_room = document.querySelector("#room").value;
    new_row.insertCell(2);
    document.getElementById("class").value = "";
    document.getElementById("room").value = "";

    cell1.innerHTML = schedule_class;
    cell2.innerHTML = schedule_room;

    select_row_to_input();
    Update_zero_hour();
    calculate_start_times();
}

function select_row_to_input() {
    for(var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {
            //get the seected row index
            row_index = this.rowIndex;
            document.getElementById("class").value = this.cells[0].innerHTML;
            document.getElementById("room").value = this.cells[1].innerHTML;
        }
    }
}

function edit_table_row() {
    var schedule_class = document.getElementById("class").value,
    schedule_room = document.getElementById("room").value;
    table.rows[row_index].cells[0].innerHTML = schedule_class;
    table.rows[row_index].cells[1].innerHTML = schedule_room;
    document.getElementById("class").value = "";
    document.getElementById("room").value = "";
    Update_zero_hour();
}

function remove_table_row() {
    table.deleteRow(row_index);
    document.getElementById("class").value = "";
    document.getElementById("room").value = "";
    Update_zero_hour();
    calculate_start_times();
}
