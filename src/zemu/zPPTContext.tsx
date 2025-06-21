//ppt设置的上下文类
import { ZStyleSetting } from "./zSetting";
import { ZSystemSetting } from "./zSetting";
import { ZLayoutStyleFormEnum } from "./zSetting";

export class zPPTContext {
    
    public constructor() {
        // 私有构造函数，防止外部实例化
    }


    // 系统设置
    public systemSetting: ZSystemSetting = {
        companyName: "",
        companyWebsite: "",
        companyLogo: "",
        personalName: "",
        personalAvatar: "",
        personalBio: "",
        personalEmail: "",
        personalPhone: ""
    };

    // 风格设置
    public styleSetting: ZStyleSetting = {
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
        layoutStyle: ZLayoutStyleFormEnum.REGULAR
    };
    

    // 获取系统设置
    public getSystemSetting(): ZSystemSetting {

        return this.systemSetting;
    }

    // 设置系统设置
    public setSystemSetting(setting: ZSystemSetting): void {

        this.systemSetting = setting;
    }

    // 获取风格设置
    public getStyleSetting(): ZStyleSetting {

        return this.styleSetting;
    }

    // 设置风格设置
    public setStyleSetting(setting: ZStyleSetting): void {
        this.styleSetting = setting;
    }

    // 重置上下文
    public resetContext(): void {
        this.systemSetting = {
            companyName: "",
            companyWebsite: "",
            companyLogo: "",
            personalName: "",
            personalAvatar: "",
            personalBio: "",
            personalEmail: "",
            personalPhone: ""
        };
        this.styleSetting = {
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
            layoutStyle: ZLayoutStyleFormEnum.REGULAR
        };
    }         

}