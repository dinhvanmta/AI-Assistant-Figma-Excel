# Tổng Quan Hệ Thống

## 1. Giới thiệu

**Tên hệ thống:** AI Assistant Tự Động Hóa Tài Liệu Figma → Excel

**Mục tiêu:** Xây dựng một công cụ/ứng dụng có khả năng tự động đọc thiết kế từ Figma, phân tích cấu trúc màn hình, các thành phần giao diện và luồng chuyển màn hình, sau đó generate trực tiếp vào tài liệu đặc tả theo template Excel có sẵn.

---

## 2. Bối cảnh và Vấn đề

### Quy trình hiện tại (thủ công)

Hiện tại BA/BrSE phải thực hiện toàn bộ thủ công theo trình tự:

1. Đọc từng màn hình trên Figma
2. Phân tích từng component (button, input, text, table, modal...)
3. Dùng ChatGPT/Claude để generate nội dung tiếng Nhật
4. Copy thủ công sang Excel template
5. Chỉnh font, merge cell, căn chỉnh kích thước
6. Review trước khi gửi khách hàng

Khi Figma có cập nhật, phải kiểm tra lại toàn bộ màn hình và update thủ công.

### Vấn đề (Pain Points)

| # | Vấn đề | Tác động |
|---|--------|----------|
| 1 | Phải phân tích từng component thủ công | Tốn 20~60 phút/màn hình |
| 2 | Dễ bỏ sót (miss) các item | Chất lượng tài liệu không đồng đều |
| 3 | Mapping sang template tốn thời gian | Giảm năng suất BA/BrSE |
| 4 | Figma thay đổi nhỏ → phải update nhiều phần | Effort cao, khó tracking change |
| 5 | Khó đồng bộ giữa Figma và tài liệu | Rủi ro tài liệu lỗi thời |

---

## 3. Mục tiêu Hệ thống

### Mục tiêu chính

- **Tự động hóa** quá trình tạo tài liệu đặc tả từ Figma sang Excel
- **Giảm thiểu** thời gian BA/BrSE từ 20~60 phút/màn hình xuống còn vài phút
- **Đảm bảo** tính nhất quán giữa thiết kế Figma và tài liệu
- **Hỗ trợ** cập nhật tài liệu theo từng phần khi Figma thay đổi

### Hai loại tài liệu đầu ra

| Tài liệu | Tên Nhật | Mô tả |
|----------|----------|-------|
| Tài liệu đặc tả màn hình | 画面概要仕様書 | Mô tả chi tiết từng màn hình, component, logic hiển thị |
| Tài liệu đặc tả chuyển màn hình | 画面遷移仕様書 | Mô tả luồng điều hướng, điều kiện chuyển màn hình |

---

## 4. Phạm vi Hệ thống

### Trong phạm vi (In Scope)

- Đọc và phân tích file Figma qua API
- Nhận diện các thành phần: button, input, text, table, modal, prototype transition
- Generate nội dung tài liệu tiếng Nhật theo template Excel
- Hỗ trợ chế độ tạo mới toàn bộ (Initial Setup)
- Hỗ trợ chế độ cập nhật theo phần (Update Mode)
- Highlight các phần thay đổi trong tài liệu
- Xuất báo cáo khác biệt (Diff Report)

### Ngoài phạm vi (Out of Scope)

- Chỉnh sửa trực tiếp lên file Figma
- Gửi tài liệu tự động cho khách hàng (con người vẫn phải review và approve)
- Dịch thuật các ngôn ngữ ngoài tiếng Nhật

---

## 5. Công nghệ và Công cụ

| Thành phần | Công cụ |
|-----------|---------|
| Nguồn thiết kế | Figma (Figma API) |
| AI xử lý | ChatGPT / Claude Code |
| Đầu ra | Excel (template có sẵn) |
| Ngôn ngữ tài liệu | Tiếng Nhật |

---

## 6. Thành viên Dự án

| Thành viên | Vị trí | Phân vai |
|-----------|--------|---------|
| Đình Văn | BrSE (có nền Dev) | Dev – Phát triển sản phẩm |
| Tâm | Sales | Review – Tư vấn |
| Lâm Anh | BrSE | Design – Test |
| Trang | Intern BD | Làm slide – Thuyết trình |

---

## 7. Kiến trúc Tổng thể

Xem chi tiết tại [Kiến trúc Tổng thể](./kien-truc-tong-the.md)
