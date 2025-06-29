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
const outlineTree2 = 
       {
        "name": "2025年就业市场预测报告",
        "level": 1,
        "children": [
            {
                "name": "全球就业市场宏观趋势",
                "level": 2,
                "children": [
                    {
                        "name": " 经济复苏与就业增长关联性",
                        "level": 3,
                        "children": [
                            {
                                "name": "后疫情时代全球经济复苏对就业的拉动作用。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "主要经济体（美、中、欧）就业增长差异分析。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "通货膨胀与劳动力成本上升的影响。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 人口结构与劳动力供给变化",
                        "level": 3,
                        "children": [
                            {
                                "name": "老龄化对劳动力市场的长期挑战。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "Z世代成为就业主力军的特征分析。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "移民政策对劳动力补充的作用。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 技术驱动的就业结构转型",
                        "level": 3,
                        "children": [
                            {
                                "name": "自动化对传统岗位的替代率预测。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "绿色经济创造的新就业机会。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "远程办公常态化对地理分布的改变。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "关键行业就业前景分析",
                "level": 2,
                "children": [
                    {
                        "name": " 科技与数字经济领域",
                        "level": 3,
                        "children": [
                            {
                                "name": "人工智能、区块链等前沿技术岗位需求激增。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "数据安全与隐私保护职业的爆发式增长。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "低代码开发推动非技术背景人员转型。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 医疗与健康产业",
                        "level": 3,
                        "children": [
                            {
                                "name": "基因编辑和精准医疗带动的专业人才缺口。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "心理健康服务从业者需求扩大。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "老龄化催生的护理岗位区域性短缺。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 能源与可持续发展",
                        "level": 3,
                        "children": [
                            {
                                "name": "可再生能源产业链就业规模预测。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "碳中和管理咨询成为新兴职业。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "传统能源行业岗位的转型路径。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "技能需求与职业能力重构",
                "level": 2,
                "children": [
                    {
                        "name": " 未来五年高需求技能TOP5",
                        "level": 3,
                        "children": [
                            {
                                "name": "复合型数字技能（如AI+行业知识）。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "跨文化协作与多语言能力。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "创造性问题解决能力。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 教育体系与就业市场的衔接",
                        "level": 3,
                        "children": [
                            {
                                "name": "微证书和纳米学位的重要性提升。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "企业-高校联合培养模式案例。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "终身学习平台的渗透率变化。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 自动化时代的不可替代能力",
                        "level": 3,
                        "children": [
                            {
                                "name": "情感智能（EQ）的价值重估。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "复杂决策中的伦理判断能力。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "人机协作中的界面管理技能。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "地域性就业差异与机会",
                "level": 2,
                "children": [
                    {
                        "name": " 新兴经济体就业增长极",
                        "level": 3,
                        "children": [
                            {
                                "name": "东南亚数字经济的就业红利。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "非洲科技初创企业的用人需求。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "中东新能源项目的本地化招聘趋势。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 发达国家区域分化现象",
                        "level": 3,
                        "children": [
                            {
                                "name": "美国\"阳光地带\" vs \"铁锈地带\"对比。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "欧盟数字枢纽城市的集聚效应。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "日本地方创生政策下的就业激励。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 远程工作对地理限制的突破",
                        "level": 3,
                        "children": [
                            {
                                "name": "全球分布式团队的薪酬差异研究。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "数字游民签证政策的国际比较。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "城市人才回流现象分析。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "政策与制度影响因素",
                "level": 2,
                "children": [
                    {
                        "name": " 劳动法规适应性改革",
                        "level": 3,
                        "children": [
                            {
                                "name": "零工经济劳动者的权益保障进展。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "四天工作制试点效果追踪。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "跨境远程工作的税收政策调整。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 产业政策与就业引导",
                        "level": 3,
                        "children": [
                            {
                                "name": "各国半导体产业补贴创造的岗位估算。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "新能源汽车产业链的区域扶持对比。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "数字经济特别行政区的就业实验。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 移民与人才引进政策",
                        "level": 3,
                        "children": [
                            {
                                "name": "技术移民快速通道的竞争态势。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "留学生就业限制的放宽趋势。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "高端人才争夺战的典型案例。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "风险与不确定性分析",
                "level": 2,
                "children": [
                    {
                        "name": " 技术突变带来的就业冲击",
                        "level": 3,
                        "children": [
                            {
                                "name": "AGI（通用人工智能）的潜在影响。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "量子计算商业化对密码学岗位的颠覆。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "生物技术突破引发的伦理就业争议。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 地缘政治与供应链重构",
                        "level": 3,
                        "children": [
                            {
                                "name": "贸易壁垒导致的制造业岗位迁移。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "关键矿产争夺催生的新职业类型。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "数字主权建设带来的本地化就业。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": " 社会价值观变迁的影响",
                        "level": 3,
                        "children": [
                            {
                                "name": "ESG相关岗位的需求波动分析。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "职场代际冲突的缓解机制。",
                                "level": 4,
                                "children": []
                            },
                            {
                                "name": "工作意义重构对职业选择的影响。",
                                "level": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
    

        //遍历outlineTree中level为1的元素，并获取其children中level为2的元素
   const levelOneElements = outlineTree2.name;
   console.log("levelOneElements", levelOneElements);
   //主题 level1
   const zlayout = new ZLayoutStyleClass();
   const zlasty = ZLayoutStyle.ZL1;
   const ThemeSlide = this.pptx.addSlide();
   const themeStrv:string[] = [levelOneElements];
   this.layoutCardStyle3(ThemeSlide,themeStrv,context);
   //目录 level2
   const mlslide = this.pptx.addSlide();
   const mlStrv:string[] = [];
   outlineTree2.children.forEach((item: any) => {
    mlStrv.push(item.name);
   });
   //this.layoutCardStyle4(mlslide,mlStrv,context);
   //目录大业及内容业 level3 及以下level4
           //遍历outlineTree2.children
           outlineTree2.children.forEach((item: any) => {
            console.log("item", item);
            const slide = this.pptx.addSlide();
            const muStrVec:string[] = [];
            muStrVec.push(item.name);
            //目录大页
            this.layoutCardStyle3(slide,muStrVec,context);

            const conStrMap: Map<string,string[]> = new Map();
            const conStrVec:string[] = [];
            //遍历item.children
            item.children.forEach((child: any) => {
                const conStrVec:string[] = [];
                child.children.forEach((child2: any) => {   
                    conStrVec.push(child2.name);
                });
                conStrMap.set(child.name,conStrVec);

                const slide1 = this.pptx.addSlide();
            //内容页
            this.layoutCardStyle5(slide1,item.name,conStrMap,context);
            }); 
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
        slide.background = { color: context.styleSetting.cardBackground };

        slide.color = context.styleSetting.bodyColor;

        const cardW = context.styleSetting.cardW;
        const cardH = context.styleSetting.cardH;
        const cradBSpace = context.styleSetting.cardBorderSpacing;
        const countLent=conStr.length;
        const textSize = 50.0/countLent;//字体大小


        //计算文本框的长度
        const textBoxLength = (cardW - cradBSpace*2)/countLent;

        const ypos = (cardH-1.4)*0.5; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度
        for (let i = 0;i<countLent;i++) 
        {
            const tStr = conStr[i];
            slide.addText(tStr, { x: cradBSpace+textBoxLength*i, y: ypos, w: textBoxLength, h: 1.4, align: "left", fontSize: textSize, fontFace: "Arial" });
        }
    }

    public layoutCardStyle4(slide: any,conStr:string[],context:zPPTContext) 
    {//竖向排布 从上到下
        const cardW = context.styleSetting.cardW;
        const cardH = context.styleSetting.cardH;
        const cradBSpace = context.styleSetting.cardBorderSpacing;

        
        slide.background = { color: context.styleSetting.cardBackground };

        slide.color = context.styleSetting.bodyColor;

        //文字数组 竖向排布
        const countLent=conStr.length;
        const textSize = 50.0/countLent;//字体大小


        const ypos = (cardH-1.4)*0.5; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度
        for (let i = 0;i<countLent;i++) 
        {
            const tStr = conStr[i];
            const ypos = cardH - (cradBSpace+textSize*i);
            slide.addText(tStr, { x: cradBSpace, y: ypos, w: cardW, h: textSize, align: "left", fontSize: textSize, fontFace: "Arial" });
        }


    }

    public layoutCardStyle5(slide: any,tile:string,contentStr:Map<string,string[]>,context:zPPTContext) 
    {
        //contentStr 是map，key是title，value是content
        //文字数组
        slide.background = { color: context.styleSetting.cardBackground };

        slide.color = context.styleSetting.bodyColor;

        const cardW = context.styleSetting.cardW;
        const cardH = context.styleSetting.cardH;
        const cradBSpace = context.styleSetting.cardBorderSpacing;
        const countLent=contentStr.size;
        const textSize = 50.0/countLent;//字体大小

        //大标题
        slide.addText(tile, { x: cradBSpace, y: 0.3, w: cardW, h: 0.7, align: "left", fontSize: 30, fontFace: "Arial" });
        //计算文本框的长度
        const textBoxLength = (cardW - cradBSpace*2)/countLent;

        const ypos = 1; // 计算y坐标，5.625是幻灯片的高度，1.4是文本框的高度

        let i = 0;
        let cStr = "";
        //遍历contentStr
        for (const [key, value] of contentStr) 
            {
            //小标题
            slide.addText(key, { x: cradBSpace+textBoxLength*i, y: ypos, w: textBoxLength+1, h: 0.7, align: "left", fontSize: 20, fontFace: "Arial" });
            //内容
            let textBoxH = 0.3;
            for (let j = 0;j<value.length;j++) {
                cStr += value[j]+"\n";
                textBoxH += 0.3;
            }
            if(cStr.length>0)
            {
            slide.addText(cStr, { x: cradBSpace+textBoxLength*i, y: ypos+0.7, w: textBoxLength, h: textBoxH, align: "left", fontSize: 15, fontFace: "Arial" });
            }
            i++;
          }
    }
} 
