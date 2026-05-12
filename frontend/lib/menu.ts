import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Download,
  CloudUpload,
  FileText,
  Handshake,
  BarChart3,
  Warehouse,
  CalendarCheck,
  Settings,
  Users,
  Grid2X2,
  Shield,
} from "lucide-react";

export const menuGroups = [
  {
    title: "메인",
    items: [
      {
        label: "대시보드",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "기본정보",
    items: [
      {
        label: "상품 목록",
        href: "/products",
        icon: Box,
      },

      {
        label: "공급처 목록",
        href: "/suppliers",
        icon: Users,
      },

      {
        label: "플랫폼 목록",
        href: "/platforms",
        icon: Grid2X2,
      },
    ],
  },

  {
    title: "거래 관리",
    items: [
      {
        label: "발주 목록",
        href: "/purchase-orders",
        icon: ClipboardList,
      },

      {
        label: "입고 처리",
        href: "/purchase-receipts",
        icon: Download,
      },

      {
        label: "판매 업로드/수집",
        href: "/sales-imports",
        icon: CloudUpload,
      },

      {
        label: "판매 내역",
        href: "/sales-history",
        icon: FileText,
      },
    ],
  },

  {
    title: "가격 관리",
    items: [
      {
        label: "공급처별 가격",
        href: "/supplier-prices",
        icon: Handshake,
      },

      {
        label: "플랫폼별 판매가",
        href: "/platform-prices",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "재고 관리",
    items: [
      {
        label: "재고 현황",
        href: "/inventory",
        icon: Warehouse,
      },

      {
        label: "재고 변동 원장",
        href: "/inventory-transactions",
        icon: Box,
      },

      {
        label: "일마감 / 스냅샷",
        href: "/inventory-snapshots",
        icon: CalendarCheck,
      },
    ],
  },

  {
    title: "시스템",
    items: [
      {
        label: "사용자 / 권한",
        href: "/users",
        icon: Shield,
      },

      {
        label: "설정",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
