import { openFileById } from "./editor/util";
import { Constants } from "./constants";
import { Tab } from "./layout/Tab"
import { getAllTabs } from "./layout/getAll";
import { Editor } from "./editor";
import { insertEmptyBlock } from "./block/util"
import commonMenuRegistry  from "./apiUtil/commenMenu"
class SiYuanAPI {

    public openFile(id) {
        if (id instanceof Object) {
            openFileById(id)

        }
        else {
            let data = ({
                id: id,
                action: ["cb-get-context"]
            })
            openFileById(data)
        }
    }
    public Tab = Tab
    public TabHandler = new TabHandler()
    public commonMenuRegistry = new commonMenuRegistry()
    constructor(){
        window.siyuan.menus.menu=this.commonMenuRegistry
    }
}
class TabHandler{
    public getTabsByBlockId(targetId: string) {
        let tabs = getAllTabs(window.siyuan.layout.centerLayout);
        let Editors:Array<any> = []
        tabs.forEach(
            tab=>{
                if(tab.model&&tab.model instanceof Editor){
                    let id = tab.model.editor.protyle.block.id
                    if(id==targetId){
                        Editors.push(tab)
                    }
                }
            }
        )
        return Editors
    }
    public getAllTabs= getAllTabs
    public removeTab(tab:Tab){
        tab.parent.removeTab(tab.id)
    }
}
class DockHandler{
}
class blockHandler{

}
class MenuHandler{

}
class EditorHandler{
    getCurrentEditor(){
        
    }
    insertEmptyBlock(protyle: IProtyle,position: InsertPosition, id?: string){
        
    }

}
class SelectionHandler{
    
}
export default SiYuanAPI
