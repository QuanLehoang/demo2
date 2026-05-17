import { useState, useRef } from 'react';

// Định nghĩa khuôn mẫu dữ liệu nhận từ App.tsx truyền sang
interface TheBai3DProps {
  anhBia: string;
  logoChu: string;
  tieuDe: string;
  moTa: string;
  duongDan: string;
}

function TheBai3D({ anhBia, logoChu, tieuDe, moTa, duongDan }: TheBai3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const theRef = useRef<HTMLDivElement>(null);

  // 1. Xử lý di chuột trên Máy tính
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!theRef.current) return;
    const khoi_the = theRef.current.getBoundingClientRect();
    
    const tam_x = e.clientX - khoi_the.left - khoi_the.width / 2;
    const tam_y = e.clientY - khoi_the.top - khoi_the.height / 2;
    
    setRotateX(-tam_y / 12); // Chia 12 để độ nghiêng vừa phải, mượt mà
    setRotateY(tam_x / 12);
  };

  // 2. Xử lý vuốt ngón tay trên Điện thoại
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!theRef.current || e.touches.length === 0) return;
    const khoi_the = theRef.current.getBoundingClientRect();
    
    const ngon_tay = e.touches[0];
    const tam_x = ngon_tay.clientX - khoi_the.left - khoi_the.width / 2;
    const tam_y = ngon_tay.clientY - khoi_the.top - khoi_the.height / 2;
    
    setRotateX(-tam_y / 12);
    setRotateY(tam_x / 12);
  };

  // 3. Trả về vị trí cân bằng khi rời chuột hoặc buông tay
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      style={{ perspective: "1000px" }}
      className="flex items-center justify-center bg-transparent"
    >
      <div
        ref={theRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d"
        }}
        className="w-[280px] h-[380px] md:w-[300px] md:h-[400px] rounded-[2rem] bg-[#121212] border border-gray-800/60 shadow-2xl overflow-hidden relative group transition-all duration-100 ease-out select-none touch-none"
      >
        {/* Lớp ảnh bìa (Ảnh nền nhận từ App.tsx) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={anhBia} 
            alt={tieuDe} 
            draggable="false"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Nội dung thông tin hiển thị trên thẻ bài */}
        <div 
          style={{ transform: "translateZ(50px)" }} // Đẩy chữ nổi lên không gian 3D
          className="absolute inset-0 flex flex-col justify-end p-6 text-center z-10 pointer-events-none"
        >
          {/* Vòng tròn Logo chữ cái đại diện */}
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl font-bold text-vn-gold mx-auto mb-3 shadow-lg">
            {logoChu}
          </div>

          <h3 className="text-xl font-bold text-white tracking-wide font-vietnam">
            {tieuDe}
          </h3>
          <p className="text-gray-400 text-xs uppercase tracking-widest mt-1 font-inter">
            {moTa}
          </p>

          {/* Nút bấm liên kết Facebook */}
          <a 
            href={duongDan}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-white text-black font-semibold text-xs py-2.5 px-5 rounded-full hover:bg-vn-gold hover:text-black transition-colors duration-300 pointer-events-auto shadow-md"
          >
            Thông Tin
          </a>
        </div>
      </div>
    </div>
  );
}

export default TheBai3D;