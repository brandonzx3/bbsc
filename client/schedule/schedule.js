window.onload = function() {
    var rindex;

    const status = document.querySelector("#status");
    const edit_button = document.querySelector("#edit_button");

    const edit_schedule = document.querySelector("#tab");

    const schedule_add_button = document.querySelector("#table_add");
    const schedule_edit_button = document.querySelector("#table_edit");
    const schedule_remove_button = document.querySelector("#table_remove");

    const table = document.querySelector("#table");

    const regex = /^\s*$/;

    edit_schedule.style.display = "none";

    if(localStorage.getItem("schedule") != null) {
        table.innerHTML = localStorage.getItem("schedule");
    } else {
        table.innerHTML = '<tbody><tr><th>Class</th><th>Room #</th><th>Start Time</th></tr></tbody>';
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

    const schedule_times = [
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

    let time_offset = -4;
    let schedule_start_time = 1;

    function update_status() {
        try {
            const date = new Date();
            let ssm = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();
            let day = date.getDay();
        
            ssm += time_offset;

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
            if(ssm > schedule_times[8][1]) status.innerHTML = "Status: after school";

            //weekend
            if(day === 6 || day === 0) {
                status.innerHTML = "Status: Weekend";
            }
        } catch (err) {
            console.log(err);
            status.innerHTML = "error fetching status";
        }
    }

    setInterval(function(){ update_status(); }, 300);
    
    edit_button.onclick = function() {
        if(edit_schedule.style.display === "none") {
            edit_schedule.style.display = "inline-block";
            edit_button.innerHTML = "Save Schedule";
        } else {
            edit_schedule.style.display = "none";
            edit_button.innerHTML = "Edit Schedule";
            localStorage.setItem("schedule", table.innerHTML);
        }
    };

    schedule_add_button.onclick = function() {
        if(!regex.test(document.querySelector("#class").value) && !regex.test(document.querySelector("#room").value)) {
            add_table_row();
        } else {
            alert("this field cannot be left blank");
        }
    }

    schedule_remove_button.onclick = function() {
        remove_table_row();
    }

    schedule_edit_button.onclick = function() {
        if(!regex.test(document.querySelector("#class").value) && !regex.test(document.querySelector("#room").value)) {
            edit_table_row();
        } else {
            alert("this field cannot be left blank");
        }
    }

    var table_start_times = ["8:00:00 AM", "8:55:00 AM", "9:50:00 AM", "10:30:00 AM", "11:25:00 AM", "12:20:00 PM", "1:15:00 PM", "2:10:00 PM"];

    function calculate_start_times() {
        for(var i = 1; i < table.rows.length; i++) {
            if(table.rows.lenth > 9) {
                table.rows[i].cells[2].innerHTML = "When the teacher says leave";
            } else {
                table.rows[i].cells[2].innerHTML = table_start_times[i - 1].toString();
            }
        }
    }

    function add_table_row() {
        var table = document.querySelector("#table"),
        new_row = table.insertRow(table.length),
        cell1 = new_row.insertCell(0),
        cell2 = new_row.insertCell(1),
        cell3 = new_row.insertCell(2),
        schedule_class = document.querySelector("#class").value,
        schedule_room = document.querySelector("#room").value;
        document.getElementById("class").value = "";
        document.getElementById("room").value = "";

        cell1.innerHTML = schedule_class;
        cell2.innerHTML = schedule_room;

        calculate_start_times();
        select_row_to_input();
    }

    function select_row_to_input() {
        for(var i = 1; i < table.rows.length; i++) {
            table.rows[i].onclick = function() {
                //get the seected row index
                rindex = this.rowIndex;
                document.getElementById("class").value = this.cells[0].innerHTML;
                document.getElementById("room").value = this.cells[1].innerHTML;
            };
        }
    }

    function edit_table_row() {
        var schedule_class = document.getElementById("class").value,
        schedule_room = document.getElementById("room").value;
        table.rows[rindex].cells[0].innerHTML = schedule_class;
        table.rows[rindex].cells[1].innerHTML = schedule_room;
        document.getElementById("class").value = "";
        document.getElementById("room").value = "";
    }

    function remove_table_row() {
        table.deleteRow(rindex);
        document.getElementById("class").value = "";
        document.getElementById("room").value = "";
        calculate_start_times();
    }
}