# Kiến Trúc Tổng Thể Hệ Thống

## 1. Sơ đồ Kiến trúc Thành phần (PlantUML)

```plantuml
@startuml KienTrucTongThe
!theme plain
skinparam backgroundColor #FAFAFA
skinparam componentStyle rectangle

title Kiến Trúc Tổng Thể - AI Assistant Figma → Excel

actor "Designer" as DS
actor "BA / BrSE" as BA
actor "Khách hàng" as KH

package "Figma Platform" {
  component [Figma File\n(Screens & Components)] as FIG
  component [Figma API] as FAPI
}

package "AI Processing Engine" {
  component [Figma Parser\n(Screen Structure Analyzer)] as PARSER
  component [Component Detector\n(button/input/text/table/modal)] as DETECT
  component [Diff Analyzer\n(Compare versions)] as DIFF
  component [AI Content Generator\n(Claude / ChatGPT)] as AI
  component [Template Mapper\n(Field Mapping Engine)] as MAPPER
}

package "Output Engine" {
  component [Excel Generator\n(画面概要仕様書)] as EXCEL1
  component [Excel Generator\n(画面遷移仕様書)] as EXCEL2
  component [Diff Reporter\n(Change Highlight)] as REPORT
}

database "Version Store" {
  component [Previous Version\nSnapshot] as SNAP
}

DS --> FIG : Cập nhật thiết kế
FIG --> FAPI : Figma API
FAPI --> PARSER : Dữ liệu màn hình

PARSER --> DETECT : Danh sách screens
PARSER --> DIFF : So sánh phiên bản

DIFF --> SNAP : Lưu/Đọc snapshot
DIFF --> MAPPER : Chỉ phần thay đổi

DETECT --> AI : Component metadata
AI --> MAPPER : Nội dung tiếng Nhật

MAPPER --> EXCEL1 : Đặc tả màn hình
MAPPER --> EXCEL2 : Đặc tả chuyển màn hình
DIFF --> REPORT : Báo cáo thay đổi

EXCEL1 --> BA : Review & Approve
EXCEL2 --> BA : Review & Approve
REPORT --> BA : Xem thay đổi

BA --> KH : Gửi tài liệu

@enduml
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

## 3. Sơ đồ Luồng Dữ liệu (Mermaid)

```mermaid
flowchart LR
    subgraph INPUT["📥 Đầu vào"]
        F1[Figma File URL]
        F2[Excel Template]
        F3[Previous Snapshot]
    end

    subgraph ENGINE["⚙️ AI Engine"]
        E1[Parse & Detect]
        E2[Diff Analysis]
        E3[AI Generate]
        E4[Template Mapping]
    end

    subgraph OUTPUT["📤 Đầu ra"]
        O1[画面概要仕様書\nExcel]
        O2[画面遷移仕様書\nExcel]
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
