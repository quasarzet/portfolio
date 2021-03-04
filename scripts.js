// CANVAS ANIMATIONS
const canvas = document.querySelector('canvas');
const firstSection = document.querySelector('.first-section');
canvas.width = firstSection.clientWidth;
canvas.height = firstSection.clientHeight;
const context = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}
// MAXIMUM RADIUS FOR EACH DOT
const maxRadius = 10;

// AN ARRAY OF COLORS WHERE TO CHOOSE FROM RANDOMLY
const colorArray = [
    '#2E333D',
    '#25282D',
    '#B7CFDC',
    '#D9E4EC',
    '#8c0303',
];

// DETECTS THE MOUSE POSITION
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// DETECTS A RESIZE AND ADJUSTS THE CANVAS SIZE
window.addEventListener('resize', function(){
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = firstSection.clientWidth;
    canvas.height = firstSection.clientHeight;
    init();
})

// RECEIVES RANDOM VALUES FROM THE INIT FUNCTION AND CREATES A NEW INSTANCE OF THE A CIRCLE OBJECT
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    // DRAWS THE CIRCLE WITH THE PROVIDED VALUES FROM THE INIT FUNCTION
    this.draw = function(){
        context.beginPath();
        context.arc(this.x,this.y,this.radius, 0, Math.PI*2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    // CHECKS WHEN A CIRCLE REACHES THE EDGES OF THE SCREEN AND REVERSES ITS DIRECTION
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // CHECKS THE VALUES FROM THE MOUSEMOVE EVENT LISTENER AND COMPARES THEM
        // TO CHECK IF THE MOUSE IS 50 PIXELS CLOSE TO ANY CIRCLE. IF IT IS, EACH
        // CIRCLE SCALES TO MAXRADIUS, AND THEN TO MINRADIUS
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y<50 && mouse.y - this.y > -50){
            if(this.radius<maxRadius){
                this.radius += 0.5;
            }
        }else if(this.radius>this.minRadius){
            this.radius -= 0.5;
        }
        this.draw();
    }
}

// ALL THE CIRCLES ARE STORED IN AN ARRAY, IS AN ARRAY OF OBJECTS
let circleArray = [];

function init(){
    // THE CIRCLE ARRAY IS EMPTIED EVERY TIME THE INIT FUNCTION RUN
    circleArray = [];

    // CREATES 100 CIRCLES WITH RANDOM VALUES FOR POSITION, DIAMETER AND DIRECTION
    for(let i=0; i<100; i++){
        let radius = Math.random() * 3 + 2;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let dx = (Math.random() -0.5) * 0.1;
        let dy = (Math.random() -0.5) * 0.1;
        // CALLS THE CIRCLE FUNCTION AND THEN ADDS EACH CIRCLE TO THE CIRCLE ARRAY
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);

    // CLEARS EACH FRAME OF THE ANIMATION
    context.clearRect(0,0, innerWidth, innerHeight);
    
    for(let i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();



// BURGER MENU ANIMATIONS
gsap.registerPlugin();
function toggleBurgerMenu(){
    const bodyElement = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    const item1 = document.querySelector('.item-1');
    const item2 = document.querySelector('.item-2');
    const item3 = document.querySelector('.item-3');
    const item4 = document.querySelector('.item-4');
    const overlayOuterRing = document.querySelector('.overlay-outer-ring');
    const outerRing = document.querySelector('.outer-ring');
    const overlayCircle = document.querySelector('.overlay-circle');
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    const line3 = document.querySelector('.line-3');
    const cross = document.querySelector('.cross')
    
    if(burgerMenuOpen == false){
        // TIMELINE FOR THE OPENING ANIMATION
        burOpeTim = gsap.timeline();
        burOpeTim
        .to(line1, {x: -100, opacity: 0, duration: 0.5})
        .to(line2, {opacity: 0, duration: 0.5}, "-=0.5")
        .to(line3, {x: 100, opacity: 0, duration: 0.5}, '-=0.5')
        .to([overlayCircle, overlayOuterRing], {display: 'inline-block', visibility:'visible'}, '-=0.5')
        .to(outerRing,{ duration: 0.1, opacity: 0})
        .to(overlayOuterRing,{scale: 0.2, duration: 0.2}, '-=0.2')
        .from(overlayCircle,{opacity: 0})
        .to(overlayOuterRing,{scale: 5, duration: 0.5}, '-=0.4')
        .to(overlayCircle, {duration: 0.5, visibility:'visible'}, '-=0.5')
        .to(overlayCircle, {scale: 15, duration: 0.5}, '-=0.5')
        .to(overlayCircle, {opacity: 0, duration: 0.1})
        .to(overlay, {duration: 0.1, display: 'flex'}, '-=0.1')
        .from(cross, {opacity: 0, scale: 0.2})
        .to([overlayCircle, overlayOuterRing], {scale: 1, display: 'none'})
        .to([item1, item2, item3, item4], {display:'inline-block'}, '-=2.5')
        .from(item1,{duration: 0.2, scale:10, opacity: 0}, '-=0.1')
        .from(item2,{duration: 0.2, scale:10, opacity: 0})
        .from(item3,{duration: 0.2, scale:10, opacity: 0})
        .from(item4,{duration: 0.2, scale:10, opacity: 0})
        .to([outerRing, overlayCircle], { duration: 0.5, opacity: 1});
        bodyElement.classList.add('body-hide');
        burgerMenuOpen = !burgerMenuOpen;
    }
    else{
        // TIMELINE FOR THE CLOSING ANIMATION
        burCloTim = gsap.timeline();
        burCloTim
        .to([item1, item2, item3, item4], {display: 'none', duration: 0.5})
        .to(cross, {opacity: 0}, '-=0.5')
        .to(overlay, { duration: 0.5, display: 'none'}, '-=0.5')
        .to([overlayCircle, overlayOuterRing], {display:'inline-block', visibility:'hidden'})
        .to(line1, {x: 0, opacity: 1, duration: 0.5})
        .to(line2, {opacity: 1, duration: 0.5}, "-=0.5")
        .to(line3, {x: 0, opacity: 1, duration: 0.5}, '-=0.5')
        .to(cross,{opacity: 1})
        bodyElement.classList.remove('body-hide');
        burgerMenuOpen = !burgerMenuOpen;
    }
}
let burgerMenuOpen = false;
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', toggleBurgerMenu)


//ARROW ANIMATION
const arrowScroll = document.querySelector('.arrow-scroll');
// STARTS THE ARROW ANIMATION
function arrowAnimation(){
    arrowScroll.classList.add("arrow-visible");
    gsap.to(arrowScroll, {y: 5, duration: 1.5, opacity: 1, repeat: -1});
}
arrowAnimation();
// STOPS THE ARROW ANIMATION WHEN SCROLL IS DETECTED
function stopArrow(){
    arrowScroll.classList.remove("arrow-visible");
    arrowScroll.classList.add("arrow-invisible");
}
document.addEventListener('scroll', stopArrow);