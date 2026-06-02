# Sequence Diagram – Tương Tác AI và Con Người

## 1. Sequence – Initial Setup

```mermaid
sequenceDiagram
    actor BA as BA / BrSE
    participant SYS as Hệ thống AI Assistant
    participant FAPI as Figma API
    participant AI as AI Engine (Claude/ChatGPT)
    participant EXCEL as Excel Generator
    participant DB as Version Store

    BA->>SYS: Nhập Figma URL + Token + chọn Template
    SYS->>FAPI: GET /files/{file_key}
    FAPI-->>SYS: Trả về cấu trúc file (frames, components, prototypes)

    SYS->>SYS: Parse danh sách screens và detect components

    loop Từng Screen
        SYS->>AI: Gửi component metadata (type, name, properties)
        AI-->>SYS: Nội dung tiếng Nhật (mô tả, tên trường, hành động)
    end

    SYS->>EXCEL: Mapping nội dung vào template
    EXCEL->>EXCEL: Apply format (font, merge, border)
    EXCEL-->>SYS: File 画面概要仕様書 + File 画面遷移仕様書

    SYS->>DB: Lưu Version Snapshot (Figma version ID + data)
    SYS-->>BA: Trả về 2 file Excel + thông báo hoàn thành

    BA->>BA: Review toàn bộ tài liệu

    alt Cần chỉnh sửa
        BA->>EXCEL: Sửa thủ công
    else Approve
        BA-->>SYS: Xác nhận Approve
        BA->>BA: Gửi tài liệu cho khách hàng
    end
```

---

## 2. Sequence – Update Mode

```mermaid
sequenceDiagram
    actor DS as Designer
    actor BA as BA / BrSE
    participant SYS as Hệ thống AI Assistant
    participant FAPI as Figma API
    participant DIFF as Diff Analyzer
    participant AI as AI Engine
    participant EXCEL as Excel Generator
    participant DB as Version Store

    DS->>DS: Cập nhật thiết kế trên Figma
    BA->>SYS: Trigger Update Mode

    SYS->>FAPI: GET /files/{file_key} (phiên bản mới nhất)
    FAPI-->>SYS: Dữ liệu Figma mới

    SYS->>DB: Load Previous Snapshot
    DB-->>SYS: Snapshot phiên bản trước

    SYS->>DIFF: So sánh 2 phiên bản
    DIFF-->>SYS: Danh sách thay đổi (Added / Modified / Deleted)

    alt Không có thay đổi
        SYS-->>BA: Không phát hiện thay đổi
    else Có thay đổi
        loop Từng phần thay đổi
            SYS->>AI: Gửi component thay đổi
            AI-->>SYS: Nội dung tiếng Nhật mới
        end

        SYS->>EXCEL: Merge nội dung mới vào section tương ứng
        EXCEL->>EXCEL: Highlight vùng thay đổi (màu vàng)
        EXCEL-->>SYS: File Excel đã cập nhật

        SYS->>SYS: Tạo Diff Report
        SYS->>DB: Lưu New Snapshot
        SYS-->>BA: File Excel + Diff Report

        BA->>BA: Review phần highlight (màu vàng)

        alt Cần chỉnh sửa
            BA->>EXCEL: Sửa thủ công
        else Approve
            BA->>EXCEL: Xóa highlight
            BA->>BA: Gửi tài liệu cập nhật cho khách
        end
    end
```

---

## 3. Sequence – Xử lý Lỗi AI Generate

```mermaid
sequenceDiagram
    participant SYS as Hệ thống
    participant AI as AI Engine
    actor BA as BA / BrSE

    SYS->>AI: Gửi yêu cầu generate nội dung tiếng Nhật
    AI-->>SYS: ❌ Lỗi / Timeout

    SYS->>AI: Retry lần 1
    AI-->>SYS: ❌ Lỗi

    SYS->>AI: Retry lần 2
    AI-->>SYS: ❌ Lỗi

    SYS->>SYS: Đánh dấu component "【要確認】" trong Excel
    SYS-->>BA: Thông báo "X components cần xử lý thủ công"

    Note over BA: BA xử lý thủ công các component bị đánh dấu
```
