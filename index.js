const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particleArray=[];
const numberOfParticles=200;
const mouse ={
    x:null,
    y:null
}
const functionMouse=(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
}
window.addEventListener('mousemove',functionMouse)

setInterval(()=>{
    mouse.x=undefined;
    mouse.y=undefined;
},200);

//Create particules
class Particules{
    constructor(x,y,size,color,weight){
        this.x=x;
        this.y=y;
        this.size=size;/** this is the radius */
        this.color=color;
        this.weight=weight;
    }
    draw(){
        ctx.beginPath();/* Draw two paths on the canvas */
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);/* Draw arc centered on (x,y)   Void ctx .arc (x, y, radio, startAngle, endAngle, anticlockwise);*/
        ctx.fillStyle=this.color;
        ctx.fill();
    }
    update(){
        this.size-=0.05;
        if(this.size<0){
            this.x=(mouse.x+((Math.random()*20)-10));
            this.y=(mouse.y+((Math.random()*20)-10));
            this.size=(Math.random()*10)+2;
            this.weight=(Math.random()*2)-0.5;
        }
        this.y+=this.weight;
        this.weight+=0.2;
    }
}

function init(){
    particleArray=[];
    for (let i=0;i<numberOfParticles;i++){
        let x=Math.random()*canvas.width;
        let y=Math.random()*canvas.height;
        let size=(Math.random()*5)+2;
        let color='white';
        let weight=1;
        particleArray.push(new Particules(x,y,size,color,weight));

    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();

