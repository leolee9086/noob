let temp = `
import {addScriptSync} from '../../protyle/util/addScript'
import {Constants}  from '../../constants'
addScriptSync(\`\${Constants.PROTYLE_CDN}/js/pdf/pdf.js?v=3.0.150\`, 'pdfjsScript')

export default window["pdfjs-dist/build/pdf"]
`
const pdfProps=["__esModule","AnnotationEditorLayer","AnnotationEditorParamsType","AnnotationEditorType","AnnotationEditorUIManager","AnnotationLayer","AnnotationMode","CMapCompressionType","GlobalWorkerOptions","InvalidPDFException","MissingPDFException","OPS","PDFDataRangeTransport","PDFDateString","PDFWorker","PasswordResponses","PermissionFlag","PixelsPerInch","RenderingCancelledException","SVGGraphics","UNSUPPORTED_FEATURES","UnexpectedResponseException","Util","VerbosityLevel","XfaLayer","build","createPromiseCapability","createValidAbsoluteUrl","getDocument","getFilenameFromUrl","getPdfFilenameFromUrl","getXfaPageViewport","isPdfFile","loadScript","renderTextLayer","shadow","version"]
pdfProps.forEach(el=>
    {
        temp += `
        export let ${el} = window["pdfjs-dist/build/pdf"]["${el}"] 
        `
    }
)
return temp