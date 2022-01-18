let c = document.getElementById("fight-canvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback, ind) => {
    let img = new Image();
    img.onload = () => callback(img, ind);
    img.src = src;
}

const animations = {
    bg : "background.jpg",
    imgPath : "med/fight/",
    frameRate : 9,

    anims : {
        idle : {
            images : 8,
            path : "idle",
            loaded : []
        },
        punch : {
            images : 7,
            path : "punch",
            loaded : []
        },
        kick : {
            images : 7,
            path : "kick",
            loaded : []
        },
        forward : {
            images : 6,
            path : "forward",
            loaded : []
        },
        block : {
            images : 9,
            path : "block",
            loaded : []
        },
        backward : {
            images : 6,
            path : "backward",
            loaded : []
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
            //console.log(thisImg);
            loadImage(thisImg, (img, ind) => {
                animations.anims[a].loaded[ind] = img;
                
                //console.log( img);
                //ctx.drawImage(img, 0, 0, 500, 500);
            }, i);
        }
        
    }
}
loadAll();

let bg = animations.bg;
let imgPath = animations.imgPath;
loadImage(imgPath+bg, (img) => {
    BGIMG = img;
    processQueue();
});

let animate = (animation, callback) => {

    let bg = animations.bg;
    let imgPath = animations.imgPath;
    
    let animages = animations.anims[animation].images;
    let aniPath = animations.anims[animation].path;
    let loaded = animations.anims[animation].loaded;
    ctx.drawImage(BGIMG, 0, 0, 800, 500);
    ctx.drawImage(loaded[1], 0, 0, 500, 500);
    let i = 2;
    queue.pop();
    var intervalID = setInterval(() => {
        if(i < loaded.length){
            //console.log(loaded[i]);
            ctx.drawImage(BGIMG, 0, 0, 800, 500);
            ctx.drawImage(loaded[i], 0, 0, 500, 500);
            i++;
        }else{
            //console.log(queue);
            
            window.clearInterval(intervalID);
            callback();
        }
    }, 1000 / animations.frameRate);

}

let processQueue = () => {
    if(queue.length == 0){
        queue.push('idle');
    }
    let toDo = queue.at(-1);
    animate(toDo,() => processQueue());
}



//animate("idle");