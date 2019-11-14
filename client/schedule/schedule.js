window.onload = function() {
    var status = document.querySelector("#status");

    status.innerHTML = "Fetching status...";

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
        const date = new Date();
        let ssm = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();

        var schedule_times = [
            [24600, 28200], //6:50 7:50
            [28800, 31800], //8:00 8:50
            [32100, 35100], //8:55 9:45
            [35400, 37500], //9:50 10:25
            [37800, 40800], //10:30 11:20
            [41100, 44100], //11:25 12:15
            [44400, 47400], //12:20 1:10
            [47700, 50700], //1:15 2:05
            [51000, 54000] //2:10 3:00
        ]
        let time_offset = -4;

        ssm += time_offset;
        if(ssm < schedule_times[0]) status.innerHTML = `Status: School starts in ${elapsed_from_seconds(schedule_times[0][0] - ssm)}`;
        
        for (let i = 0; i < schedule_times.length; i++) {
            //In class
            if (schedule_times[i][0] <= ssm && ssm < schedule_times[i][1])
            status.innerHTML = `Status: In class. Class ends in ${elapsed_from_seconds(schedule_times[i][1] - ssm)}`;
            //Passing period
            const ip = i + 1;
            if (ip < schedule_times.length) {
                if (schedule_times[i][1] <= ssm && ssm < schedule_times[ip][0])
                status.innerHTML = `Status: Heading to Class. Class starts in ${elapsed_from_seconds(schedule_times[ip][0] - ssm)}`;
            } 
        }
        status.innerHTML = "after school";
    }
    setInterval(function(){ update_status(); }, 500);
};