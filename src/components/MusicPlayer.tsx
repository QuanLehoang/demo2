import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, SkipBack, SkipForward, Play, Pause, X } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const playlist: Track[] = [
  {
    title: "Như Có Bác Hồ Trong Ngày Vui Đại Thắng",
    artist: "Tốp ca",
    url: "audio/Nhucobachotrongngayvuidaithang.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Tiếng Hát Từ Thành Phố Mang Tên Người",
    artist: "NSND Tạ Minh Tâm",
    url: "audio/Tiếng Hát Từ Thành Phố Mang Tên Người.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Dấu Chân Phía Trước",
    artist: "NSND Trọng Tấn",
    url: "audio/Dấu Chân Phía Trước.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Bác Hồ Một Tình Yêu Bao La",
    artist: "NSND Thu Hiền",
    url: "audio/Bác Hồ Một Tình Yêu Bao La.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Người Về Thăm Quê",
    artist: "Phạm Phương Thảo",
    url: "audio/Người Về Thăm Quê.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Bác Đang Cùng Chúng Cháu Hành Quân",
    artist: "Tốp ca nam",
    url: "audio/Liên Khúc_ Bác Đang Cùng Cháu Hành Quân - Thanh Niên Làm Theo Lời Bác - Tuổi Trẻ Thế Hệ Bác Hồ.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Ca Ngợi Hồ Chủ Tịch",
    artist: "Hợp xướng",
    url: "audio/Ca Ngợi Hồ Chủ Tịch.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Tuổi Trẻ Thế Hệ Bác Hồ",
    artist: "Tốp ca trẻ",
    url: "audio/Tuổi Trẻ Thế Hệ Bác Hồ.mp3",
    cover: "images/dianhac1.png"
  },
  {
    title: "Ai Yêu Bác Hồ Chí Minh Hơn Thiếu Niên Nhi Đồng",
    artist: "Tốp ca nhi đồng",
    url: "audio/Ai_Yeu_Bac_Ho_Chi_Minh_Hon_Thieu_Nien_Nhi_Dong_-_Various_Artists_4f71d.mp3",
    cover: "images/dianhac1.png"
  }
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  // Thêm biến trạng thái để biết người dùng đã chủ động tương tác bật/tắt/chọn nhạc chưa
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = playlist[currentIndex];

  // Logic 1: Đồng bộ trạng thái chơi nhạc khi thay đổi nút bấm hoặc đổi bài
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentIndex, isPlaying]);

  // Logic 2: Tự động phát nhạc khi phát hiện tương tác đầu tiên của người dùng trên trang web
  useEffect(() => {
    // Nếu người dùng đã chủ động bấm nút điều khiển trên trình phát nhạc, tắt hẳn cơ chế autoplay này
    if (userInteracted) return;

    const tuDongPhatNhac = () => {
      if (audioRef.current && !isPlaying && !userInteracted) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setUserInteracted(true); // Đánh dấu đã tương tác thành công
            goBoSuKien();
          })
          .catch((loi) => {
            console.log("Trình duyệt chặn autoplay, chờ tương tác rõ ràng hơn:", loi);
          });
      }
    };

    const goBoSuKien = () => {
      window.removeEventListener('click', tuDongPhatNhac);
      window.removeEventListener('scroll', tuDongPhatNhac);
      window.removeEventListener('touchstart', tuDongPhatNhac);
      window.removeEventListener('keydown', tuDongPhatNhac);
    };

    window.addEventListener('click', tuDongPhatNhac);
    window.addEventListener('scroll', tuDongPhatNhac);
    window.addEventListener('touchstart', tuDongPhatNhac);
    window.addEventListener('keydown', tuDongPhatNhac);

    return () => goBoSuKien();
  }, [isPlaying, userInteracted]);

  const togglePlay = () => {
    setUserInteracted(true); // Đánh dấu người dùng đã chủ động can thiệp
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setUserInteracted(true);
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setUserInteracted(true);
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const selectTrack = (index: number) => {
    setUserInteracted(true);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
      />

      {/* Main Floating Button */}
      <div className="flex flex-col items-end gap-4">
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[70vh] sm:max-h-[500px]"
            >
              {/* Header / Player Info */}
              <div className="p-6 sm:p-8 pb-4 relative">
                <button 
                  onClick={() => setShowPlaylist(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 z-10"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-4 sm:gap-6">
                  <motion.div 
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-xl border-4 border-white shrink-0"
                  >
                    <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                  </motion.div>
                  
                  <div className="overflow-hidden pr-8 sm:pr-0">
                    <h3 className="text-gray-800 font-bold text-sm sm:text-lg truncate leading-tight">{currentTrack.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4 truncate">{currentTrack.artist}</p>
                    
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
                      <button onClick={prevTrack} className="hover:text-vn-red transition-colors">
                        <SkipBack size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                      </button>
                      <button 
                        onClick={togglePlay}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" fill="currentColor" /> : <Play size={16} className="sm:w-5 sm:h-5 ml-1" fill="currentColor" />}
                      </button>
                      <button onClick={nextTrack} className="hover:text-vn-red transition-colors">
                        <SkipForward size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playlist divider */}
              <div className="h-px bg-gray-50 mx-8" />

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar max-h-[300px] sm:max-h-none">
                {playlist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${currentIndex === index
                      ? 'bg-[#7a8da5] text-white shadow-lg'
                      : 'hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <p className={`font-bold text-xs sm:text-sm truncate ${currentIndex === index ? 'text-white' : 'text-gray-800'}`}>
                        {track.title}
                      </p>
                    </div>
                    {currentIndex === index && isPlaying && (
                      <div className="flex gap-0.5 h-3 items-end">
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white" />
                        <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white" />
                        <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isPlaying || showPlaylist
            ? 'bg-vn-red shadow-[0_0_20px_rgba(218,37,29,0.6)]'
            : 'bg-white/20 backdrop-blur-md border border-white/30'
            }`}
        >
          {isPlaying && !showPlaylist ? (
            <div className="relative">
              <Volume2 className="text-white w-6 h-6" />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="absolute inset-0 bg-white rounded-full"
              />
            </div>
          ) : (
            showPlaylist ? <X className="text-white w-6 h-6" /> : <Music className="text-white w-6 h-6" />
          )}
        </motion.button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06090cff;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0a0d13ff;
        }
      `}</style>
    </div>
  );
}

export default MusicPlayer;