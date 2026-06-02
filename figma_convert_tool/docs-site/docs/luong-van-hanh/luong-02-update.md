---
id: luong-02-update
title: Luong 2 – Update Mode
sidebar_position: 3
---


## 1. Mô tả

Luồng này được thực hiện **mỗi khi Designer cập nhật Figma** sau lần initial setup. Thay vì tạo lại toàn bộ tài liệu, hệ thống chỉ xác định phần thay đổi và cập nhật đúng section tương ứng trong Excel, giảm thiểu effort và tránh ghi đè nội dung đã được BA chỉnh sửa.

---

## 2. Sơ đồ Luồng Chính (Mermaid)

```mermaid
flowchart TD
    A([🔄 Bắt đầu Update Mode]) --> B[Designer cập nhật\nthiết kế trên Figma]
    B --> C[BA/BrSE trigger\nUpdate Mode]
    C --> D[Hệ thống gọi Figma API\ntải phiên bản mới]
    D --> E[Load Previous Snapshot\ntừ lần generate trước]

    E --> F[Diff Analysis:\nSo sánh 2 phiên bản]
    F --> G{Có thay đổi\nkhông?}

    G -- Không --> G1[Thông báo:\nKhông phát hiện thay đổi]
    G1 --> END1([✅ Kết thúc - Không cần update])

    G -- Có --> H{Tỷ lệ thay đổi\n> 50% screens?}
    H -- Có --> H1[⚠️ Cảnh báo: Thay đổi lớn\nKhuyến nghị Initial Setup]
    H1 --> H2{BA/BrSE\nchọn gì?}
    H2 -- Tiếp tục Update --> I
    H2 -- Chạy Initial Setup --> INIT[→ Chuyển sang Luồng 1]

    H -- Không --> I[Xác định danh sách\nthay đổi: Screen / Component]

    I --> J{Phân loại\nthay đổi}

    J --> J1[Thêm mới:\nScreen hoặc Component]
    J --> J2[Sửa đổi:\nText / Properties]
    J --> J3[Xóa:\nScreen hoặc Component]
    J --> J4[Sửa Transition:\nLuồng chuyển màn hình]

    J1 --> K[Tạo section mới\ntrong Excel]
    J2 --> L[Cập nhật nội dung\ntrong cell tương ứng]
    J3 --> M[Đánh dấu Removed\ntrong Excel]
    J4 --> N[Cập nhật\n画面遷移仕様書]

    K --> O[AI generate nội dung\ntiếng Nhật cho phần thay đổi]
    L --> O
    M --> P
    N --> P

    O --> P[Highlight vùng thay đổi\nmàu vàng trong Excel]
    P --> Q[Xuất Diff Report\nDanh sách thay đổi]
    Q --> R[Lưu New Snapshot]

    R --> S[BA/BrSE Review\ncác vùng highlight]
    S --> T{Approve?}

    T -- Chỉnh sửa --> U[BA sửa thủ công]
    U --> S
    T -- Approve --> V[Xóa highlight\nGửi tài liệu cho khách]
    V --> W([✅ Hoàn thành])
```

---

## 3. Sơ đồ Diff Analysis (Mermaid)

```mermaid
flowchart LR
    subgraph PREV["📄 Phiên bản Trước"]
        P1[Screen A\nButton: Login]
        P2[Screen B\nInput: Email]
        P3[Screen C\nTable: Users]
    end

    subgraph NEW["📄 Phiên bản Mới"]
        N1[Screen A\nButton: Sign In]
        N2[Screen B\nInput: Email]
        N3[Screen D\nModal: Confirm]
    end

    subgraph DIFF["🔍 Kết quả Diff"]
        D1["✏️ Modified:\nScreen A - Button text\nLogin → Sign In"]
        D2["✅ No Change:\nScreen B - Không thay đổi"]
        D3["🗑️ Deleted:\nScreen C - Đã xóa"]
        D4["➕ Added:\nScreen D - Mới thêm"]
    end

    P1 & N1 --> D1
    P2 & N2 --> D2
    P3 --> D3
    N3 --> D4
```

---

## 4. Phân loại và Xử lý Thay đổi

| Loại thay đổi | Phát hiện bằng | Hành động trong Excel | Highlight |
|--------------|---------------|----------------------|-----------|
| Thêm màn hình mới | Frame ID không có trong snapshot | Tạo section mới cuối file | 🟡 Vàng |
| Xóa màn hình | Frame ID không còn trong Figma | Đánh dấu "【削除】" đầu dòng | 🔴 Đỏ nhạt |
| Sửa text/label | Nội dung text thay đổi | Ghi đè cell tương ứng | 🟡 Vàng |
| Thêm component | Component ID mới xuất hiện | Thêm dòng mới vào bảng | 🟡 Vàng |
| Xóa component | Component ID biến mất | Đánh dấu "【削除】" | 🔴 Đỏ nhạt |
| Sửa prototype | Connection thay đổi | Cập nhật 画面遷移仕様書 | 🟡 Vàng |

---

## 5. Diff Report – Mẫu Nội dung

```
=== DIFF REPORT ===
Thời gian: 2025-01-15 14:30:00
Figma Version: v42 → v43

📊 Tổng kết:
  - Thêm mới:   2 screens, 5 components
  - Sửa đổi:    3 screens, 12 components
  - Xóa:        1 screen,  3 components
  - Không đổi:  8 screens

📋 Chi tiết:
  [ADDED]    Screen D - Confirm Modal
  [MODIFIED] Screen A - Button "Login" → "Sign In"
  [MODIFIED] Screen B - Input placeholder text
  [DELETED]  Screen C - User Table Screen
```

---

## 6. Điều kiện tiên quyết để Update Mode hoạt động

| Điều kiện | Lý do |
|-----------|-------|
| Đã chạy Initial Setup ít nhất 1 lần | Cần snapshot để so sánh |
| Snapshot chưa bị xóa | Diff Analysis dựa vào snapshot |
| File Excel hiện tại còn nguyên cấu trúc | Để merge đúng section |
| BA không đổi tên sheet/section Excel | Mapping dựa vào tên |
