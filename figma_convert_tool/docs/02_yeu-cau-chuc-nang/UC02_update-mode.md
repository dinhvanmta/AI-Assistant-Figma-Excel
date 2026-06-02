# UC02 – Cập Nhật Tài Liệu Theo Phần (Update Mode)

## 1. Thông tin chung

| Trường | Nội dung |
|--------|----------|
| **Mã Use Case** | UC02 |
| **Tên** | Cập nhật tài liệu theo phần (Update Mode) |
| **Actor chính** | BA / BrSE |
| **Actor phụ** | AI Engine |
| **Ưu tiên** | Cao |
| **Điều kiện tiên quyết** | UC01 đã thực hiện thành công, snapshot phiên bản trước đã được lưu |
| **Điều kiện hậu** | Chỉ các section thay đổi được cập nhật trong Excel, phần thay đổi được highlight, snapshot mới được lưu |

---

## 2. Luồng Chính (Main Flow)

| Bước | Actor | Hành động |
|------|-------|-----------|
| 1 | Designer | Cập nhật thiết kế trên Figma |
| 2 | BA/BrSE | Trigger chế độ Update Mode trên hệ thống |
| 3 | AI Engine | Gọi Figma API, tải phiên bản mới nhất |
| 4 | AI Engine | So sánh với snapshot phiên bản trước (Diff Analysis) |
| 5 | AI Engine | Xác định danh sách screens/components đã thay đổi |
| 6 | AI Engine | Chỉ parse và process các phần thay đổi |
| 7 | AI Engine | Generate nội dung tiếng Nhật cho phần thay đổi |
| 8 | AI Engine | Merge nội dung mới vào đúng section trong Excel hiện tại |
| 9 | AI Engine | Highlight (tô màu) các vùng đã thay đổi |
| 10 | AI Engine | Xuất Diff Report (báo cáo thay đổi) |
| 11 | AI Engine | Lưu snapshot phiên bản mới |
| 12 | BA/BrSE | Review phần được highlight |
| 13 | BA/BrSE | Approve và gửi tài liệu cập nhật cho khách |

---

## 3. Luồng Thay thế (Alternative Flow)

### 3.1 Không có thay đổi nào được phát hiện

| Bước | Hành động |
|------|-----------|
| 4a | Hệ thống thông báo "Không phát hiện thay đổi so với phiên bản trước" |
| 4b | Không thực hiện update, giữ nguyên file Excel hiện tại |

### 3.2 Thay đổi quá lớn (nhiều hơn 50% screens)

| Bước | Hành động |
|------|-----------|
| 5a | Hệ thống cảnh báo "Thay đổi lớn – khuyến nghị chạy Initial Setup" |
| 5b | BA/BrSE chọn: tiếp tục Update Mode hoặc chuyển sang Initial Setup |

### 3.3 Section trong Excel đã bị xóa hoặc di chuyển

| Bước | Hành động |
|------|-----------|
| 8a | Hệ thống không tìm thấy section tương ứng trong Excel |
| 8b | Tạo section mới ở cuối file và đánh dấu cần review |

---

## 4. Dữ liệu Đầu vào / Đầu ra

### Input

| Dữ liệu | Bắt buộc | Mô tả |
|---------|----------|-------|
| Figma File URL | ✅ | URL Figma phiên bản mới nhất |
| Figma Access Token | ✅ | Token xác thực |
| Excel hiện tại | ✅ | File Excel đã generate từ UC01 |
| Previous Snapshot | ✅ | Snapshot phiên bản trước (tự động từ hệ thống) |

### Output

| Dữ liệu | Mô tả |
|---------|-------|
| Excel đã cập nhật | Chỉ các section thay đổi được merge, phần khác giữ nguyên |
| Highlight vùng thay đổi | Các cell/row thay đổi được tô màu để dễ review |
| Diff Report | Báo cáo liệt kê: screen nào thay đổi, component nào thêm/xóa/sửa |
| New Snapshot | Snapshot mới lưu cho lần update tiếp theo |

---

## 5. Quy tắc Xử lý (Business Rules)

| # | Quy tắc |
|---|---------|
| BR06 | Chỉ update section tương ứng với screen/component đã thay đổi, không được ghi đè phần đã được BA chỉnh sửa thủ công |
| BR07 | Diff dựa trên: tên Frame, vị trí component, thuộc tính component (text, size, color, type) |
| BR08 | Vùng thay đổi được highlight màu vàng (#FFFF00) để BA dễ nhận biết |
| BR09 | Diff Report phải liệt kê: Thêm mới / Sửa đổi / Xóa cho từng screen và component |
| BR10 | Sau khi BA approve, màu highlight được xóa và snapshot được lưu |

---

## 6. Phân loại Thay đổi Figma

| Loại thay đổi | Xử lý |
|--------------|-------|
| Thêm màn hình mới | Tạo section mới trong Excel |
| Xóa màn hình | Đánh dấu "Deleted" trong Excel, không xóa tự động |
| Sửa text/label | Cập nhật nội dung tương ứng, highlight |
| Thêm component | Thêm dòng mới vào bảng component của màn hình đó |
| Xóa component | Đánh dấu "Removed", highlight để BA xác nhận xóa |
| Sửa prototype connection | Cập nhật 画面遷移仕様書, highlight dòng thay đổi |
