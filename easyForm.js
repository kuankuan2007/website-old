class Controler {
    style = {}
    hoverStyle={}
    constructor(obj) {
        this._data = obj
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        console.log(this.hoverStyle, this._data.hoverStyle)
    }
    update(obj) {
        this._data = obj
        this.refresh()
    }
    refresh() {
        this._ele.addEventListener('mouseenter', (e)=>{
            for (var i in this.hoverStyle){
                this._ele.style[i] = this.hoverStyle[i]
            }
        })
        this._ele.addEventListener('mouseleave', (e)=>{
            for (var i in this.hoverStyle){
                this._ele.style[i] = ""
            }
            for (var i in this.style){
                this._ele.style[i] = this.style[i]
            }
        })
        if (this._data.attributes) {
            for (let key in this._data.attributes) {
                this._ele.setAttribute(key, this._data.attributes[key])
            }
        }
        if (this.style) {
            for (let key in this.style) {
                this._ele.style[key] = this.style[key]
            }
        }
    }
    set retsult(args) {
        throw new Error("This property is read-only")
    }
}
class Frame extends Controler {
    style={
        "position":"relative",
    }
    get retsult() {
        let retsult = {}
        for (let i in this._children) {
            Object.assign(retsult, this._children[i].retsult)
        }
        return retsult
    }
    constructor(obj) {
        super(obj)
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        this._ele = document.createElement("div")
        this._children = []
        for (let i = 0; i < this._data.children.length; i++) {
            this._children[i] = new this._data.children[i].type(this._data.children[i])
            this._ele.appendChild(this._children[i]._ele)
        }
        this.refresh()
    }
    update(obj) {
        this._data = obj
        for (let i = 0; i < this._data.children.length; i++) {
            this.children[i].update(this._data.children[i])
        }
        this.refresh()
    }
    refresh() {
        super.refresh()
    }
}
class _DialogBoxButtons{
    style={
        float: "right",
        margin: "5px",
        border: "none",
        backgroundColor: "#0000ff",
        padding: "5px",
        borderRadius: "5px",
        fontSize: "16px",
        color: "#ffffff",
        cursor: "pointer",
        transition:"0.3s"
    }
    hoverStyle={
        transform:"scale(1.2)"
    }
    constructor(name,style={}){
        this._ele=document.createElement("input")
        this._ele.setAttribute("value",name)
        this._ele.setAttribute("type","button")
        console.log(this.style,style)
        Object.assign(this.style,style)
        for (let i in this.style){
            this._ele.style[i]=this.style[i]
        }
        this._ele.addEventListener("mouseenter",()=>{
            for (var i in this.hoverStyle){
                this._ele.style[i]=this.hoverStyle[i]
            }
        })
        this._ele.addEventListener("mouseleave",()=>{
            for (var i in this.hoverStyle){
                this._ele.style[i]=""
            }
            for (let i in this.style){
                this._ele.style[i]=this.style[i]
            }
        })
    }
}
class DialogBox {
    style = {
        "backgroundColor": "white",
        "font-size": "16px",
        "padding": "10px",
        "borderRadius": "10px",
        "maxWidth": "100%",
        "maxHeight": "100%",
        "minWidth": "40%"
    }
    hoverStyle={}
    constructor(obj,onclose=null) {
        this._data = obj
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        this._frame = new Frame(this._data.content)
        this._ele = document.createElement("div")
        this._ele.style.position = "fixed"
        this._ele.style.zIndex = 1000
        this._ele.style.top = "0px"
        this._ele.style.left = "0px"
        this._ele.style.width = "100%"
        this._ele.style.height = "100%"
        this._ele.style.transition="0.3s"
        this._ele.style.backgroundColor = "rgba(0,0,0,0.0)"
        this._center = document.createElement("div")
        this._center.style.position = "absolute"
        this._center.style.top = "50%"
        this._center.style.left = "50%"
        this._center.style.transform = "translate(-50%,50%)"
        this._center.style.opacity = "0"
        this._center.style.transition="0.3s"
        setTimeout(()=>{
            this._center.style.transform = "translate(-50%,-50%)"
            this._center.style.opacity = "1"
            this._ele.style.backgroundColor="rgba(0,0,0,0.5)"
        },50)
        this._ele.appendChild(this._center)
        this._title = new Frame({
            css:{
                "marginBottom":"20px"
            },
            children: [
                {
                    type: TextBox,
                    text: this._data.title,
                    css: {
                        fontSize: "24px",
                        margin: "10px",
                        fontWeight: "bold"
                    }
                },
                {
                    type: Frame,
                    children: [],
                    css: {
                        "height": "5px",
                        "background": "linear-gradient(60deg,#0000ff 20%,#ff00ff 40%, transparent)",
                        "borderRadius": "5px",
                    }
                }
            ]
        })
        if (!this._data.hiddenTitle) {
            this._center.style.marginTop = "0"
            this._center.appendChild(this._title._ele)
        }
        this._center.appendChild(this._frame._ele)
        this._buttons=document.createElement("div")
        this._buttons.style.position = "relative"
        this._buttons.style.margin = "10px"
        if (this._data.buttons){
            for (let i in this._data.buttons){
                let button=new _DialogBoxButtons(i,this._data.buttons[i].style)
                button._ele.addEventListener("click",()=>{if (this._data.buttons[i].func.call(this,this.retsult)==="break"){this.remove()}})
                this._buttons.appendChild(button._ele)
            }
            this._center.appendChild(this._buttons)
        }
        
        this._close=document.createElement("p")
        this._close.classList.add("demo-icon")
        this._close.innerText="\ue80c"
        this._close.style.cursor="pointer"
        this._close.style.color="red"
        this._close.style.fontSize="15px"
        this._close.style.margin="0px"
        this._close.style.padding="0px"
        this._close.style.position="absolute"
        this._close.style.top="5px"
        this._close.style.right="5px"
        this._close.style.transition="0.3s"
        this._close.addEventListener("click", ()=>{this.remove()})
        this._close.addEventListener("mouseenter", (e)=>{this._close.style.transform="scale(1.3)"})
        this._close.addEventListener("mouseleave", (e)=>{this._close.style.transform="scale(1)"})
        if (!this._data.hiddenCloseButton){
            this._center.appendChild(this._close)
        }
        this.onclose=onclose
        this.refresh()
        try{
            document.activeElement.blur()
        }catch{}
        
        document.body.appendChild(this._ele)
    }
    refresh() {
        if (this._data.attributes) {
            for (let key in this._data.attributes) {
                this._center.setAttribute(key, this._data.attributes[key])
            }
        }
        if (this.style) {
            for (let key in this.style) {
                this._center.style[key] = this.style[key]
            }
        }
    }
    remove(){
        
        setTimeout(()=>{
            this._center.style.transform = "translate(-50%,-150%)"
            this._center.style.opacity = "0"
            this._ele.style.backgroundColor="rgba(0,0,0,0)"
            setTimeout(()=>{
                this._ele.remove()
            },300)
        },0)
        if (typeof this.onclose==="function"){
            this.onclose()
        }
    }
    get retsult() {
        return this._frame.retsult
    }
    set retsult(value) {
        throw new Error("This property is read-only")
    }
}
class TextBox extends Controler {
    style={
        margin:"5px",
        transition:"0.3s",
        cursor:"default"
    }
    hoverStyle={
        color:"#0000ff"
    }
    get retsult() {
    }
    constructor(obj) {
        super(obj)
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        this._ele = document.createElement("p")
        this._data = obj
        this.refresh()
    }
    refresh() {
        super.refresh()
        this._ele.innerText = this._data.text
    }
}
class EnterBox extends Controler {
    style={
        background: "rgb(208 208 255)",
        outline: "none",
        border: "none",
        borderRadius: "5px",
        padding: "10px",
        fontSize: "16px",
        minWidth:"400px",
        transition:"0.3s"
    }
    hoverStyle={
        background: "rgb(171 171 255)"
    }
    constructor(obj) {
        super(obj)
        if (obj.attributes && obj.attributes.type==="color") {
            this.style.padding=""
            this.style.height="36px"
        }
        this._ele = document.createElement("input")
        this._data = obj
        if (this._data.value){
            this._ele.value=this._data.value
        }
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        this.refresh()
    }
    refresh() {
        super.refresh()
    }
    get retsult() {
        let retsult = {}
        if (this._data.name) {
            retsult[this._data.name] = this._ele.value
        }
        return retsult
    }
}
class GridFrame extends Frame {
    style={
        position: "relative",
        display: "grid",
        gridTemplateRows: "1fr",
        gridGap: "10px",
        left: "50%",
        transform: "translate(-50%,0)",
        width: "fit-content",
    }
    constructor(obj) {
        super(obj)
        this.style.gridTemplateColumns=`repeat(${this._data.columnsNum}, max-content)`
        this.style.gridTemplateRows=`repeat(${this._data.rowsNum}, max-content)`
        Object.assign(this.style, this._data.css)
        Object.assign(this.hoverStyle, this._data.hoverStyle)
        this.refresh()
    }
    refresh() {
        super.refresh()
    }
}
function showMessage(msg,onclose=null) {
    new DialogBox({
        title: "提示",
        parent: this,
        buttons: {
            "确定": {
                func: function (value) {
                    return "break"
                },
            }
        },
        content: {
            children: [
                {
                    type:TextBox,
                    text:msg
                }
            ]
        }
    },onclose)
}
function showError(msg,onclose=null) {
    new DialogBox({
        title: "错误",
        parent: this,
        hiddenTitle:true,
        buttons: {
            "确定": {
                func: function (value) {
                    return "break"
                },style:{
                    background:"red"
                }
            }
        },
        content: {
            children: [
                {   

                    type:Frame,
                    css:{
                        "marginBottom":"20px"
                    },
                    children: [
                        {
                            type: TextBox,
                            text: "错误",
                            css: {
                                fontSize: "24px",
                                margin: "10px",
                                fontWeight: "bold",
                            },
                            hoverStyle:{
                                color:"#ff0000"
                            }
                        },
                        {
                            type: Frame,
                            children: [],
                            css: {
                                "height": "5px",
                                "background": "linear-gradient(60deg,#ff0000 60%, transparent)",
                                "borderRadius": "5px",
                            }
                        }
                    ]
                },
                {
                    type:TextBox,
                    text:msg,
                    hoverStyle:{
                        color:"#ff0000"
                    }
                }
            ]
        }
    },onclose)
}
// a = new DialogBox({
//     title: "你好呀",
//     buttons:{
//         "确定":{
//             func:function(value){
//                 return "break"
//             },
//         },
//         "取消":{
//             func:function(value){
//                 return "break"
//             },
//         }
//     },
//     content: {
//         children: [
//             {
//                 type: GridFrame, 
//                 columnsNum: 2,
//                 children: [
//                     {
//                         type: TextBox, text: "颜色"
//                     },
//                     {
//                         type: EnterBox,
//                         attributes: {
//                             type: "color"
//                         },
//                         css:{
//                             paddingLeft:0
//                         },
//                         name:"color"
//                     },
//                     {
//                         type: TextBox, text: "邮件"
//                     },
//                     {
//                         type: EnterBox,
//                         attributes: {
//                             type: "email",
//                         },
//                         name:"size"
//                     },
//                     {
//                         type: TextBox, text: "尺寸"
//                     },
//                     {
//                         type: EnterBox,
//                         attributes: {
//                             type: "number",
//                             min : 0,
//                         },
//                         name:"size"
//                     }]
//             }]
//     }
// })
