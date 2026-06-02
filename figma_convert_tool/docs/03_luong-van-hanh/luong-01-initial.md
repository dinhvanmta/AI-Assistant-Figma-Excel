# Luồng 1 – Initial Setup (Tạo Tài Liệu Lần Đầu)

## 1. Mô tả

Luồng này được thực hiện **một lần duy nhất** khi bắt đầu dự án hoặc khi cần generate lại toàn bộ tài liệu từ đầu. Hệ thống sẽ đọc toàn bộ file Figma, phân tích từng màn hình và component, generate nội dung tiếng Nhật và xuất ra 2 file Excel đặc tả.

---

## 2. Sơ đồ Luồng Chính (Mermaid)

```mermaid
flowchart TD
    A([🚀 Bắt đầu Initial Setup]) --> B[BA/BrSE nhập\nFigma File URL + Token]
    B --> C[BA/BrSE chọn\nExcel Template]
    C --> D[Hệ thống gọi Figma API]
    D --> E{API\nresponse OK?}

    E -- Không --> ERR1[Báo lỗi:\nKiểm tra URL & Token]
    ERR1 --> B

    E -- Có --> F[Parse cấu trúc Figma\nDanh sách Frames/Screens]
    F --> G[Detect Components\ntrong từng Screen]

    G --> H{Component\nnhận dạng được?}
    H -- Không --> H1[Đánh dấu Unknown\nGhi log để xử lý thủ công]
    H -- Có --> I[Phân loại:\nbutton / input / text / table / modal]
    H1 --> I

    I --> J[Phân tích Prototype Transitions\nLuồng chuyển màn hình]
    J --> K[AI generate nội dung\ntiếng Nhật cho từng component]

    K --> L{Generate\nthành công?}
    L -- Không --> L1[Retry / Báo lỗi AI]
    L1 --> K
    L -- Có --> M[Mapping nội dung\nvào Excel Template]

    M --> N[Apply format Excel\nfont / merge / border]
    N --> O[Xuất 画面概要仕様書\nExcel]
    N --> P[Xuất 画面遷移仕様書\nExcel]
    O --> Q[Lưu Version Snapshot]
    P --> Q

    Q --> R[BA/BrSE Review\ntoàn bộ tài liệu]
    R --> S{Approve?}

    S -- Chỉnh sửa --> T[BA sửa thủ công\ntrực tiếp trên Excel]
    T --> R
    S -- Approve --> U[Gửi tài liệu\ncho khách hàng]
    U --> V([✅ Hoàn thành])
```

---

## 3. Sơ đồ Phân tích Component (Mermaid)

```mermaid
flowchart LR
    FRAME[📱 Figma Frame\nMàn hình] --> B1[Button]
    FRAME --> I1[Input Field]
    FRAME --> T1[Text / Label]
    FRAME --> TB1[Table / List]
    FRAME --> M1[Modal / Dialog]
    FRAME --> PT[Prototype\nTransition]

    B1 --> DOC1["操作ボタン\n(Nút thao tác)"]
    I1 --> DOC2["入力項目\n(Trường nhập liệu)"]
    T1 --> DOC3["表示項目\n(Nội dung hiển thị)"]
    TB1 --> DOC4["一覧表示\n(Danh sách/Bảng)"]
    M1 --> DOC5["ポップアップ\n(Cửa sổ popup)"]
    PT --> DOC6["画面遷移\n(Chuyển màn hình)"]

    DOC1 --> EXCEL1[画面概要仕様書]
    DOC2 --> EXCEL1
    DOC3 --> EXCEL1
    DOC4 --> EXCEL1
    DOC5 --> EXCEL1
    DOC6 --> EXCEL2[画面遷移仕様書]
```

---

## 4. Mapping Rule – Component sang Excel

| Component Figma | Loại nhận dạng | Cột trong Excel | Ghi chú |
|----------------|---------------|----------------|---------|
| Button (Primary) | 操作ボタン | ボタン名 / 処理内容 | Tên + mô tả hành động |
| Button (Secondary) | 操作ボタン | ボタン名 / 処理内容 | Phân biệt qua màu/style |
| Input Text | 入力項目 | 項目名 / 入力形式 | Tên trường + kiểu nhập |
| Dropdown | 入力項目 | 項目名 / 選択肢 | Tên + danh sách option |
| Text (heading) | 表示項目 | タイトル | Tiêu đề màn hình |
| Text (body) | 表示項目 | 表示内容 | Nội dung hiển thị |
| Table/List | 一覧表示 | 一覧名 / カラム構成 | Tên bảng + cột |
| Modal/Dialog | ポップアップ | ポップアップ名 / 表示条件 | Tên + điều kiện hiện |
| Prototype Arrow | 画面遷移 | 遷移元 / 遷移先 / 条件 | Màn hình nguồn → đích + điều kiện |

---

## 5. Kết quả Đầu ra

| Tài liệu | Nội dung | Format |
|----------|----------|--------|
| 画面概要仕様書 | Toàn bộ màn hình, component, mô tả tiếng Nhật | Excel (.xlsx) |
| 画面遷移仕様書 | Toàn bộ luồng chuyển màn hình, điều kiện | Excel (.xlsx) |
| Version Snapshot | Dữ liệu Figma tại thời điểm generate | JSON/DB |
