class Controler {
    style = {}
    constructor(obj) {
        this._data = obj
        Object.assign(this.style, this._data.css)
    }
    update(obj) {
        this._data = obj
        this.refresh()
    }
    refresh() {
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
    }
    constructor(name,style={}){
        this._ele=document.createElement("input")
        this._ele.setAttribute("value",name)
        this._ele.setAttribute("type","button")
        Object.assign(this.style,style)
        for (let i in this.style){
            this._ele.style[i]=this.style[i]
        }
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
    constructor(obj,onclose=null) {
        this._data = obj
        Object.assign(this.style, this._data.css)
        this._frame = new Frame(this._data.content)
        this._ele = document.createElement("div")
        this._ele.style.position = "fixed"
        this._ele.style.zIndex = 1000
        this._ele.style.top = "0px"
        this._ele.style.left = "0px"
        this._ele.style.width = "100%"
        this._ele.style.height = "100%"
        this._ele.style.backgroundColor = "rgba(0,0,0,0.5)"
        this._center = document.createElement("div")
        this._center.style.position = "absolute"
        this._center.style.top = "50%"
        this._center.style.left = "50%"
        this._center.style.transform = "translate(-50%,-50%)"
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
                        margin: "10px"
                    }
                },
                {
                    type: Frame,
                    children: [],
                    css: {
                        "height": "5px",
                        "backgroundColor": "#0000ff",
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
        this._close.addEventListener("click", ()=>{this.remove()})
        if (!this._data.hiddenCloseButton){
            this._center.appendChild(this._close)
        }
        this.onclose=onclose
        this.refresh()
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
        this._ele.remove()
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
        margin:"5px"
    }
    get retsult() {
    }
    constructor(obj) {
        super(obj)
        Object.assign(this.style, this._data.css)
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
        background: "#b4b4ff",
        outline: "none",
        border: "none",
        borderRadius: "10px",
        paddingLeft: "10px",
        fontSize: "16px",
        padding:"2px",
        minWidth:"400px"
    }
    constructor(obj) {
        super(obj)
        this._ele = document.createElement("input")
        this._data = obj
        if (this._data.value){
            this._ele.value=this._data.value
        }
        Object.assign(this.style, this._data.css)
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
