let c = document.getElementById("fight-canvas");
let ctx = c.getContext("2d");
let setLock = false;
let loadImage = (src, callback, ind) => {
    let img = new Image();
    img.onload = () => callback(img, ind);
    img.src = src;
}

let bgs = new Audio('med/fight/sfx/bg.mp3');
bgs.volume = 0.1;

let pposition = 0;

const animations = {
    bg : "background.jpg",
    imgPath : "med/fight/",
    frameRate : 10,

    anims : {
        idle : {
            images : 8,
            path : "idle",
            loaded : [],
            sfx : undefined
        },
        punch : {
            images : 7,
            path : "punch",
            loaded : [],
            sfx : new Audio('med/fight/sfx/punch.mp3')
        },
        kick : {
            images : 7,
            path : "kick",
            loaded : [],
            sfx : new Audio('med/fight/sfx/kick.mp3')
        },
        forward : {
            images : 6,
            path : "forward",
            loaded : [],
            sfx : new Audio('med/fight/sfx/walk.mp3')
        },
        block : {
            images : 9,
            path : "block",
            loaded : [],
            sfx : new Audio('med/fight/sfx/block.mp3')
        },
        backward : {
            images : 6,
            path : "backward",
            loaded : [],
            sfx : new Audio('med/fight/sfx/walk.mp3')
        }
    }
}

let queue = [];
let loadAll = () => {
    for(const a in animations.anims){
        let animages = animations.anims[a].images;
        let aniPath = animations.anims[a].path;
        let imgPath = animations.imgPath;
        for(i=1;  i < animages; i++){
            let thisImg = `${imgPath + aniPath}/${i}.png`;
            loadImage(thisImg, (img, ind) => {
                animations.anims[a].loaded[ind] = img;
            }, i);
        }
        
    }
}
loadAll();

let bg = animations.bg;
let imgPath = animations.imgPath;
loadImage(imgPath+bg, (img) => {
    BGIMG = img;
});

let animate = (animation, callback) => {
    bgs.play();
    let loaded = animations.anims[animation].loaded;
    let sfx = animations.anims[animation].sfx;
    if(typeof sfx != 'undefined'){
        sfx.volume = 0.2;
        sfx.play();
    }
    
    ctx.drawImage(BGIMG, 0, 0, 800, 500);
    ctx.drawImage(loaded[1], pposition, 150, 350, 350);
    let i = 2;
    queue.pop();
    var intervalID = setInterval(() => {
        if(i < loaded.length){
            ctx.drawImage(BGIMG, 0, 0, 800, 500);
            ctx.drawImage(loaded[i], pposition, 150, 350, 350);
            i++;
            if(animation == 'backward' && pposition > 19){
                pposition -= 20;
            }else if(animation == 'forward' && pposition < 431){
                pposition += 20;
            }
        }else{
            window.clearInterval(intervalID);
            callback();
        }
    }, 1000 / animations.frameRate);

}

let processQueue = () => {
    setLock = true;
    if(queue.length == 0){
        queue.push('idle');
    }
    let toDo = queue.at(-1);
    animate(toDo,() => processQueue());
}

const keys = {
    d : () => queue.push('forward'),
    a : () => queue.push('backward'),
    s : () => queue.push('block'),
    q : () => queue.push('kick'),
    e : () => queue.push('punch')
}
document.addEventListener('keydown', (e)=>{
    let pressed = e.key;
    
    if(typeof keys[pressed] != "undefined"){
        //console.log(':'+pressed+":");
        keys[pressed]();
    }
    
});

//animate("idle");