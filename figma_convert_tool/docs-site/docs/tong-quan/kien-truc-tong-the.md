---
id: kien-truc-tong-the
title: Kiến Trúc Tổng Thể
sidebar_position: 2
---

## 1. Sơ đồ Kiến trúc Thành phần

> **Lưu ý:** Nhãn trong sơ đồ dùng tiếng Anh để đảm bảo hiển thị đúng. Bảng mô tả bên dưới giải thích chi tiết bằng tiếng Việt.

```mermaid
flowchart TB
    DS(["Designer"])
    BA(["BA / BrSE"])
    KH(["Khach hang"])

    subgraph FIGMA["Figma Platform"]
        FIG["Figma File\n(Screens & Components)"]
        FAPI["Figma API"]
    end

    subgraph ENGINE["AI Processing Engine"]
        PARSER["Figma Parser\n(Screen Structure Analyzer)"]
        DETECT["Component Detector\n(button/input/text/table/modal)"]
        DIFF["Diff Analyzer\n(Compare versions)"]
        AI["AI Content Generator\n(Claude / ChatGPT)"]
        MAPPER["Template Mapper\n(Field Mapping Engine)"]
    end

    subgraph OUTPUT["Output Engine"]
        EXCEL1["Excel Generator\n(画面概要仕様書)"]
        EXCEL2["Excel Generator\n(画面遷移仕様書)"]
        REPORT["Diff Reporter\n(Change Highlight)"]
    end

    subgraph STORE["Version Store"]
        SNAP["Previous Version Snapshot"]
    end

    DS -->|"Update design"| FIG
    FIG --> FAPI
    FAPI -->|"Screen data"| PARSER
    PARSER -->|"Screen list"| DETECT
    PARSER -->|"Compare version"| DIFF
    DIFF -->|"Read/Write snapshot"| SNAP
    DIFF -->|"Changed parts only"| MAPPER
    DETECT -->|"Component metadata"| AI
    AI -->|"Japanese content"| MAPPER
    MAPPER -->|"Screen spec"| EXCEL1
    MAPPER -->|"Transition spec"| EXCEL2
    DIFF -->|"Change report"| REPORT
    EXCEL1 -->|"Review & Approve"| BA
    EXCEL2 -->|"Review & Approve"| BA
    REPORT -->|"View changes"| BA
    BA -->|"Send document"| KH
```

---

## 2. Mô tả các Thành phần

### 2.1 Figma Platform

| Thành phần | Mô tả |
|-----------|-------|
| **Figma File** | File thiết kế chứa tất cả màn hình, component, prototype |
| **Figma API** | REST API để đọc dữ liệu cấu trúc từ Figma |

### 2.2 AI Processing Engine

| Thành phần | Mô tả |
|-----------|-------|
| **Figma Parser** | Phân tích cấu trúc file Figma, trích xuất danh sách màn hình và metadata |
| **Component Detector** | Nhận dạng từng loại component: button, input, text, table, modal, transition |
| **Diff Analyzer** | So sánh phiên bản hiện tại với phiên bản trước, xác định phần thay đổi |
| **AI Content Generator** | Dùng AI (Claude/ChatGPT) để generate nội dung mô tả tiếng Nhật |
| **Template Mapper** | Mapping nội dung đã generate vào đúng field/section trong Excel template |

### 2.3 Output Engine

| Thành phần | Mô tả |
|-----------|-------|
| **Excel Generator (概要仕様書)** | Tạo/cập nhật file tài liệu đặc tả màn hình |
| **Excel Generator (遷移仕様書)** | Tạo/cập nhật file tài liệu đặc tả chuyển màn hình |
| **Diff Reporter** | Highlight vùng thay đổi, xuất báo cáo diff |

### 2.4 Version Store

| Thành phần | Mô tả |
|-----------|-------|
| **Previous Version Snapshot** | Lưu trữ snapshot phiên bản trước để so sánh khi có cập nhật |

---

## 3. Sơ đồ Luồng Dữ liệu

```mermaid
flowchart LR
    subgraph INPUT["Input (Dau vao)"]
        F1[Figma File URL]
        F2[Excel Template]
        F3[Previous Snapshot]
    end

    subgraph ENGINE["AI Engine"]
        E1[Parse & Detect]
        E2[Diff Analysis]
        E3[AI Generate]
        E4[Template Mapping]
    end

    subgraph OUTPUT["Output (Dau ra)"]
        O1["画面概要仕様書 Excel"]
        O2["画面遷移仕様書 Excel"]
        O3[Diff Report]
    end

    F1 --> E1
    F2 --> E4
    F3 --> E2
    E1 --> E2
    E1 --> E3
    E2 --> E4
    E3 --> E4
    E4 --> O1
    E4 --> O2
    E2 --> O3
```

---

## 4. Nguyên tắc Thiết kế

1. **Tách biệt AI và Template:** AI chỉ generate nội dung, Template Mapper xử lý việc đặt đúng vị trí trong Excel
2. **Không regenerate toàn bộ khi update:** Chỉ xử lý phần thay đổi để tiết kiệm thời gian và tránh ghi đè nội dung đã review
3. **Con người luôn là bước cuối:** AI generate, con người review và approve trước khi gửi khách
4. **Lưu trữ snapshot:** Mỗi lần generate thành công đều lưu snapshot để phục vụ diff lần sau