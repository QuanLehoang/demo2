import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  location: string;
  content: string;
  date: string;
}

// Đường dẫn URL API lấy chính xác từ phiên triển khai Google Apps Script của bạn
const DUONG_DAN_API = "https://script.google.com/macros/s/AKfycbxaxbxT26TZamAPaQI0_176lo4sAy1NFrCHPUXSTE80AfZ5roAWTR4x5I9cA1uVO_Uq/exec";

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [dangTai, setDangTai] = useState(true);
  const [dangGui, setDangGui] = useState(false);

  // Hàm tải danh sách bình luận từ máy chủ mạng về trang web
  const taiBinhLuan = async () => {
    try {
      const phanHoi = await fetch(DUONG_DAN_API);
      if (phanHoi.ok) {
        const duLieu = await phanHoi.json();
        setMessages(duLieu);
      }
    } catch (loi) {
      console.error("Lỗi khi kết nối máy chủ dữ liệu lời chúc:", loi);
    } finally {
      setDangTai(false);
    }
  };

  // Tự động tải dữ liệu ngay khi người dùng truy cập trang web
  useEffect(() => {
    taiBinhLuan();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || dangGui) return;

    setDangGui(true);

    const tinNhanMoi: Message = {
  id: Date.now().toString(),
  name: name.trim(),
  location: location.trim() || 'Thành viên ẩn danh',
  content: content.trim(),
  date: new Date().toLocaleDateString('vi-VN'),
};

    try {
      // Gửi dữ liệu lời chúc lên máy chủ đám mây Google Sheets
      await fetch(DUONG_DAN_API, {
        method: 'POST',
        mode: 'no-cors', // Dùng chế độ no-cors để đảm bảo tương thích thông suốt với Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tinNhanMoi),
      });

      // Cập nhật ngay lập tức giao diện client để tạo cảm giác mượt mà không độ trễ
      setMessages((cacTinNhanCu) => [tinNhanMoi, ...cacTinNhanCu]);

      // Làm sạch các ô nhập dữ liệu sau khi gửi thành công
      setName('');
      setLocation('');
      setContent('');
      
      // Đồng bộ lại danh sách từ server về sau 1.5 giây để đảm bảo nhất quán dữ liệu
      setTimeout(taiBinhLuan, 1500);
    } catch (loi) {
      console.error("Lỗi trong quá trình gửi tấm lòng lên hệ thống:", loi);
      alert("Đường truyền mạng gặp sự cố, vui lòng thử lại sau ít phút.");
    } finally {
      setDangGui(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-vn-red/10 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-lotus-pink/10 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lotus-pink font-dancing text-4xl mb-2"
          >
            Chúng cháu dâng lên Bác...
          </motion.h3>
          <h2 className="text-3xl md:text-5xl font-vietnam font-bold text-white uppercase">Bảng tin yêu thương</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-12 border-vn-red/30 bg-white/5 backdrop-blur-md rounded-2xl border"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vn-red transition-all"
                required
                disabled={dangGui}
              />
              <input
                type="text"
                placeholder="Địa phương (VD: Nghệ An)..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vn-red transition-all"
                disabled={dangGui}
              />
            </div>
            <textarea
              placeholder="Lời chúc, tấm lòng dâng lên Bác..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-vn-red transition-all resize-none"
              required
              disabled={dangGui}
            />
            <button
              type="submit"
              disabled={dangGui}
              className="w-full bg-vn-red hover:bg-red-600 disabled:bg-gray-700 text-white font-vietnam font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {dangGui ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang gửi những lời chúc tốt đẹp nhất đến Bác...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gửi tấm lòng của em
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Lotus cards display */}
        {dangTai ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-8 h-8 text-vn-gold animate-spin" />
            <p className="text-gray-400 text-sm font-inter">Đang gửi những lời chúc đến Bác...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-pink-50/10 to-pink-200/5 border border-pink-200/20 relative group hover:shadow-[0_10px_30px_rgba(253,202,210,0.1)] transition-all"
                >
                  <div className="absolute top-4 right-4 text-lotus-pink/30 group-hover:text-lotus-pink/60 transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-vn-red/20 flex items-center justify-center text-vn-red font-bold">
                      {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{msg.name}</h4>
                      <p className="text-white/40 text-xs">{msg.location}</p>
                    </div>
                  </div>
                  <p className="text-white/80 font-lora text-sm italic line-clamp-4 leading-relaxed">
                    "{msg.content}"
                  </p>
                  <p className="mt-4 text-[10px] text-white/30 font-vietnam uppercase tracking-tighter">
                    {msg.date}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;