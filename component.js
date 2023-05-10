class Select{
    constructor(li,choice=0,onchange=(select)=>{}){
        this.ele=document.createElement("div")
        this.ele.classList.add("select")
        this.retsultBox=document.createElement("span")
        this.retsultBox.classList.add("selectValue")
        this.retsultBox.innerText=li[choice]
        this.button=document.createElement("span")
        this.button.innerText="\ue805"
        this.button.classList.add("selectButton")
        this.button.classList.add("demo-icon")
        this.list=document.createElement("ul")
        this.list.classList.add("selectList")
        this.data=li
        var father=this
        for (var i=0;i<li.length;i++){
            var item=document.createElement("li")
            item.innerText=li[i]
            item.classList.add(li[i])
            item.addEventListener("click",function(){
                father.value=this.innerText
                father.retsultBox.innerText=this.innerText
                father.list.querySelector(".choice").classList.remove("choice")
                father.list.querySelector(`.${this.innerText}`).classList.add("choice")
                onchange(father)
            })
            this.list.appendChild(item)
        }
        this.list.children[choice].classList.add("choice")
        this.ele.appendChild(this.retsultBox)
        this.ele.appendChild(this.button)
        this.ele.appendChild(this.list)
        this.value=li[choice]
        onchange(this)
    }
}
class MarkdownEditor{
    constructor(){
        this.converter = new showdown.Converter({
            parseImgDimensions:true,
            headerLevelStart:3,
            simplifiedAutoLink:true,
            excludeTrailingPunctuationFromURLs:true,
            strikethrough:true,
            tables:true,
            tasklists:true,
            simpleLineBreaks:true,
            openLinksInNewWindow:true,
        })
        this.ele=document.createElement("div")
        this.ele.classList.add("markdown")
        this.editor=document.createElement("textarea")
        this.editor.classList.add("markdownEditor")
        this.shower=document.createElement("div")
        this.shower.classList.add("markdownShower")
        this.ele.appendChild(this.editor)
        this.ele.appendChild(this.shower)
        this._value=""
        Object.defineProperty(this,"value",{
            get:()=>{
                return this._value
            },
            set:(text)=>{
                this._value=text
                setTimeout(()=>{
                    this.editor.style.height="auto"
                    this.editor.style.height=this.editor.scrollHeight-20+"px"
                },0)
                this.editor.value=text
                this.refresh()
            }
        })
        this.editor.addEventListener("input",(e)=>{
            this.value=e.target.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script.*>/gi, '');
        })
    }
    refresh(){
        this.shower.innerHTML=this.converter.makeHtml(this.value)
        hljs.highlightAll()
        MathJax.typeset()
    }
}