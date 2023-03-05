import { getAllModels } from "../util.js/layout"
export const openNoteById =(id)=>{
    let editor
    let activeEditor 
    let models = getAllModels()
    allModels.editor.find((item) => {
        if (item.editor.protyle.block.rootID === options.rootID) {
            if (hasClosestByClassName(item.element, "layout__wnd--active")) {
                activeEditor = item;
            }
            editor = item;
        }
        if (activeEditor) {
            return true;
        }
        if (activeEditor) {
            editor = activeEditor;
        }
        if (editor) {
            switchEditor(editor, options, allModels);
            return true;
        }

    });

}