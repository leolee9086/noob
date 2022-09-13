export function 修改块链接(req, res, div) {
  let links = div.querySelectorAll("a");
  if (links[0]) {
    links.forEach((a) => {
      let href = a.getAttribute("href");
      a.setAttribute("href", href.replace("siyuan://blocks/", `/block/`));
      href.indexOf("siyuan://") == 0
        ? a.setAttribute("type", "blockref")
        : null;
    });
  }
  let blockrefs = div.querySelectorAll('span[data-type="block-ref"]');
  if (blockrefs[0]) {
    blockrefs.forEach((a) => {
      let link = document.createElement("a");
      link.innerHTML = a.innerHTML;
      link.setAttribute("data-type", a.getAttribute("data-type"));
      link.setAttribute("data-id", a.getAttribute("data-id"));
      link.setAttribute("type", "blockref");
      link.setAttribute("href", `/block/${a.getAttribute("data-id")}`);
      a.innerHTML = '';
      a.appendChild(link);

    });
  }
  let contentdivs = div.querySelectorAll('*[contenteditable="true"]');
  if (contentdivs[0]) {
    contentdivs.forEach((contentdiv) => {
      contentdiv.setAttribute("contenteditable", "false");
    });
  }
  let outlinks = div.querySelectorAll('span[data-type="a"]');
  if (outlinks[0]) {
    outlinks.forEach((a) => {
      let link = document.createElement("a");
      link.innerHTML = a.innerHTML;
      link.setAttribute("data-type", a.getAttribute("data-type"));
      link.setAttribute("data-id", a.getAttribute("data-id"));
      link.setAttribute("type", "a");
      link.setAttribute("href", a.getAttribute("data-href"));
      a.innerHTML = '';
      a.appendChild(link);

    });
  }
  let assets = div.querySelectorAll("a[src]");
  if (assets[0]) {
    assets.forEach((a) => {

      let src = a.getAttribute("src");
      if (src.indexOf("assets") == 0) {
        if (naive.设置.使用图床资源) {
          a.setAttribute(
            "src",
            naive.设置.发布图床前缀 + src.slice(7, src.length)
          );
        } else {
          a.setAttribute("src", `/` + src);
        }
      }
    });
  }
  return div;
}
