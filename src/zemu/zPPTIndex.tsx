//zemu首页
import { zPPTContext } from "./zPPTContext";
import { zPPTCore } from "./zPPTCore";
import { ZSystemSetting } from "./zSetting";
import { ZStyleSetting } from "./zSetting";



// ** React Imports

//点击生成按钮
export function clickButton1()
{
    const pCore = new zPPTCore();
    const zContext = new zPPTContext();
    const zSySet :ZSystemSetting = {
        companyName: "Zemu Tech",
        companyWebsite: "https://www.`zemu.com",
        companyLogo: "https://www.zemu.com/logo.png",
        personalName: "Zemu User",
        personalAvatar: "https://www.zemu.com/avatar.png",
        personalBio: "Zemu is a cutting-edge technology company specializing in AI and automation.",
        personalEmail: "user@zemu.com",
        personalPhone: "123-456-7890"
    };
    const zStySet :ZStyleSetting = {
        cardBackground: "FFFFFF",
        cardBorderSpacing: "10px",
        titleFont: "Arial",
        titleSize: "24px",
        titleColor: "000000",
        subtitleFont: "Arial",
        subtitleSize: "20px",
        subtitleColor: "666666",
        bodyFont: "Arial",
        bodySize: "16px",
        bodyColor: "333333",
        layoutStyle: "template"
    };
    zContext.setStyleSetting(zStySet);
    zContext.setSystemSetting(zSySet);

    pCore.generateCard("Zemu",zContext);
    pCore.savePPT("ZemuPPT");
};





