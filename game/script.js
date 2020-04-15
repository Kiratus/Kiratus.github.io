//variables
let canvas, ctx, HEIGHT, WIDTH, frames = 0, maxJumps = 3, gameSpeed = 6, state;

let states = {
    notPlaying: 0,
    playing: 1,
    loose: 2
}

let floor = {
    y: 550,
    height: 50,
    color: "#e8da78",

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.y, WIDTH, this.height);
    }
};
let player = {
    x: 50,
    y: 0,
    width: 50,
    height: 50,
    color: "#ff9239",
    gravity: 1.6,
    speed: 0,
    jumpF: 23.6,
    amtJumps: 0,

    update: function() {
        this.speed += this.gravity;
        this.y += this.speed;

        if (this.y > floor.y - this.height && state != states.loose) {
            this.y = floor.y - this.height;
            this.amtJumps = 0;
            this.speed = 0;
        }
    },

    jump: function() {
        if (this.amtJumps < maxJumps) {
            this.speed = -this.jumpF;
                this.amtJumps++;
        }
    },

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

let obstacles = {
    _obs: [],
    colors: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
    timeInsert: 0,

    insert: function() {
        this._obs.push({
            x: WIDTH,
            width: 30 + Math.floor(20 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: this.colors[Math.floor(5 * Math.random())]
        }),
        this.timeInsert = 30 + Math.floor(31 * Math.random())
    },

    update: function() {
        if (this.timeInsert == 0) {
            this.insert();
        } else {
            this.timeInsert--;
        }

        for (let i = 0, size = this._obs.length; i < size; i++) {
            let obs = this._obs[i];

            obs.x -= gameSpeed;

            if (player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y + player.height > floor.y - obs.height) {
                    state = states.loose;
                }

            if (obs.x <= -obs.width){
                this._obs.splice(i, 1);
                size--;
                i--;
            }
        }
    },

    clear: function() {
        this._obs = [];
    },

    draw: function() {
        for (let i = 0, size = this._obs.length; i < size; i++) {
            let obs = this._obs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, floor.y - obs.height, obs.width, obs.height);
        }
    },
};

function click(event) {
    if (state == states.playing) player.jump();
    else if (state == states.notPlaying) state = states.playing;
    else if (state == states.loose){
        state = states.notPlaying;
        player.y = 0;
        player.speed = 0;
    }
}

function main() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    HEIGHT = HEIGHT >= 500 ? 600 : HEIGHT;
    WIDTH = WIDTH >= 500 ? 600 : WIDTH;

    canvas = document.createElement("canvas");
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", click);

    state = states.notPlaying;
    run();
}

function run() {
    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    frames++;
    player.update();

    if (state == states.playing) {
        obstacles.update();
    } else if (state == states.loose) {
        obstacles.clear();
    }
}

function draw() {
    ctx.fillStyle = "#80daff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (state == states.notPlaying) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    } else if (state == states.loose) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    } else if (state == states.playing) {
        obstacles.draw();
    }

    floor.draw();
    player.draw();
}

//inicialization
main();