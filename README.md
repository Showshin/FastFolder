# Directory Structure Creator

Ứng dụng này cho phép bạn tạo cấu trúc thư mục và tệp từ một định dạng cây văn bản. Được xây dựng bằng Electron, ứng dụng chạy trên desktop và hỗ trợ Windows, macOS, Linux.

## Tính năng
- Dán cấu trúc thư mục dạng cây vào ô văn bản.
- Chọn đường dẫn đích để tạo thư mục và tệp.
- Tạo tự động các thư mục và tệp rỗng dựa trên cấu trúc.

## Cài đặt và chạy ứng dụng

### Yêu cầu
- [Node.js](https://nodejs.org/) (phiên bản 14 hoặc cao hơn)
- npm (đi kèm với Node.js)
- Git (để tải mã nguồn)

### Hướng dẫn cài đặt

#### 1. Tải mã nguồn từ GitHub
Sao chép repository này về máy tính của bạn bằng lệnh:
```bash
git clone https://github.com/Showshin/FastFolder.git
```

#### 2. Tải thư viện
Cd vô file mã nguồn sau đó nhập lệnh:
npm install

#### 3. Chạy app
npm start

Cấu trúc ví dụ của một file
```bash
wallet-scanner/
├── config/
│   ├── networks.js
│   ├── settings.js
│   └── proxies.json
├── src/
│   ├── managers/
│   │   ├── ProxyManager.js
│   │   └── ProviderManager.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── helpers.js
│   ├── scanner.js
│   └── worker.js
├── .env
├── index.js
└── package.json
```
