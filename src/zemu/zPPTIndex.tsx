//zemu首页
import { zPPTContext } from "./zPPTContext";
import { zPPTCore } from "./zPPTCore";
import { ZSystemSetting } from "./zSetting";
import { ZStyleSetting } from "./zSetting";



// ** React Imports

//点击生成按钮
export function clickButton1()
{
    let pCore = new zPPTCore;
    let zContext = new zPPTContext;
    let zSySet :ZSystemSetting = {      companyName: "",
        companyWebsite: "",
        companyLogo: "",
        personalName: "",
        personalAvatar: "",
        personalBio: "",
        personalEmail: "",
        personalPhone: ""
    };
    let zStySet :ZStyleSetting = {
         cardBackground: "",
        cardBorderSpacing: "",
        titleFont: "",
        titleSize: "",
        titleColor: "",
        subtitleFont: "",
        subtitleSize: "",
        subtitleColor: "",
        bodyFont: "",
        bodySize: "",
        bodyColor: "",
        layoutStyle: "template"
    };
    zContext.setStyleSetting(zStySet);
    zContext.setSystemSetting(zSySet);

    pCore.generateCard("Zemu",zContext);
    pCore.savePPT("ZemuPPT");
};





