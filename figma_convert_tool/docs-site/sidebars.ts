import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '🏠 Trang chủ',
    },
    {
      type: 'category',
      label: '01 · Tổng quan Hệ thống',
      collapsed: false,
      items: [
        'tong-quan/index',
        'tong-quan/kien-truc-tong-the',
      ],
    },
    {
      type: 'category',
      label: '02 · Yêu cầu Chức năng',
      collapsed: false,
      items: [
        'yeu-cau-chuc-nang/index',
        'yeu-cau-chuc-nang/uc01-initial-setup',
        'yeu-cau-chuc-nang/uc02-update-mode',
      ],
    },
    {
      type: 'category',
      label: '03 · Luồng Vận hành',
      collapsed: false,
      items: [
        'luong-van-hanh/index',
        'luong-van-hanh/luong-01-initial',
        'luong-van-hanh/luong-02-update',
        'luong-van-hanh/sequence-diagram',
      ],
    },
    {
      type: 'category',
      label: '04 · Đối tượng Sử dụng',
      collapsed: false,
      items: ['doi-tuong-su-dung/index'],
    },
    {
      type: 'category',
      label: '05 · Yêu cầu Phi chức năng',
      collapsed: false,
      items: ['yeu-cau-phi-chuc-nang/index'],
    },
  ],
};

export default sidebars;
