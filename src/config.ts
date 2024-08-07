import type { Site, SocialObjects } from './types';

const author = '星宿君';
export const SITE: Site = {
  website: 'https://hxf.icu', // replace this with your deployed domain
  author,
  profile: 'https://github.com/huxinfeng',
  desc: '一个最小的、响应迅速的、对 SEO 友好的 Astro 博客主题。',
  title: `${author}的博客`,
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: 'zh-CN', // html lang code. Set this empty and default will be "en"
  langTag: ['zh-CN'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: 'Mail',
    href: 'mailto:2114567244@qq.com',
    linkTitle: `发送邮箱给${SITE.author}`,
    active: true,
  },
  {
    name: 'Github',
    href: 'https://github.com/huxinfeng/huxinfeng.github.io',
    linkTitle: ` ${SITE.author}的 Github`,
    active: true,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/huxinfeng1024',
    linkTitle: `${SITE.author}的 Twitter`,
    active: true,
  },
  {
    name: 'Bilibili',
    href: 'https://space.bilibili.com/302463865',
    linkTitle: `${SITE.author}的 Bilibili`,
    active: true,
  },
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/1089829678992334900',
    linkTitle: `${SITE.author}的 Discord`,
    active: true,
  },
  {
    name: 'Steam',
    href: 'https://steamcommunity.com/profiles/76561199146945683',
    linkTitle: `${SITE.author}的 Steam`,
    active: true,
  },
  {
    name: 'Facebook',
    href: '',
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: 'Instagram',
    href: '',
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: 'LinkedIn',
    href: '',
    linkTitle: `${SITE.title} on LinkedIn`,
    active: false,
  },
  {
    name: 'Twitch',
    href: '',
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: 'YouTube',
    href: '',
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: 'WhatsApp',
    href: '',
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: 'Snapchat',
    href: '',
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: 'Pinterest',
    href: '',
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: 'TikTok',
    href: '',
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: 'CodePen',
    href: '',
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: 'GitLab',
    href: '',
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: 'Reddit',
    href: '',
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: 'Skype',
    href: '',
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: 'Telegram',
    href: '',
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: 'Mastodon',
    href: '',
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
