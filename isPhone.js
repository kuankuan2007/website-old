function isPhone(){
    if (userAgent=navigator.userAgent.toLowerCase().indexOf("mobile")!=-1){
        asPhone()
    }
}
function asPhone(){
    try{
        var nav=document.getElementById("nav")
        nav.setAttribute("id","phonenav")
        nav.draggable=true
        document.body.ondragover = e => {
            e.preventDefault()
        }
        nav.ondragstart = e => {
            window.ondragingLink = e.target
            e.dataTransfer.effectAllowed = "move"
            setTimeout(() => {
                e.target.classList.add("moving")
            }, 0)
            e.target.classList.add("unover")
        }
        nav.ondragend=e=>{
            setTimeout(()=>{
                
                e.target.classList.remove("unover")
                e.target.classList.remove("moving")
            },0)
        }
        nav.ondrag=(e)=>{
            var screendistance={
                top:Math.max(Math.min(e.clientY,window.innerHeight*0.9-60),window.innerHeight*0.2+60),
                left:e.clientX,
                right:window.innerWidth-e.clientX,
            }
            console.log(screendistance.min)
            if (screendistance.left<screendistance.right){
                nav.style.left='5px'
                nav.style.top=screendistance.top+'px'
                nav.style.right="unset"
            }else{
                nav.style.right='5px'
                nav.style.top=screendistance.top+'px'
                nav.style.left="unset"
            }
        }
        document.getElementById("helpSonNav").setAttribute("id","helpSonPhoneNav")}
    finally{
        
    }
}