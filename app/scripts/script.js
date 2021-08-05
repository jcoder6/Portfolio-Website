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
landingPages.open('GET', "/projects.json", true);
landingPages.send();

landingPages.onload = function() {
  if(this.readyState === 4){
    // console.log(this.status);
    const jsonRes = JSON.parse(JSON.stringify(landingPages.responseText));
    // console.log(jsonRes)
    const res = JSON.parse(jsonRes);

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
            <a href="${landingPagesData.previewLink}"><i class="fas fa-eye"></i>Preview</a>
            <a href="${landingPagesData.githubLink}"><i class="fab fa-github"></i>Git Hub</a>
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
            <a href="${landingPagesData.previewLink}"><i class="fas fa-eye"></i>Preview</a>
            <a href="${landingPagesData.githubLink}"><i class="fab fa-github"></i>Git Hub</a>
          </div>`
    }
  }
}

