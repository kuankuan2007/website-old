
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?446f9e42f304b5b9b7d11732fb496141";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();
async function checkUser(){
    var userButton = document.querySelector("#user a")
    var userName=await getUserName()
    if (userName===null){
        return null
    }
    try{
        userButton.classList.remove("login")
        userButton.classList.add("user")
    }
    catch{}
    userButton.setAttribute("href","/user")
    userButton.innerText=userName
    return userName
}
async function getUserName(){
    if (localStorage.getItem("check")===null){
        return null
    }
    var retsult=await fetch("https://kuankuan.site/user/check",{
        method:'GET',
        headers:{
            "check":localStorage.getItem("check")
        }
	})
    if (retsult.status!==200){
        localStorage.removeItem("check")
        return null
    }
    return await retsult.text()
}
async function login(flags,password){
    var retsult=await fetch("https://kuankuan.site/user/login",{
        method:'GET',
        method:'POST',
        headers:{
            "check":localStorage.getItem("check"),
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            "flags":flags,
            "password":password
        })
	})
    if (retsult.status==200){
        localStorage.setItem("check",await retsult.text())
        location.href = getQueryVariable("from","/")
        return  true
    }else{
        return false
    }
}
async function checkSignUp(username,email){
    var retsult=await fetch("https://kuankuan.site/user/signup/check",{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
        },
        body:JSON.stringify({
            email:email,
            name:username
        })
	})
    if (retsult.status==403){
        return await retsult.json()
    }
    localStorage.setItem("check",await retsult.text())
    return null
}
async function getImageCode(ele,retry=null){
    var retsult =await fetch("https://kuankuan.site/user/safety/image/make",{
        method:'GET',
        headers:{
            "check":localStorage.getItem("check"),
        },
    })
    if (retsult.status==200){
        ele.src=await retsult.text()
        return "success"
    }
    else if (retsult.status==503){
        showMessage("操作过于频繁请稍后再试",retry)
    }
    else if (retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }
}
async function checkImageCode(code){
    var retsult =await fetch("https://kuankuan.site/user/safety/image/check",{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            code:code,
        })
    })
    if (retsult.status==200){
        localStorage.setItem("action",await retsult.text())
        return true
    }else if(retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }else if(retsult.status==401){
        showMessage("验证码错误")
    }return false
}
function countBackwardsInText(ele,time,finish){
    ele.innerText=`${time}s`
    if (time==0){
        finish(ele)
        return
    }
    setTimeout(countBackwardsInText,1000,ele,time-1,finish)
}

async function getEmailCode(ele,retry=null){
    var retsult =await fetch(`https://kuankuan.site/user/safety/email/make?action=${localStorage.getItem("action")}`,{
        method:'GET',
        headers:{
            "check":localStorage.getItem("check"),
        },
    })
    if (retsult.status==200){
        ele.classList.add("disabled")
        countBackwardsInText(ele,60,(ele)=>{
            try{
                ele.classList.remove("disabled")
                ele.innerText="重新发送"
            }catch{}
        })
        return "success"
    }
    else if (retsult.status==503){
        showMessage("操作过于频繁请稍后再试",retry)
    }
    else if (retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }
    else if (retsult.status==401){
        location.href="/check/image?from="+encodeURI(location.href)
    }
}
async function checkEmailCode(code){
    var retsult =await fetch("https://kuankuan.site/user/safety/email/check",{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            code:code,
        })
    })
    if (retsult.status==200){
        localStorage.setItem("action",await retsult.text())
        return true
    }else if(retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }else if(retsult.status==401){
        showMessage("验证码错误")
    }return false
}
async function confirmSignUp(name,email,birthDate,sex,password){
    var retsult =await fetch(`https://kuankuan.site/user/signup/confirm?action=${localStorage.getItem("action")}`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            "name":name,
            "email":email,
            "birthDate":birthDate,
            "sex":sex,
            "password":password
        })
    })
    if (retsult.status==200){
        localStorage.setItem("check",await retsult.text())
        location.href = getQueryVariable("from","/")
        return "success"
    }
    else{
        location.reload()
    }
}
function getQueryVariable(variable,elsevalue)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        retsult=""
        for (var j=1;j<pair.length;j++) {
            retsult += "="+pair[j]
        }
        retsult=retsult.substring(1)
        if(pair[0] == variable){return retsult;}
    }
    return(elsevalue);
}
async function getInfo(){
    if (localStorage.getItem("check")===null){
        return null
    }
    var retsult=await fetch("https://kuankuan.site/user/info",{
        method:'GET',
        headers:{
            "check":localStorage.getItem("check")
        }
	})
    if (retsult.status!==200){
        localStorage.removeItem("check")
        return null
    }
    return await retsult.json()
}
async function changeInfo(birthDate,sex){
    var retsult=await fetch("https://kuankuan.site/user/change/info",{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check")
        },
        body:JSON.stringify({
            birthDate:birthDate,
            sex:sex
        })
	})
    if (retsult.status!==200){
        localStorage.removeItem("check")
        return false
    }
    return true
}
async function changePassword(password){
    var retsult=await fetch(`https://kuankuan.site/user/change/password?action=${localStorage.getItem("action")}`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check")
        },
        body:JSON.stringify({
            password:password
        })
	})
    if (retsult.status===401){
        location.href="/check/email?from="+location.href
    }
    else if(retsult.status===403){
        location.href="/login?from="+location.href
    }
    else if(retsult.status===200){
        return true
    }return false
}
async function getChangeEmailCode(ele,email,retry=null){
    var retsult =await fetch(`https://kuankuan.site/user/change/email/send?action=${localStorage.getItem("action")}`,{
        method:'POST',
        headers:{
            "check":localStorage.getItem("check"),
            "Content-Type":'application/json',
        },
        body:JSON.stringify({
            email:email
        })
    })
    if (retsult.status==200){
        ele.classList.add("disabled")
        countBackwardsInText(ele,60,(ele)=>{
            try{
                ele.classList.remove("disabled")
                ele.innerText="重新发送"
            }catch{}
        })
        return true
    }
    else if (retsult.status==503){
        showMessage("操作过于频繁请稍后再试",retry)
    }
    else if (retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }else if (retsult.status==402){
        showMessage("邮箱已经被使用过了")
    }
    else if (retsult.status==401){
        location.href="/check/email?from="+encodeURI(location.href)
    }return false
}
async function checkChangeEmailCode(code){
    var retsult = await fetch("https://kuankuan.site/user/change/email/check",{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            code:code,
        })
    })
    if (retsult.status==200){
        return true
    }else if(retsult.status==403){
        location.href="/login?from="+encodeURI(location.href)
    }else if(retsult.status==503){
        showMessage("请先发送验证码")
    }else if(retsult.status==401){
        showMessage("验证码错误")
    }return false
}
async function getFeadbackList(from,to){
    var retsult =await fetch(`https://kuankuan.site/feedback/list?from=${from}&to=${to}`)
    if(retsult.status = 200){
        return await retsult.json()
    }
    return null
}
async function getFeadbackData(id){
    var retsult =await fetch(`https://kuankuan.site/feedback/data/${id}`)
    if(retsult.status = 200){
        return await retsult.json()
    }
    return null
}
async function getRights(){
    if (localStorage.getItem("check")==null){
        return null
    }
    var retsult =await fetch(`https://kuankuan.site/user/rights`,{
        headers:{
            check:localStorage.getItem("check")
        }
    })
    if(retsult.status = 200){
        return parseInt(await retsult.text())
    }
    return null
}
async function saveFeedback(statue,reply){
    var retsult = await fetch("https://kuankuan.site/feedback/update",{
        method: "POST",
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            id:parseInt(getQueryVariable("id")),
            statue:statue,
            reply:reply
        })
    })
    if (retsult.status = 200){
        showMessage("保存成功")
    }else{
        showMessage("保存失败:"+retsult.status + " " + await retsult.statusText)
    }
}
async function delFeedback(statue,reply){
    var retsult = await fetch("https://kuankuan.site/feedback/delete",{
        method: "POST",
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            id:parseInt(getQueryVariable("id")),
        })
    })
    if (retsult.status = 200){
        showMessage("删除成功")
    }else{
        showMessage("删除失败:"+retsult.status + " " + await retsult.statusText)
    }
}
async function newFeedback(title,content,recirculationStep){
    var retsult = await fetch("https://kuankuan.site/feedback/new",{
        method: "POST",
        headers:{
            "Content-Type":'application/json',
            "check":localStorage.getItem("check"),
        },
        body:JSON.stringify({
            title:title,
            content:content,
            recirculationStep:recirculationStep
        })
    })
    if (retsult.status == 200){
        location.href="/feedback/data?id="+await retsult.text()
    }else{
        if (retsult.status==403){
            location.href="/login?from=/feedback/new"
        }
    }
}