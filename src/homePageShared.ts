export type Shortcut = {
  name: string;
  badge: string;
  url: string;
  theme: string;
};

export const shortcuts: Shortcut[] = [
  {
    name: 'TV直播',
    badge: 'LIVE',
    //url: 'https://tv.cctv.com/live/',
    url:'https://www.yangshipin.cn/tv/home',
    theme: 'theme-live'
  },
  {
    name: '央视片库',
    badge: 'CCTV',
    url: 'https://tv.cctv.com/',
    theme: 'theme-cctv'
  },
  {
    name: '抖音',
    badge: 'DY',
    url: 'https://www.douyin.com/',
    theme: 'theme-douyin'
  },
  {
    name: '腾讯视频',
    badge: 'QQ',
    url: 'https://v.qq.com/',
    theme: 'theme-tencent'
  }
];
