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
    //let zSySet :ZSystemSetting  = new ZSystemSetting();
    //let zStySet :ZStyleSetting ;;
    //zContext.setStyleSetting(zStySet);
    //zContext.setSystemSetting(zSySet);

    pCore.generateCard("Zemu",zContext);
    pCore.savePPT("ZemuPPT");
};





