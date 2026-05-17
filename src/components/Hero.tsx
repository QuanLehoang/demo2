import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const nam_hien_tai = new Date().getFullYear();
  const so_nam_da_qua = nam_hien_tai - 1890;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video với Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="video/HoChiMinh.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ xem video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/70" />
      </div>

      {/* Nội dung chính */}
      <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-vn-gold/60 text-vn-gold text-[10px] sm:text-xs md:text-base font-vietnam font-bold uppercase tracking-widest bg-vn-red/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            Kỷ niệm {so_nam_da_qua} năm (1890 - {nam_hien_tai})
          </span>
        </motion.div>

        {/* CẤU TRÚC TIÊU ĐỀ: Đã chỉnh mt đồng bộ đối xứng */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center justify-center select-none"
        >
          {/* HÀNG 1: KỶ NIỆM 136 NĂM */}
          <span className="text-xl sm:text-3xl md:text-6xl lg:text-7xl font-vietnam font-black text-white uppercase tracking-tight whitespace-nowrap drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            KỶ NIỆM {so_nam_da_qua} NĂM
          </span>
          
          {/* HÀNG 2: CHỦ TỊCH HỒ CHÍ MINH (Sửa dùng màu thuần text-vn-gold, loại bỏ hoàn toàn lỗi mất dấu chữ HỒ) */}
          <span className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-sans font-black text-vn-gold whitespace-nowrap tracking-normal uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] px-2 mt-2 md:mt-4">
            CHỦ TỊCH HỒ CHÍ MINH
          </span>

          {/* HÀNG 3: NGÀY SINH */}
          <span className="text-xs sm:text-xl md:text-3xl lg:text-4xl font-sans font-bold text-vn-gold/90 whitespace-nowrap tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2 md:mt-4">
            (19/5/1890 – 19/5/2026)
          </span>
        </motion.h2>

        {/* Đoạn thơ trích dẫn */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 md:mt-10 text-white/90 font-lora text-sm sm:text-lg md:text-2xl italic max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] px-2"
        >
          "Người là niềm tin tất thắng sáng ngời, <br className="hidden md:block" />
          là vì sao lung linh giữa bầu trời Việt Nam."
        </motion.p>

        {/* Nút hành động */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 md:mt-14"
        >
          <a
            href="#timeline"
            className="px-6 py-2.5 md:px-10 md:py-4 bg-vn-red hover:bg-red-600 text-white rounded-full font-vietnam font-extrabold text-xs md:text-base tracking-wider uppercase transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(218,37,29,0.6)] flex items-center gap-2 md:gap-3 mx-auto w-fit"
          >
            Tìm hiểu về Bác
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
};

export default Hero;