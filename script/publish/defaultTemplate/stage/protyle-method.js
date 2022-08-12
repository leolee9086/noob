!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.Protyle = t())
    : (e.Protyle = t());
})(self, function () {
  return (() => {
    "use strict";
    var e = {
        130: (e, t, a) => {
          a.r(t);
        },
        655: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.Constants = void 0);
          class a {}
          (t.Constants = a),
            (a.SIYUAN_VERSION = "2.0.18"),
            (a.NODE_ENV = "production"),
            (a.SIYUAN_APPID = Math.random().toString(36).substring(8)),
            (a.ASSETS_ADDRESS = "https://assets.b3logfile.com/siyuan/"),
            (a.PROTYLE_CDN = "/stage/protyle"),
            (a.UPLOAD_ADDRESS = "/upload"),
            (a.SIYUAN_DROP_FILE = "application/siyuan-file"),
            (a.SIYUAN_DROP_TAB = "application/siyuan-tab"),
            (a.SIYUAN_DROP_EDITOR = "application/siyuan-editor"),
            (a.SIYUAN_CONFIG_THEME = "siyuan-config-theme"),
            (a.SIYUAN_CONFIG_CLOSE = "siyuan-config-close"),
            (a.SIYUAN_CONFIG_TRAY = "siyuan-config-tray"),
            (a.SIYUAN_CONFIG_CLOSETRAY = "siyuan-config-closetray"),
            (a.SIYUAN_QUIT = "siyuan-quit"),
            (a.SIYUAN_HOTKEY = "siyuan-hotkey"),
            (a.SIYUAN_INIT = "siyuan-init"),
            (a.SIYUAN_OPENURL = "siyuan-openurl"),
            (a.SIYUAN_SAVE_CLOSE = "siyuan-save-close"),
            (a.SIZE_TOOLBAR_HEIGHT = 30),
            (a.SIZE_GET = 36),
            (a.SIZE_GET_MAX = 102400),
            (a.SIZE_UNDO = 64),
            (a.SIZE_TITLE = 512),
            (a.CB_MOUNT_HELP = "cb-mount-help"),
            (a.CB_MOUNT_REMOVE = "cb-mount-remove"),
            (a.CB_GET_APPEND = "cb-get-append"),
            (a.CB_GET_BEFORE = "cb-get-before"),
            (a.CB_GET_UNCHANGEID = "cb-get-unchangeid"),
            (a.CB_GET_HL = "cb-get-hl"),
            (a.CB_GET_FOCUS = "cb-get-focus"),
            (a.CB_GET_FOCUSFIRST = "cb-get-focusfirst"),
            (a.CB_GET_SETID = "cb-get-setid"),
            (a.CB_GET_ALL = "cb-get-all"),
            (a.CB_GET_UNUNDO = "cb-get-unundo"),
            (a.LOCAL_SEARCHEDATA = "local-searchedata"),
            (a.LOCAL_SEARCHETABDATA = "local-searchetabdata"),
            (a.LOCAL_DOCINFO = "local-docinfo"),
            (a.LOCAL_DAILYNOTEID = "local-dailynoteid"),
            (a.LOCAL_HISTORYNOTEID = "local-historynoteid"),
            (a.LOCAL_CODELANG = "local-codelang"),
            (a.LOCAL_FONTSTYLES = "local-fontstyles"),
            (a.LOCAL_EXPORTPDF = "local-exportpdf"),
            (a.LOCAL_BAZAAR = "local-bazaar"),
            (a.TIMEOUT_DBLCLICK = 190),
            (a.TIMEOUT_SEARCH = 300),
            (a.TIMEOUT_INPUT = 256),
            (a.TIMEOUT_BLOCKLOAD = 300),
            (a.HELP_PATH = {
              zh_CN: "20210808180117-czj9bvb",
              zh_CHT: "20211226090932-5lcq56f",
              en_US: "20210808180117-6v0mkxr",
              fr_FR: "20210808180117-6v0mkxr",
            }),
            (a.HELP_START_PATH = {
              zh_CN: "20200812220555-lj3enxa",
              zh_CHT: "20211226115423-d5z1joq",
              en_US: "20200923234011-ieuun1p",
              fr_FR: "20200923234011-ieuun1p",
            }),
            (a.SIYUAN_KEYMAP = {
              general: {
                enterBack: { default: "⌥←", custom: "⌥←" },
                enter: { default: "⌥→", custom: "⌥→" },
                goForward: { default: "⌘]", custom: "⌘]" },
                goBack: { default: "⌘[", custom: "⌘[" },
                newFile: { default: "⌘N", custom: "⌘N" },
                search: { default: "⌘F", custom: "⌘F" },
                globalSearch: { default: "⌘P", custom: "⌘P" },
                stickSearch: { default: "⇧⌘F", custom: "⇧⌘F" },
                replace: { default: "⌘R", custom: "⌘R" },
                closeTab: { default: "⌘W", custom: "⌘W" },
                fileTree: { default: "⌥1", custom: "⌥1" },
                outline: { default: "⌥2", custom: "⌥2" },
                bookmark: { default: "⌥3", custom: "⌥3" },
                tag: { default: "⌥4", custom: "⌥4" },
                dailyNote: { default: "⌥5", custom: "⌥5" },
                inbox: { default: "⌥6", custom: "⌥6" },
                backlinks: { default: "⌥7", custom: "⌥7" },
                graphView: { default: "⌥8", custom: "⌥8" },
                globalGraph: { default: "⌥9", custom: "⌥9" },
                config: { default: "⌥P", custom: "⌥P" },
                history: { default: "⌥H", custom: "⌥H" },
                toggleWin: { default: "⌥M", custom: "⌥M" },
                lockScreen: { default: "⌥N", custom: "⌥N" },
                move: { default: "", custom: "" },
                selectOpen1: { default: "", custom: "" },
              },
              editor: {
                general: {
                  hLayout: { default: "", custom: "" },
                  vLayout: { default: "", custom: "" },
                  refBottom: { default: "⇧>", custom: "⇧>" },
                  refRight: { default: "⌥.", custom: "⌥." },
                  refPopover: { default: "⌥⌘.", custom: "⌥⌘." },
                  refTab: { default: "⇧⌘.", custom: "⇧⌘." },
                  attr: { default: "⌥⌘A", custom: "⌥⌘A" },
                  refresh: { default: "F5", custom: "F5" },
                  copyBlockRef: { default: "⇧⌘C", custom: "⇧⌘C" },
                  copyProtocol: { default: "⇧⌘H", custom: "⇧⌘H" },
                  copyBlockEmbed: { default: "⇧⌘E", custom: "⇧⌘E" },
                  copyHPath: { default: "⇧⌘P", custom: "⇧⌘P" },
                  pasteAsPlainText: { default: "⇧⌘V", custom: "⇧⌘V" },
                  undo: { default: "⌘Z", custom: "⌘Z" },
                  redo: { default: "⌘Y", custom: "⌘Y" },
                  rename: { default: "F2", custom: "F2" },
                  newNameFile: { default: "F3", custom: "F3" },
                  newContentFile: { default: "F4", custom: "F4" },
                  showInFolder: { default: "⌥A", custom: "⌥A" },
                  outline: { default: "⌥O", custom: "⌥O" },
                  backlinks: { default: "⌥B", custom: "⌥B" },
                  graphView: { default: "⌥G", custom: "⌥G" },
                  fullscreen: { default: "⌥Y", custom: "⌥Y" },
                  alignLeft: { default: "⌥L", custom: "⌥L" },
                  alignCenter: { default: "⌥C", custom: "⌥C" },
                  alignRight: { default: "⌥R", custom: "⌥R" },
                  wysiwyg: { default: "⌥⌘7", custom: "⌥⌘7" },
                  preview: { default: "⌥⌘9", custom: "⌥⌘9" },
                  insertBefore: { default: "⇧⌘B", custom: "⇧⌘B" },
                  insertAfter: { default: "⇧⌘A", custom: "⇧⌘A" },
                  moveToUp: { default: "⇧⌘↑", custom: "⇧⌘↑" },
                  moveToDown: { default: "⇧⌘↓", custom: "⇧⌘↓" },
                },
                insert: {
                  font: { default: "⌥⌘X", custom: "⌥⌘X" },
                  lastUsed: { default: "⌥X", custom: "⌥X" },
                  blockRef: { default: "⌥[", custom: "⌥[" },
                  kbd: { default: "⌘'", custom: "⌘'" },
                  sup: { default: "⌘H", custom: "⌘H" },
                  sub: { default: "⌘J", custom: "⌘J" },
                  bold: { default: "⌘B", custom: "⌘B" },
                  "inline-math": { default: "⌘M", custom: "⌘M" },
                  underline: { default: "⌘U", custom: "⌘U" },
                  italic: { default: "⌘I", custom: "⌘I" },
                  mark: { default: "⌘E", custom: "⌘E" },
                  tag: { default: "⌘T", custom: "⌘T" },
                  strike: { default: "⌘D", custom: "⌘D" },
                  "inline-code": { default: "⌘G", custom: "⌘G" },
                  link: { default: "⌘K", custom: "⌘K" },
                  check: { default: "⌘L", custom: "⌘L" },
                  table: { default: "⌘O", custom: "⌘O" },
                  code: { default: "⇧⌘K", custom: "⇧⌘K" },
                },
                heading: {
                  heading1: { default: "⌥⌘1", custom: "⌥⌘1" },
                  heading2: { default: "⌥⌘2", custom: "⌥⌘2" },
                  heading3: { default: "⌥⌘3", custom: "⌥⌘3" },
                  heading4: { default: "⌥⌘4", custom: "⌥⌘4" },
                  heading5: { default: "⌥⌘5", custom: "⌥⌘5" },
                  heading6: { default: "⌥⌘6", custom: "⌥⌘6" },
                },
                list: {
                  indent: { default: "⇥", custom: "⇥" },
                  outdent: { default: "⇧⇥", custom: "⇧⇥" },
                  checkToggle: { default: "⌘Enter", custom: "⌘Enter" },
                },
                table: {
                  insertRowAbove: { default: "⇧⌘T", custom: "⇧⌘T" },
                  insertRowBelow: { default: "⇧⌘D", custom: "⇧⌘D" },
                  insertColumnLeft: { default: "⇧⌘L", custom: "⇧⌘L" },
                  insertColumnRight: { default: "⇧⌘R", custom: "⇧⌘R" },
                  moveToUp: { default: "⌥⌘T", custom: "⌥⌘T" },
                  moveToDown: { default: "⌥⌘B", custom: "⌥⌘B" },
                  moveToLeft: { default: "⌥⌘L", custom: "⌥⌘L" },
                  moveToRight: { default: "⌥⌘R", custom: "⌥⌘R" },
                  "delete-row": { default: "⌘-", custom: "⌘-" },
                  "delete-column": { default: "⇧⌘-", custom: "⇧⌘-" },
                },
              },
            }),
            (a.SIYUAN_EMPTY_LAYOUT = {
              hideDock: !1,
              layout: {
                direction: "tb",
                size: "0px",
                type: "normal",
                instance: "Layout",
                children: [
                  {
                    direction: "lr",
                    size: "0px",
                    type: "top",
                    instance: "Layout",
                    children: [
                      { instance: "Wnd", children: [] },
                      { instance: "Wnd", resize: "lr", children: [] },
                    ],
                  },
                  {
                    direction: "lr",
                    resize: "tb",
                    size: "auto",
                    type: "normal",
                    instance: "Layout",
                    children: [
                      {
                        direction: "tb",
                        size: "0px",
                        type: "left",
                        instance: "Layout",
                        children: [
                          { instance: "Wnd", children: [] },
                          { instance: "Wnd", resize: "tb", children: [] },
                        ],
                      },
                      {
                        direction: "lr",
                        resize: "lr",
                        size: "auto",
                        type: "center",
                        instance: "Layout",
                        children: [
                          {
                            instance: "Wnd",
                            children: [{ instance: "Tab", children: [] }],
                          },
                        ],
                      },
                      {
                        direction: "tb",
                        size: "0px",
                        resize: "lr",
                        type: "right",
                        instance: "Layout",
                        children: [
                          { instance: "Wnd", children: [] },
                          { instance: "Wnd", resize: "tb", children: [] },
                        ],
                      },
                    ],
                  },
                  {
                    direction: "lr",
                    size: "0px",
                    resize: "tb",
                    type: "bottom",
                    instance: "Layout",
                    children: [
                      { instance: "Wnd", children: [] },
                      { instance: "Wnd", resize: "lr", children: [] },
                    ],
                  },
                ],
              },
              top: [],
              bottom: [],
              left: [
                [
                  {
                    type: "file",
                    size: { width: 240, height: 0 },
                    show: !0,
                    icon: "iconFiles",
                    hotkeyLangId: "fileTree",
                  },
                  {
                    type: "outline",
                    size: { width: 240, height: 0 },
                    show: !1,
                    icon: "iconAlignCenter",
                    hotkeyLangId: "outline",
                  },
                  {
                    type: "inbox",
                    size: { width: 250, height: 0 },
                    show: !1,
                    icon: "iconInbox",
                    hotkeyLangId: "inbox",
                  },
                ],
                [
                  {
                    type: "bookmark",
                    size: { width: 240, height: 0 },
                    show: !1,
                    icon: "iconBookmark",
                    hotkeyLangId: "bookmark",
                  },
                  {
                    type: "tag",
                    size: { width: 240, height: 0 },
                    show: !1,
                    icon: "iconTags",
                    hotkeyLangId: "tag",
                  },
                ],
              ],
              right: [
                [
                  {
                    type: "graph",
                    size: { width: 360, height: 0 },
                    show: !1,
                    icon: "iconGraph",
                    hotkeyLangId: "graphView",
                  },
                  {
                    type: "globalGraph",
                    size: { width: 360, height: 0 },
                    show: !1,
                    icon: "iconGlobalGraph",
                    hotkeyLangId: "globalGraph",
                  },
                ],
                [
                  {
                    type: "backlink",
                    size: { width: 360, height: 0 },
                    show: !1,
                    icon: "iconLink",
                    hotkeyLangId: "backlinks",
                  },
                ],
              ],
            }),
            (a.SIYUAN_IMAGE_VIP =
              '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n<path fill="#ffd00f" d="M2.288 12.643l23.487 12.853c0.286 0.153 0.477 0.45 0.477 0.791 0 0.082-0.011 0.161-0.032 0.237l0.001-0.006c-0.119 0.395-0.479 0.678-0.905 0.678-0.004 0-0.009-0-0.013-0h-19.439c-0.958 0-1.766-0.684-1.885-1.595l-1.691-12.956z"></path>\n<path fill="#ffd00f" d="M29.676 12.643l-1.691 12.957c-0.119 0.911-0.927 1.594-1.884 1.594h-19.442c-0.004 0-0.009 0-0.013 0-0.425 0-0.785-0.281-0.903-0.668l-0.002-0.007c-0.019-0.070-0.031-0.15-0.031-0.232 0-0.341 0.191-0.638 0.472-0.788l0.005-0.002 23.487-12.853z"></path>\n<path fill="#ffe668" d="M15.413 8.369l10.394 15.921c0.378 0.579 0.407 1.317 0.076 1.924-0.328 0.591-0.948 0.985-1.66 0.985-0 0-0.001 0-0.001 0h-17.617c-0.694 0-1.331-0.378-1.661-0.985-0.144-0.26-0.229-0.569-0.229-0.899 0-0.382 0.114-0.736 0.31-1.033l-0.004 0.007 10.394-15.921z"></path>\n<path fill="#ffdd4e" d="M15.396 8.403l11.659 15.921c0.401 0.579 0.432 1.317 0.081 1.924-0.361 0.594-1.005 0.985-1.741 0.985-0.008 0-0.017-0-0.025-0h-9.344l-0.63-18.83z"></path>\n<path fill="#ffd00f" d="M13.868 6.478c0 0.946 0.767 1.712 1.712 1.712s1.712-0.767 1.712-1.712v0c0-0.945-0.766-1.712-1.712-1.712s-1.712 0.766-1.712 1.712v0zM28.577 10.818c0 0.945 0.766 1.712 1.712 1.712s1.712-0.766 1.712-1.712v0c0-0.945-0.766-1.712-1.712-1.712s-1.712 0.766-1.712 1.712v0zM0 10.822c0 0.945 0.766 1.712 1.712 1.712s1.712-0.766 1.712-1.712v0c0-0.945-0.766-1.712-1.712-1.712s-1.712 0.766-1.712 1.712v0z"></path>\n</svg>'),
            (a.SIYUAN_IMAGE_FILE = "1f4c4"),
            (a.SIYUAN_IMAGE_NOTE = "1f5c3"),
            (a.SIYUAN_ASSETS_IMAGE = [
              ".apng",
              ".ico",
              ".cur",
              ".jpg",
              ".jpe",
              ".jpeg",
              ".jfif",
              ".pjp",
              ".pjpeg",
              ".png",
              ".gif",
              ".webp",
              ".bmp",
              ".svg",
            ]),
            (a.SIYUAN_ASSETS_AUDIO = [".mp3", ".wav", ".ogg", ".m4a"]),
            (a.SIYUAN_ASSETS_VIDEO = [
              ".mov",
              ".weba",
              ".mkv",
              ".mp4",
              ".webm",
            ]),
            (a.SIYUAN_ASSETS_EXTS = [".pdf"]
              .concat(a.SIYUAN_ASSETS_IMAGE)
              .concat(a.SIYUAN_ASSETS_AUDIO)
              .concat(a.SIYUAN_ASSETS_VIDEO)),
            (a.SIYUAN_CONFIG_APPEARANCE_DARK_CODE = [
              "a11y-dark",
              "agate",
              "an-old-hope",
              "androidstudio",
              "arta",
              "atom-one-dark",
              "atom-one-dark-reasonable",
              "base16/3024",
              "base16/apathy",
              "base16/apprentice",
              "base16/ashes",
              "base16/atelier-cave",
              "base16/atelier-dune",
              "base16/atelier-estuary",
              "base16/atelier-forest",
              "base16/atelier-heath",
              "base16/atelier-lakeside",
              "base16/atelier-plateau",
              "base16/atelier-savanna",
              "base16/atelier-seaside",
              "base16/atelier-sulphurpool",
              "base16/atlas",
              "base16/bespin",
              "base16/black-metal",
              "base16/black-metal-bathory",
              "base16/black-metal-burzum",
              "base16/black-metal-dark-funeral",
              "base16/black-metal-gorgoroth",
              "base16/black-metal-immortal",
              "base16/black-metal-khold",
              "base16/black-metal-marduk",
              "base16/black-metal-mayhem",
              "base16/black-metal-nile",
              "base16/black-metal-venom",
              "base16/brewer",
              "base16/bright",
              "base16/brogrammer",
              "base16/brush-trees-dark",
              "base16/chalk",
              "base16/circus",
              "base16/classic-dark",
              "base16/codeschool",
              "base16/colors",
              "base16/danqing",
              "base16/darcula",
              "base16/dark-violet",
              "base16/darkmoss",
              "base16/darktooth",
              "base16/decaf",
              "base16/default-dark",
              "base16/dracula",
              "base16/edge-dark",
              "base16/eighties",
              "base16/embers",
              "base16/equilibrium-dark",
              "base16/equilibrium-gray-dark",
              "base16/espresso",
              "base16/eva",
              "base16/eva-dim",
              "base16/flat",
              "base16/framer",
              "base16/gigavolt",
              "base16/google-dark",
              "base16/grayscale-dark",
              "base16/green-screen",
              "base16/gruvbox-dark-hard",
              "base16/gruvbox-dark-medium",
              "base16/gruvbox-dark-pale",
              "base16/gruvbox-dark-soft",
              "base16/hardcore",
              "base16/harmonic16-dark",
              "base16/heetch-dark",
              "base16/helios",
              "base16/hopscotch",
              "base16/horizon-dark",
              "base16/humanoid-dark",
              "base16/ia-dark",
              "base16/icy-dark",
              "base16/ir-black",
              "base16/isotope",
              "base16/kimber",
              "base16/london-tube",
              "base16/macintosh",
              "base16/marrakesh",
              "base16/materia",
              "base16/material",
              "base16/material-darker",
              "base16/material-palenight",
              "base16/material-vivid",
              "base16/mellow-purple",
              "base16/mocha",
              "base16/monokai",
              "base16/nebula",
              "base16/nord",
              "base16/nova",
              "base16/ocean",
              "base16/oceanicnext",
              "base16/onedark",
              "base16/outrun-dark",
              "base16/papercolor-dark",
              "base16/paraiso",
              "base16/pasque",
              "base16/phd",
              "base16/pico",
              "base16/pop",
              "base16/porple",
              "base16/qualia",
              "base16/railscasts",
              "base16/rebecca",
              "base16/ros-pine",
              "base16/ros-pine-moon",
              "base16/sandcastle",
              "base16/seti-ui",
              "base16/silk-dark",
              "base16/snazzy",
              "base16/solar-flare",
              "base16/solarized-dark",
              "base16/spacemacs",
              "base16/summercamp",
              "base16/summerfruit-dark",
              "base16/synth-midnight-terminal-dark",
              "base16/tango",
              "base16/tender",
              "base16/tomorrow-night",
              "base16/twilight",
              "base16/unikitty-dark",
              "base16/vulcan",
              "base16/windows-10",
              "base16/windows-95",
              "base16/windows-high-contrast",
              "base16/windows-nt",
              "base16/woodland",
              "base16/xcode-dusk",
              "base16/zenburn",
              "codepen-embed",
              "dark",
              "devibeans",
              "far",
              "felipec",
              "github-dark",
              "github-dark-dimmed",
              "gml",
              "gradient-dark",
              "hybrid",
              "ir-black",
              "isbl-editor-dark",
              "kimbie-dark",
              "lioshi",
              "monokai",
              "monokai-sublime",
              "night-owl",
              "nnfx-dark",
              "nord",
              "obsidian",
              "paraiso-dark",
              "pojoaque",
              "qtcreator-dark",
              "rainbow",
              "shades-of-purple",
              "srcery",
              "stackoverflow-dark",
              "sunburst",
              "tomorrow-night-blue",
              "tomorrow-night-bright",
              "tokyo-night-dark",
              "vs2015",
              "xt256",
            ]),
            (a.SIYUAN_CONFIG_APPEARANCE_LIGHT_CODE = [
              "ant-design",
              "a11y-light",
              "arduino-light",
              "ascetic",
              "atom-one-light",
              "base16/atelier-cave-light",
              "base16/atelier-dune-light",
              "base16/atelier-estuary-light",
              "base16/atelier-forest-light",
              "base16/atelier-heath-light",
              "base16/atelier-lakeside-light",
              "base16/atelier-plateau-light",
              "base16/atelier-savanna-light",
              "base16/atelier-seaside-light",
              "base16/atelier-sulphurpool-light",
              "base16/brush-trees",
              "base16/classic-light",
              "base16/cupcake",
              "base16/cupertino",
              "base16/default-light",
              "base16/dirtysea",
              "base16/edge-light",
              "base16/equilibrium-gray-light",
              "base16/equilibrium-light",
              "base16/fruit-soda",
              "base16/github",
              "base16/google-light",
              "base16/grayscale-light",
              "base16/gruvbox-light-hard",
              "base16/gruvbox-light-medium",
              "base16/gruvbox-light-soft",
              "base16/harmonic16-light",
              "base16/heetch-light",
              "base16/humanoid-light",
              "base16/horizon-light",
              "base16/ia-light",
              "base16/material-lighter",
              "base16/mexico-light",
              "base16/one-light",
              "base16/papercolor-light",
              "base16/ros-pine-dawn",
              "base16/sagelight",
              "base16/shapeshifter",
              "base16/silk-light",
              "base16/solar-flare-light",
              "base16/solarized-light",
              "base16/summerfruit-light",
              "base16/synth-midnight-terminal-light",
              "base16/tomorrow",
              "base16/unikitty-light",
              "base16/windows-10-light",
              "base16/windows-95-light",
              "base16/windows-high-contrast-light",
              "brown-paper",
              "base16/windows-nt-light",
              "color-brewer",
              "docco",
              "foundation",
              "github",
              "googlecode",
              "gradient-light",
              "grayscale",
              "idea",
              "intellij-light",
              "isbl-editor-light",
              "kimbie-light",
              "lightfair",
              "magula",
              "mono-blue",
              "nnfx-light",
              "paraiso-light",
              "purebasic",
              "qtcreator-light",
              "routeros",
              "school-book",
              "stackoverflow-light",
              "tokyo-night-light",
              "vs",
              "xcode",
              "default",
            ]),
            (a.ZWSP = "​"),
            (a.INLINE_TYPE = [
              "link",
              "bold",
              "italic",
              "underline",
              "strike",
              "mark",
              "sup",
              "sub",
              "tag",
              "inline-code",
              "inline-math",
            ]),
            (a.BLOCK_HINT_KEYS = ["((", "[[", "（（", "【【"]),
            (a.BLOCK_HINT_CLOSE_KEYS = {
              "((": "))",
              "[[": "]]",
              "（（": "））",
              "【【": "】】",
            }),
            (a.CODE_LANGUAGES = [
              "js",
              "ts",
              "html",
              "toml",
              "c#",
              "bat",
              "bash",
              "c",
              "csharp",
              "cpp",
              "css",
              "diff",
              "go",
              "xml",
              "json",
              "java",
              "javascript",
              "kotlin",
              "less",
              "lua",
              "makefile",
              "markdown",
              "objectivec",
              "php",
              "php-template",
              "perl",
              "plaintext",
              "python",
              "python-repl",
              "r",
              "ruby",
              "rust",
              "scss",
              "sql",
              "shell",
              "swift",
              "ini",
              "typescript",
              "vbnet",
              "yaml",
              "properties",
              "1c",
              "armasm",
              "avrasm",
              "actionscript",
              "ada",
              "angelscript",
              "accesslog",
              "apache",
              "applescript",
              "arcade",
              "arduino",
              "asciidoc",
              "aspectj",
              "abnf",
              "autohotkey",
              "autoit",
              "awk",
              "basic",
              "bnf",
              "dos",
              "brainfuck",
              "cal",
              "cmake",
              "csp",
              "cos",
              "capnproto",
              "ceylon",
              "clean",
              "clojure",
              "clojure-repl",
              "coffeescript",
              "coq",
              "crystal",
              "d",
              "dns",
              "dart",
              "delphi",
              "dts",
              "django",
              "dockerfile",
              "dust",
              "erb",
              "elixir",
              "elm",
              "erlang",
              "erlang-repl",
              "excel",
              "ebnf",
              "fsharp",
              "fix",
              "flix",
              "fortran",
              "gcode",
              "gams",
              "gauss",
              "glsl",
              "gml",
              "gherkin",
              "golo",
              "gradle",
              "groovy",
              "haml",
              "hsp",
              "http",
              "handlebars",
              "haskell",
              "haxe",
              "hy",
              "irpf90",
              "isbl",
              "inform7",
              "x86asm",
              "jboss-cli",
              "julia",
              "julia-repl",
              "ldif",
              "llvm",
              "lsl",
              "latex",
              "lasso",
              "leaf",
              "lisp",
              "livecodeserver",
              "livescript",
              "mel",
              "mipsasm",
              "matlab",
              "maxima",
              "mercury",
              "axapta",
              "routeros",
              "mizar",
              "mojolicious",
              "monkey",
              "moonscript",
              "n1ql",
              "nsis",
              "nestedtext",
              "nginx",
              "nim",
              "nix",
              "node-repl",
              "ocaml",
              "openscad",
              "ruleslanguage",
              "oxygene",
              "pf",
              "parser3",
              "pony",
              "pgsql",
              "powershell",
              "processing",
              "prolog",
              "protobuf",
              "puppet",
              "purebasic",
              "profile",
              "q",
              "qml",
              "reasonml",
              "rib",
              "rsl",
              "roboconf",
              "sas",
              "sml",
              "sqf",
              "step21",
              "scala",
              "scheme",
              "scilab",
              "smali",
              "smalltalk",
              "stan",
              "stata",
              "stylus",
              "subunit",
              "tp",
              "taggerscript",
              "tcl",
              "tap",
              "thrift",
              "twig",
              "vbscript",
              "vbscript-html",
              "vhdl",
              "vala",
              "verilog",
              "vim",
              "wasm",
              "mathematica",
              "wren",
              "xl",
              "xquery",
              "zephir",
              "crmsh",
              "dsconfig",
              "graphql",
              "yul",
              "solidity",
              "abap",
            ]);
        },
        686: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.abcRender = void 0);
          const n = a(427),
            s = a(655);
          t.abcRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "abc" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="abc"]'))),
              0 !== a.length &&
                a.length > 0 &&
                (0, n.addScript)(
                  `${t}/js/abcjs/abcjs-basic-min.js?v=0.0.0`,
                  "protyleAbcjsScript"
                ).then(() => {
                  a.forEach((e) => {
                    e.firstElementChild.classList.contains("protyle-icons") ||
                      e.insertAdjacentHTML(
                        "afterbegin",
                        '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                      );
                    const t = e.firstElementChild.nextElementSibling;
                    ABCJS.renderAbc(
                      t,
                      Lute.UnEscapeHTMLStr(e.getAttribute("data-content")),
                      { responsive: "resize" }
                    ),
                      t.setAttribute("contenteditable", "false"),
                      e.textContent.endsWith(s.Constants.ZWSP) ||
                        e.insertAdjacentHTML(
                          "beforeend",
                          `<span style="position: absolute">${s.Constants.ZWSP}</span>`
                        );
                  });
                });
          };
        },
        445: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.chartRender = void 0);
          const n = a(427),
            s = a(655),
            r = a(920);
          t.chartRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "echarts" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="echarts"]'))),
              0 !== a.length &&
                a.length > 0 &&
                (0, n.addScript)(
                  `${t}/js/echarts/echarts.min.js?v=5.3.2`,
                  "protyleEchartsScript"
                ).then(() => {
                  (0, n.addScript)(
                    `${t}/js/echarts/echarts-gl.min.js?v=2.0.9`,
                    "protyleEchartsGLScript"
                  ).then(() => {
                    let e;
                    if (0 === a[0].firstElementChild.clientWidth) {
                      const t = (0, r.hasClosestByClassName)(
                        a[0],
                        "layout-tab-container",
                        !0
                      );
                      t &&
                        Array.from(t.children).find((t) => {
                          if (
                            t.classList.contains("protyle") &&
                            !t.classList.contains("fn__none")
                          )
                            return (
                              (e =
                                t.querySelector(".protyle-wysiwyg")
                                  .firstElementChild.clientWidth),
                              !0
                            );
                        });
                    }
                    a.forEach((t) => {
                      const a = Lute.UnEscapeHTMLStr(
                        t.getAttribute("data-content")
                      );
                      if (!a || "true" === t.getAttribute("data-render"))
                        return;
                      t.firstElementChild.classList.contains("protyle-icons") ||
                        t.insertAdjacentHTML(
                          "afterbegin",
                          '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                        );
                      const n = t.firstElementChild.nextElementSibling;
                      try {
                        n.style.height = t.style.height;
                        const r = JSON.parse(a);
                        echarts
                          .init(
                            n,
                            1 === window.siyuan.config.appearance.mode
                              ? "dark"
                              : void 0,
                            { width: e }
                          )
                          .setOption(r),
                          t.setAttribute("data-render", "true"),
                          n.classList.remove("ft__error"),
                          n.textContent.endsWith(s.Constants.ZWSP) ||
                            n.firstElementChild.insertAdjacentText(
                              "beforeend",
                              s.Constants.ZWSP
                            );
                      } catch (e) {
                        echarts.dispose(n),
                          n.classList.add("ft__error"),
                          (n.innerHTML = `echarts render error: <br>${e}`);
                      }
                    });
                  });
                });
          };
        },
        709: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.flowchartRender = void 0);
          const n = a(427),
            s = a(655),
            r = a(920);
          t.flowchartRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "flowchart" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="flowchart"]'))),
              0 !== a.length &&
                (0, n.addScript)(
                  `${t}/js/flowchart.js/flowchart.min.js?v=0.0.0`,
                  "protyleFlowchartScript"
                ).then(() => {
                  if (0 === a[0].firstElementChild.clientWidth) {
                    const e = (0, r.hasClosestByClassName)(a[0], "protyle", !0);
                    if (!e) return;
                    const t = new MutationObserver(() => {
                      i(a), t.disconnect();
                    });
                    t.observe(e, { attributeFilter: ["class"] });
                  } else i(a);
                });
          };
          const i = (e) => {
            e.forEach((e) => {
              e.firstElementChild.classList.contains("protyle-icons") ||
                e.insertAdjacentHTML(
                  "afterbegin",
                  '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                );
              const t = e.firstElementChild.nextElementSibling,
                a = flowchart.parse(
                  Lute.UnEscapeHTMLStr(e.getAttribute("data-content"))
                );
              (t.innerHTML = ""),
                a.drawSVG(t),
                t.setAttribute("contenteditable", "false"),
                e.textContent.endsWith(s.Constants.ZWSP) ||
                  e.insertAdjacentHTML(
                    "beforeend",
                    `<span style="position: absolute">${s.Constants.ZWSP}</span>`
                  );
            });
          };
        },
        719: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.graphvizRender = void 0);
          const n = a(427),
            s = a(655);
          t.graphvizRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "graphviz" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="graphviz"]'))),
              0 !== a.length &&
                (0, n.addScript)(
                  `${t}/js/graphviz/viz.js?v=0.0.0`,
                  "protyleGraphVizScript"
                ).then(() => {
                  a.forEach((e) => {
                    const t = Lute.UnEscapeHTMLStr(
                      e.getAttribute("data-content")
                    );
                    if ("true" === e.getAttribute("data-render") || "" === t)
                      return;
                    e.firstElementChild.classList.contains("protyle-icons") ||
                      e.insertAdjacentHTML(
                        "afterbegin",
                        '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                      );
                    const a = e.firstElementChild.nextElementSibling;
                    try {
                      const n = new Blob(
                          [
                            `importScripts('${document
                              .getElementById("protyleGraphVizScript")
                              .src.replace("viz.js", "full.render.js")}');`,
                          ],
                          { type: "application/javascript" }
                        ),
                        r = (window.URL || window.webkitURL).createObjectURL(n),
                        i = new Worker(r);
                      new Viz({ worker: i })
                        .renderSVGElement(t)
                        .then((t) => {
                          (a.innerHTML = t.outerHTML),
                            a.classList.remove("ft__error"),
                            a.setAttribute("contenteditable", "false"),
                            e.textContent.endsWith(s.Constants.ZWSP) ||
                              e.insertAdjacentHTML(
                                "beforeend",
                                `<span style="position: absolute">${s.Constants.ZWSP}</span>`
                              );
                        })
                        .catch((e) => {
                          (a.innerHTML = `graphviz render error: <br>${e}`),
                            a.classList.add("ft__error");
                        });
                    } catch (e) {
                      console.error("graphviz error", e);
                    }
                    e.setAttribute("data-render", "true");
                  });
                });
          };
        },
        865: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.lineNumberRender = t.highlightRender = void 0);
          const n = a(427),
            s = a(831),
            r = a(655),
            i = a(500);
          t.highlightRender = (e, a = r.Constants.PROTYLE_CDN) => {
            let o,
              l = !1;
            e.classList.contains("code-block")
              ? (o = e.querySelectorAll('[spellcheck="false"]'))
              : e.classList.contains("item__readme")
              ? ((o = e.querySelectorAll("pre code")),
                o.forEach((e) => {
                  e.parentElement.setAttribute("lineNumber", "false");
                }))
              : e.classList.contains("b3-typography")
              ? ((o = e.querySelectorAll(".code-block code")), (l = !0))
              : (o = e.querySelectorAll('.code-block [spellcheck="false"]')),
              0 !== o.length &&
                ((0, s.setCodeTheme)(a),
                (0, n.addScript)(
                  `${a}/js/highlight.js/highlight.min.js?v=11.5.0`,
                  "protyleHljsScript"
                ).then(() => {
                  (0, n.addScript)(
                    `${a}/js/highlight.js/third-languages.js?v=1.0.0`,
                    "protyleHljsThirdScript"
                  ).then(() => {
                    o.forEach((e) => {
                      var a;
                      if ("true" === e.getAttribute("data-render")) return;
                      const n = e.querySelector("wbr");
                      let s,
                        r = 0;
                      if (n) {
                        let e = n.previousSibling;
                        for (; e; ) {
                          for (
                            r += e.textContent.length;
                            !e.previousSibling &&
                            "DIV" !== e.parentElement.tagName;

                          )
                            e = e.parentElement;
                          e = e.previousSibling;
                        }
                        n.remove();
                      }
                      (s = l
                        ? e.parentElement.getAttribute("data-language")
                        : e.previousElementSibling
                        ? e.previousElementSibling.firstElementChild.textContent
                        : e.className.replace("language-", "")),
                        hljs.getLanguage(s) || (s = "plaintext"),
                        e.classList.add("hljs"),
                        (e.innerHTML = hljs.highlight(
                          e.textContent +
                            (e.textContent.endsWith("\n") ? "" : "\n"),
                          { language: s, ignoreIllegals: !0 }
                        ).value),
                        e.setAttribute("data-render", "true");
                      const o = e.parentElement.getAttribute("linewrap"),
                        c = e.parentElement.getAttribute("ligatures"),
                        d = e.parentElement.getAttribute("linenumber");
                      "true" === o ||
                      ("false" !== o &&
                        window.siyuan.config.editor.codeLineWrap)
                        ? (e.style.setProperty("white-space", "pre-wrap"),
                          e.style.setProperty("word-break", "break-all"))
                        : (e.style.setProperty("white-space", "pre"),
                          e.style.setProperty("word-break", "initial")),
                        "true" === c ||
                        ("false" !== c &&
                          window.siyuan.config.editor.codeLigatures)
                          ? (e.style.fontVariantLigatures = "normal")
                          : (e.style.fontVariantLigatures = "none");
                      const u = e.parentElement.querySelector(
                        ".protyle-action__language"
                      );
                      !l &&
                      ("true" === d ||
                        ("false" !== d &&
                          window.siyuan.config.editor
                            .codeSyntaxHighlightLineNum))
                        ? (e.classList.add("protyle-linenumber"),
                          setTimeout(() => {
                            (0, t.lineNumberRender)(e);
                          }, 20),
                          u && (u.style.marginLeft = "3.6em"))
                        : (null === (a = e.nextElementSibling) || void 0 === a
                            ? void 0
                            : a.classList.contains(
                                "protyle-linenumber__rows"
                              )) &&
                          (e.classList.remove("protyle-linenumber"),
                          e.nextElementSibling.remove(),
                          u && (u.style.marginLeft = "")),
                        n &&
                          getSelection().rangeCount > 0 &&
                          (0, i.focusByOffset)(e, r, r);
                    });
                  });
                }));
          };
          t.lineNumberRender = (e) => {
            var t;
            if ("false" === e.parentElement.getAttribute("lineNumber")) return;
            if (
              e.nextElementSibling &&
              e.nextElementSibling.clientHeight === e.clientHeight
            )
              return;
            e.classList.add("protyle-linenumber");
            const a = document.createElement("div");
            (a.className = "hljs protyle-linenumber"),
              a.setAttribute(
                "style",
                `padding-top:0 !important;padding-bottom:0 !important;min-height:auto !important;white-space:${e.style.whiteSpace};word-break:${e.style.wordBreak};font-variant-ligatures:${e.style.fontVariantLigatures};`
              ),
              a.setAttribute("contenteditable", "true"),
              e.insertAdjacentElement("afterend", a);
            let n = "";
            const s = e.textContent.split(/\r\n|\r|\n|\u2028|\u2029/g);
            "" === s[s.length - 1] && s.length > 1 && s.pop();
            const r = "break-all" === e.style.wordBreak;
            s.map((e) => {
              let t = "";
              if (r) {
                a.textContent = e || "\n";
                t = ` style="height:${a.getBoundingClientRect().height}px;"`;
              }
              n += `<span${t}></span>`;
            }),
              a.remove(),
              (
                null === (t = e.nextElementSibling) || void 0 === t
                  ? void 0
                  : t.classList.contains("protyle-linenumber__rows")
              )
                ? (e.nextElementSibling.innerHTML = n)
                : e.insertAdjacentHTML(
                    "afterend",
                    `<span contenteditable="false" class="protyle-linenumber__rows">${n}</span>`
                  );
          };
        },
        906: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.mathRender = void 0);
          const n = a(427),
            s = a(27),
            r = a(655),
            i = a(81),
            o = a(920);
          t.mathRender = (e, t = r.Constants.PROTYLE_CDN, a = !1) => {
            let l = [];
            (l =
              "math" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="math"]'))),
              0 !== l.length &&
                ((0, s.addStyle)(
                  `${t}/js/katex/katex.min.css?v=0.15.3`,
                  "protyleKatexStyle"
                ),
                (0, n.addScript)(
                  `${t}/js/katex/katex.min.js?v=0.15.3`,
                  "protyleKatexScript"
                ).then(() => {
                  (0, n.addScript)(
                    `${t}/js/katex/mhchem.min.js?v=0.15.3`,
                    "protyleKatexMhchemScript"
                  ).then(() => {
                    l.forEach((e) => {
                      var t;
                      if ("true" === e.getAttribute("data-render")) return;
                      const n = Lute.UnEscapeHTMLStr(
                        e.getAttribute("data-content")
                      );
                      e.setAttribute("data-render", "true");
                      let s = e;
                      "DIV" === e.tagName && (s = e.firstElementChild);
                      try {
                        (s.innerHTML = katex.renderToString(n, {
                          displayMode: "DIV" === e.tagName,
                          output: "html",
                        })),
                          s.classList.remove("ft__error");
                        const l = (0, o.hasClosestBlock)(e);
                        if ("DIV" === e.tagName) {
                          s.firstElementChild.setAttribute(
                            "contenteditable",
                            "false"
                          ),
                            s.childElementCount < 2 &&
                              s.insertAdjacentHTML(
                                "beforeend",
                                `<span style="position: absolute">${r.Constants.ZWSP}</span>`
                              );
                          const e = s.querySelectorAll(".base");
                          e.length > 0 &&
                            e[e.length - 1].insertAdjacentHTML(
                              "afterend",
                              "<span class='fn__flex-1'></span>"
                            );
                          const t = s.querySelector(".katex-html > .newline");
                          t && (t.parentElement.style.display = "block");
                        } else {
                          l && e.getBoundingClientRect().width > l.clientWidth
                            ? e.setAttribute(
                                "style",
                                "max-width:100%;overflow-x:auto;overflow-y:hidden;display:inline-block"
                              )
                            : e.removeAttribute("style");
                          const a = (0, i.hasNextSibling)(e);
                          a
                            ? a &&
                              "\n" !== a.textContent &&
                              e.insertAdjacentHTML("beforeend", "&#xFEFF;")
                            : "TH" !== e.parentElement.tagName &&
                              "TD" !== e.parentElement.tagName
                            ? e.insertAdjacentText("afterend", "\n")
                            : e.insertAdjacentText(
                                "beforeend",
                                r.Constants.ZWSP
                              ),
                            (
                              null === (t = e.previousSibling) || void 0 === t
                                ? void 0
                                : t.textContent.endsWith("\n")
                            )
                              ? e.insertAdjacentText(
                                  "beforebegin",
                                  r.Constants.ZWSP
                                )
                              : !(0, i.hasPreviousSibling)(e) &&
                                ["TH", "TD"].includes(
                                  e.parentElement.tagName
                                ) &&
                                e.insertAdjacentText(
                                  "afterbegin",
                                  r.Constants.ZWSP
                                );
                        }
                        a &&
                          setTimeout(() => {
                            if ("DIV" === e.tagName) {
                              const t = e.querySelector(".katex-display");
                              t.clientWidth < t.scrollWidth &&
                                t.firstElementChild.setAttribute(
                                  "style",
                                  `font-size:${
                                    (100 * t.clientWidth) / t.scrollWidth
                                  }%`
                                );
                            } else
                              l &&
                                e.offsetWidth > l.clientWidth &&
                                e.firstElementChild.setAttribute(
                                  "style",
                                  `font-size:${
                                    (100 * l.clientWidth) / e.offsetWidth
                                  }%`
                                );
                          });
                      } catch (e) {
                        (s.innerHTML = e.message), s.classList.add("ft__error");
                      }
                    });
                  });
                }));
          };
        },
        129: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.mediaRender = void 0);
          t.mediaRender = (e) => {
            e &&
              e.querySelectorAll("a").forEach((e) => {
                const t = e.getAttribute("href");
                t &&
                  (t.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)
                    ? ((e, t) => {
                        e.insertAdjacentHTML(
                          "afterend",
                          `<video controls="controls" src="${t}"></video>`
                        ),
                          e.remove();
                      })(e, t)
                    : t.match(/^.+.(mp3|wav|flac)$/)
                    ? ((e, t) => {
                        e.insertAdjacentHTML(
                          "afterend",
                          `<audio controls="controls" src="${t}"></audio>`
                        ),
                          e.remove();
                      })(e, t)
                    : ((e, t) => {
                        const a = t.match(
                            /\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/
                          ),
                          n = t.match(
                            /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/
                          ),
                          s = t.match(
                            /\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/
                          ),
                          r = t.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/),
                          i = t.match(
                            /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/
                          ),
                          o = t.match(
                            /.+dailymotion.com\/(video|hub)\/(\w+)\?/
                          ),
                          l = t.match(
                            /(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/
                          ),
                          c = t.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/),
                          d = t.match(/(?:www\.|\/\/)asciinema\.org\/a\/(\w+)/);
                        a && 11 === a[1].length
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://www.youtube.com/embed/${
                                a[1] + (a[2] ? "?start=" + a[2] : "")
                              }"></iframe>`
                            ),
                            e.remove())
                          : n && n[1]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://player.youku.com/embed/${n[1]}"></iframe>`
                            ),
                            e.remove())
                          : s && s[1]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://v.qq.com/txp/iframe/player.html?vid=${s[1]}"></iframe>`
                            ),
                            e.remove())
                          : r && r[1]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://coub.com/embed/${r[1]}?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>`
                            ),
                            e.remove())
                          : i && i[0]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                                i[0]
                              )}"></iframe>`
                            ),
                            e.remove())
                          : o && o[2]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://www.dailymotion.com/embed/video/${o[2]}"></iframe>`
                            ),
                            e.remove())
                          : l && l[1]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://player.bilibili.com/player.html?bvid=${l[1]}"></iframe>`
                            ),
                            e.remove())
                          : c && c[1]
                          ? (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe src="https://embed.ted.com/talks/${c[1]}"></iframe>`
                            ),
                            e.remove())
                          : d &&
                            d[1] &&
                            (e.insertAdjacentHTML(
                              "afterend",
                              `<iframe style="height: 462px;width: 737px;min-width: auto;" src="https://asciinema.org/a/${d[1]}/embed?"></iframe>`
                            ),
                            e.remove());
                      })(e, t));
              });
          };
        },
        752: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.mermaidRender = void 0);
          const n = a(427),
            s = a(655),
            r = a(920);
          t.mermaidRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "mermaid" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="mermaid"]'))),
              0 !== a.length &&
                (0, n.addScript)(
                  `${t}/js/mermaid/mermaid.min.js?v=9.1.1`,
                  "protyleMermaidScript"
                ).then(() => {
                  const e = {
                    securityLevel: "loose",
                    altFontFamily: "sans-serif",
                    fontFamily: "sans-serif",
                    startOnLoad: !1,
                    flowchart: { htmlLabels: !0, useMaxWidth: !0 },
                    sequence: {
                      useMaxWidth: !0,
                      diagramMarginX: 8,
                      diagramMarginY: 8,
                      boxMargin: 8,
                    },
                    gantt: { leftPadding: 75, rightPadding: 20 },
                  };
                  if (
                    (1 === window.siyuan.config.appearance.mode &&
                      ((e.theme = "dark"),
                      (e.themeVariables = {
                        background: "#333",
                        primaryColor: "#1f2020",
                        secondaryColor:
                          "hsl(180, 1.5873015873%, 28.3529411765%)",
                        tertiaryColor: "hsl(20, 1.5873015873%, 12.3529411765%)",
                        primaryBorderColor: "hsl(180, 0%, 2.3529411765%)",
                        secondaryBorderColor: "hsl(180, 0%, 18.3529411765%)",
                        tertiaryBorderColor: "hsl(20, 0%, 2.3529411765%)",
                        primaryTextColor: "#e0dfdf",
                        secondaryTextColor:
                          "rgb(183.8476190475, 181.5523809523, 181.5523809523)",
                        tertiaryTextColor:
                          "rgb(222.9999999999, 223.6666666666, 223.9999999999)",
                        lineColor: "lightgrey",
                        textColor: "#ccc",
                        mainBkg: "#1f2020",
                        secondBkg: "hsl(180, 1.5873015873%, 28.3529411765%)",
                        mainContrastColor: "lightgrey",
                        darkTextColor:
                          "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                        border1: "#81B1DB",
                        border2: "rgba(255, 255, 255, 0.25)",
                        arrowheadColor: "lightgrey",
                        fontFamily: '"trebuchet ms", verdana, arial',
                        fontSize: "16px",
                        labelBackground: "#181818",
                        nodeBkg: "#1f2020",
                        nodeBorder: "#81B1DB",
                        clusterBkg: "hsl(180, 1.5873015873%, 28.3529411765%)",
                        clusterBorder: "rgba(255, 255, 255, 0.25)",
                        defaultLinkColor: "lightgrey",
                        titleColor: "#F9FFFE",
                        edgeLabelBackground: "hsl(0, 0%, 34.4117647059%)",
                        actorBorder: "#81B1DB",
                        actorBkg: "#1f2020",
                        actorTextColor: "lightgrey",
                        actorLineColor: "lightgrey",
                        signalColor: "lightgrey",
                        signalTextColor: "lightgrey",
                        labelBoxBkgColor: "#1f2020",
                        labelBoxBorderColor: "#81B1DB",
                        labelTextColor: "lightgrey",
                        loopTextColor: "lightgrey",
                        noteBorderColor: "rgba(255, 255, 255, 0.25)",
                        noteBkgColor: "#fff5ad",
                        noteTextColor: "#1f2020",
                        activationBorderColor: "#81B1DB",
                        activationBkgColor:
                          "hsl(180, 1.5873015873%, 28.3529411765%)",
                        sequenceNumberColor: "black",
                        sectionBkgColor:
                          "hsl(52.9411764706, 28.813559322%, 58.431372549%)",
                        altSectionBkgColor: "#333",
                        sectionBkgColor2: "#EAE8D9",
                        taskBorderColor: "#ffffff",
                        taskBkgColor: "hsl(180, 1.5873015873%, 35.3529411765%)",
                        taskTextColor:
                          "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                        taskTextLightColor: "lightgrey",
                        taskTextOutsideColor: "lightgrey",
                        taskTextClickableColor: "#003163",
                        activeTaskBorderColor: "#ffffff",
                        activeTaskBkgColor: "#81B1DB",
                        gridColor: "lightgrey",
                        doneTaskBkgColor: "lightgrey",
                        doneTaskBorderColor: "grey",
                        critBorderColor: "#E83737",
                        critBkgColor: "#E83737",
                        taskTextDarkColor:
                          "hsl(28.5714285714, 17.3553719008%, 86.2745098039%)",
                        todayLineColor: "#DB5757",
                        labelColor: "#ccc",
                        errorBkgColor: "#a44141",
                        errorTextColor: "#ddd",
                        altBackground: "hsl(0, 0%, 40%)",
                        fillType0: "#1f2020",
                        fillType1: "hsl(180, 1.5873015873%, 28.3529411765%)",
                        fillType2: "hsl(244, 1.5873015873%, 12.3529411765%)",
                        fillType3: "hsl(244, 1.5873015873%, 28.3529411765%)",
                        fillType4: "hsl(116, 1.5873015873%, 12.3529411765%)",
                        fillType5: "hsl(116, 1.5873015873%, 28.3529411765%)",
                        fillType6: "hsl(308, 1.5873015873%, 12.3529411765%)",
                        fillType7: "hsl(308, 1.5873015873%, 28.3529411765%)",
                        classText: "#e0dfdf",
                      })),
                    mermaid.initialize(e),
                    0 === a[0].firstElementChild.clientWidth)
                  ) {
                    const e = (0, r.hasClosestByClassName)(a[0], "protyle", !0);
                    if (!e) return;
                    const t = new MutationObserver(() => {
                      i(a), t.disconnect();
                    });
                    t.observe(e, { attributeFilter: ["class"] });
                  } else i(a);
                });
          };
          const i = (e) => {
            e.forEach((e) => {
              e.firstElementChild.classList.contains("protyle-icons") ||
                e.insertAdjacentHTML(
                  "afterbegin",
                  '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                );
              const t = e.firstElementChild.nextElementSibling,
                a = Lute.UnEscapeHTMLStr(e.getAttribute("data-content"));
              "true" !== e.getAttribute("data-render") &&
                "" !== a.trim() &&
                (t.removeAttribute("data-processed"),
                (t.textContent = a),
                mermaid.init(void 0, t),
                e.setAttribute("data-render", "true"),
                t.setAttribute("contenteditable", "false"),
                e.textContent.endsWith(s.Constants.ZWSP) ||
                  e.insertAdjacentHTML(
                    "beforeend",
                    `<span style="position: absolute">${s.Constants.ZWSP}</span>`
                  ));
            });
          };
        },
        434: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.mindmapRender = void 0);
          const n = a(427),
            s = a(655),
            r = a(920);
          t.mindmapRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "mindmap" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="mindmap"]'))),
              0 !== a.length &&
                (0, n.addScript)(
                  `${t}/js/echarts/echarts.min.js?v=0.0.0`,
                  "protyleEchartsScript"
                ).then(() => {
                  let e;
                  if (0 === a[0].firstElementChild.clientWidth) {
                    const t = (0, r.hasClosestByClassName)(
                      a[0],
                      "layout-tab-container",
                      !0
                    );
                    t &&
                      Array.from(t.children).find((t) => {
                        if (
                          t.classList.contains("protyle") &&
                          !t.classList.contains("fn__none") &&
                          t.querySelector(".protyle-wysiwyg").firstElementChild
                        )
                          return (
                            (e =
                              t.querySelector(".protyle-wysiwyg")
                                .firstElementChild.clientWidth),
                            !0
                          );
                      });
                  }
                  a.forEach((t) => {
                    const a = Lute.UnEscapeHTMLStr(
                      t.getAttribute("data-content")
                    );
                    if (!a || "true" === t.getAttribute("data-render")) return;
                    t.firstElementChild.classList.contains("protyle-icons") ||
                      t.insertAdjacentHTML(
                        "afterbegin",
                        '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                      );
                    const n = t.firstElementChild.nextElementSibling;
                    try {
                      (n.style.height = t.style.height),
                        echarts
                          .init(
                            n,
                            1 === window.siyuan.config.appearance.mode
                              ? "dark"
                              : void 0,
                            { width: e }
                          )
                          .setOption({
                            series: [
                              {
                                data: [JSON.parse(Lute.EChartsMindmapStr(a))],
                                initialTreeDepth: -1,
                                itemStyle: { borderWidth: 0, color: "#4285f4" },
                                label: {
                                  backgroundColor: "#f6f8fa",
                                  borderColor: "#d1d5da",
                                  borderRadius: 5,
                                  borderWidth: 0.5,
                                  color: "#586069",
                                  lineHeight: 20,
                                  offset: [-5, 0],
                                  padding: [0, 5],
                                  position: "insideRight",
                                },
                                lineStyle: { color: "#d1d5da", width: 1 },
                                roam: !0,
                                symbol: (e, t) => {
                                  var a;
                                  return (
                                    null ===
                                      (a = null == t ? void 0 : t.data) ||
                                    void 0 === a
                                      ? void 0
                                      : a.children
                                  )
                                    ? "circle"
                                    : "path://";
                                },
                                type: "tree",
                              },
                            ],
                            tooltip: {
                              trigger: "item",
                              triggerOn: "mousemove",
                            },
                          }),
                        t.setAttribute("data-render", "true"),
                        n.textContent.endsWith(s.Constants.ZWSP) ||
                          n.firstElementChild.insertAdjacentText(
                            "beforeend",
                            s.Constants.ZWSP
                          ),
                        n.classList.remove("ft__error");
                    } catch (e) {
                      n.classList.add("ft__error"),
                        (n.innerHTML = `mindmap render error: <br>${e}`);
                    }
                  });
                });
          };
        },
        759: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.plantumlRender = void 0);
          const n = a(427),
            s = a(655);
          t.plantumlRender = (e, t = s.Constants.PROTYLE_CDN) => {
            let a = [];
            (a =
              "plantuml" === e.getAttribute("data-subtype")
                ? [e]
                : Array.from(e.querySelectorAll('[data-subtype="plantuml"]'))),
              0 !== a.length &&
                (0, n.addScript)(
                  `${t}/js/plantuml/plantuml-encoder.min.js?v=0.0.0`,
                  "protylePlantumlScript"
                ).then(() => {
                  a.forEach((e) => {
                    const t = Lute.UnEscapeHTMLStr(
                      e.getAttribute("data-content")
                    );
                    if (!t) return;
                    e.firstElementChild.classList.contains("protyle-icons") ||
                      e.insertAdjacentHTML(
                        "afterbegin",
                        '<div class="protyle-icons"><span class="protyle-icon protyle-icon--first protyle-action__edit"><svg><use xlink:href="#iconEdit"></use></svg></span><span class="protyle-icon protyle-action__menu protyle-icon--last"><svg><use xlink:href="#iconMore"></use></svg></span></div>'
                      );
                    const a = e.firstElementChild.nextElementSibling;
                    try {
                      (a.innerHTML = `<img src=${
                        window.siyuan.config.editor.plantUMLServePath
                      }${plantumlEncoder.encode(t)}">`),
                        a.classList.remove("ft__error");
                    } catch (e) {
                      a.classList.add("ft__error"),
                        (a.innerHTML = `plantuml render error: <br>${e}`);
                    }
                  });
                });
          };
        },
        831: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.setCodeTheme = void 0);
          const n = a(655),
            s = a(27);
          t.setCodeTheme = (e = n.Constants.PROTYLE_CDN) => {
            const t = document.getElementById("protyleHljsStyle");
            let a;
            0 === window.siyuan.config.appearance.mode
              ? ((a = window.siyuan.config.appearance.codeBlockThemeLight),
                n.Constants.SIYUAN_CONFIG_APPEARANCE_LIGHT_CODE.includes(a) ||
                  (a = "default"))
              : ((a = window.siyuan.config.appearance.codeBlockThemeDark),
                n.Constants.SIYUAN_CONFIG_APPEARANCE_DARK_CODE.includes(a) ||
                  (a = "github-dark"));
            const r = `${e}/js/highlight.js/styles/${a}.min.css?v=11.5.0`;
            t
              ? t.href.includes(r) ||
                (t.remove(), (0, s.addStyle)(r, "protyleHljsStyle"))
              : (0, s.addStyle)(r, "protyleHljsStyle");
          };
        },
        427: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.addScript = t.addScriptSync = void 0);
          t.addScriptSync = (e, t) => {
            if (document.getElementById(t)) return !1;
            const a = new XMLHttpRequest();
            a.open("GET", e, !1),
              a.setRequestHeader(
                "Accept",
                "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"
              ),
              a.send("");
            const n = document.createElement("script");
            (n.type = "text/javascript"),
              (n.text = a.responseText),
              (n.id = t),
              document.head.appendChild(n);
          };
          t.addScript = (e, t) =>
            new Promise((a) => {
              if (document.getElementById(t)) return a(!1), !1;
              const n = document.createElement("script");
              (n.src = e),
                (n.async = !0),
                document.head.appendChild(n),
                (n.onload = () => {
                  if (document.getElementById(t)) return n.remove(), a(!1), !1;
                  (n.id = t), a(!0);
                });
            });
        },
        27: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.addStyle = void 0);
          t.addStyle = (e, t) => {
            if (!document.getElementById(t)) {
              const a = document.createElement("link");
              (a.id = t),
                (a.rel = "stylesheet"),
                (a.type = "text/css"),
                (a.href = e),
                document.getElementsByTagName("head")[0].appendChild(a);
            }
          };
        },
        920: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.hasClosestByClassName =
              t.hasClosestByMatchTag =
              t.hasClosestBlock =
              t.hasClosestByAttribute =
              t.hasTopClosestByTag =
              t.hasTopClosestByClassName =
              t.hasClosestByTag =
                void 0);
          t.hasClosestByTag = (e, t) => {
            if (!e) return !1;
            3 === e.nodeType && (e = e.parentElement);
            let a = e,
              n = !1;
            for (; a && !n && !a.classList.contains("b3-typography"); )
              0 === a.nodeName.indexOf(t) ? (n = !0) : (a = a.parentElement);
            return n && a;
          };
          t.hasTopClosestByClassName = (e, a, n = !1) => {
            let s = (0, t.hasClosestByClassName)(e, a, n),
              r = !1,
              i = !1;
            for (
              ;
              s &&
              (n
                ? "BODY" !== s.tagName
                : !s.classList.contains("protyle-wysiwyg")) &&
              !i;

            )
              (r = (0, t.hasClosestByClassName)(s.parentElement, a, n)),
                r ? (s = r) : (i = !0);
            return s || !1;
          };
          t.hasTopClosestByTag = (e, a) => {
            let n = (0, t.hasClosestByTag)(e, a),
              s = !1,
              r = !1;
            for (; n && !n.classList.contains("protyle-wysiwyg") && !r; )
              (s = (0, t.hasClosestByTag)(n.parentElement, a)),
                s ? (n = s) : (r = !0);
            return n || !1;
          };
          t.hasClosestByAttribute = (e, t, a, n = !1) => {
            if (!e) return !1;
            3 === e.nodeType && (e = e.parentElement);
            let s = e,
              r = !1;
            for (
              ;
              s &&
              !r &&
              (n
                ? "BODY" !== s.tagName
                : !s.classList.contains("protyle-wysiwyg"));

            )
              ("string" == typeof a && s.getAttribute(t) === a) ||
              ("string" != typeof a && s.hasAttribute(t))
                ? (r = !0)
                : (s = s.parentElement);
            return r && s;
          };
          t.hasClosestBlock = (e) => {
            var a;
            const n = (0, t.hasClosestByAttribute)(e, "data-node-id", null);
            return (
              !(
                !n ||
                "BUTTON" === n.tagName ||
                !(null === (a = n.getAttribute("data-type")) || void 0 === a
                  ? void 0
                  : a.startsWith("Node"))
              ) && n
            );
          };
          t.hasClosestByMatchTag = (e, t) => {
            if (!e) return !1;
            3 === e.nodeType && (e = e.parentElement);
            let a = e,
              n = !1;
            for (; a && !n && !a.classList.contains("protyle-wysiwyg"); )
              a.nodeName === t ? (n = !0) : (a = a.parentElement);
            return n && a;
          };
          t.hasClosestByClassName = (e, t, a = !1) => {
            if (!e) return !1;
            3 === e.nodeType && (e = e.parentElement);
            let n = e,
              s = !1;
            for (
              ;
              n &&
              !s &&
              (a
                ? "BODY" !== n.tagName
                : !n.classList.contains("protyle-wysiwyg"));

            )
              n.classList.contains(t) ? (s = !0) : (n = n.parentElement);
            return s && n;
          };
        },
        500: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.focusSideBlock =
              t.focusBlock =
              t.focusByRange =
              t.focusByWbr =
              t.focusByOffset =
              t.setFirstNodeRange =
              t.setLastNodeRange =
              t.getSelectionOffset =
              t.getSelectionPosition =
              t.getEditorRange =
              t.selectAll =
                void 0);
          const n = a(81),
            s = a(920);
          t.selectAll = (e, a, r) => {
            const i = (0, n.getContenteditableElement)(a);
            if (i) {
              let n;
              if ("TABLE" === i.tagName) {
                const i =
                  (0, s.hasClosestByMatchTag)(r.startContainer, "TD") ||
                  (0, s.hasClosestByMatchTag)(r.startContainer, "TH");
                if (
                  i &&
                  ((n = (0, t.getSelectionOffset)(i, a, r)),
                  0 !== n.start || n.end !== i.textContent.length)
                )
                  return (
                    r.setStart(i.firstChild, 0),
                    r.setEndAfter(i.lastChild),
                    e.toolbar.render(e, r),
                    !0
                  );
              } else if (
                ((n = (0, t.getSelectionOffset)(i, a, r)),
                0 !== n.start || n.end !== i.textContent.length)
              )
                return (
                  r.setStart(i.firstChild, 0),
                  r.setEndAfter(i.lastChild),
                  e.toolbar.render(e, r),
                  !0
                );
            }
            r.collapse(!0);
            const o = e.wysiwyg.element.querySelectorAll(
              ".protyle-wysiwyg--select"
            );
            if (
              e.wysiwyg.element.childElementCount === o.length &&
              o[0].parentElement.isSameNode(e.wysiwyg.element)
            )
              return !0;
            o.forEach((e) => {
              e.classList.remove("protyle-wysiwyg--select");
            }),
              Array.from(e.wysiwyg.element.children).forEach((e) => {
                e.classList.add("protyle-wysiwyg--select");
              });
          };
          t.getEditorRange = (e) => {
            let t, a;
            return (
              (getSelection().rangeCount > 0 &&
                ((t = getSelection().getRangeAt(0)),
                e.isEqualNode(t.startContainer) ||
                  e.contains(t.startContainer))) ||
                (e.focus({ preventScroll: !0 }),
                e.classList.contains("table")
                  ? (a = e.querySelector("th") || e.querySelector("td"))
                  : ((a = (0, n.getContenteditableElement)(e)), a || (a = e)),
                (t = a.ownerDocument.createRange()),
                t.setStart(a || e, 0),
                t.collapse(!0)),
              t
            );
          };
          t.getSelectionPosition = (e, a) => {
            if (
              (a || (a = (0, t.getEditorRange)(e)),
              !e.contains(a.startContainer))
            )
              return { left: 0, top: 0 };
            let n;
            if (0 === a.getClientRects().length)
              if (3 === a.startContainer.nodeType) {
                const e = a.startContainer.parentElement;
                if (!(e && e.getClientRects().length > 0))
                  return { left: 0, top: 0 };
                n = e.getClientRects()[0];
              } else {
                const e = a.startContainer.children;
                if (
                  e[a.startOffset] &&
                  e[a.startOffset].getClientRects().length > 0
                )
                  n = e[a.startOffset].getClientRects()[0];
                else if (a.startContainer.childNodes.length > 0) {
                  const e = a.cloneRange();
                  a.selectNode(
                    a.startContainer.childNodes[Math.max(0, a.startOffset - 1)]
                  ),
                    (n = a.getClientRects()[0]),
                    a.setEnd(e.endContainer, e.endOffset),
                    a.setStart(e.startContainer, e.startOffset);
                } else n = a.startContainer.getClientRects()[0];
                if (!n) {
                  let e = a.startContainer.childNodes[a.startOffset];
                  for (
                    e || (e = a.startContainer.childNodes[a.startOffset - 1]);
                    !e.getClientRects ||
                    (e.getClientRects && 0 === e.getClientRects().length);

                  )
                    e = e.parentElement;
                  n = e.getClientRects()[0];
                }
              }
            else n = a.getBoundingClientRect();
            return { left: n.left, top: n.top };
          };
          function r(e, t, a, n) {
            if (!t) return !1;
            if (a(t)) return !0;
            for (let e = 0, n = t.childNodes.length; e < n; e++)
              if (r(t, t.childNodes[e], a, !0)) return !0;
            if (!n) {
              let n = t;
              for (; n && n !== e; ) {
                let t = n.nextSibling;
                for (; t; ) {
                  if (r(e, t, a, !0)) return !0;
                  t = t.nextSibling;
                }
                n = n.parentNode;
              }
            }
            return !1;
          }
          t.getSelectionOffset = (e, t, a) => {
            const n = { end: 0, start: 0 };
            if (!a) {
              if (0 === getSelection().rangeCount) return n;
              a = window.getSelection().getRangeAt(0);
            }
            if (
              t &&
              !((e, t) => {
                if (!t) {
                  if (0 === getSelection().rangeCount) return !1;
                  t = getSelection().getRangeAt(0);
                }
                const a = t.commonAncestorContainer;
                return e.isEqualNode(a) || e.contains(a);
              })(t, a)
            )
              return n;
            const s = a.cloneRange();
            return (
              e.childNodes[0] && e.childNodes[0].childNodes[0]
                ? s.setStart(e.childNodes[0].childNodes[0], 0)
                : s.selectNodeContents(e),
              s.setEnd(a.startContainer, a.startOffset),
              (n.start = s.toString().length),
              (n.end = n.start + a.toString().length),
              n
            );
          };
          t.setLastNodeRange = (e, t, a = !0) => {
            if (!e) return t;
            let n = e.lastChild;
            for (; n && 3 !== n.nodeType; ) n = n.lastChild;
            return n
              ? (a
                  ? t.setStart(n, n.textContent.length)
                  : t.setEnd(n, n.textContent.length),
                t)
              : (t.selectNodeContents(e), t);
          };
          t.setFirstNodeRange = (e, t) => {
            if (!e) return t;
            let a = e.firstChild;
            for (; a && 3 !== a.nodeType; ) a = a.firstChild;
            return a ? (t.setStart(a, 0), t) : (t.selectNodeContents(e), t);
          };
          t.focusByOffset = (e, a, s) => {
            if (!e) return;
            let i, o;
            r(e, e.firstChild, (e) => {
              if (e.nodeType === Node.TEXT_NODE) {
                const t = e.data.length;
                return a <= t ? ((i = e), !0) : ((a -= t), (s -= t), !1);
              }
            }),
              i &&
                r(e, i, (e) => {
                  if (e.nodeType === Node.TEXT_NODE) {
                    const t = e.data.length;
                    return s <= t ? ((o = e), !0) : ((s -= t), !1);
                  }
                });
            const l = document.createRange();
            i
              ? a < i.data.length
                ? l.setStart(i, a)
                : l.setStartAfter(i)
              : 0 === a
              ? l.setStart(e, 0)
              : (0, t.setLastNodeRange)((0, n.getContenteditableElement)(e), l),
              o
                ? s < o.data.length
                  ? l.setEnd(o, s)
                  : l.setEndAfter(o)
                : 0 === s
                ? l.setEnd(e, 0)
                : (0, t.setLastNodeRange)(
                    (0, n.getContenteditableElement)(e),
                    l,
                    !1
                  ),
              (0, t.focusByRange)(l);
          };
          t.focusByWbr = (e, a) => {
            var s;
            const r = e.querySelectorAll("wbr");
            if (0 === r.length) return;
            r.forEach((e, t) => {
              0 !== t && e.remove();
            });
            const i = r[0];
            if (i.previousElementSibling) {
              const e = (0, n.hasPreviousSibling)(i);
              e && i.previousElementSibling.isSameNode(e)
                ? 3 ===
                  (null === (s = i.previousElementSibling.lastChild) ||
                  void 0 === s
                    ? void 0
                    : s.nodeType)
                  ? a.setStart(
                      i.previousElementSibling.lastChild,
                      i.previousElementSibling.lastChild.textContent.length
                    )
                  : 3 !== e.nodeType && e.classList.contains("img")
                  ? a.setStartAfter(e)
                  : a.setStartBefore(i)
                : a.setStart(
                    i.previousSibling,
                    i.previousSibling.textContent.length
                  );
            } else
              i.previousSibling
                ? a.setStart(
                    i.previousSibling,
                    i.previousSibling.textContent.length
                  )
                : i.nextSibling
                ? 3 === i.nextSibling.nodeType
                  ? a.setStart(i.nextSibling, 0)
                  : a.setStartAfter(i)
                : a.setStart(i.parentElement, 0);
            a.collapse(!0), i.remove(), (0, t.focusByRange)(a);
          };
          t.focusByRange = (e) => {
            if (!e) return;
            const t = window.getSelection();
            t.removeAllRanges(), t.addRange(e);
          };
          t.focusBlock = (e, a, s = !0) => {
            var r;
            if (!e) return !1;
            if (
              e.classList.contains("render-node") ||
              e.classList.contains("iframe") ||
              e.classList.contains("hr")
            ) {
              const a = document.createRange(),
                n = e.getAttribute("data-type");
              let s = !1;
              return (
                "NodeThematicBreak" === n
                  ? (a.selectNodeContents(e.firstElementChild), (s = !0))
                  : "NodeBlockQueryEmbed" === n &&
                    e.lastElementChild.previousElementSibling
                  ? (a.selectNodeContents(
                      e.lastElementChild.previousElementSibling
                    ),
                    (s = !0))
                  : ["NodeMathBlock", "NodeHTMLBlock"].includes(n) &&
                    (null === (r = e.lastElementChild.previousElementSibling) ||
                    void 0 === r
                      ? void 0
                      : r.lastElementChild)
                  ? (a.selectNodeContents(
                      e.lastElementChild.previousElementSibling.lastElementChild
                    ),
                    (s = !0))
                  : "NodeIFrame" === n || "NodeWidget" === n
                  ? (a.setStart(e, 0), (s = !0))
                  : "NodeVideo" === n
                  ? (a.setStart(e.firstElementChild, 0), (s = !0))
                  : "NodeAudio" === n
                  ? (a.setStart(e.firstElementChild.lastChild, 0), (s = !0))
                  : "NodeCodeBlock" === n &&
                    (a.selectNodeContents(e), (s = !0)),
                s ? ((0, t.focusByRange)(a), a) : ((0, t.focusSideBlock)(e), !1)
              );
            }
            let i;
            if (
              (s
                ? (i = (0, n.getContenteditableElement)(e))
                : Array.from(e.querySelectorAll('[contenteditable="true"]'))
                    .reverse()
                    .find((e) => {
                      if (e.getBoundingClientRect().width > 0)
                        return (i = e), !0;
                    }),
              i)
            ) {
              if ("TABLE" === i.tagName)
                if (s) i = i.querySelector("th, td");
                else {
                  const e = i.querySelectorAll("th, td");
                  i = e[e.length - 1];
                }
              const e = (0, t.getEditorRange)(i);
              return (
                e.selectNodeContents(i),
                e.collapse(s),
                (0, t.focusByRange)(e),
                e
              );
            }
            return a && a.focus(), !1;
          };
          t.focusSideBlock = (e) => {
            if (e.getAttribute("data-node-id")) {
              let a, s;
              e.nextElementSibling
                ? ((s = !0), (a = (0, n.getNextBlock)(e)))
                : e.previousElementSibling &&
                  ((s = !1), (a = (0, n.getPreviousBlock)(e))),
                a || (a = e);
              const r = (0, n.getContenteditableElement)(a);
              if (r) {
                const e = (0, t.getEditorRange)(r);
                e.selectNodeContents(r), e.collapse(s), (0, t.focusByRange)(e);
              } else {
                const a = e.querySelector(".katex-display");
                if (a) {
                  const e = a.nextElementSibling.ownerDocument.createRange();
                  e.setStart(a.nextElementSibling.firstChild, 0),
                    (0, t.focusByRange)(e);
                }
              }
              return;
            }
            const a = (0, t.getEditorRange)(e);
            e.nextSibling
              ? (a.selectNodeContents(e.nextSibling), a.collapse(!0))
              : e.previousSibling &&
                (a.selectNodeContents(e.previousSibling), a.collapse(!1)),
              (0, t.focusByRange)(a);
          };
        },
        81: (e, t, a) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.hasPrevious =
              t.hasPreviousSibling =
              t.hasNextSibling =
              t.getTopAloneElement =
              t.getTopEmptyElement =
              t.isNotEditBlock =
              t.getContenteditableElement =
              t.getNoContainerElement =
              t.getNextBlock =
              t.getFirstBlock =
              t.getLastBlock =
              t.getPreviousBlock =
              t.getPreviousHeading =
                void 0);
          const n = a(920);
          t.getPreviousHeading = (e) => {
            let a = (0, t.getPreviousBlock)(e);
            for (; a && "NodeHeading" !== a.getAttribute("data-type"); )
              a = (0, t.getPreviousBlock)(a);
            return a;
          };
          t.getPreviousBlock = (e) => {
            let t = e;
            for (; t; ) {
              if (
                t.previousElementSibling &&
                t.previousElementSibling.getAttribute("data-node-id")
              )
                return t.previousElementSibling;
              const e = (0, n.hasClosestBlock)(t.parentElement);
              if (!e) return !1;
              t = e;
            }
          };
          t.getLastBlock = (e) => {
            let t;
            return (
              Array.from(e.querySelectorAll("[data-node-id]"))
                .reverse()
                .find((e) => {
                  if (
                    !(0, n.hasClosestByAttribute)(
                      e.parentElement,
                      "data-type",
                      "NodeBlockQueryEmbed"
                    )
                  )
                    return (t = e), !0;
                }),
              t || e
            );
          };
          t.getFirstBlock = (e) => {
            let t;
            return (
              Array.from(e.querySelectorAll("[data-node-id]")).find((e) => {
                if (
                  !(0, n.hasClosestByAttribute)(
                    e.parentElement,
                    "data-type",
                    "NodeBlockQueryEmbed"
                  ) &&
                  !e.classList.contains("li")
                )
                  return (t = e), !0;
              }),
              t || e
            );
          };
          t.getNextBlock = (e) => {
            let t = e;
            for (; t; ) {
              if (
                t.nextElementSibling &&
                !t.nextElementSibling.classList.contains("protyle-attr")
              )
                return t.nextElementSibling;
              const e = (0, n.hasClosestBlock)(t.parentElement);
              if (!e) return !1;
              t = e;
            }
            return !1;
          };
          t.getNoContainerElement = (e) => {
            let t = e;
            for (; t; ) {
              if (
                !(
                  t.classList.contains("list") ||
                  t.classList.contains("li") ||
                  t.classList.contains("bq") ||
                  t.classList.contains("sb")
                )
              )
                return t;
              t = t.querySelector("[data-node-id]");
            }
            return !1;
          };
          t.getContenteditableElement = (e) =>
            e && "true" !== e.getAttribute("contenteditable")
              ? e.querySelector('[contenteditable="true"]')
              : e;
          t.isNotEditBlock = (e) =>
            [
              "NodeBlockQueryEmbed",
              "NodeThematicBreak",
              "NodeMathBlock",
              "NodeHTMLBlock",
              "NodeIFrame",
              "NodeWidget",
              "NodeVideo",
              "NodeAudio",
            ].includes(e.getAttribute("data-type")) ||
            ("NodeCodeBlock" === e.getAttribute("data-type") &&
              e.classList.contains("render-node"));
          t.getTopEmptyElement = (e) => {
            var t;
            let a = e;
            for (
              ;
              a.parentElement &&
              !a.parentElement.classList.contains("protyle-wysiwyg");

            )
              if (a.parentElement.getAttribute("data-node-id")) {
                if (
                  "" !== a.parentElement.textContent ||
                  (null === (t = a.previousElementSibling) || void 0 === t
                    ? void 0
                    : t.getAttribute("data-node-id"))
                )
                  break;
                a = a.parentElement;
              } else a = a.parentElement;
            return a;
          };
          t.getTopAloneElement = (e) => {
            if (
              "NodeBlockquote" === e.parentElement.getAttribute("data-type") &&
              2 === e.parentElement.childElementCount
            )
              for (
                ;
                !e.parentElement.classList.contains("protyle-wysiwyg") &&
                "NodeBlockquote" ===
                  e.parentElement.getAttribute("data-type") &&
                2 === e.parentElement.childElementCount;

              )
                e = e.parentElement;
            else if (
              "NodeSuperBlock" === e.parentElement.getAttribute("data-type") &&
              2 === e.parentElement.childElementCount
            )
              for (; !e.parentElement.classList.contains("protyle-wysiwyg"); ) {
                if (
                  "NodeSuperBlock" !==
                    e.parentElement.getAttribute("data-type") ||
                  2 !== e.parentElement.childElementCount
                ) {
                  e = (0, t.getTopAloneElement)(e);
                  break;
                }
                e = e.parentElement;
              }
            else if (
              "NodeListItem" === e.parentElement.getAttribute("data-type") &&
              3 === e.parentElement.childElementCount
            )
              for (; !e.parentElement.classList.contains("protyle-wysiwyg"); )
                if (
                  "NodeListItem" ===
                    e.parentElement.getAttribute("data-type") &&
                  3 === e.parentElement.childElementCount
                )
                  e = e.parentElement;
                else {
                  if (
                    "NodeList" !== e.parentElement.getAttribute("data-type") ||
                    2 !== e.parentElement.childElementCount
                  ) {
                    e = (0, t.getTopAloneElement)(e);
                    break;
                  }
                  e = e.parentElement;
                }
            else if (
              "NodeList" === e.parentElement.getAttribute("data-type") &&
              2 === e.parentElement.childElementCount
            )
              for (; !e.parentElement.classList.contains("protyle-wysiwyg"); )
                if (
                  "NodeList" === e.parentElement.getAttribute("data-type") &&
                  2 === e.parentElement.childElementCount
                )
                  e = e.parentElement;
                else {
                  if (
                    "NodeListItem" !==
                      e.parentElement.getAttribute("data-type") ||
                    3 !== e.parentElement.childElementCount
                  )
                    break;
                  e = e.parentElement;
                }
            return e;
          };
          t.hasNextSibling = (e) => {
            let t = e.nextSibling;
            for (; t; ) {
              if ("" !== t.textContent) return t;
              t = t.nextSibling;
            }
            return !1;
          };
          t.hasPreviousSibling = (e) => {
            let t = e.previousSibling;
            for (; t; ) {
              if ("" !== t.textContent || 3 !== t.nodeType) return t;
              t = t.previousSibling;
            }
            return !1;
          };
          t.hasPrevious = (e) => {
            let t = e.previousSibling;
            for (; t; ) {
              if ("" !== t.textContent) return t;
              t = t.previousSibling;
            }
            return !1;
          };
        },
      },
      t = {};
    function a(n) {
      var s = t[n];
      if (void 0 !== s) return s.exports;
      var r = (t[n] = { exports: {} });
      return e[n](r, r.exports, a), r.exports;
    }
    a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    };
    var n = {};
    return (
      (() => {
        var e = n;
        const t = a(719),
          s = a(865),
          r = a(906),
          i = a(752),
          o = a(709),
          l = a(445),
          c = a(686),
          d = a(434),
          u = a(129),
          m = a(759);
        a(130);
        class g {}
        (g.graphvizRender = t.graphvizRender),
          (g.highlightRender = s.highlightRender),
          (g.mathRender = r.mathRender),
          (g.mermaidRender = i.mermaidRender),
          (g.flowchartRender = o.flowchartRender),
          (g.chartRender = l.chartRender),
          (g.abcRender = c.abcRender),
          (g.mindmapRender = d.mindmapRender),
          (g.plantumlRender = m.plantumlRender),
          (g.mediaRender = u.mediaRender),
          (e.default = g);
      })(),
      (n = n.default)
    );
  })();
});
