const toolbar = Vue.createApp({
  template: `<div>  <el-row
    height='30'
    background-color="var(--b3-theme-surface)"
    text-color="var(--b3-themes-primary)"
    align='middle'
    justify='center'
    max-width=500
    :gutter="2"
  >
  <el-col :push="1" :span="6" >

  <el-popover placement="bottom" :width="400" trigger="click">
    <template #reference>
        <span class='menu_item_icon' >
            <svg>
            <use xlink:href="#iconFiles">
            </use>
            </svg>
        </span>
        
    </template>
        <el-card>
            <template v-if="笔记本列表[0]">
                <el-tree :icon="null" 	 @node-click='(node)=>node?生成子文档树(node):null'		 :data="笔记本列表">
                    <template #default="{ data}"  >
                    <span>
                        <span class="list_item_icon" v-if='data.icon' v-html='data.icon'></span>
                        
                        <el-link :href='"/block/"+data.id'  v-if="data.box">
                        {{data.name}}
                        </el-link>
                        <span :href='"/?blockid="+data.id' v-if="!data.box">
                        {{data.name}}
                        </span>
                    </span>

                    </template>
                </el-tree>

            </template>
        </el-card>
    </el-popover>   
    </el-col>
  
   



    <el-col :span="10">
            <el-popover 
            placement="bottom" width="60vw" trigger="focus" v-model:visible="显示">
            <template #reference>
            <el-input 
            v-model="搜索关键词"
            @change="搜索($event)"
            @keyup.enter="搜索($event)"
            @input="搜索关键词=$event.value?$event.value:搜索关键词"

            class="w-50 m-2"
            placeholder="Type something"
        >           <template #prefix>
        <span class='menu_item_icon' >

        <svg @click="显示=!显示" @touchstop="显示=!显示">
        <use xlink:href="#iconSearch">
        </use>
        </svg>
        </span>
        </template>
        </el-input>
        </template>
        <el-card>
            <div v-for = "搜索结果条目 in 搜索结果">
                    <el-row>
                    <el-col :span="10">
                    <el-link :href='"/block/"+搜索结果条目.id' >

                    <span>
                    {{搜索结果条目.hPath}}

                </span>
                </el-link>

                    </el-col>
                    <el-col :span="10">
                        <div v-html=搜索结果条目.content></div>
                    </el-col>
                    </el-row>
                </div>
            </el-card>
        
        </el-popover>

  </el-col>

  </el-row>
  </div>
  <el-backtop :right="100" :bottom="100" />

`,
  data() {
    return {
      笔记本列表: [],
      搜索关键词:"",
      搜索结果:[],
      显示:false
    };
  },
  async mounted() {
    await this.生成文档树();
  },
  watch: {
    搜索关键词(新值) {
      this.搜索(新值);
    }
  },
  methods: {
    搜索:async function(text){
        console.log(text)
        let url = "/api/search/fullTextSearchBlock";
        let data = {path: "",
        query: text,
        types: {document: true}
        }
        let 返回信息 = await this.请求数据(url, "", data);
        console.log(返回信息)
        this.搜索结果 =返回信息.data
    },
    loadNode: async function (node, resolve) {
      this.生成子文档树(node);
    },
    生成图标: async function (icon) {
      let iconurl = `/appearance/emojis/${icon}.svg`;
      let res = await fetch(iconurl);
      let text = await res.text();
      if (text) {
        图标内容 = text;
        if (图标内容 && 图标内容.indexOf("<svg") !== 0) {
          图标内容 = `<img src="/emojis/${icon}"></img>`;
        }
      }

      return 图标内容;
    },
    生成文档树: async function () {
      let 笔记本列表 = await this.请求笔记本列表();
      笔记本列表 = 笔记本列表.notebooks;
      this.笔记本列表 = 笔记本列表;
      for (let i = 0, len = 笔记本列表.length; i < len; i++) {
        let 笔记本 = await this.请求笔记列表(
          笔记本列表[i].id,
          "/",
          笔记本列表[i].sort
        );
        笔记本列表[i].icon = await this.生成图标(笔记本列表[i].icon);

        笔记本列表[i].children = [];
        笔记本列表[i].children = 笔记本.files;
        for (let j = 0, len = 笔记本列表[i].children.length; j < len; j++) {
          let el = 笔记本列表[i].children[j];

          if (el) {
            el.box = 笔记本列表[i].id;
          }
        }
      }
      this.笔记本列表 = JSON.parse(JSON.stringify(笔记本列表));
    },
    生成子文档树: async function (data) {
      let box = data.box || data.id;
      let path = data.path || "/";
      let sort = data.sort;
      let 笔记列表 = await this.请求笔记列表(box, path, sort);
      if (笔记列表) {
        data.children = 笔记列表.files;
        if (data.children) {
          for (let i = 0, len = data.children.length; i < len; i++) {
            let doc = data.children[i];
            doc.name = doc.name.slice(0, doc.name.length - 3);
            doc.box = data.box || data.id;
            if (doc.icon) {
              doc.icon = await this.生成图标(doc.icon);
            }
          }
        }
      }
    },

    请求笔记本列表: async function () {
      let url = "/api/notebook/lsNotebooks";
      let data = {};
      let 返回信息 = await this.请求数据(url, "", data);
      let 返回数据 = 返回信息["data"];
      return 返回数据;
    },
    请求笔记列表: async function (notebook, path, sort) {
      let url = "/api/filetree/listDocsByPath";
      let data = { notebook: notebook, path: path, sort: sort };
      let 返回信息 = await this.请求数据(url, "", data);
      let 返回数据 = 返回信息["data"];
      return 返回数据;
    },

    请求数据: async function (url, apitoken, data) {
      let resData = null;
      let str = JSON.stringify(data)
      await fetch(url, {
        body: str,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Token " + apitoken,
        }
      }).then(function (response) {
        resData = response.json();
      });
      return resData;
    },
  },
});
toolbar.use(ElementPlus);
toolbar.mount("#toolbar");
