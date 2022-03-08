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

//눌렀을떄 그쪽으로 가는거 많이쓰니까 그냥 기능으로 하나만듬
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  //behavior는 스크롤이 너무 빠르게움직여서 동작준거임
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
