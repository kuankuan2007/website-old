var defaultData = {
    links: [{
        background: "#0E2AFF",
        content: "作者博客、文档",
        contentColor: "#e4e536",
        height: "160px",
        href: "https://kuankuan2007.gitee.io/",
        title: "宽宽的小天地",
        titleColor: "#e4e536",
    }],
    searchEngines: {
        baidu: {
            button: "百度一下",
            url: "https://www.baidu.com/s?wd={question}",
        },
        bing: {
            button: "Bing 搜索",
            url: "https://cn.bing.com/search?q={question}",
        },
        google: {
            button: "Google 搜索",
            url: "https://www.google.com/search?q={question}",
        },
        yahoo: {
            button: "yahoo 搜索",
            url: "https://search.yahoo.com/search?p={question}"
        }
    },
    searchEngine: "",
    lastSearchEngine: "baidu",
    boxWidth: 280,
    boxGap: 10,
    searchOpenNewWindow: false,
    headerBG: "url(https://www.dmoe.cc/random.php) center center /cover no-repeat",
    linkboxBG: "url(https://img.paulzzh.com/touhou/random) center center /cover no-repeat"
}
var data = {}
if (localStorage.data) {
    data = JSON.parse(localStorage.data)
} else {
    data = defaultData
}
var headerBox = document.getElementById("headerBox")
var linkbox = document.getElementById("links")
var linksShower = document.getElementById("linksShower")
var linksScroll = document.getElementById("linksScroll")
var searchType = document.getElementById("searchType")
var searchTypeList = document.getElementById("searchTypeList")
var searchInput = document.getElementById("searchInput")
var searchEngine = ""
var searchBox = document.getElementById("searchBox")
var searchTypeButtonBox = document.getElementById("searchTypeButtonBox")
var headerBG = document.getElementById("headerBG")
var setButton = document.getElementById("setButton")
var exitSetButton = document.getElementById("exitSetButton")
var searchEnginesSet = document.getElementById("searchEnginesSet")
var searchEnginesSetBox = document.getElementById("searchEnginesSetBox")
var addLink = document.getElementById("addLink")
var newEngine = document.getElementById("newEngine")
var useLastEngine = document.getElementById("useLastEngine")
linksShower.style.background = data.linkboxBG
headerBG.style.background = data.headerBG
window.width = window.innerWidth
window.height = window.innerHeight
window.linksPosition = 0
window.onset = false
window.onbeforeunload = e => {
    save()
}
function save() {
    localStorage.data = JSON.stringify(data)
}
function exportData() {
    const stringData = JSON.stringify(data, null, 2)
    const blob = new Blob([stringData], {
        type: 'application/json'
    })
    const objectURL = URL.createObjectURL(blob)
    const aTag = document.createElement('a')
    aTag.href = objectURL
    aTag.download = "newTab.json"
    aTag.click()
    aTag.remove()
    URL.revokeObjectURL(objectURL)
}
/**
  * 打开文件选取对话框
  * @param fn 选取文件后回调，接收event和filelist参数
  * @param accept 文件类型
  * @param multiple 是否多选
  */
function openFilePicker({ fn, accept, multiple } = {}) {
    const inpEle = document.createElement("input");
    inpEle.id = `__file_${Math.trunc(Math.random() * 100000)}`;
    inpEle.type = "file";
    inpEle.style.display = "none";
    accept && (inpEle.accept = accept);
    multiple && (inpEle.multiple = multiple);
    inpEle.addEventListener("change", event => fn.call(inpEle, event, inpEle.files), { once: true });
    inpEle.click();
}
function loadData() {
    openFilePicker({fn:loadDataCallback,accept:"application/json"})
}
function loadDataCallback(e,files){
    try{
        var reader=new FileReader()
        reader.readAsText(files[0],'utf-8')
        reader.onload=()=>{
            try{
                var obj=JSON.parse(reader.result)
                check={
                    links:"object",
                    searchEngines:"object",
                    searchEngine:"string",
                    boxWidth:"number",
                    boxGap:"number",
                    searchOpenNewWindow:"boolean",
                    headerBG:"string",
                    linkboxBG:"string"
                }
                for (var i in check){
                    if ((typeof obj[i])!==check[i]){
                        showMessage(`导入失败，字段${i}应为${check[i]}类型，但是提供的是${typeof obj[i]}`)
                        return
                    }
                }
                data=obj
                save()
                location.reload();
            }catch{
                showMessage("打开文件失败，无法将其内容读取为json格式")
            }
            
        }
    }catch{
        showMessage("打开文件失败，无法读取文件内容")
    }
    
}
function cal() {
    var num = Math.max(Math.floor((window.width - 20) / (data.boxWidth + 25)), 1)
    var gap = ((window.width - 20) / num - data.boxWidth - 20)
    return {
        num: num,
        gap: gap
    }
}
function refreshColumns() {
    var { num, gap } = cal()
    var positionList = []
    for (let i = 0; i < num; i++) {
        positionList[i] = 0
    }
    for (let i = 0; i < linkbox.children.length; i++) {
        var ele = linkbox.children[i].children[0]
        var index = 0
        for (var j = 1; j < num; j++) {
            if (positionList[j] < positionList[index]) {
                index = j
            }
        }
        ele.style.top = positionList[index] + "px"
        ele.style.left = index * (data.boxWidth + 20 + gap) + "px"
        positionList[index] += parseInt(ele.style.height.split("px")[0]) + data.boxGap + 20
    }
    linkbox.style.width = num * (data.boxWidth + 20) + (num - 1) * gap + "px"
    linkbox.style.height = Math.max.apply(null, positionList) + "px"
}
function random(min, max) {
    return Math.random() * (max + 1 - min) + min
}
function randint(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
function randChoice(array) {
    return array[randint(0, array.length - 1)]
}
function randColor() {
    li = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    return `#${randChoice(li)}${randChoice(li)}${randChoice(li)}${randChoice(li)}${randChoice(li)}${randChoice(li)}`
}
function search() {
    let value = searchInput.value
    if (value && !(/^ *$/.test(value))) {
        url = (data.searchEngines[searchEngine].url.replace("{question}", encodeURI(value)))
        data.lastSearchEngine=searchEngine
        save()
        if (data.searchOpenNewWindow) {
            window.open(url)
        } else {
            location.href = url;
        }
    }
}
// for (let i=0;i<20;i++){
//     data.links[i]={
//         "height":randint(50,200)+"px",
//         "background":`rgb(${randint(0,255)},${randint(0,255)},${randint(0,255)})`,
//         "title":"abcaaaaaaaaaaaaaaaaaaaaaaaaaa",
//         "titleColor":randColor(),
//         "content":"defaaaaaaaaaaaaaaaaaaaaaaaaaa",
//         "contentColor":randColor(),
//         "href":"https://kuankuan2007.gitee.io"
//     }
// }
function changeSearchType() {
    searchEngine = this.getAttribute("name")
    try {
        document.querySelector("#searchTypeList>li.choice").classList.remove("choice")
    }
    catch { }
    searchType.innerText = data.searchEngines[this.getAttribute("name")].button
    this.classList.add("choice")
}
if (data.searchEngine === "") {
    searchEngine = data.lastSearchEngine
} else {
    searchEngine = data.searchEngine
}
if (!(searchEngine in data.searchEngines)) {
    if (data.searchEngines.length === 0) {
        data.searchEngines.baidu = {
            button: "百度一下",
            url: "https://www.baidu.com/s?wd={question}",
        },
            searchEngine = baidu
    } else {
        searchEngine = Object.keys(data.searchEngines)[0]
    }
}

class UISearchEngine {
    constructor(name) {
        Object.defineProperty(this, "_data", {
            get: function () {
                return data.searchEngines[this.name]
            },
            set: function (value) {
                throw new Error("This property is read-only")
            },
            configurable: false,
        })
        this.name = name
        this.ele = document.createElement("li")
        this.ele.innerText = this._data.button
        this.ele.setAttribute("name", this.name)
        this.ele.addEventListener("click", e => { this.changeSearchEngine.call(this, e) }),
            this.ele.addEventListener("contextmenu", e => { this.searchEngineRightClick.call(this, e) })
    }
    changeSearchEngine(e) {
        data.searchEngine = this.name
        document.querySelector(`#searchEnginesSet > li.choice`).classList.remove("choice")
        this.ele.classList.add("choice")
    }
    searchEngineRightClick(e) {
        e.preventDefault()
        showMenu(e, {
            "编辑": this.edit,
            "删除": this.remove
        }, this)
    }
    edit() {
        new DialogBox({
            title: "设置",
            parent: this,
            buttons: {
                "确定": {
                    func: function (value) {
                        Object.assign(this._data.parent._data, value)
                        this._data.parent.refresh()
                        return "break"
                    },
                },
                "取消": {
                    func: function (value) {
                        return "break"
                    },
                }
            },
            content: {
                children: [
                    {
                        type: GridFrame,
                        columnsNum: 2,
                        children: [
                            {
                                type: TextBox, text: "id"
                            },
                            {
                                type: TextBox, text: this.name
                            },
                            {
                                type: TextBox, text: "名字"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "text"
                                },
                                name: "button",
                                value: this._data.button
                            },
                            {
                                type: TextBox, text: "URL"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "url"
                                },
                                name: "url",
                                value: this._data.url
                            },
                        ]
                    }]
            }
        })
    }
    refresh() {
        this.ele.innerText = this._data.button
        document.querySelector(`#searchTypeList li[name=${this.name}]`).innerText = this._data.button
    }
    remove() {
        this.ele.remove()
        delete data.searchEngines[this.name]
        document.querySelector(`#searchTypeList li[name=${this.name}]`).remove()
    }
}
for (let i in data.searchEngines) {
    var ele = document.createElement("li")
    ele.innerText = data.searchEngines[i].button
    ele.addEventListener("click", changeSearchType)
    ele.setAttribute("name", i)
    searchTypeList.appendChild(ele)
    searchEnginesSet.insertBefore(new UISearchEngine(i).ele, newEngine)
}
document.querySelector(`#searchTypeList > li[name=${searchEngine}]`).classList.add("choice")
searchType.innerText = data.searchEngines[searchEngine].button;
if (data.searchEngine === "") {
    useLastEngine.classList.add("choice")
} else {
    document.querySelector(`#searchEnginesSet > li[name=${searchEngine}]`).classList.add("choice")
}
useLastEngine.oncontextmenu = e => {
    e.preventDefault()
}
useLastEngine.onclick = e => {
    data.searchEngine = ""
    document.querySelector(`#searchEnginesSet > li.choice`).classList.remove("choice")
    useLastEngine.classList.add("choice")
}
newEngine.oncontextmenu = e => {
    e.preventDefault()
}
newEngine.onclick = e => {
    var id = "customized"
    for (var i = 0; i < 1000; i++) {
        if (!((id + i) in data.searchEngines)) {
            id = id + i
            break
        }
    }
    new DialogBox({
        title: "新建搜索引擎",
        parent: this,
        buttons: {
            "确定": {
                func: function (value) {
                    data.searchEngines[id] = value
                    searchEnginesSet.insertBefore(new UISearchEngine(id).ele, newEngine)
                    var ele = document.createElement("li")
                    ele.setAttribute("name", id)
                    ele.innerText = value.button
                    ele.addEventListener("click", changeSearchType)
                    searchTypeList.appendChild(ele)
                    return "break"
                },
            },
            "取消": {
                func: function (value) {
                    return "break"
                },
            }
        },
        content: {
            children: [
                {
                    type: GridFrame,
                    columnsNum: 2,
                    children: [
                        {
                            type: TextBox, text: "id"
                        },
                        {
                            type: TextBox, text: id
                        },
                        {
                            type: TextBox, text: "名字"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            
                            name: "button",
                            value: "自定义搜索引擎"
                        },
                        {
                            type: TextBox, text: "URL"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "url",
                                placeholder: "用\"{question}\"代替搜索内容"
                            },
                            
                            name: "url",
                            value: ""
                        },
                    ]
                }]
        }
    })
}
function showMenu(e, buttons, parent) {
    if (window.menu) {
        window.menu.remove()
    }
    window.onMenu = e.target
    window.menu = document.createElement("ul")

    window.menu.classList.add("menu")
    window.menu.style.left = e.pageX + "px"
    window.menu.style.top = e.pageY + "px"
    for (let i in buttons) {
        ele = document.createElement("li")
        ele.innerText = i
        ele.addEventListener("click", e => {
            buttons[i].call(parent, e)
            window.menu.remove()
        })
        ele.addEventListener("contextmenu", e => { e.preventDefault() })
        window.menu.appendChild(ele)
    }
    document.body.appendChild(window.menu)
}
window.onclick = function (e) {
    if (window.menu) {
        window.menu.remove()
    }
}

class UILink {
    constructor(num) {
        this.num = num
        Object.defineProperty(this, "_data", {
            get: function () {
                return data.links[this.num]
            },
            set: function (value) {
                throw new Error("This property is read-only")
            },
            configurable: false,
        })
        this.ele = document.createElement("a")
        this.box = document.createElement("div")
        this.box.classList.add("link")
        this.title = document.createElement("p")
        this.title.classList.add("linkTitle")
        this.content = document.createElement("p")
        this.content.classList.add("linkContent")
        this.ele.appendChild(this.box)
        this.box.appendChild(this.title)
        this.box.appendChild(this.content)
        this.ele.addEventListener("click", e => { this.click(e) })
        this.ele.addEventListener("contextmenu", e => { this.rightClick(e) })
        this.refresh()
        this.observer = new ResizeObserver(e => { this.bindResize.call(this, e) });
        this.observer.observe(this.box);
    }
    refresh() {
        this.ele.setAttribute("href", this._data.href)
        this.title.innerText = this._data.title;
        this.content.innerText = this._data.content;
        this.box.style.background = this._data.background
        this.box.style.height = this._data.height
        this.box.style.width = data.boxWidth + "px"
        this.title.style.color = this._data.titleColor
        this.content.style.color = this._data.contentColor
    }
    bindResize(e) {
        try { this._data.height = this.box.style.height }
        catch { }
        refreshColumns()
    }
    rightClick(e) {
        if (!window.onset) {
            return
        }
        e.preventDefault()
        showMenu(e, {
            "编辑": this.click,
            "删除": this.remove
        }, this)
    }
    remove() {
        for (let i = this.num + 1; i < links.length; i++) {
            links[i].num -= 1
        }
        var _ = data.links.splice(this.num + 1)
        data.links.pop()
        data.links = data.links.concat(_)
        var _ = links.splice(this.num + 1)
        links.pop()
        links = links.concat(_)
        this.ele.remove()
        refreshColumns()
    }
    click(e) {
        if (!window.onset) {
            return
        }
        e.preventDefault()
        new DialogBox({
            title: "设置",
            parent: this,
            buttons: {
                "确定": {
                    func: function (value) {
                        Object.assign(this._data.parent._data, value)
                        this._data.parent.refresh()
                        return "break"
                    },
                },
                "取消": {
                    func: function (value) {
                        return "break"
                    },
                }
            },
            content: {
                children: [
                    {
                        type: GridFrame,
                        columnsNum: 2,
                        children: [
                            {
                                type: TextBox, text: "背景"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "text"
                                },
                                name: "background",
                                value: this._data.background
                            },
                            {
                                type: TextBox, text: "标题颜色"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "color"
                                },
                                name: "titleColor",
                                value: this._data.titleColor
                            },
                            {
                                type: TextBox, text: "内容颜色"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "color"
                                },
                                name: "contentColor",
                                value: this._data.contentColor
                            }, {
                                type: TextBox, text: "标题"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "text"
                                },
                                name: "title",
                                value: this._data.title
                            }, {
                                type: TextBox, text: "内容"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "text"
                                },
                                name: "content",
                                value: this._data.content
                            }, {
                                type: TextBox, text: "URL"
                            },
                            {
                                type: EnterBox,
                                attributes: {
                                    type: "url"
                                },
                                name: "href",
                                value: this._data.href
                            }
                        ]
                    }]
            }
        })
    }
}
function newLink() {
    new DialogBox({
        title: "新建连接",
        buttons: {
            "确定": {
                func: function (value) {
                    data.links[data.links.length] = {
                        "height": randint(50, 200) + "px",
                        "background": value.background,
                        "title": value.title,
                        "titleColor": value.titleColor,
                        "content": value.content,
                        "contentColor": value.contentColor,
                        "href": value.href
                    }
                    links[links.length] = new UILink(data.links.length - 1)
                    linkbox.appendChild(links[links.length - 1].ele)
                    refreshColumns()
                    return "break"
                },
            },
            "取消": {
                func: function (value) {
                    return "break"
                },
            }
        },
        content: {
            children: [
                {
                    type: GridFrame,
                    columnsNum: 2,
                    children: [
                        {
                            type: TextBox, text: "背景"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            
                            name: "background",
                            value: `rgb(${randint(0, 255)},${randint(0, 255)},${randint(0, 255)})`
                        },
                        {
                            type: TextBox, text: "标题颜色"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "color"
                            },
                            
                            name: "titleColor",
                            value: randColor()
                        },
                        {
                            type: TextBox, text: "内容颜色"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "color"
                            },
                            
                            name: "contentColor",
                            value: randColor()
                        }, {
                            type: TextBox, text: "标题"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            name: "title",
                            value: ""
                        }, {
                            type: TextBox, text: "内容"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            name: "content",
                            value: ""
                        }, {
                            type: TextBox, text: "URL"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "url"
                            },
                            name: "href",
                            value: ""
                        }
                    ]
                }
            ]
        }
    })
}
addLink.addEventListener("click", newLink)
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        search()
    }
})
window.scrollTop = 0
var links = []
for (let i = 0; i < data.links.length; i++) {
    links[i] = new UILink(i)
    linkbox.appendChild(links[i].ele)
}
headerBox.onclick = e => {
    if (!window.onset) {
        return
    }
    if (e.target != headerBox) {
        return
    }
    new DialogBox({
        title: "搜索区设置",
        buttons: {
            "确定": {
                func: function (value) {
                    data.headerBG = value.background
                    headerBG.style.background = value.background
                    return "break"
                },
            },
            "取消": {
                func: function (value) {
                    return "break"
                },
            }
        },
        content: {
            children: [
                {
                    type: GridFrame,
                    columnsNum: 2,
                    children: [
                        {
                            type: TextBox, text: "背景"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            
                            name: "background",
                            value: data.headerBG
                        },
                    ]
                }
            ]
        }
    })
}
linksShower.onclick = e => {
    if (!window.onset) {
        return
    }
    console.log(e.target)
    if (e.target != linksShower && e.target != linkbox && e.target != linksScroll) {
        return
    }
    new DialogBox({
        title: "链接区设置",
        buttons: {
            "确定": {
                func: function (value) {
                    if (value.width && value.gap) {
                        data.boxWidth = parseInt(value.width)
                        data.boxGap = parseInt(value.gap)
                        data.linkboxBG = value.background
                        linksShower.style.background = value.background
                        for (let i = 0; i < links.length; i++) {
                            links[i].box.style.width = data.boxWidth + "px"
                        }
                        refreshColumns()
                        return "break"
                    }

                },
            },
            "取消": {
                func: function (value) {
                    return "break"
                },
            }
        },
        content: {
            children: [
                {
                    type: GridFrame,
                    columnsNum: 2,
                    children: [
                        {
                            type: TextBox, text: "背景"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "text"
                            },
                            
                            name: "background",
                            value: data.linkboxBG
                        },
                        {
                            type: TextBox, text: "链接宽度"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "number"
                            },
                            
                            name: "width",
                            value: data.boxWidth
                        },
                        {
                            type: TextBox, text: "链接间隔"
                        },
                        {
                            type: EnterBox,
                            attributes: {
                                type: "number"
                            },
                            
                            name: "gap",
                            value: data.boxGap
                        },
                    ]
                }
            ]
        }
    })
}
function searchBoxPoosition() {
    var f = Math.max(1 - window.linksPosition / (window.height * 0.3 - 80), 0)
    if (f < 1) {
        searchTypeButtonBox.style.right = "-30px"
        searchTypeButtonBox.style.opacity = "0"
        searchTypeButtonBox.style.pointerEvents = "none"
        searchType.style.paddingRight = "15px"
        headerBox.style.zIndex = "-1"
        searchEnginesSetBox.style.height = "calc(100% - 313px)"
    } else {
        searchTypeButtonBox.style.right = "10px"
        searchTypeButtonBox.style.opacity = "1"
        searchTypeButtonBox.style.pointerEvents = "unset"
        searchType.style.paddingRight = "40px"
        headerBox.style.zIndex = "1"
        searchEnginesSetBox.style.height = "calc(100% - 25px)"
    }
    var h = Math.max(((window.height * 0.3 - 40) / 2 - 25) * f, 5)
    var w = Math.max((window.width / 2 - Math.min(1000, window.width * 0.6) / 2) * f, 5)
    searchBox.style.transform = `translate(${w}px,${h}px) scale(${0.2 * f + 0.8})`
    headerBG.style.opacity = f
}
window.onresize = function () {
    window.width = window.innerWidth
    window.height = window.innerHeight
    linkbox.style.marginTop = window.height * 0.3 + 10 + "px"
    refreshColumns()
    searchBoxPoosition()
}
linksScroll.onscroll = function (ev) {
    window.linksPosition = linksScroll.scrollTop
    linksShower.style.transform = `translate(0px,max(90px,calc(30% - ${window.linksPosition}px)))`
    linksScroll.style.transform = `translate(0px,min(-90px,calc(${window.linksPosition}px - 30%)))`
    searchBoxPoosition()
}
linkbox.ondragstart = e => {
    window.ondragingLink = e.target
    e.dataTransfer.effectAllowed = "move"
    setTimeout(() => {
        e.target.classList.add("moving")
    }, 0)
}
linkbox.ondragend = e => {
    e.target.classList.remove("moving")
}
linkbox.ondragover = e => {
    e.preventDefault()
}
linkbox.ondragenter = e => {
    e.preventDefault()
    if (!window.onset || !(window.ondragingLink) || e.target === linkbox || e.target === window.ondragingLink || !(e.target.classList.value === "link")) {
        return
    }
    const children = Array.from(linkbox.children)
    const sourceIndex = children.indexOf(window.ondragingLink.parentNode)
    const targetIndex = children.indexOf(e.target.parentNode)
    if (sourceIndex < targetIndex) {
        linkbox.insertBefore(window.ondragingLink.parentNode, e.target.parentNode.nextElementSibling)
    } else {
        linkbox.insertBefore(window.ondragingLink.parentNode, e.target.parentNode)
    }
    refreshColumns()
}
function entrySet() {
    window.onset = true
    for (let i = 0; i < linkbox.children.length; i++) {
        linkbox.children[i].children[0].setAttribute("draggable", "true")
    }
    document.body.classList.add("seting")
    searchBox.style.transitionDuration = "0.3s"
}
function exitSet() {
    window.onset = false
    for (let i = 0; i < linkbox.children.length; i++) {
        linkbox.children[i].children[0].setAttribute("draggable", "false")
    }
    document.body.classList.remove("seting")
    setTimeout(() => { searchBox.style.transitionDuration = "0s" }, 0)
    save()
}
window.onresize()
