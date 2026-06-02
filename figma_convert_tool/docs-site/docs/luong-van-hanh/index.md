---
id: index
title: Các Luồng Vận Hành Chính
sidebar_position: 1
---

## Danh sách luồng

| # | Tên luồng | Mô tả | File |
|---|-----------|-------|------|
| 1 | Initial Setup | Tạo toàn bộ tài liệu lần đầu từ Figma | [Luồng 1](./luong-01-initial) |
| 2 | Update Mode | Phát hiện thay đổi và cập nhật tài liệu theo phần | [Luồng 2](./luong-02-update) |
| 3 | Sequence Diagram | Tương tác chi tiết giữa AI và Con người | [Sequence](./sequence-diagram) |

---

## Sơ đồ Tổng quan Hai Luồng

```mermaid
flowchart TD
    START([Bat dau]) --> Q1{Lan dau\ntao tai lieu?}
    Q1 -->|Co| INIT[Luong 1: Initial Setup\nTao toan bo tai lieu]
    Q1 -->|Khong| UPD[Luong 2: Update Mode\nCap nhat theo phan]
    INIT --> DONE1[Tai lieu day du\n+ Snapshot luu]
    UPD --> DONE2[Tai lieu cap nhat\n+ Diff Report\n+ Snapshot moi]
    DONE1 --> REVIEW[BA/BrSE Review]
    DONE2 --> REVIEW
    REVIEW --> APPROVE{Approve?}
    APPROVE -->|Co| SEND[Gui khach hang]
    APPROVE -->|Khong| FIX[Sua thu cong\nhoac chay lai]
    FIX --> REVIEW
    SEND --> END([Hoan thanh])
```