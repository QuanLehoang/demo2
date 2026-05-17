import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import QuoteSection from './components/QuoteSection';
import DiChucBacHo from './components/DiChucBacHo'; 
// 1. Import thêm cấu trúc component Tiểu sử gia đình vào đây
import TieuSuGiaDinh from './components/TieuSuGiaDinh'; 
import Footer from './components/Footer';
import FallingPetals from './components/FallingPetals';
import MusicPlayer from './components/MusicPlayer';
import TheBai3D from './components/TheBai3D'; 

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-vn-red selection:text-white font-inter">
      <FallingPetals />
      <Header />

      <main>
        <Hero />
        <Timeline />
        <TieuSuGiaDinh />
        <Gallery />
        <DiChucBacHo />
        <QuoteSection />
        
        {/* 2. Đặt Di chúc và Tiểu sử gia đình xếp dọc ngay dưới Lời trích và trên Bảng tin */}
        
        

        <Guestbook />
        
        {/* Khu vực thẻ bài 3D được chuyển xuống dưới bảng tin yêu thương */}
        <section className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-900/50">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold font-vietnam text-vn-gold tracking-tight uppercase">
              Thành viên tham gia dự án
            </h2>
          </div>

          {/* Cấu trúc hiển thị danh sách các thẻ */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
            <TheBai3D 
              anhBia="images/Hoasen.jpg" 
              logoChu="Q"
              tieuDe="Lê Hoàng Quân"
              moTa="Deverloper"
              duongDan="https://www.facebook.com/quan.le.51371/"
            />

            <TheBai3D 
              anhBia="images/Hoatuylip.jpg" 
              logoChu="Đ"
              tieuDe="Phan Hữu Đăng"
              moTa="Designer"
              duongDan="https://www.facebook.com/profile.php?id=61587307526044"
            />
          </div>
        </section>
      </main>

      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;