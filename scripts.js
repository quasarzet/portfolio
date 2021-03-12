gsap.registerPlugin(ScrollTrigger);

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
    .to(burgerMenu,{display: 'none'})
    .to(overlay, {duration: 0.5, top: 30, ease: 'back'}, '-=0.5')
    .from(item1,{duration: 0.2, scale:10, opacity: 0}, '-=0.2')
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
    });
};

// BURGER MENU INITIALIZATION
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', openBurgerMenu);


function scrollingControl(){
    //FINDS THE PERCENTAGE OF SCROLLING THROUGH THE PAGE
    const lines = document.querySelectorAll(".scroll-line");
    const scrollText = document.querySelector(".scroll-line-text");
    const nextSectionButton = document.querySelector('.next-section-arrow');
    const scrollingLines = document.querySelector('.scrolling-lines');
    const firstSection = document.querySelector('.first-section');
    const secondSection = document.querySelector('#projects');
    const thirdSection = document.querySelector('#about');
    const fourthSection = document.querySelector('#contact');
    const progress = Math.ceil(((window.scrollY)/(document.body.scrollHeight - window.innerHeight)*100));
    let currentSection = '';

    switch(true){
      case (progress<18):
        scrollText.textContent = 'Home';
        currentSection = 'Home';
        nextSectionButton.onclick = ()=>{secondSection.scrollIntoView()};
        break;
      case (progress>17 && progress<51):
        scrollText.textContent = 'Projects';
        currentSection = 'Projects';
        nextSectionButton.onclick = ()=>{thirdSection.scrollIntoView()};
        break;
      case (progress>50 && progress<86):
        scrollText.textContent = 'About';
        currentSection = 'About';
        nextSectionButton.onclick = ()=>{fourthSection.scrollIntoView()};
        break;
      case (progress>85):
        scrollText.textContent = 'Contact';
        currentSection = 'Cotnact';
        nextSectionButton.onclick = ()=>{firstSection.scrollIntoView()};
        break;
      default:
        break;
    }

    // SCROLLING BAR BACKGROUND ANIMATION
    if(progress>17){
        gsap.to(scrollingLines,{backgroundColor: 'rgba(0,0,0,0.8)', duration: 0.5, borderRadius: '10px'});
    }else{
        gsap.to(scrollingLines,{backgroundColor: 'transparent', duration: 0.5})
    }
    
    // ANIMATIONS FOR THE NEXT SECTION ARROW
    nextSectionButton.onmouseenter = ()=>{gsap.to(nextSectionButton, {scale: 2, duration: 0.3});};
    nextSectionButton.onmouseleave = ()=>{gsap.to(nextSectionButton, {scale: 1, duration: 0.3});};

    // SHOWS THE NAME OF THE TARGET SECTION WHEN HOVERING
    lines.forEach(line=>{
        line.addEventListener('mouseenter', ()=>{
            const sections = {
                scrollLine1: "Home",
                scrollLine2: "Projects",
                scrollLine3: "About",
                scrollLine4: "Contact",
            }
        scrollText.textContent = `${sections[line.id]}`;
        gsap.to(line, {scale: 2, duration: 0.3});
    })});
    // RETURNS THE NAME OF THE SECTION WHEN HOVERING ENDS
    lines.forEach(line=>{
      line.addEventListener('mouseleave', ()=>{
        scrollText.textContent = currentSection;
        gsap.to(line, {scale: 1, duration: 0.3});
    })});
    };

    // EVENT LISTENERS WHEN THE PAGE LOADS AND EVERYTIME A SCROLL HAPPEN
    window.addEventListener('scroll', scrollingControl);
    window.addEventListener('load', scrollingControl);


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
    gsap.to(toast,{opacity: 0, delay: 2.5, duration: 0.7});
    setTimeout(()=>{
        toast.classList.remove('toast-visible');
    }, 3000)
})


// ANIMATIONS FOR EVERY TRANSLATED WORD
function animationTranslate(element){
    gsap.from(element,{duration: 0.5, opacity: 0, scale: 2});
};

// CREATES AN ARRAY WITH ALL THE TEXT ELEMENTS AND ASSINGS THE MATCHING VALUE FROM
// JSON LANGUAGE FILES
function translate(language){
let translationArray=[
    $('.contact-button').text(language.contact),
    $('.title').text(language.title),
    $('.item-1').text(language.home),
    $('.item-2').text(language.projects),
    $('.item-3').text(language.about),
    $('.item-4').text(language.contact),
    $('.nav-1').text(language.home),
    $('.nav-2').text(language.projects),
    $('.nav-3').text(language.about),
    $('.nav-4').text(language.contact),
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
    let animatedArray = translationArray.slice(10, translationArray.length);
    animatedArray.forEach(element=>{
       animationTranslate(element);
        });
};


// REQUEST SPANISH LANGUAGE
function getLanguageSpanish(){
    $.ajax({ 
        url: 'https://quasarzet.github.io/portfolio/language/es.json', 
        dataType: 'json', async: true, 
        success: (spanishData)=> {
            const spanishLanguage = spanishData;
            translate(spanishLanguage);
        }
    });
    let spanish = document.querySelector('.spanish');
    spanish.removeEventListener('click', getLanguageSpanish);
    setTimeout(()=>{
        spanish.addEventListener('click', getLanguageSpanish);
    }, 1000);
    let english = document.querySelector('.english');
    english.removeEventListener('click', getLanguageEnglish);
    setTimeout(()=>{
        english.addEventListener('click', getLanguageEnglish);
    }, 1000);
    localStorage.setItem('language', 'es');
};

// REQUESTS ENGLISH LANGUAGE
function getLanguageEnglish(){
    $.ajax({ 
        url: 'https://quasarzet.github.io/portfolio/language/en.json',
        dataType: 'json', async: true, 
        success: (englishData)=> {
            let englishLanguage = englishData;
            translate(englishLanguage);
        }
    });
    let english = document.querySelector('.english');
    english.removeEventListener('click', getLanguageEnglish);
    setTimeout(()=>{
        english.addEventListener('click', getLanguageEnglish);
    }, 1000);
    let spanish = document.querySelector('.spanish');
    spanish.removeEventListener('click', getLanguageSpanish);
    setTimeout(()=>{
        spanish.addEventListener('click', getLanguageSpanish);
    }, 1000);
    localStorage.setItem('language', 'en');
};

// CHECKS THAT THE WEBSITE HAS LOADED, AND LOADS THE LATEST LANGUAGE REGISTERED
$(document).ready(()=>{
    if(localStorage.getItem('language') === 'es'){
        getLanguageSpanish();
    }
    else{
        getLanguageEnglish();
    };
});


// REVEAL THE PROJECT LINKS
function revealLinks(element){
    const firstchild = element.children[0];
    const secondchild = element.children[1];

    gsap.to(firstchild, {duration: 0.3, opacity: 0.3});
    gsap.to(secondchild, {duration: 0.3, opacity: 1});
};
// HIDES THE PROJECT LINKS
function hideLinks(element){
    const firstchild = element.children[0];
    const secondchild = element.children[1];

    gsap.to(firstchild, {duration: 0.3, opacity: 1});
    gsap.to(secondchild, {duration: 0.5, opacity: 0});
};
// ADDS EVEN LISTENERS TO THE PROJECT IMAGES AND CALL THE FUNCTION TO SHOW THE LINKS
const projectImages = document.querySelectorAll('.project-images-container');
projectImages.forEach(element=>{
    element.onmouseenter =()=>{revealLinks(element);
}});
// ADDS EVEN LISTENERS TO THE PROJECT IMAGES AND CALL THE FUNCTION TO HIDE THE LINKS
projectImages.forEach(element=>{
    element.onmouseleave =()=>{hideLinks(element);
}});


// STARTING ANIMATIONS FOR DESKTOP
function onLoadAnimations(){
    const burgerMenu = $('.burger-menu');
    const welcomeMessage = $('.welcome-message');
    const navigationItem2 = $('.nav-2');
    const navigationItem3 = $('.nav-3');
    const navigationItem4 = $('.nav-4');
    const name = $('.name');
    const title = $('.title');
    const languages = $('.language-options');
    const profilePhoto = $('.profile-photo');
    const innerRing = $('.inner-ring');
    const middleRing = $('.middle-ring');
    const outerRing = $('.outer-ring');
    const scrollLines = $('.scrolling-lines-container');
    const contactButton = $('.contact-button');
    const scrollArrow = $('.arrow-scroll');
    const screenWidth = window.innerWidth;

    if (screenWidth<1024){
    // FIRST SECTION ANIMATIONS FOR SMALL SCREENS
        const startingAnimations = gsap.timeline();
        startingAnimations
        .from(welcomeMessage, {opacity: 0, duration: 2}, 0)
        .to(welcomeMessage, {opacity: 0, duration: 1}, 3)
        .to(welcomeMessage, {display: 'none'}, 3.5)
        .from(profilePhoto,{opacity: 0, duration: .5}, 4)
        .from(innerRing,{opacity: 0, duration: 0.5}, 4.5)
        .from(middleRing,{opacity: 0, duration: 0.5}, 5)
        .from(outerRing,{opacity: 0, duration: 0.5}, 5.5)
        .from(burgerMenu, {x:'-40vw', duration: 0.5}, 5.7)
        .from(languages, {x:'40vw', duration: 0.5}, 5.7)
        .from([name,title], {y:'10', opacity: 0, duration: 0.5}, 5.7)
        .from([contactButton], {opacity: 0, duration: 1}, 5.7); 
    }else{
         // FIRST SECTION ANIMATIONS FOR DESKTOP
        const startingAnimations = gsap.timeline();
        startingAnimations
        .from(welcomeMessage, {opacity: 0, duration: 2}, 0)
        .to(welcomeMessage, {opacity: 0, duration: 1}, 3)
        .to(welcomeMessage, {display: 'none'}, 3.5)
        .from(profilePhoto,{opacity: 0, duration: .5}, 4)
        .from(innerRing,{opacity: 0, duration: 0.5}, 4.5)
        .from(middleRing,{opacity: 0, duration: 0.5}, 5)
        .from(outerRing,{opacity: 0, duration: 0.5}, 5.5)
        .from([name,title, navigationItem2, navigationItem3, navigationItem4], {x:'-80vw', duration: 0.5}, 5.7)
        .from([scrollLines,languages], {x:'40vw', duration: 0.5}, 5.7)
        .from([contactButton, scrollArrow], {display: 'none', opacity: 0, duration: 1}, 5.7);    
    }
}
onLoadAnimations();


function scrollingAnimations(){
    const screenWidth = window.innerWidth;
    const firstProject = $('.project-1');
    const secondProject = $('.project-2');
    const thirdProject = $('.project-3');
    const technologyTitle = $('.technology-title');
    const technologies = $('.technologies');
    
    // PROJECTS ANIMATIONS      
    if(screenWidth<1024){
        gsap.from(firstProject,{
            scrollTrigger: {
            trigger: firstProject,
            start:"top center",
            toggleActions:"play none none none",
            },
            opacity: 0,
            x: -screenWidth,
            duration: 1,
            ease: 'expo',
        });
        gsap.from(secondProject,{
            scrollTrigger: {
            trigger: secondProject,
            start:"top center",
            toggleActions:"play none none none",
            },
            opacity: 0,
            x: screenWidth,
            duration: 1,
            ease: 'expo'
        });
        gsap.from(thirdProject,{
            scrollTrigger: {
            trigger: thirdProject,
            start:"top center",
            toggleActions:"play none none none",
            },
            opacity: 0,
            x: -screenWidth,
            duration: 1,
            ease: 'expo'
        });
        gsap.from([technologyTitle, technologies], {opacity: 0, duration: 2});
    }
    else{
        // PROJECT SECTION ANIMATIONS DESKTOP
        const projectsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger:firstProject,
            start:"top center",
            toggleActions:"play none none none"
            }
        });
        projectsTimeline
        .from(firstProject,{ease: 'expo', transform: 'rotateY(90deg)', opacity: 0, y: 100, duration: 1})
        .from(secondProject,{ease: 'expo', transform: 'rotateY(90deg)', opacity: 0, y: 100, duration: 1}, 0.3)
        .from(thirdProject,{ease: 'expo', transform: 'rotateY(90deg)', opacity: 0, y: 100, duration: 1}, 0.6)
        .from([technologyTitle, technologies], {opacity: 0, duration: 2});
    }

}
function defineScrollAnimations(){
    const tabScroll = $('.tab-scroll');
    ScrollTrigger.create({
        trigger: tabScroll,
        start: "-200vh center",
        onEnter: scrollingAnimations
    });
};

let originalSize = window.innerWidth;
window.addEventListener('resize', ()=>{
        let newSize = window.innerWidth;
        if(originalSize > 1023 && newSize<1024){
            scrollingAnimations;
        };
        if(originalSize < 1024 && newSize>1024){
            scrollingAnimations;
        };
    });

defineScrollAnimations();


// TECHNOLOGIES DESCRIPTION ANIMATIONS
function technologyDescription(){
    const technologies = document.querySelectorAll('.technology-logo');
    const technologyTitle = document.querySelector('.technology-title');
    const technologyText = document.querySelector('.technology-text');
    
    function revealDescription(element){
        technologyText.textContent = element.id;
        gsap.to(technologyTitle,{transform: 'scaleY(1)', y:0, opacity: 1, transformOrigin: 'bottom', duration: 0.5});
        gsap.to(technologyText, {opacity: 1, duration: 1});
    }

    function hideDescription(element){
        technologyText.textContent = '';
        gsap.to(technologyTitle,{transform: 'scaleY(0.1)', y: 30, opacity: 0, transformOrigin: 'bottom', duration: 0.5});
        gsap.to(technologyText, {opacity: 0, duration: 1});
    }

    technologies.forEach(element=>{
        element.onmouseenter = ()=>{
            revealDescription(element);
        };
    });

    technologies.forEach(element=>{
        element.onmouseleave = ()=>{
            hideDescription(element);
        };
    });
};
technologyDescription();




