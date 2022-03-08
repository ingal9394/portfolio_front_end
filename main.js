"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//일정이상 스크롤내리면 navbar 투명>핑크
document.addEventListener("scroll", () => {
  //console.log(window.scrollY);
  //console.log(`navbarHeight : ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark"); //navbar에 class 추가하는것
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  //console.log(target);
  // console.log(event.target.dataset.link);
  // data-link 의 id로 설정한놈을  쿼리셀렉터가 동일한놈을 검색해서 넣어주니까  센션의 해당 아이디가 검색되어서 담기고 그것을 가지고
  //scrollIntoView() 로 이동
  //const scrollTo = document.querySelector(link);
  //console.log(scrollTo);
  scrollIntoView(link);
});

//handle contact

const contactmeBtn = document.querySelector(".home__contact");

contactmeBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

//Make home slowly fade to transparent as the window scrolls down

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//스크롤 내릴때 화살표 보이게
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible"); //css에 설정한 .arrow-up.visible 이 추가됨
  } else {
    arrowUp.classList.remove("visible");
  }
});

const arrowupBtn = document.querySelector(".arrow-up");
arrowupBtn.addEventListener("click", (event) => {
  console.log("1");
  scrollIntoView("#home");
});

//Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContatior = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  const active = document.querySelector(".categort__btn.selected");
  active.classList.remove("selected");

  //프로젝트 버튼선택하는거옆에 span 있는데 그거 눌러지면 e.target이 span으로 가서 add시 오류남
  // span에는 selected가 없으니까
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;

  target.classList.add("selected");

  projectContatior.classList.add("anime-out");
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisble");
      } else {
        project.classList.add("invisble");
      }
    });
    projectContatior.classList.remove("anime-out");
  }, 300);
  //console.log(filter);
});

//눌렀을떄 그쪽으로 가는거 많이쓰니까 그냥 기능으로 하나만듬
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  //behavior는 스크롤이 너무 빠르게움직여서 동작준거임
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
