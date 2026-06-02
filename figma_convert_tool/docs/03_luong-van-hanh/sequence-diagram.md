# Sequence Diagram – Tương Tác AI và Con Người

## 1. Sequence – Initial Setup

```plantuml
@startuml Sequence_InitialSetup
!theme plain
skinparam sequenceMessageAlign center
title Sequence Diagram: Initial Setup

actor "BA / BrSE" as BA
participant "Hệ thống\nAI Assistant" as SYS
participant "Figma API" as FAPI
participant "AI Engine\n(Claude/ChatGPT)" as AI
participant "Excel\nGenerator" as EXCEL
database "Version\nStore" as DB

BA -> SYS: Nhập Figma URL + Token\n+ chọn Template
SYS -> FAPI: GET /files/{file_key}
FAPI --> SYS: Trả về cấu trúc file\n(frames, components, prototypes)

SYS -> SYS: Parse danh sách screens\nvà detect components

loop Từng Screen
  SYS -> AI: Gửi component metadata\n(type, name, properties)
  AI --> SYS: Nội dung tiếng Nhật\n(mô tả, tên trường, hành động)
end

SYS -> EXCEL: Mapping nội dung\nvào template
EXCEL -> EXCEL: Apply format\n(font, merge, border)
EXCEL --> SYS: File 画面概要仕様書\nFile 画面遷移仕様書

SYS -> DB: Lưu Version Snapshot\n(Figma version ID + data)
SYS --> BA: Trả về 2 file Excel\n+ thông báo hoàn thành

BA -> BA: Review toàn bộ\ntài liệu
alt Cần chỉnh sửa
  BA -> EXCEL: Sửa thủ công
else Approve
  BA --> SYS: Xác nhận Approve
  BA -> BA: Gửi tài liệu cho\nkhách hàng
end

@enduml
```

---

## 2. Sequence – Update Mode

```plantuml
@startuml Sequence_UpdateMode
!theme plain
skinparam sequenceMessageAlign center
title Sequence Diagram: Update Mode

actor "Designer" as DS
actor "BA / BrSE" as BA
participant "Hệ thống\nAI Assistant" as SYS
participant "Figma API" as FAPI
participant "Diff\nAnalyzer" as DIFF
participant "AI Engine" as AI
participant "Excel\nGenerator" as EXCEL
database "Version\nStore" as DB

DS -> DS: Cập nhật thiết kế\ntrên Figma
BA -> SYS: Trigger Update Mode

SYS -> FAPI: GET /files/{file_key}\n(phiên bản mới nhất)
FAPI --> SYS: Dữ liệu Figma mới

SYS -> DB: Load Previous Snapshot
DB --> SYS: Snapshot phiên bản trước

SYS -> DIFF: So sánh 2 phiên bản
DIFF --> SYS: Danh sách thay đổi\n(Added / Modified / Deleted)

alt Không có thay đổi
  SYS --> BA: "Không phát hiện thay đổi"
else Có thay đổi
  loop Từng phần thay đổi
    SYS -> AI: Gửi component thay đổi
    AI --> SYS: Nội dung tiếng Nhật mới
  end

  SYS -> EXCEL: Merge nội dung mới\nvào section tương ứng
  EXCEL -> EXCEL: Highlight vùng thay đổi\n(màu vàng)
  EXCEL --> SYS: File Excel đã cập nhật

  SYS -> SYS: Tạo Diff Report
  SYS -> DB: Lưu New Snapshot
  SYS --> BA: File Excel + Diff Report

  BA -> BA: Review phần\nhighlight (màu vàng)
  alt Cần chỉnh sửa
    BA -> EXCEL: Sửa thủ công
  else Approve
    BA -> EXCEL: Xóa highlight
    BA -> BA: Gửi tài liệu\ncập nhật cho khách
  end
end

@enduml
```

---

## 3. Sequence – Xử lý Lỗi AI Generate

```plantuml
@startuml Sequence_ErrorHandling
!theme plain
title Sequence Diagram: Xử lý lỗi khi AI Generate thất bại

participant "Hệ thống" as SYS
participant "AI Engine" as AI
actor "BA / BrSE" as BA

SYS -> AI: Gửi yêu cầu generate\nnội dung tiếng Nhật
AI --> SYS: ❌ Lỗi / Timeout

SYS -> AI: Retry lần 1
AI --> SYS: ❌ Lỗi

SYS -> AI: Retry lần 2
AI --> SYS: ❌ Lỗi

SYS -> SYS: Đánh dấu component\n"【要確認】" trong Excel
SYS --> BA: Thông báo:\n"X components cần xử lý thủ công"
note over BA: BA xử lý thủ công\ncác component bị đánh dấu

@enduml
```
