//生成PPT核心类
import { zPPTContext } from "./zPPTContext";

//import { ZStyleSetting } from "./zSetting";
//import { ZSystemSetting } from "./zSetting";
import { ZLayoutStyle } from "./zSetting";


//import pptxgen from "../../PptxGenJS/dist/pptxgen.bundle.js";



export class ZLayoutStyleClass {

    // 获取布局样式 根据传入的文字内容
    // 这里可以根据文字内容的长度、关键词等来决定使用哪种布局样式
    // 例如，如果文字内容较长，可以选择更复杂的布局样式；如果较短，可以选择简单的布局样式
    // 这里只是一个示例，实际逻辑可以根据需求进行调整
    // 返回ZLayoutStyle枚举值
    // 例如：ZLayoutStyle.ZL1, ZLayoutStyle.ZL2, 等等
    public getLayoutStyle(ztext:string): ZLayoutStyle {
       const ret = ZLayoutStyle.ZL1;
        console.log("getLayoutStyle called with text:", ztext);

        return ret;
    }
}




export class zPPTCore {

    public pptx: any; // 使用any类型，实际使用时可以替换为具体的类型
    public constructor() {
        // 私有构造函数，防止外部实例化
        this.init();
    }
    public async init() {
        // 动态导入CDN
        const lib = await import("https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs/dist/pptxgen.bundle.js");
        const PptxGenJS = (lib as any).default; // 类型断言
        this.pptx = new PptxGenJS();
        this.pptx.writeFile({ fileName: "demo.pptx" });
        console.log("PPTXGenJS initialized");
    }

    //根据zlayoutStyle 生成卡片
    public generateCardByLayoutStyle(ztext: string, context: zPPTContext, zlayoutStyle: ZLayoutStyle) {
        // 这里可以根据zlayoutStyle来决定如何生成卡片
        // 例如，如果是ZLayoutStyle.ZL1，可以使用一种布局方式；如果是ZLayoutStyle.ZL2，可以使用另一种布局方式
        // 这里只是一个示例，实际逻辑可以根据需求进行调整
        
       this.pptx.title = "顶峰见";
        const slide = this.pptx.addSlide();
        
        switch (zlayoutStyle) 
        {
            case ZLayoutStyle.ZL1://风格1
                slide.addText(ztext, {x: 1, y: 1, w: 8, fontSize: 18});
                break;
            case ZLayoutStyle.ZL2://风格2
                slide.addText(ztext, {x: 1, y: 2, w: 8, fontSize: 20});
                break;
            // 可以添加更多的布局样式处理
            default:
                slide.addText(ztext, {x: 1, y: 1, w: 8, fontSize: 18});
                break;
        }
       //输出context的样式设置
        console.log("Context Style Setting:", context.getStyleSetting());
        console.log("Context System Setting:", context.getSystemSetting());
        console.log("Layout Style:", zlayoutStyle);
        console.log("Generated Card Text:", ztext);
    }

    //传入文字内容，和上下文内容，生成卡片
    public  generateCard(ztext: string, context: zPPTContext) {
        // 这里可以调用AI模型生成卡片内容
        const zlayout = new ZLayoutStyleClass();
        const zlasty = zlayout.getLayoutStyle(ztext);
        this.generateCardByLayoutStyle(ztext, context, zlasty);
    }

    //保存ppt，传入文件名
    public  savePPT(fileName: string) {
        this.pptx.writeFile({ fileName});
        console.log("PPT saved as:", fileName);
    }
}   
