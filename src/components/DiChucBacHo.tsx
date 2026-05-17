import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

function DiChucBacHo() {
  const duong_dan_di_chuc = "https://vi.wikipedia.org/wiki/Di_ch%C3%BAc_H%E1%BB%93_Ch%C3%AD_Minh";
  const anh_tu_lieu_bac = "images/DichucHCM1969.gif";

  return (
    // Đổi max-w-full thành max-w-7xl để căn lề dọc chuẩn chỉnh với toàn trang web
    <section className="py-10 px-4 max-w-7xl mx-auto w-full">
      
      {/* md:grid-cols-2 giúp chia đôi không gian khi xem trên máy tính, không bị giãn bè ngang */}
      <div className="bg-[#121212]/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 items-center text-left">
        
        {/* Khối bên trái: Hình ảnh tư liệu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative group w-full h-[260px] sm:h-[340px] rounded-2xl overflow-hidden border border-amber-500/20 shadow-md"
        >
          <img 
            src={anh_tu_lieu_bac} 
            alt="Chủ tịch Hồ Chí Minh" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
        </motion.div>

        {/* Khối bên phải: Nội dung văn bản */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col space-y-4"
        >
          <div className="flex items-center gap-2 text-amber-500/90">
            <BookOpen size={18} />
            <span className="text-xs font-semibold tracking-widest uppercase">Tài liệu lịch sử</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Di chúc của{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Chủ tịch Hồ Chí Minh
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed opacity-90">
            Di chúc của Chủ tịch Hồ Chí Minh, hay còn gọi là Di chúc của Hồ Chủ Tịch hoặc Di chúc của Bác Hồ, là bản di chúc do Chủ tịch nước Việt Nam Dân chủ Cộng hòa Hồ Chí Minh lập, được công bố một phần sau khi Bác Hồ qua đời. Văn bản đầu tiên được viết trong 5 ngày kết thúc vào ngày 15 tháng 5 năm 1965, dài 3 trang có cả chữ ký người chứng kiến là Bí thư thứ nhất Lê Duẩn. Năm 1968, Người viết tay bổ sung thêm 6 trang. Trong đó, Hồ Chủ Tịch viết lại đoạn mở đầu, đoạn nói về việc riêng đã viết trong bản 1965 và thêm một số đoạn. Ngày 10 tháng 5 năm 1969, Người viết lại toàn bộ đoạn mở đầu di chúc gồm một trang viết tay.
          </p>

          <div className="pt-2">
            <motion.a
              href={duong_dan_di_chuc}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold px-5 py-3 rounded-full shadow-md text-sm transition-all duration-300 group"
            >
              Tìm hiểu thêm
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default DiChucBacHo;