import { motion } from 'framer-motion';
import { Home, ExternalLink } from 'lucide-react';

interface ThanhVien {
    vai_tro: string;
    ho_ten: string;
    nam_sinh_nam_mat: string;
    tieu_su: string;
}

function TieuSuGiaDinh() {
    // Đường dẫn tư liệu về Quê hương Bác (Khu di tích Kim Liên)
    const duong_dan_que_huong = "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh";

    const danh_sach_gia_dinh: ThanhVien[] = [
    {
        vai_tro: "Thân sinh (Cha)",
        ho_ten: "Nguyễn Sinh Sắc",
        nam_sinh_nam_mat: "1862 – 1929",
        tieu_su: "Cụ Phó bảng Nguyễn Sinh Sắc (1862–1929), đỗ Phó bảng năm 1901, là một nhà nho cấp tiến, có tư tưởng thương dân và tinh thần yêu nước."
    },
    {
        vai_tro: "Thân mẫu (Mẹ)",
        ho_ten: "Hoàng Thị Loan",
        nam_sinh_nam_mat: "1868 – 1901",
        tieu_su: "Cụ Hoàng Thị Loan (1868–1901), người phụ nữ đảm đang, đức hạnh, chịu thương chịu khó, là tấm gương sáng về đức hy sinh."
    },
    {
        vai_tro: "Chị gái",
        ho_ten: "Nguyễn Thị Thanh (Bạch Liên)",
        nam_sinh_nam_mat: "1884 – 1954",
        tieu_su: "Bà Nguyễn Thị Thanh (1884–1954), người tham gia tích cực vào các phong trào yêu nước và bị thực dân Pháp bắt giam."
    },
    {
        vai_tro: "Anh trai",
        ho_ten: "Nguyễn Sinh Khiêm (Xuân Trường)",
        nam_sinh_nam_mat: "1888 – 1950",
        tieu_su: "Ông Nguyễn Sinh Khiêm (1888–1950), một nhà nho yêu nước, am hiểu Đông y và chữ Hán."
    },
    {
        vai_tro: "Em trai út",
        ho_ten: "Nguyễn Sinh Nhuận (Cậu Xin)",
        nam_sinh_nam_mat: "1900 – 1901",
        tieu_su: "Cậu Nguyễn Sinh Nhuận (1900–1901), người con út trong gia đình. Sau khi thân mẫu qua đời, cậu mất sớm do đau ốm và khát sữa mẹ."
    }
    ];

    return (
    <section className="py-10 px-4 max-w-7xl mx-auto w-full">
        
        <div className="bg-[#121212]/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-start">
        
        {/* Cột 1 (Bên trái): Tiêu đề mục và Nút Tìm hiểu thêm được tích hợp ở dưới */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6 flex flex-col justify-between h-full min-h-[280px]">
            <div>
                <div className="flex items-center gap-2 text-amber-500/90 mb-4">
                    <Home size={18} />
                    <span className="text-xs font-semibold tracking-widest uppercase">Quê hương & Gia đình</span>
                </div>

                <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                    Gia đình <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                        Chủ tịch Hồ Chí Minh
                    </span>
                </h2>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    Chủ tịch Hồ Chí Minh (tên khai sinh: Nguyễn Sinh Cung) sinh ngày 19/5/1890 tại làng Hoàng Trù (quê ngoại) và lớn lên ở làng Sen (quê nội), xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An. Người xuất thân trong một gia đình nhà Nho yêu nước, có ảnh hưởng sâu sắc đến tư tưởng cách mạng vĩ đại của dân tộc.
                </p>
            </div>

            {/* Khu vực nút bấm lấp đầy khoảng trống phía dưới của cột 1 */}
            <div className="pt-2">
                <motion.a
                    href={duong_dan_que_huong}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 font-medium px-4 py-2.5 rounded-xl shadow-md text-xs transition-all duration-300 group"
                >
                    Tìm hiểu thêm 
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform text-amber-500" />
                </motion.a>
            </div>
        </div>

        {/* Cột 2 (Bên phải): Danh sách các thành viên */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {danh_sach_gia_dinh.map((thanh_vien, chi_so) => (
            <motion.div
                key={chi_so}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: chi_so * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
                <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-medium text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {thanh_vien.vai_tro}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                        {thanh_vien.nam_sinh_nam_mat}
                    </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1.5">
                    {thanh_vien.ho_ten}
                </h3>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                    {thanh_vien.tieu_su}
                </p>
            </motion.div>
            ))}
        </div>

        </div>
    </section>
    );
}

export default TieuSuGiaDinh;