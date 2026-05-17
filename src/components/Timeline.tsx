import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Anchor, Home, Flag, Star } from 'lucide-react';

const milestones = [
  {
    year: '1890',
    title: 'Năm sinh',
    desc: 'Ngày 19/05/1890, Bác sinh ra tại làng Hoàng Trù, quê nội ở làng Sen, Nam Đàn, Nghệ An.',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    year: '1911',
    title: 'Bến Nhà Rồng',
    desc: 'Ngày 05/06/1911, Bác lên tàu Amiral Latouche-Tréville rời Bến Nhà Rồng ra đi tìm đường cứu nước.',
    icon: <Anchor className="w-6 h-6" />,
  },
  {
    year: '1941',
    title: 'Trở về Pác Bó',
    desc: 'Bác trở về nước sau 30 năm bôn ba, trực tiếp lãnh đạo phong trào cách mạng Việt Nam.',
    icon: <Home className="w-6 h-6" />,
  },
  {
    year: '1945',
    title: 'Tuyên ngôn Độc lập',
    desc: 'Ngày 02/09/1945, tại Quảng trường Ba Đình, Bác đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    icon: <Flag className="w-6 h-6" />,
  },
  {
    year: '1969',
    title: 'Bác đi xa',
    desc: 'Ngày 02/09/1969, Bác qua đời, để lại muôn vàn tình thân yêu cho toàn Đảng, toàn dân.',
    icon: <Star className="w-6 h-6" />,
  },
];

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-vn-gold font-dancing text-4xl mb-2">Hành trình vĩ đại</h3>
          <h2 className="text-3xl md:text-5xl font-vietnam font-bold text-white uppercase tracking-tight">Dòng thời gian cuộc đời</h2>
          <div className="w-24 h-1 bg-vn-red mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative border-l-2 border-white/10 md:border-l-0 md:flex md:justify-between md:items-start md:before:absolute md:before:top-12 md:before:left-0 md:before:w-full md:before:h-0.5 md:before:bg-white/10">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-0 md:pt-24 md:w-1/5 mb-12 md:mb-0 group"
            >
              {/* Dot/Icon */}
              <div className="absolute left-[-13px] top-0 md:left-1/2 md:-translate-x-1/2 md:top-8 w-6 h-6 rounded-full bg-vn-red border-4 border-[#0a0a0a] z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(218,37,29,0.5)]" />

              <div className="md:text-center">
                <span className="inline-block px-3 py-1 bg-vn-gold/10 text-vn-gold font-vietnam font-bold text-lg rounded-md mb-2">
                  {item.year}
                </span>
                <div className="flex items-center md:justify-center gap-2 mb-3">
                  <span className="text-white/40">{item.icon}</span>
                  <h4 className="text-xl font-vietnam font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-white/60 font-inter text-sm leading-relaxed max-w-xs md:mx-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
