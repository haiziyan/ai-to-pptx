//生成PPT核心类
import { zPPTContext } from "./zPPTContext";

//import { ZStyleSetting } from "./zSetting";
//import { ZSystemSetting } from "./zSetting";
import { ZLayoutStyle } from "./zSetting";
import { ZLayoutStyleFormEnum } from "./zSetting";


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
        // 使用全局 window 对象加载 CDN
  /*const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs/dist/pptxgen.bundle.js";
  document.head.appendChild(script);

  // 等待库加载完成
  await new Promise(resolve => script.onload = resolve);

  // 直接使用全局对象
  this.pptx = new (window as any).PptxGenJS();
  //this.pptx.writeFile({ fileName: "demo.pptx" });
        console.log("PPTXGenJS initialized");*/
    }

    //根据zlayoutStyle 生成卡片
    public async generateCardByLayoutStyle(ztext: string, context: zPPTContext, zlayoutStyle: ZLayoutStyle) {
        // 这里可以根据zlayoutStyle来决定如何生成卡片
        // 例如，如果是ZLayoutStyle.ZL1，可以使用一种布局方式；如果是ZLayoutStyle.ZL2，可以使用另一种布局方式
        // 这里只是一个示例，实际逻辑可以根据需求进行调整
        
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs/dist/pptxgen.bundle.js";
  document.head.appendChild(script);

  // 等待库加载完成
  await new Promise(resolve => script.onload = resolve);

  // 直接使用全局对象
  this.pptx = new (window as any).PptxGenJS();

       this.pptx.title = "顶峰见";
        const slide = this.pptx.addSlide();
        
        switch (zlayoutStyle) 
        {
            case ZLayoutStyle.ZL1://风格1
            this.layoutCardStyle1(slide);
                //slide.addText(ztext, {x: 1, y: 1, w: 8, fontSize: 18});
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

        this.pptx.writeFile({ fileName: "zemu.pptx" });
        //this.savePPT( "zemu.pptx" );
    }

    //传入文字内容，和上下文内容，生成卡片
    public  generateCard(ztext: string, context: zPPTContext) {

        //获取卡片样式
        const zstyle = context.getStyleSetting();
        const zlayoutStyleForm = zstyle.layoutStyle;
        console.log("Using layout style:", zlayoutStyleForm);
        switch (zlayoutStyleForm) {
            case ZLayoutStyleFormEnum.TEMPLATE:
                //根据模板来生成ppt
                console.log("Using TEMPLATE layout style");
                break;
            case ZLayoutStyleFormEnum.REGULAR:
                //根据排布规则来生成ppt
                        // 这里可以调用AI模型生成卡片内容
                    const zlayout = new ZLayoutStyleClass();
                    const zlasty = zlayout.getLayoutStyle(ztext);
                    this.generateCardByLayoutStyle(ztext, context, zlasty);
                console.log("Using REGULAR layout style");
                break;
            case ZLayoutStyleFormEnum.AI_PLUS_REGULAR:
                //根据AI的规则建议来生成ppt
                console.log("Using AI_PLUS_REGULAR layout style");
                break;
            default:
                console.log("Using default layout style");
                break;
        }
        
    }

    //保存ppt，传入文件名
    public  savePPT(fileName: string) {
        this.pptx.writeFile({ fileName});
        console.log("PPT saved as:", fileName);
    }
    public genSlide01(slide:any)
{
	// Slide title
	//slide.addTable([[{ text: "Text Examples: Text alignment, percent x/y, etc.", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	// Slide colors: bkgd/fore
	slide.bkgd = "030303";
	slide.color = "9F9F9F";
	// Slide notes
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-text.html");

	// Actual Textbox shape (can have any Height, can wrap text, etc.)
	slide.addText(
		[
			{ text: "Textbox align (center/middle)", options: { fontSize: 32, breakLine: true } },
			{ text: "Character Spacing 16", options: { fontSize: 16, charSpacing: 16, breakLine: true } },
			{ text: "Transparency 50%", options: { fontSize: 16, transparency: 50 } },
		],
		{ x: 0.5, y: 0.75, w: 8.5, h: 2.5, color: "FFFFFF", fill: { color: "0000FF" }, valign: "middle", align: "center", isTextBox: true }
	);
	slide.addText(
		[
			{ text: "(left/top)", options: { fontSize: 12, breakLine: true } },
			{ text: "Textbox", options: { bold: true } },
		],
		{ x: 10, y: 0.75, w: 3.0, h: 1.0, color: "FFFFFF", fill: { color: "00B050" }, valign: "top", align: "left", margin: 15 }
	);
	slide.addText(
		[
			{ text: "Textbox", options: { breakLine: true } },
			{ text: "(right/bottom)", options: { fontSize: 12 } },
		],
		{ x: 10, y: 2.25, w: 3.0, h: 1.0, color: "FFFFFF", fill: { color: "C00000" }, valign: "bottom", align: "right", margin: 0 }
	);

	slide.addText("^ (50%/50%)", { x: "50%", y: "50%", w: 2 });

	slide.addText("Plain x/y coords", { x: 10, y: 4.35, w: 3 });

	slide.addText("Escaped chars: ' \" & < >", { x: 10, y: 5.35, w: 3 });

	slide.addText(
		[
			{ text: "Sub" },
			{ text: "Subscript", options: { subscript: true } },
			{ text: " // Super" },
			{ text: "Superscript", options: { superscript: true } },
		],
		{ x: 10, y: 6.3, w: 3.3 }
	);

	// TEST: using {option}: Add text box with multiline options:
	slide.addText(
		[
			{
				text: "word-level\nformatting",
				options: { fontSize: 32, fontFace: "Courier New", color: "99ABCC", align: "right", breakLine: true },
			},
			{ text: "...in the same textbox", options: { fontSize: 48, fontFace: "Arial", color: "FFFF00", align: "center" } },
		],
		{ x: 0.5, y: 4.3, w: 8.5, h: 2.5, margin: 0.1, fill: { color: "232323" } }
	);

	const objOptions = {
		x: 0,
		y: 7,
		w: "100%",
		h: 0.5,
		align: "center",
		fontFace: "Arial",
		fontSize: 24,
		color: "00EC23",
		bold: true,
		italic: true,
		underline: true,
		margin: 0,
		isTextBox: true,
	};
	slide.addText("Text: Arial, 24, green, bold, italic, underline, margin:0", objOptions);
}


//卡片排版布局
public layoutCardStyle1(slide:any)
{
	slide.addText("ZEMU", { x: "50%", y: "50%", w: 10, h: 1.4,align: "center" , fontSize: 50, fontFace: "Arial"});
}

}   
