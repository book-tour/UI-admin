# Hướng dẫn code
- Clone đồ án
- nhập ( để down package về )
```bash
  npm i 
```
- chạy project
```bash
  npm start
```
- chạy tailwind ( lưu ý : chạy song song với đồ án lun, nó sẽ update tailwind.css nếu muốn dùng nếu cái advance như kiểu text-[10px] ) cái trên chạy 1 lần, cái dưới chạy liên tục, nên dùng cái dưới
```bash
  npm run build:css 
```
```bash
  npm run build:tailwind
```

# Lưu ý
- Mỗi người code trong nhánh riêng từng người, k merge hoặc code vào master hoặc develop -> nhớ để ý nhánh mỗi khi chuẩn bị code
- Code CSS chỉ đc dùng 2 thứ : CSS Module hoặc Tailwind CSS -> cấm viết css bình thường xong import vào 
- Trong thư mục /pages mỗi file là 1 trang, trước mắt code trong 1 file đó rồi xong thì chia ra thành từng component nhỏ trong /components ( có vd trong exampleComponent ) hoặc chia component từ đầu
- Mấy thứ chung chung thì đừng làm vội để t sửa đã tạm thời ai gặp thì bỏ làm mấy cái khác :
  - Thanh header
  - Thanh sidebar bên trái
  - Thanh music phía dưới cùng
- Hiện tại đang dùng MUI ver 4 nên mn chú ý nha : https://v4.mui.com