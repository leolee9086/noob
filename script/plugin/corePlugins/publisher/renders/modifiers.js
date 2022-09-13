
export async function 修改嵌入块(req, res, 渲染结果) {
  let docId = 渲染结果.block.docInfor.id;
  渲染结果 = await 刷新嵌入块(渲染结果, docId);
  return 渲染结果;
}
export async function 刷新嵌入块(元素, docid) {
  let 嵌入块数组 = 元素.querySelectorAll('[data-type="NodeBlockQueryEmbed"]');
  if (嵌入块数组[0]) {
    for (let i = 0; i < 嵌入块数组.length; i++) {
      let el = 嵌入块数组[i];
      el.innerHTML = await 获取嵌入块内容(el, docid);
    }
  }
  console.log(元素);
  return 元素;
}
export async function 获取嵌入块内容(嵌入块, docid) {
  let smt = 嵌入块.getAttribute("data-content");
  let id数组 = [];
  let 当前文档id = docid;
  let 嵌入块id = 嵌入块.getAttribute("data-node-id");
  let 嵌入块信息 = await this.核心api.sql(
    { stmt: `select * from blocks where id = ${嵌入块id}` },
    ''
  );
  let 当前父id;
  if (嵌入块信息 && 嵌入块信息["data"] && 嵌入块信息["data"][0]) {
    当前父id = 嵌入块信息["data"][0]["parent_id"];
  }
  当前文档id ? id数组.push(当前文档id) : null;
  当前父id ? id数组.push(当前父id) : null;
  嵌入块id ? id数组.push(嵌入块id) : null;
  嵌入块.getAttribute("data-node-id")
    ? id数组.push(嵌入块.getAttribute("data-node-id"))
    : null;
  let res =
    (await this.核心api.searchEmbedBlock(
      {
        stmt: smt,
        excludeIDs: id数组,
        headingMode: 0

      },
      "",

    )) || {};
  let blocks = res.blocks || [];
  console.log(blocks);

  let 嵌入块内容 = "";
  blocks.forEach((el) => {
    console.log(el);
    嵌入块内容 = 嵌入块内容 + el.content;
  });

  嵌入块.innerHTML = 嵌入块内容 + 嵌入块.innerHTML;
  return 嵌入块.innerHTML;
}
