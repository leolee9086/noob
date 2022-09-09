function url格式化(url, ssl = true) {
  switch (
    true // 格式化 URL
  ) {
    case url.startsWith("assets/"):
    case url.startsWith("widgets/"):
    case url.startsWith("emojies/"):
    case url.startsWith("appearance/"):
    case url.startsWith("export/"):
      return new URL(`${window.location.origin}/${url}`);
    case url.startsWith("//"):
      return new URL(`${ssl ? "https" : "http"}:${url}`);
    case url.startsWith("/"):
      return new URL(`${window.location.origin}${url}`);
    case url.startsWith("http://"):
    case url.startsWith("https://"):
      return new URL(url);
    default:
      return new URL(`${ssl ? "https" : "http"}://${url}`);
  }
}

export class siyuanURL extends naive.plugin {
  constructor() {
    super({ name: "siyuanURL" });
    this.setPluginsProp({中文:"思源url格式化"}, url格式化);
  }
}
