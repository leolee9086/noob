export function getAllTabs(){
    const tabs = []
    const getTabs = (layout) => {
        for (let i = 0; i < layout.children.length; i++) {
            const item = layout.children[i];
            if (item.headElement) {
                tabs.push(item)
            } else {
                item.children? getTabs(item ):null
            }
        }
    };
    if (window.siyuan.layout.layout) {
        getTabs(window.siyuan.layout.layout);
    }
    return tabs
}
export function getAllModels(){
    const models ={
        editor: [],
        graph: [],
        asset: [],
        outline: [],
        backlink: [],
        search: [],
        custom:[],
        all:[]
    }
    const getTabs = (layout) => {
        for (let i = 0; i < layout.children.length; i++) {
            const item = layout.children[i];
            if (item.headElement&&item.model) {
                const model = item.model;
                models.all.push(model)
                if (model.initProtyle) {
                    models.editor.push(model);
                } 
                else if (item.panelElement&&item.panelElement.classList.contains("sy__graph")) {
                    models.graph.push(model);
                } 
                else if (model.openNodes) {
                    models.outline.push(model);
                } 
                else if (model.editors) {
                    models.backlink.push(model);
                } 
                else if (model.pdfId) {
                    models.asset.push(model);
                } 
                else if (model.text) {
                    models.search.push(model);
                }
            } else {
                item.children? getTabs(item ):null
            }
        }
    };
    if (window.siyuan.layout.layout) {
        getTabs(window.siyuan.layout.layout);
    }
    return models;
}
