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
const maxRadius = 8;

// AN ARRAY OF COLORS WHERE TO CHOOSE FROM RANDOMLY
const colorArray = [
    '#2E333D',
    '#25282D',
    '#c8c8c8',
    '#D9E4EC',
    '#670000',
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

    // CREATES 60 CIRCLES WITH RANDOM VALUES FOR POSITION, DIAMETER AND DIRECTION
    for(let i=0; i<60; i++){
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
function openBurgerMenu(){
    const overlay = document.querySelector('.overlay');
    const item1 = document.querySelector('.item-1');
    const item2 = document.querySelector('.item-2');
    const item3 = document.querySelector('.item-3');
    const item4 = document.querySelector('.item-4');
    const allNavigationItems = document.querySelectorAll('.navigation-item');
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    const line3 = document.querySelector('.line-3');
    const cross = document.querySelector('.cross')

        // TIMELINE FOR THE OPENING ANIMATION
        cross.hidden = false;
        burOpeTim = gsap.timeline();
        burOpeTim
        .to(line1, {x: -100, opacity: 0, duration: 0.5})
        .to(line2, {opacity: 0, duration: 0.5}, "-=0.5")
        .to(line3, {x: 100, opacity: 0, duration: 0.5}, '-=0.5')
        .to(overlay, {duration: 0.5, top: 30, ease: 'back'})
        .to(burgerMenu,{display: 'none'})
        .from(item1,{duration: 0.2, scale:10, opacity: 0}, '-=0.5')
        .from(item2,{duration: 0.2, scale:10, opacity: 0})
        .from(item3,{duration: 0.2, scale:10, opacity: 0})
        .from(item4,{duration: 0.2, scale:10, opacity: 0})
        .from(cross,{opacity: 0, duration: 1}, '-=0.7');
        
        // CLOSES THE OVERLAY WHEN THE CROSS IS CLICKED
        function closeBurgerMenu(){
            cross.hidden = true;
            gsap.to(burgerMenu,{display: 'flex'});
            gsap.to(overlay, {top: '-50vh', duration: 0.5, ease: 'slow'});
            gsap.to(line1, {x: 0, opacity: 1, duration: 0.5});
            gsap.to(line2, {opacity: 1, duration: 0.5});
            gsap.to(line3, {x: 0, opacity: 1, duration: 0.5});
        }
        // EVENT LISTENER TO CLOSE THE BURGER MENU
        cross.addEventListener('click', closeBurgerMenu);
        allNavigationItems.forEach(item=>{
            item.addEventListener('click', closeBurgerMenu);
        })
}

// BURGER MENU INITIALIZATION
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', openBurgerMenu)


//ARROW ANIMATION
// STARTS THE ARROW ANIMATION
function arrowAnimation(){
    arrowScroll.classList.add("arrow-visible");
    gsap.to(arrowScroll, {duration: 2, opacity: 0.1, repeat: -1});
}

// STOPS THE ARROW ANIMATION WHEN SCROLL IS DETECTED
function stopArrow(){
    arrowScroll.classList.remove("arrow-visible");
    arrowScroll.classList.add("arrow-invisible");
}
//ARROW ANIMATION INITIALIZATION
const arrowScroll = document.querySelector('.arrow-scroll');
arrowAnimation();
document.addEventListener('scroll', stopArrow);


// COPY EMAIL TO CLIPBOARD
const email = document.querySelector('.email');
const toast = document.querySelector('.toast-container');
email.addEventListener('click', ()=>{
    email.select();
    document.execCommand("copy");
    toast.classList.add('toast-visible');
    gsap.from(toast, {opacity: 0, duration: 0.5});
    gsap.to(toast, {opacity: 1});
    gsap.to(toast,{opacity: 0, delay: 2, duration: 0.7});
    setTimeout(()=>{
        toast.classList.remove('toast-visible');
    }, 2700)
})





// function translate(language){
//     // $('#home').text(language.home);
//     // $('#projects').text(language.projects);
//     // $('#about').text(language.about);
//     // $('#contact').text(language.contact);
//     // $('.title').text(language.title);
//     // document.querySelector('#title').textContent = language.title;
//     // $('.contact-button').text(language.contact);
//     // $('.project-title').text(language.projectTitle);
//     // $('.first-project-description').text(language.firstProjectDescription);
//     // $('.first-project-technologies').text(language.firstProjectTechnologies);
//     // $('.second-project-description').text(language.secondProjectDescription);
//     // $('.second-project-technologies').text(language.secondProjectTechnologies);
//     // $('.third-project-description').text(language.thirdProjectDescription);
//     // $('.third-project-technologies').text(language.thirdProjectTechnologies);
//     // $('.about-title').text(language.aboutTitle);
//     // $('.about-first').text(language.aboutFirst);
//     // $('.about-second').text(language.aboutSecond);
//     // $('.about-third').text(language.aboutThird);
//     // $('.about-fourth').text(language.aboutFourth);
//     // $('.technologies-used').text(language.technologiesUsed);
//     // $('.contact-title').text(language.contactTitle);
//     // $('.contact-first').text(language.contactFirst);
//     // $('.contact-second').text(language.contactSecond);
//     // $('.toast-message').text(language.toastMessage);
//     // $('.submit-button').text(language.submitButton);
//     console.log('translated')
// };

// function setLanguage(lang) {
//     localStorage.setItem('language', lang);
// }

// let language; 
// function getLanguage() {
// if(localStorage.getItem('language') === null){
//     setLanguage('en')
// }
// $.ajax({ 
// url: '/language/' +  localStorage.getItem('language') + '.json', 
// dataType: 'json', async: true, 
// success: function (data) {
//     language = data;
//     console.log(language.about);
//     translate(language);
// }
// });
// }

// $(document).ready(getLanguage);

// $(".spanish").click(()=>{
//     // setLanguage('es');
//     localStorage.setItem('language', 'es');
//     // translate();
//     document.querySelector('#title').textContent = language.title;


// })

// $(".english").click(()=>{
//     // setLanguage('en');
//     localStorage.setItem('language', 'en');
//     translate(language);
//     // location.reload();
//     console.log("english");
// })



function animationTranslate(element){
    gsap.from(element,{duration: 0.5, opacity: 0, scale: 2});
};




function translate(language){
    let translationArray=[
        $('.contact-button').text(language.contact),
        $('.title').text(language.title),
        $('.item-1').text(language.home),
        $('.item-2').text(language.projects),
        $('.item-3').text(language.about),
        $('.item-4').text(language.contact),
        $('.project-title').text(language.projectTitle),
        $('.first-project-description').text(language.firstProjectDescription),
        $('.first-project-technologies').text(language.firstProjectTechnologies),
        $('.second-project-description').text(language.secondProjectDescription),
        $('.second-project-technologies').text(language.secondProjectTechnologies),
        $('.third-project-description').text(language.thirdProjectDescription),
        $('.third-project-technologies').text(language.thirdProjectTechnologies),
        $('.about-title').text(language.aboutTitle),
        $('.about-first').text(language.aboutFirst),
        $('.about-second').text(language.aboutSecond),
        $('.about-third').text(language.aboutThird),
        $('.about-fourth').text(language.aboutFourth),
        $('.technologies-used').text(language.technologiesUsed),
        $('.contact-title').text(language.contactTitle),
        $('.contact-first').text(language.contactFirst),
        $('.contact-second').text(language.contactSecond),
        $('.toast-message').text(language.toastMessage),
        $('.submit-button').text(language.submitButton),
        $('.name-placeholder').attr('placeholder', language.namePlaceholder),
        $('.email-placeholder').attr('placeholder', language.emailPlaceholder),
        $('.message-placeholder').attr('placeholder', language.messagePlaceholder)
    ];
    let animatedArray = translationArray.slice(1, translationArray.length);
    animatedArray.forEach(element=>{
    animationTranslate(element);
    })
};

// REQUEST SPANISH LANGUAGE
let spanishLanguage;
function getlanguageSpanish(){
    $.ajax({ 
        url: `/language/es.json`, 
        dataType: 'json', async: true, 
        success: (data)=> {
            spanishLanguage = data;
            translate(spanishLanguage);
        }
    });
    localStorage.setItem('language', 'es');
};

// REQUEST ENGLISH LANGUAGE
let EnglishLanguage;
function getlanguageEnglish(){
    $.ajax({ 
        url: `/language/en.json`, 
        dataType: 'json', async: true, 
        success: (data)=> {
            englishLanguage = data;
            translate(englishLanguage);
        }
    });
    localStorage.setItem('language', 'en');
};

// CHECKS THAT THE WEBSITE HAS LOADED, AND LOADS THE LATEST LANGUAGE REGISTERED
$(document).ready(()=>{
    if(localStorage.getItem('language') === 'es'){
        getlanguageSpanish();
    }else{
        (localStorage.getItem('language') === null)
        getlanguageEnglish();
    }
});

// EVENTS LISTENERS FOR THE LANGUAGE BUTTONS
$('.spanish').click(getlanguageSpanish);
$('.english').click(getlanguageEnglish);



