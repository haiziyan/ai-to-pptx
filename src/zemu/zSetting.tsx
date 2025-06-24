//系统设置 公司名称 公司网站 公司logo 个人姓名 个人头像 个人简介 个人邮箱 个人电话
export interface ZSystemSetting {
  companyName: string; // 公司名称
  companyWebsite: string; // 公司网站
  companyLogo: string; // 公司logo
  personalName: string; // 个人姓名
  personalAvatar: string; // 个人头像
  personalBio: string; // 个人简介
  personalEmail: string; // 个人邮箱
  personalPhone: string; // 个人电话
};

//风格设置 卡片背景，边框距，大标题(字体，大小，颜色)，二级标题(字体，大小，颜色)，正文(字体，大小，颜色)，排布样式(模板式、规则式，AI+规则)
export interface ZStyleSetting {
  cardBackground: string; // 卡片背景
  cardBorderSpacing: number; // 边框距
  cardW:number;//卡片宽 10
  cardH:number;//卡片高 5.625
  titleFont: string; // 大标题字体
  titleSize: string; // 大标题大小
  titleColor: string; // 大标题颜色
  subtitleFont: string; // 二级标题字体
  subtitleSize: string; // 二级标题大小
  subtitleColor: string; // 二级标题颜色
  bodyFont: string; // 正文字体
  bodySize: string; // 正文大小
  bodyColor: string; // 正文颜色
  layoutStyle: ZLayoutStyleFormEnum; // 排布样式
}

//排布来源
export enum ZLayoutStyleFormEnum {
  TEMPLATE = 0, // 模板式
  REGULAR = 1, // ai+规则式
}

//布局样式 枚举
export enum ZLayoutStyle {
  ZL1 = 1,
  ZL2 = 2,
  ZL3 = 3,
  ZL4 = 4,
  ZL5 = 5,
  ZL6 = 6,
  ZL7 = 7,
  ZL8 = 8,
  ZL9 = 9,
  ZL10 = 10,
  ZL11 = 11,
  ZL12 = 12,
  ZL13 = 13,
  ZL14 = 14,
  ZL15 = 15,
  ZL16 = 16,
}