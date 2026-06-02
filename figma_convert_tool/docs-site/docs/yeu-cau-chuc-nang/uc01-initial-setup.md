---
id: uc01-initial-setup
title: UC01 – Initial Setup
sidebar_position: 2
---


## 1. Thông tin chung

| Trường | Nội dung |
|--------|----------|
| **Mã Use Case** | UC01 |
| **Tên** | Tạo tài liệu lần đầu (Initial Setup) |
| **Actor chính** | BA / BrSE |
| **Actor phụ** | AI Engine |
| **Ưu tiên** | Cao |
| **Điều kiện tiên quyết** | Figma file đã hoàn thiện, Excel template đã có sẵn |
| **Điều kiện hậu** | File 画面概要仕様書 và 画面遷移仕様書 được generate đầy đủ, snapshot được lưu lại |

---

## 2. Luồng Chính (Main Flow)

| Bước | Actor | Hành động |
|------|-------|-----------|
| 1 | BA/BrSE | Nhập Figma File URL vào hệ thống |
| 2 | BA/BrSE | Chọn Excel template đầu ra |
| 3 | AI Engine | Gọi Figma API, tải toàn bộ cấu trúc file |
| 4 | AI Engine | Parse danh sách screens, frames, components |
| 5 | AI Engine | Detect từng loại component (button, input, text, table, modal) |
| 6 | AI Engine | Phân tích prototype transitions (luồng chuyển màn hình) |
| 7 | AI Engine | Generate nội dung mô tả tiếng Nhật cho từng component |
| 8 | AI Engine | Mapping nội dung vào đúng vị trí trong Excel template |
| 9 | AI Engine | Apply format Excel (merge cell, font, border...) |
| 10 | AI Engine | Lưu snapshot phiên bản hiện tại |
| 11 | AI Engine | Xuất file Excel hoàn chỉnh |
| 12 | BA/BrSE | Review toàn bộ tài liệu |
| 13 | BA/BrSE | Approve và gửi cho khách hàng |

---

## 3. Luồng Thay thế (Alternative Flow)

### 3.1 Figma API lỗi hoặc không truy cập được

| Bước | Hành động |
|------|-----------|
| 3a | Hệ thống báo lỗi kết nối Figma API |
| 3b | Yêu cầu BA/BrSE kiểm tra lại URL và token xác thực |
| 3c | BA/BrSE nhập lại thông tin, hệ thống thử lại |

### 3.2 Component không nhận dạng được

| Bước | Hành động |
|------|-----------|
| 5a | Hệ thống đánh dấu component "Unknown" |
| 5b | Ghi log danh sách component chưa nhận dạng |
| 5c | BA/BrSE xử lý thủ công các component này sau |

---

## 4. Dữ liệu Đầu vào / Đầu ra

### Input

| Dữ liệu | Bắt buộc | Mô tả |
|---------|----------|-------|
| Figma File URL | ✅ | URL của file Figma cần export |
| Figma Access Token | ✅ | Token xác thực để gọi Figma API |
| Excel Template | ✅ | File template Excel đã định nghĩa sẵn |

### Output

| Dữ liệu | Mô tả |
|---------|-------|
| 画面概要仕様書 (Excel) | Tài liệu đặc tả chi tiết từng màn hình |
| 画面遷移仕様書 (Excel) | Tài liệu đặc tả luồng chuyển màn hình |
| Version Snapshot | Snapshot lưu lại để phục vụ Update Mode sau này |

---

## 5. Quy tắc Xử lý (Business Rules)

| # | Quy tắc |
|---|---------|
| BR01 | Mỗi Frame trong Figma tương ứng với một màn hình trong tài liệu |
| BR02 | Component được mapping theo loại: button → 操作ボタン, input → 入力項目, text → 表示項目, table → 一覧表示, modal → ポップアップ |
| BR03 | Prototype connection giữa 2 frames → 1 dòng trong 画面遷移仕様書 |
| BR04 | Naming convention trong Figma phải tuân thủ quy ước đặt tên để AI nhận dạng đúng |
| BR05 | Format Excel phải đúng 100% theo template gốc (font, merge, border) |

---

## 6. Thời gian Thực hiện

| Quy trình | Thủ công | Với AI |
|-----------|---------|--------|
| Mỗi màn hình | 20 ~ 60 phút | < 5 phút (ước tính) |
| Toàn bộ file (10 screens) | 200 ~ 600 phút | < 30 phút |
