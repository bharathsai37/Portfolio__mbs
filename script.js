// Update navbar layout when user is on mobile device
const toggle_nav_button = document.getElementById("toggle_nav");
console.log(toggle_nav_button);
toggle_nav_button.addEventListener('click', e => {
  const navitems = document.getElementsByClassName('navitems')[0];
  navitems.classList.toggle('show');
  toggle_nav_button.children[0].classList.toggle('hide');
  toggle_nav_button.children[1].classList.toggle('hide');
});

const navitems = document.getElementsByClassName('navitems')[0];
const navlinks = Array.from(document.getElementsByClassName('navlinks'));
navlinks.map((link) => {
  link.addEventListener('click', e => {
    if (toggle_nav_button.style.display != 'none' && navitems.classList.contains('show')) {
      navitems.classList.remove('show');

      toggle_nav_button.children[0].classList.toggle('hide');
      toggle_nav_button.children[1].classList.toggle('hide');
    }
  })
});


// Update the navbar active link when user scrolls the page
const sections = Array.from(document.querySelectorAll('section'));
let prevTimeout = null;
window.addEventListener('scroll', (e) => {
  let currsection = null;
  sections.forEach(section => {
    if (window.scrollY >= (section.offsetTop - 300)) {
      currsection = section.id;
    }
  });
  if (prevTimeout) {
    clearTimeout(prevTimeout);
  }
  prevTimeout = setTimeout(() => {
    navlinks.forEach(link => {
      if (link.href.includes(currsection)) {
        link.classList.add("navlink-active");
      }
      else {
        link.classList.remove("navlink-active");
      }
    });
  }, 50);
});

// Update Skills based on filter selected
function filterSkills(skillId) {
  const skills = Array.from(document.getElementsByClassName('skill'));
  skills.map(skill => {
    console.log(skill);
    if (skill.dataset.skillCategory == skillId) {
      skill.style.display = 'flex'
    }
    else {
      skill.style.display = 'none'
    }
  });
}
const skill_categories = document.getElementsByClassName('skill_categories')[0];
skill_categories.addEventListener('click', e => {
  if (!e.target.classList.contains('skill_categories')) {
    if (!e.target.classList.contains('skill_category_active')) {
      filterSkills(e.target.getAttribute('id'));
    }
    document.querySelector('.skill_category_active')?.classList.remove('skill_category_active');
    e.target.classList.add("skill_category_active");
  }
})
const frontend = document.getElementById('frontend').click();


//Update the projects section to show more projects / less projects
const showMoreBtn=document.querySelector("#show-more");
let initalShownProjectsCount=0;
let currentShownProjectsCount=0;

const projectCards=Array.from(document.querySelectorAll(".project-card"));
projectCards.map(project=>{
  if(getComputedStyle(project).getPropertyValue("display")!="none"){
    initalShownProjectsCount+=1;
  }
});
currentShownProjectsCount=initalShownProjectsCount;
if(currentShownProjectsCount==projectCards.length){
  showMoreBtn.style.display="none";
}
showMoreBtn.addEventListener('click',()=>{
  if(currentShownProjectsCount<projectCards.length){
    projectCards.map(project=>{
      project.style.display="block";
    });
    currentShownProjectsCount=projectCards.length;
    showMoreBtn.innerText="Show Less";
  }
  else{
    for (let index = initalShownProjectsCount; index < projectCards.length; index++) {
      const project = projectCards[index];
      project.style.display="none";
    }
    currentShownProjectsCount=initalShownProjectsCount;
    showMoreBtn.innerText="Show More"
  }
});

// Toggle popup to display / hide the details of a project
function showPopup(bool) {
  if (bool) {
    document.getElementById('popup').style.visibility = 'visible'
  } else {
    document.getElementById('popup').style.visibility = 'hidden'
  }
}

// Clear popup consisting of previously expanded project
function clearExpandedProject(){
  expandedProjectHead.lastChild.remove();
  expandedProjectImage.innerHTML="";
  expandedProjectContent.innerHTML="";
  showPopup(false);
}

// Expand project View
const expandedProjectHead=document.querySelector(".expanded-project-head");
const expandedProjectImage=document.querySelector(".expanded-project-image");
const expandedProjectContent=document.querySelector(".expanded-project-content");
function expandProject(projectNumber){
  const ProjectImage=document.querySelectorAll(".project-head img")[projectNumber-1];
  const ProjectTitle=document.querySelectorAll(".project-title")[projectNumber-1];
  const ProjectContent=document.querySelectorAll(".project-content")[projectNumber-1].children;

  expandedProjectHead.appendChild(ProjectTitle.cloneNode(true));
  expandedProjectImage.appendChild(ProjectImage.cloneNode(true));
  Array.from(ProjectContent).map(points=>{
    expandedProjectContent.appendChild(points.cloneNode(true));
  })

  showPopup(true);
  
}
