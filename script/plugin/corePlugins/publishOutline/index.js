export class publishOutline extends naive.plugin {
  constructor() {
    super({ name: "publishOutline" });
  }
  pipe = [this.生成文档大纲];
}
export const dependencies = ["publishContent"];
export const environments = ["APP"];
