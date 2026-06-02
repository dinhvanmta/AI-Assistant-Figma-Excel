---
id: index
title: Yêu Cầu Chức Năng
sidebar_position: 1
---

## 1. Danh sách Use Case

```mermaid
flowchart LR
    DS(["Designer"])
    BA(["BA / BrSE"])
    AI(["AI Engine"])

    subgraph SYS["He thong AI Assistant"]
        UC01["UC01: Initial Setup\n(Tao tai lieu lan dau)"]
        UC02["UC02: Update Mode\n(Cap nhat tai lieu)"]
        UC03["UC03: Review & Approve"]
        UC04["UC04: Xem Diff Report"]
        UC05["UC05: Xuat Excel\ntheo template"]
    end

    DS -->|"Cung cap Figma URL"| UC01
    DS -->|"Cap nhat Figma"| UC02
    BA -->|"Khoi dong generate"| UC01
    BA -->|"Trigger update"| UC02
    BA -->|"Review output"| UC03
    BA -->|"Xem diff report"| UC04
    AI --> UC01
    AI --> UC02
    AI --> UC05
    UC01 -.->|"include"| UC05
    UC02 -.->|"include"| UC04
    UC02 -.->|"include"| UC05
    UC03 -.->|"extend"| UC04
```

---

## 2. Bảng Tóm tắt Use Case

| UC | Tên chức năng | Actor chính | Ưu tiên |
|----|--------------|-------------|---------|
| UC01 | Tạo tài liệu lần đầu (Initial Setup) | BA/BrSE + AI | Cao |
| UC02 | Cập nhật tài liệu theo phần (Update Mode) | BA/BrSE + AI | Cao |
| UC03 | Review và Approve tài liệu | BA/BrSE | Cao |
| UC04 | Xem báo cáo thay đổi (Diff Report) | BA/BrSE | Trung bình |
| UC05 | Xuất file Excel theo template | AI Engine | Cao |

---

## 3. Chi tiết từng Use Case

- [UC01 – Initial Setup](./uc01-initial-setup)
- [UC02 – Update Mode](./uc02-update-mode)