export default class NaiveFrontend{
    constructor(naive){
        this.naive=naive
        if(window.siyuan){
            this.更改主题()
        }
    }
    更改主题(){
        let theme = this.naive.public.config.frontend.theme
        document.querySelector('#themeStyle').setAttribute("href",`/appearance/themes/${theme}/theme.css`)
    }
}