//生成PPT核心类
import { zPPTContext } from "./zPPTContext";
//import { ZStyleSetting } from "./zSetting";
//import { ZSystemSetting } from "./zSetting";
import { ZLayoutStyle } from "./zSetting";
//import PptxGenJS from '../PptxGenJS/dist/pptxgen.bundle.js';

export class ZLayoutStyleClass {

    // 获取布局样式 根据传入的文字内容
    // 这里可以根据文字内容的长度、关键词等来决定使用哪种布局样式
    // 例如，如果文字内容较长，可以选择更复杂的布局样式；如果较短，可以选择简单的布局样式
    // 这里只是一个示例，实际逻辑可以根据需求进行调整
    // 返回ZLayoutStyle枚举值
    // 例如：ZLayoutStyle.ZL1, ZLayoutStyle.ZL2, 等等
    public getLayoutStyle(text:string): ZLayoutStyle {
       let ret = ZLayoutStyle.ZL1;

        return ret;
    }
}




export class zPPTCore {

    //public pptx = new PptxGenJS;
    public constructor() {
        // 私有构造函数，防止外部实例化
    }

    //根据zlayoutStyle 生成卡片
    public generateCardByLayoutStyle(text: string, context: zPPTContext, zlayoutStyle: ZLayoutStyle) {
        // 这里可以根据zlayoutStyle来决定如何生成卡片
        // 例如，如果是ZLayoutStyle.ZL1，可以使用一种布局方式；如果是ZLayoutStyle.ZL2，可以使用另一种布局方式
        // 这里只是一个示例，实际逻辑可以根据需求进行调整
        
       /* this.pptx.title = "顶峰见";
        let slide = this.pptx.addSlide();
        
        switch (zlayoutStyle) 
        {
            case ZLayoutStyle.ZL1://风格1
                slide.addText(text, {x: 1, y: 1, w: 8, fontSize: 18});
                break;
            case ZLayoutStyle.ZL2://风格2
                slide.addText(text, {x: 1, y: 2, w: 8, fontSize: 20});
                break;
            // 可以添加更多的布局样式处理
            default:
                slide.addText(text, {x: 1, y: 1, w: 8, fontSize: 18});
                break;
        }*/
       //输出context的样式设置
        console.log("Context Style Setting:", context.getStyleSetting());
        console.log("Context System Setting:", context.getSystemSetting());
        console.log("Layout Style:", zlayoutStyle);
    }

    //传入文字内容，和上下文内容，生成卡片
    public  generateCard(text: string, context: zPPTContext) {
        // 这里可以调用AI模型生成卡片内容
        let zlayout = new ZLayoutStyleClass();
        let zlasty = zlayout.getLayoutStyle(text);
        this.generateCardByLayoutStyle(text,context,zlasty);
    }

    //保存ppt，传入文件名
    public  savePPT(fileName: string) {
        //this.pptx.writeFile({ fileName});
    }
}   
