try{
    $("body")
}
catch{
    var jquerySrc=document.createElement("script");
    jquerySrc.src="/jquery.js"
    document.head.prepend(jquerySrc)
}
function showTipsWindowsClick(num){
    console.log(num)
    isTipsClipt=num
}
var isTipsClipt=-100
function showTipsMainloop(fu){
    if (isTipsClipt!=-99){
        fu()
    }else{
        setTimeout(showTipsMainloop, 100,fu)
    }
}
function showTipsWaitloop(fu){
    if (isTipsClipt==-100){
        fu()
    }else{
        setTimeout(showTipsMainloop, 100,fu)
    }
}

async function showTipsWindows(title,message,buttons,recall=null){
    if (isTipsClipt!=-100){
        await new Promise(resolve => setTimeout(showTipsWaitloop, 100,resolve));
    }
    isTipsClipt=-99
    $("body").append(`<div id="tipsWindow" style="background-color: rgb(0 0 0 / 50%);position: fixed;z-index: 1000;top: 0;left: 0;width: 100%;height: 100%;"><style>.tipsButton {-webkit-transition-duration: 0.5s;transition-duration: 0.5s;float: right;padding-left: 10px;padding-top: 5px;padding-right: 10px;padding-bottom: 5px;background-color: #0000ff;color: #ffffff;border-radius: 5px;margin: 0;margin-left: 10px;cursor: pointer;background-image: linear-gradient(to right bottom, #8500ff, #b400ed, #d500dc, #ed00cc, #ff00bd);}.tipsButton:hover {transform: scale(1.2)}@keyframes tipsWindowsLineChange {0% {opacity: 0;}100% {opacity: 1;}}</style><div style="position: absolute;top: 50%;left: 50%;min-height: 100px;width: 500px;max-height: 100%;background-color: #eee7ff;border-radius: 10px;transform: translate(-50%, -50%);padding: 15px;"><p style="font-size: 21px;line-height: 22px;margin: 0;padding-left: 10px;font-weight: bold;">${title}</p><div style="width: 100%;height: 4px;margin-top: 10px;margin-bottom: 10px;border-radius: 100px;-webkit-mask: linear-gradient(to right,black,transparent);mask: linear-gradient(to right,black,transparent);background-color: #0000ff;animation: tipsWindowsLineChange 0 1s;"></div><p style="padding: 10px;">${message}</p><div id="showTipButtons"><div style="clear: both;"></div></div><p style="margin: 0;padding: 0;position: absolute;top: 5px;right: 5px;width: 20px;height: 20px;text-align: center;color: white;background-color: #ff0000;border-radius: 50%;font-size: 13px;cursor: pointer;" onclick="showTipsWindowsClick(-1)">×</p></div></div>`)
    for (var i=0;i<buttons.length;i++){
        $("#showTipButtons").prepend(`<p class="tipsButton" onclick="showTipsWindowsClick(${i})">${buttons[i]}</p>`)
    }
    await new Promise(resolve => setTimeout(showTipsMainloop, 100,resolve));
    console.log("return")
    if (recall!=null){
        recall(isTipsClipt)
    }
    $("#tipsWindow").remove()
    isTipsClipt=-100
}
function showMessage(message){
    showTipsWindows("提示",message,["确定"])
}