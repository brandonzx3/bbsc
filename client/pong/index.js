let w_pressed = false, s_pressed = false;

window.addEventListener("keydown", event => {
    if (event.keyCode === 87) w_pressed = true;
    else if (event.keyCode == 83) s_pressed = true;
});
window.addEventListener("keyup", event => {
    if (event.keyCode === 87) w_pressed = false;
    if (event.keyCode === 83) s_pressed = false;
});

const ball = {
    x: 60,
    y: 50,
    vel_x: -50,
    vel_y: 0,
    bounding_box: [{ x: -2.5, y: -2.5}, { x: 2.5, y: 2.5 }]
};

const top_wall = {
    x: 0, y: 0,
    bounding_box: [{ x: 0, y: 0 }, { x: 120, y: -100 }]
}

const user = {
    y: 50,
    bounding_box: [{ x: -5, y: -15 }, { x: 5, y: 15 }]
};

const ai = {
    y: 50,
    target: 50,
    bounding_box: [{ x: -5, y: -15 }, { x: 5, y: 15 }]
};

let previous_time = performance.now();
function exist() {
    let ellapsed = performance.now() - previous_time;
    previous_time += ellapsed;

    //Update the ball's position
    let new_ball_position = { x: ball.x + ball.vel_x, y: ball.y + ball.vel_y };
    //Determine if new ball collides with something else
    
}

function check_collision(a, b) {

}