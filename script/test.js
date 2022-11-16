import { getAllModels, getAllTabs } from "./noobApi/util/layout.js"
import commonMenu from "./noobApi/registries/commonMenu.js"
document.addEventListener(
    "click", (event) => {
        console.log(getAllModels())
        console.log(getAllTabs())
    }, true
)

