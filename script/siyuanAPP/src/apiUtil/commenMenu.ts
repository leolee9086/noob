import { Menu } from "../menus/Menu"
import { MenuItem } from "../menus/Menu"
export function dataTypeToType(dataType){
    let blockTypes ={
        "NodeDocument":         "d",
        "NodeHeading":          "h",
        "NodeList":             "l",
        "NodeListItem":         "i",
        "NodeCodeBlock":        "c",
        "NodeMathBlock":        "m",
        "NodeTable":            "t",
        "NodeBlockquote":       "b",
        "NodeSuperBlock":       "s",
        "NodeParagraph":        "p",
        "NodeHTMLBlock":        "html",
        "NodeBlockQueryEmbed":  "query_embed",
        "NodeKramdownBlockIAL": "ial",
        "NodeIFrame":           "iframe",
        "NodeWidget":           "widget",
        "NodeThematicBreak":    "tb",
        "NodeVideo":            "video",
        "NodeAudio":            "audio",    
    }
    return blockTypes[dataType]
}
export default class commonMenuRegistry extends Menu {
    public registry
    constructor() {
        super()
        this.registry = {
            blockMenu: {
                "d": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "h": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "l": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "i": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "c": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "m": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "t": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "b": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "s": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "p": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "html": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "query_embed": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "ial": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "iframe": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "widget": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "tb": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "video": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
                "audio": {
                    customMenuItem: [],
                    customSubMenuItem:[]
                },
            }
        }
    }
    public append(element?: HTMLElement) {
        if (!element) {
            return;
        }
        this.element.append(element);
        if (element.querySelector("[data-type]")&&element.classList.contains("b3-menu__item--readonly")){
            let type = element.querySelector("[data-type]").dataset.type
            if(dataTypeToType(type)){
                console.log(type)

                this.renderBlockCustomMenu(dataTypeToType(type))
            }
        }
    }
    public renderCustom(menuType,option){
        this.element.setAttribute("menu-type",menuType)
    }
    public renderBlockCustomMenu(type){
        let customBlockSetting =this.registry.blockMenu[type]
        console.log(customBlockSetting.customMenuItem)
        customBlockSetting.customMenuItem.forEach(
            item=>{
                let menuItem = new MenuItem(item) 
                menuItem.element.classList.add("b3-menu__item--customed")
                if(item.before){
                    let position = this.element.querySelector(item.before)
                    if(position){
                    this.element.insertBefore(menuItem.element,position)
                    }else{
                        this.element.insertBefore(menuItem.element,this.element.lastElementChild)
                    }
                }else{
                    this.element.insertBefore(menuItem.element,this.element.lastElementChild)
                }
            }
        )
        if(!(this.element.lastElementChild.previousElementSibling.getAttribute("class")==="b3-menu__separator")){
            this.element.insertBefore(new MenuItem({type:"separator" }).element,this.element.lastElementChild)
        }
    }
}