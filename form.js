function initForm(){
    var li=document.getElementsByClassName("formText")
    for (var i=0;i<li.length;i++){
        console.log(i)
        li[i].children[1].onfocus=(e)=>{
            e.target.parentElement.children[0].style.transform="translate(0,-50%)"
            e.target.parentElement.children[0].style.left="0px"
            e.target.parentElement.children[0].style.color="#0000ff"
            var width=e.target.parentElement.children[0].clientWidth
            e.target.parentElement.children[1].style.marginLeft=width+5+"px"
            e.target.parentElement.children[1].style.width=`calc(100% - 25px - ${width}px)`
        }
        li[i].children[1].onblur=(e)=>{
            if (! e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(-50%,-50%)"
                e.target.parentElement.children[0].style.left="50%"
                e.target.parentElement.children[0].style.color="#888888"
                e.target.parentElement.children[1].style.marginLeft="0px"
                e.target.parentElement.children[1].style.width=`calc(100% - 20px)`
            }
        }
        li[i].children[1].onchange=(e)=>{
            if (e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(0,-50%)"
                e.target.parentElement.children[0].style.left="0px"
                e.target.parentElement.children[0].style.color="#0000ff"
                var width=e.target.parentElement.children[0].clientWidth
                e.target.parentElement.children[1].style.marginLeft=width+5+"px"
                e.target.parentElement.children[1].style.width=`calc(100% - 25px - ${width}px)`
            }
        }
    }
    var li=document.getElementsByClassName("formImageCode")
    for (var i=0;i<li.length;i++){
        console.log(i)
        li[i].children[1].onfocus=(e)=>{
            e.target.parentElement.children[0].style.transform="translate(0,-50%)"
            e.target.parentElement.children[0].style.left="0px"
            e.target.parentElement.children[0].style.color="#0000ff"
            var width=e.target.parentElement.children[0].clientWidth
            e.target.parentElement.children[1].style.marginLeft=width+5+"px"
            e.target.parentElement.children[1].style.width=`calc(100% - 129px - ${width}px)`
        }
        li[i].children[1].onblur=(e)=>{
            if (! e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(-50%,-50%)"
                e.target.parentElement.children[0].style.left="50%"
                e.target.parentElement.children[0].style.color="#888888"
                e.target.parentElement.children[1].style.marginLeft="0px"
                e.target.parentElement.children[1].style.width=`calc(100% - 124px)`
            }
        }
        li[i].children[1].onchange=(e)=>{
            if (e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(0,-50%)"
                e.target.parentElement.children[0].style.left="0px"
                e.target.parentElement.children[0].style.color="#0000ff"
                var width=e.target.parentElement.children[0].clientWidth
                e.target.parentElement.children[1].style.marginLeft=width+5+"px"
                e.target.parentElement.children[1].style.width=`calc(100% - 129px - ${width}px)`
            }
        }
        li[i].children[2].onclick=(e)=>{
            getImageCode(e.target)
        }
    }
    var li=document.getElementsByClassName("formEmailCode")
    for (var i=0;i<li.length;i++){
        console.log(i)
        li[i].children[1].onfocus=(e)=>{
            e.target.parentElement.children[0].style.transform="translate(0,-50%)"
            e.target.parentElement.children[0].style.left="0px"
            e.target.parentElement.children[0].style.color="#0000ff"
            var width=e.target.parentElement.children[0].clientWidth
            e.target.parentElement.children[1].style.marginLeft=width+5+"px"
            e.target.parentElement.children[1].style.width=`calc(100% - 129px - ${width}px)`
        }
        li[i].children[1].onblur=(e)=>{
            if (! e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(-50%,-50%)"
                e.target.parentElement.children[0].style.left="50%"
                e.target.parentElement.children[0].style.color="#888888"
                e.target.parentElement.children[1].style.marginLeft="0px"
                e.target.parentElement.children[1].style.width=`calc(100% - 124px)`
            }
        }
        li[i].children[1].onchange=(e)=>{
            if (e.target.parentElement.children[1].value){
                e.target.parentElement.children[0].style.transform="translate(0,-50%)"
                e.target.parentElement.children[0].style.left="0px"
                e.target.parentElement.children[0].style.color="#0000ff"
                var width=e.target.parentElement.children[0].clientWidth
                e.target.parentElement.children[1].style.marginLeft=width+5+"px"
                e.target.parentElement.children[1].style.width=`calc(100% - 129px - ${width}px)`
            }
        }
        li[i].children[2].onclick=(e)=>{
            getEmailCode(e.target)
        }
    }
}
function getRadioButtonCheckedValue(tagNameAttr){
    var radio_tag = document.getElementsByName(tagNameAttr);
    for(var i=0;i<radio_tag.length;i++){
        if(radio_tag[i].checked){
            var checkvalue = radio_tag[i].value;            
            return checkvalue;
        }
    }
}