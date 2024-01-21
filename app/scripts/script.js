// for nav in mobile phone burger and nav links function
const navLink = document.querySelector('.nav-link');
const home = document.getElementById('home');
const navBar = document.querySelector(".nav-bar");
const contents = document.querySelectorAll(".contents");
const burgerBtn = document.getElementById('burger')
const homeLinks = home.querySelector('.links');
const navBarLinks = document.querySelector('.nav-bar-links');

// EVENT LISTENERS
burgerBtn.addEventListener('click', openNav);
navLink.addEventListener('click', addActiveClassToSection);
navBarLinks.addEventListener('click', addActiveClassToSection);
homeLinks.addEventListener('click', addActiveClassToSection);
checkIfHome();
function setDefault() {
  burgerBtn.classList.remove('burger-close');
  navLink.classList.remove('open-nav');
}

function openNav(e) {
  e.currentTarget.classList.toggle("burger-close");
  navLink.classList.toggle("open-nav");
}

function addActiveClassToSection(e) {
  let gotoSection = e.target.textContent;
  // console.log(e.target);

  contents.forEach((content) => {
    if(content.classList.contains('active')){
      content.classList.remove('active');
    }
  })
  const sectionActive = document.getElementById(gotoSection);
  sectionActive.classList.add('active');
  checkIfHome();
  setDefault();
}

function checkIfHome() {
  if(home.classList.contains('active')){
    navBar.classList.add('nav-bar-home');
    document.body.style.overflow = "hidden";
  } else {
    navBar.classList.remove('nav-bar-home');
    document.body.style.overflow = "scroll";
  }
}

// script for toggling Landing Pages Projects

const landingPages = new XMLHttpRequest;
landingPages.open('GET', "projects.json", true);
landingPages.send();

landingPages.onload = function() {
  if(this.readyState === 4){
    const res = JSON.parse(landingPages.responseText);
    // const res = JSON.parse(jsonRes);

    const projectImgContainer = document.getElementById('project-img-container');
    document.querySelector(".pprev-btn").addEventListener('click', projectPrev);
    document.querySelector(".pnext-btn").addEventListener('click', projectNext);
    landingPagesIndex = 0;
    let landingPagesData = res.landingPages[landingPagesIndex];

    function projectNext() {
      landingPagesIndex++
      if(landingPagesIndex > res.landingPages.length - 1) landingPagesIndex = 0;
      landingPagesData = res.landingPages[landingPagesIndex];
      // console.log(landingPagesData);
      projectImgContainer.innerHTML = 
          `<img src="${landingPagesData.logo}" alt="${landingPagesData.alt}">
          <div class="project-links">
            <a target="_blank" href="${landingPagesData.previewLink}"><i class="fas fa-eye"></i>Preview</a>
            <a target="_blank" href="${landingPagesData.githubLink}"><i class="fab fa-github"></i>Git Hub</a>
          </div>`
    }

    
    function projectPrev() {
      // console.log("prev clicked")
      landingPagesIndex--;
      if(landingPagesIndex < 0) landingPagesIndex = res.landingPages.length - 1;
      // console.log(landingPagesData.alt);
      landingPagesData = res.landingPages[landingPagesIndex];
      projectImgContainer.innerHTML = 
          `<img src="${landingPagesData.logo}" alt="${landingPagesData.alt}">
          <div class="project-links">
            <a target="_blank" href="${landingPagesData.previewLink}"><i class="fas fa-eye"></i>Preview</a>
            <a target="_blank" href="${landingPagesData.githubLink}"><i class="fab fa-github"></i>Git Hub</a>
          </div>`
    }
  } else {
    console.log("ERROR JSON HASN'T CAUGHT");
  }
}

// TYPE WRITER EFFECT
const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
  // console.log('hello');

  //current index of a word
  const current = this.wordIndex % this.words.length;

  // get the full text of current word;
  const fullTxt = this.words[current];

  // check if deleting
  if(this.isDeleting) {
    // remove a character 
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add a characater 
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //inser txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  // Initial type speed
  let speedType = 300;

  if(this.isDeleting){
    speedType /= 2;
  }

  // check if the word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    // make pause at end
    speedType = this.wait;
    //set is deleting is true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === ''){
    this.isDeleting = false;
    //move to the next word
    this.wordIndex++;
    //Puase before start typing
    speedType = 500;
  }
  // console.log(fullTxt);

  setTimeout(() => this.type(), speedType);
}
// init on dom load
document.addEventListener('DOMContentLoaded', init);

//Init our app
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // initailize the type writer

  new TypeWriter(txtElement, words, wait);
}


const resumeLinks = document.querySelectorAll('.resumeLink');


resumeLinks.forEach((resumeLink) => {
  resumeLink.addEventListener('click', () => {
    setTimeout(function() {
      window.location.href = "https://jcoder6.github.io/Portfolio-Website/"; // Redirect to the root #home
    }, 1000);
  })
})



