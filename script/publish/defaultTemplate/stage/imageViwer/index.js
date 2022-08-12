import viewer from './viewer.js'
let link = document.createElement("link");
link.setAttribute("href", '/stage/imageViwer/viewer.min.css');
link.setAttribute("rel", "stylesheet");
link.setAttribute("class", "naiveStyle");
link.setAttribute("sort",  1);
document.head.appendChild(link);
let previwer = document.querySelector('#preview')
let option = {
    url:'src',
    toolbar:true,
    movable:false

}
new  viewer(previwer,option)