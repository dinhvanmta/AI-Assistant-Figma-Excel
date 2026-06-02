# Các Luồng Vận Hành Chính

## Danh sách luồng

| # | Tên luồng | Mô tả | File |
|---|-----------|-------|------|
| 1 | Initial Setup | Tạo toàn bộ tài liệu lần đầu từ Figma | [luong-01-initial.md](./luong-01-initial.md) |
| 2 | Update Mode | Phát hiện thay đổi và cập nhật tài liệu theo phần | [luong-02-update.md](./luong-02-update.md) |
| 3 | Sequence Diagram | Tương tác chi tiết giữa AI và Con người | [sequence-diagram.md](./sequence-diagram.md) |

---

## Sơ đồ Tổng quan Hai Luồng (Mermaid)

```mermaid
flowchart TD
    START([Bắt đầu]) --> Q1{Lần đầu\ntạo tài liệu?}

    Q1 -- Có --> INIT[Luồng 1: Initial Setup\nTạo toàn bộ tài liệu]
    Q1 -- Không --> UPD[Luồng 2: Update Mode\nCập nhật theo phần]

    INIT --> DONE1[Tài liệu đầy đủ\n+ Snapshot lưu]
    UPD --> DONE2[Tài liệu cập nhật\n+ Diff Report\n+ Snapshot mới]

    DONE1 --> REVIEW[BA/BrSE Review]
    DONE2 --> REVIEW

    REVIEW --> APPROVE{Approve?}
    APPROVE -- Có --> SEND[Gửi khách hàng]
    APPROVE -- Không --> FIX[Sửa thủ công\nhoặc chạy lại]
    FIX --> REVIEW

    SEND --> END([Hoàn thành])
```
