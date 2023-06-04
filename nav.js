
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?446f9e42f304b5b9b7d11732fb496141";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();
var nav=document.createElement("div")
var nowList=document.createElement("ul")
var foldButton=document.createElement("p")
var unfoldButton=document.createElement("p")
var title=document.createElement("p")
nav.id="nav"
nav.classList.add("fold")
foldButton.innerText="\uf137"
unfoldButton.innerText="\uf0c9"
foldButton.classList.add("fold","demo-icon")
unfoldButton.classList.add("unfold","demo-icon")
nav.appendChild(title)
nav.appendChild(foldButton)
nav.appendChild(unfoldButton)
title.classList.add("title")
document.body.appendChild(nav)
var menuTree=[]
var navs
unfoldButton.addEventListener("click",()=>{
    nav.classList.remove("fold")
    nav.classList.add("normal")
    nav.style.width=navs.width+"px"
    
})
foldButton.addEventListener("click",()=>{
    if (menuTree.length<=1){
        nav.classList.add("fold")
        nav.classList.remove("normal","full")
        nav.style.width="0px"
    }
    else{
        menuTree.pop()
        nowList.classList.add("rightMove")
        setTimeout((ele)=>{
            ele.remove()
        },300,nowList)
        nowList=document.createElement("ul")
        makeNavList(menuTree[menuTree.length-1],nowList)
    }
})
async function loadSubNav(obj){
    var data=obj.subNav
    var value= await(await fetch(data.data.url)).json()
    for (var i=0;i<data.data.obj.length;i++) {
        value=value[data.data.obj[i]]
    }
    obj.subNav.nav=[]
    for (var i=0;i<value.length;i++) {
        var now={}
        for (j in data.struct){
            now[j]=sprintf(data.struct[j], value[i])
        }
        obj.subNav.nav.push(now)
    }
    
    makeSubNav(obj.subNav.nav)
    
}
function makeNavList(obj,ele){
    nav.style.width=obj.width+"px"
    var nowNav=obj.nav
    nowList.classList.add("list")
    nav.append(nowList)
    title.innerText=obj.title
    function navJump(e){
        location.href=e.target.parentElement.dataset.href
    }
    for(var i=0; i<nowNav.length; i++){
        var now=document.createElement("li")
        now.dataset.href=nowNav[i].href
        var icon=document.createElement("p")
        icon.classList.add("demo-icon")
        icon.innerText=nowNav[i].icon
        var word=document.createElement("p")
        word.innerText=nowNav[i].word
        icon.addEventListener("click",navJump)
        icon.classList.add("icon")
        word.classList.add("word")
        word.addEventListener("click",navJump)
        var fullButton=document.createElement("p")
        fullButton.classList.add("demo-icon")
        fullButton.innerText="\uf138"
        fullButton.classList.add("fullButton")
        if ("subNav" in nowNav[i]){
            fullButton.classList.add("active")
            fullButton.dataset.subNav=JSON.stringify(nowNav[i].subNav)
            fullButton.addEventListener("click",(e)=>{
                var now=JSON.parse(e.target.dataset.subNav)
                menuTree.push(now)
                nowList.classList.add("leftMove")
                setTimeout((ele)=>{
                    ele.remove()
                },300,nowList)
                nowList=document.createElement("ul")

                makeNavList(now,nowList)
            })
        }
        now.appendChild(icon)
        now.appendChild(word)
        now.appendChild(fullButton)
        ele.appendChild(now)
    } 
}
async function makeSubNav(data){
    var waiting=[]
    for(var i=0; i<data.length; i++){
        if ( "subNav" in data[i] && "data" in data[i].subNav){
            waiting.push(loadSubNav(data[i]))
        }
    }
    await Promise.all(waiting)
}
async function loadNav(){
    navs = await (await fetch("/data/nav.json")).json()
    await makeSubNav(navs.nav)
    menuTree.push(navs)
    makeNavList(navs,nowList)
    nav.style.width="0px"
}
loadNav()