//生成PPT核心类
import { zPPTContext } from "./zPPTContext";

//import { ZStyleSetting } from "./zSetting";
//import { ZSystemSetting } from "./zSetting";
import { ZLayoutStyle } from "./zSetting";
import { ZLayoutStyleFormEnum } from "./zSetting";


//import pptxgen from "../../PptxGenJS/dist/pptxgen.bundle.js";

const parseTextFromAiResult = (ParseText: string) => {
    const ParseTextArray = ParseText.split("\n")
    console.log("ParseTextArray", ParseTextArray)
    const ParseResult: any = {}
    let TitleOne = ''
    let TitleTwo = ''
    let TitleThree = ''
    let Subject = ''
    ParseTextArray.map((Item: string)=>{
        if(Item.trim() !="" && Item.trim() !="```markdown" && Item.trim() !="```")  {
            if(Item.trim().startsWith('# '))  {
                Subject = Item.trim().substring(2)
            }
            else if(Item.trim().startsWith('## '))  {
                TitleOne = Item.trim().substring(6)
                ParseResult[TitleOne] = {}
            }
            else if(Item.trim().startsWith('### '))  {
                TitleTwo = Item.trim().substring(7)
                ParseResult[TitleOne][TitleTwo] = []
            }
            else if(Item.trim().startsWith('#### '))  {
                //标题
                TitleThree = Item.trim().substring(11)
                if(TitleOne!="" && TitleTwo!="" && TitleThree!="" && ParseResult[TitleOne][TitleTwo])   {
                    ParseResult[TitleOne][TitleTwo].push(TitleThree)
                }
            }
            else    {
                //标题
                TitleThree = Item.trim().substring(6)
                if(TitleOne!="" && TitleTwo!="" && TitleThree!="" && ParseResult[TitleOne][TitleTwo])   {
                    ParseResult[TitleOne][TitleTwo].push(TitleThree)
                }
            }
        }
    })
  
    const ResultTopChildren: any = []
    const KeysOne = Object.keys(ParseResult)
    KeysOne.map((ItemOne: string)=>{
        const MapOne = ParseResult[ItemOne]
        const KeysTwo = Object.keys(MapOne)
        const ResultOneChildren: any = []
        KeysTwo.map((ItemTwo: string)=>{
            const MapTwo = MapOne[ItemTwo]
            const ResultTwoChildren: any = []
            MapTwo.map((ItemThree: string)=>{
                ResultTwoChildren.push({name: ItemThree, level: 4, children: []})
            })
            const ResultTwo = {name: ItemTwo, level: 3, children: ResultTwoChildren}
            console.log("MapTwo", ItemTwo, MapTwo)
            ResultOneChildren.push(ResultTwo)
        })
        const ResultOne = {name: ItemOne, level: 2, children: ResultOneChildren}
        ResultTopChildren.push(ResultOne)
    })
    const ResultMap = {name: Subject, level: 1, children: ResultTopChildren}
    console.log("ResultMap", ResultMap)
  
    return ResultMap
  }
  

export class ZLayoutStyleClass {

    // 获取布局样式 根据传入的文字内容
    // 这里可以根据文字内容的长度、关键词等来决定使用哪种布局样式
    // 例如，如果文字内容较长，可以选择更复杂的布局样式；如果较短，可以选择简单的布局样式
    // 这里只是一个示例，实际逻辑可以根据需求进行调整
    // 返回ZLayoutStyle枚举值
    // 例如：ZLayoutStyle.ZL1, ZLayoutStyle.ZL2, 等等
    public getLayoutStyle(ztext: string): ZLayoutStyle {
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
    public async generateCardByLayoutStyle(outlineContent: any, context: zPPTContext) {
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
        this.pptx.author = 'Zemu';
        this.pptx.subject = 'Annual Report';
        this.pptx.company = 'Computer Science Chair';
        this.pptx.revision = '15';

               //根据outline生成ppt
       console.log("BuildPPT called with outline:", outlineContent);
       const outlineTree = parseTextFromAiResult(outlineContent);
       console.log("outlineTree", outlineTree);
   
        //遍历outlineTree中level为1的元素，并获取其children中level为2的元素
   const levelOneElements = outlineTree.children.filter((item: any) => item.level === 1);
   console.log("levelOneElements", levelOneElements);
   //主题
   const zlayout = new ZLayoutStyleClass();
   const zlasty = ZLayoutStyle.ZL1;
   const ThemeSlide = this.pptx.addSlide();
   const themeStrv:string[] = [levelOneElements[0]];
   this.layoutCardStyle3(ThemeSlide,themeStrv,context);
   //目录
   const mlslide = this.pptx.addSlide();
   const mlStrv:string[] = ["1","2","3"];
   this.layoutCardStyle3(mlslide,mlStrv,context);
   //正文
           //遍历levelOneElements，并获取其children中level为2的元素
   const levelTwoElements = levelOneElements.map((item: any) => item.children.filter((child: any) => child.level === 2));
   console.log("levelTwoElements", levelTwoElements);
   //遍历levelTwoElements
   levelTwoElements.forEach((item: any) => {
     console.log("item", item);
     const slide = this.pptx.addSlide();
     const conStrVec:string[] = item.map((child: any) => child.name);
     this.layoutCardStyle3(slide,conStrVec,context);
   });
   //感谢
   const thxslide = this.pptx.addSlide();
   const thxStrv:string[] = ["Thanks"];
   this.layoutCardStyle3(thxslide,thxStrv,context);

        //输出context的样式设置
        console.log("Context Style Setting:", context.getStyleSetting());
        console.log("Context System Setting:", context.getSystemSetting());
        
       

        this.pptx.writeFile({ fileName: themeStrv[0]+".pptx" });
    }

    //传入文字内容，和上下文内容，生成卡片
    public generateCard(ztext: string, context: zPPTContext) {

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
                this.generateCardByLayoutStyle(ztext, context);
                console.log("Using REGULAR layout style");
                break;
            default:
                console.log("Using default layout style");
                break;
        }

    }

    public BuildPPT(outlineContent:any,context:zPPTContext)
    {
        //此处有两种情况，第一种是根据模板生成，第二种是根据规则生成
        //根据模板生成
        if(context.styleSetting.layoutStyle === ZLayoutStyleFormEnum.TEMPLATE)
        {
            console.log("根据模板生成");
        }
        //根据规则生成
        else if(context.styleSetting.layoutStyle === ZLayoutStyleFormEnum.REGULAR)  
        {
            console.log("根据规则生成");
   this.generateCardByLayoutStyle(outlineContent, context);


        }

 
    }

    //保存ppt，传入文件名
    public savePPT(fileName: string) {
        this.pptx.writeFile({ fileName });
        console.log("PPT saved as:", fileName);
    }
    public genSlide01(slide: any) {
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
    public layoutCardStyle1(slide: any) 
    {
        const ypos = (5.625-1.4)*0.5; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度
        slide.addText("ZEMU", { x: 0, y: ypos, w: 10, h: 1.4, align: "center", fontSize: 50, fontFace: "Arial" });
    }

      public layoutCardStyle2(slide: any) 
    {
        //添加图片
        slide.addImage({ path: "https://pic.baike.soso.com/ugc/baikepic2/0/20210608234717-1081107189_png_674_446_600924.jpg/800", x: 0, y: 0, w: 10, h: 5.625 });

        const ypos = (5.625-1.4)*0.5; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度
        slide.addText("ZEMU", { x: 0, y: ypos, w: 10, h: 1.4, align: "center", fontSize: 50, fontFace: "Arial" });
    }

    public layoutCardStyle3(slide: any,conStr:string[],context:zPPTContext) 
    {
        //文字数组
        //slide.background = context.styleSetting.cardBackground; 
        slide.background = { color: context.styleSetting.cardBackground };

        slide.color = context.styleSetting.bodyColor;

        const cardW = context.styleSetting.cardW;
        const cardH = context.styleSetting.cardH;
        const cradBSpace = context.styleSetting.cardBorderSpacing;
        
        const countLent=conStr.length;

        //计算文本框的长度
        const textBoxLength = (cardW - cradBSpace*2)/countLent;

        const ypos = (cardH-1.4)*0.5; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度
        for (let i = 0;i<countLent;i++) 
        {
            const tStr = conStr[i];
            slide.addText(tStr, { x: cradBSpace+textBoxLength*i, y: ypos, w: textBoxLength, h: 1.4, align: "left", fontSize: 50, fontFace: "Arial" });
        }

        //添加图片
        //slide.addImage({ path: "https://pic.baike.soso.com/ugc/baikepic2/0/20210608234717-1081107189_png_674_446_600924.jpg/800", x: 0, y: 0, w: 10, h: 5.625 });

        
        
    }
}   
