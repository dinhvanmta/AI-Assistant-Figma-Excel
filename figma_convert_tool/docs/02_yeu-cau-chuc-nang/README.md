# Yêu Cầu Chức Năng

## 1. Danh sách Use Case

```plantuml
@startuml UseCaseTongQuan
!theme plain
left to right direction
title Tổng quan Use Case - AI Assistant Figma → Excel

actor "BA / BrSE" as BA
actor "Designer" as DS
actor "AI Engine" as AI <<system>>

rectangle "Hệ thống AI Assistant" {
  usecase "UC01: Tạo tài liệu lần đầu\n(Initial Setup)" as UC01
  usecase "UC02: Cập nhật tài liệu\n(Update Mode)" as UC02
  usecase "UC03: Review & Approve\ntài liệu" as UC03
  usecase "UC04: Xem báo cáo\nthay đổi (Diff)" as UC04
  usecase "UC05: Xuất file Excel\ntheo template" as UC05
}

DS --> UC01 : Cung cấp Figma URL
DS --> UC02 : Cập nhật Figma

BA --> UC01 : Khởi động generate
BA --> UC02 : Trigger update
BA --> UC03 : Review output
BA --> UC04 : Xem diff report

AI --> UC01
AI --> UC02
AI --> UC05

UC01 ..> UC05 : <<include>>
UC02 ..> UC04 : <<include>>
UC02 ..> UC05 : <<include>>
UC03 ..> UC04 : <<extend>>

@enduml
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

- [UC01 – Initial Setup](./UC01_initial-setup.md)
- [UC02 – Update Mode](./UC02_update-mode.md)
