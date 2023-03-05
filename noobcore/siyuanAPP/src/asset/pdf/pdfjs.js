/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals module, __non_webpack_require__ */

"use strict";
import {addScriptSync} from '../../protyle/util/addScript'
import {Constants}  from '../../constants'
addScriptSync(`${Constants.PROTYLE_CDN}/js/pdf/pdf.js`, 'pdfjsScript')
export default window["pdfjs-dist/build/pdf"]
export let __esModule = window["pdfjs-dist/build/pdf"]["__esModule"] 
export let AnnotationEditorLayer = window["pdfjs-dist/build/pdf"]["AnnotationEditorLayer"]
export let AnnotationEditorParamsType = window["pdfjs-dist/build/pdf"]["AnnotationEditorParamsType"] 
export let AnnotationEditorType = window["pdfjs-dist/build/pdf"]["AnnotationEditorType"] 
export let AnnotationEditorUIManager = window["pdfjs-dist/build/pdf"]["AnnotationEditorUIManager"]
export let AnnotationLayer = window["pdfjs-dist/build/pdf"]["AnnotationLayer"] 
export let AnnotationMode = window["pdfjs-dist/build/pdf"]["AnnotationMode"]
export let CMapCompressionType = window["pdfjs-dist/build/pdf"]["CMapCompressionType"] 
export let GlobalWorkerOptions = window["pdfjs-dist/build/pdf"]["GlobalWorkerOptions"]
export let InvalidPDFException = window["pdfjs-dist/build/pdf"]["InvalidPDFException"] 
export let MissingPDFException = window["pdfjs-dist/build/pdf"]["MissingPDFException"] 
export let OPS = window["pdfjs-dist/build/pdf"]["OPS"] 
export let PDFDataRangeTransport = window["pdfjs-dist/build/pdf"]["PDFDataRangeTransport"]
export let PDFDateString = window["pdfjs-dist/build/pdf"]["PDFDateString"] 
export let PDFWorker = window["pdfjs-dist/build/pdf"]["PDFWorker"] 
export let PasswordResponses = window["pdfjs-dist/build/pdf"]["PasswordResponses"] 
export let PermissionFlag = window["pdfjs-dist/build/pdf"]["PermissionFlag"] 
export let PixelsPerInch = window["pdfjs-dist/build/pdf"]["PixelsPerInch"]
export let RenderingCancelledException = window["pdfjs-dist/build/pdf"]["RenderingCancelledException"]
export let SVGGraphics = window["pdfjs-dist/build/pdf"]["SVGGraphics"]
export let UNSUPPORTED_FEATURES = window["pdfjs-dist/build/pdf"]["UNSUPPORTED_FEATURES"] 
export let UnexpectedResponseException = window["pdfjs-dist/build/pdf"]["UnexpectedResponseException"]
export let Util = window["pdfjs-dist/build/pdf"]["Util"]
export let VerbosityLevel = window["pdfjs-dist/build/pdf"]["VerbosityLevel"]
export let XfaLayer = window["pdfjs-dist/build/pdf"]["XfaLayer"]
export let build = window["pdfjs-dist/build/pdf"]["build"]
export let createPromiseCapability = window["pdfjs-dist/build/pdf"]["createPromiseCapability"]
export let createValidAbsoluteUrl = window["pdfjs-dist/build/pdf"]["createValidAbsoluteUrl"]
export let getDocument = window["pdfjs-dist/build/pdf"]["getDocument"]
export let getFilenameFromUrl = window["pdfjs-dist/build/pdf"]["getFilenameFromUrl"]
export let getPdfFilenameFromUrl = window["pdfjs-dist/build/pdf"]["getPdfFilenameFromUrl"]
export let getXfaPageViewport = window["pdfjs-dist/build/pdf"]["getXfaPageViewport"]
export let isPdfFile = window["pdfjs-dist/build/pdf"]["isPdfFile"]
export let loadScript = window["pdfjs-dist/build/pdf"]["loadScript"]
export let renderTextLayer = window["pdfjs-dist/build/pdf"]["renderTextLayer"]
export let shadow = window["pdfjs-dist/build/pdf"]["shadow"]
export let version = window["pdfjs-dist/build/pdf"]["version"]   
