import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  LucideMenu, LucideX, LucideArrowRight, 
  LucideInstagram, LucideMail, LucideMapPin, 
  LucideChevronDown, LucideArrowUpRight,
  LucideChevronRight, LucideLayoutGrid,
  LucideArrowLeft, LucideExternalLink 
} from 'lucide-react';

// --- Theme & Config ---
const COLORS = {
  midnight: "#0A0E14", 
  gold: "#C5A059",     
};

const IMAGES = {
  logo: "https://files.usercontent.google.com/content/uploaded:Gemini_Generated_Image_fm5x58fm5x58fm5x.png-389f8299-ef03-4b2d-9252-de15491c7a1a",
  hero: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2400", 
  philosophy: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600",
  concept1: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200", 
  concept2: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", 
  concept3: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=1200", 
};

// --- Animations ---
const breatheFade = {
  hidden: { opacity: 0, filter: "blur(12px)", letterSpacing: "0.2em" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    letterSpacing: "0.35em",
    transition: { duration: 2.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
};

const slideIn = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: "100%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// --- Project Data ---
const PROJECTS = [
  {
    id: "p1",
    category: "Residential",
    title: "静寂を纏う週末の家",
    location: "Nagano, Japan",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    description: "深い森に溶け込む、コンクリートと木材の対話。外部からの視線を遮りつつ、光と影の移ろいだけを室内に招き入れる設計。"
  },
  {
    id: "p2",
    category: "Store Design",
    title: "刻を忘れるコンセプトストア",
    location: "Tokyo, Japan",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1200",
    description: "ブランドの哲学を空間で表現。素材の質感を強調したミニマルな構成が、プロダクトの品格を際立たせます。"
  },
  {
    id: "p3",
    category: "Residential",
    title: "境界を溶かす都市の邸宅",
    location: "Osaka, Japan",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    description: "限られた敷地の中で、中庭を中心とした開放的な動線を実現。プライバシーと解放感が高次元で共存します。"
  },
  {
    id: "p4",
    category: "Store Design",
    title: "志を繋ぐプライベートラウンジ",
    location: "Osaka, Japan",
    img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200", 
    description: "「静」と「余白」を追求したビジネスラウンジ。装飾を削ぎ落とした空間が、思考の純度を高めます。"
  }
];

// --- Custom Components ---

const BrandLogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-14 md:h-14">
    <path d="M70 25C65 20 58 17 50 17C31.7777 17 17 31.7777 17 50C17 68.2223 31.7777 83 50 83C58 83 65 80 70 75" stroke="#C5A059" strokeWidth="2" strokeLinecap="square" />
    <path d="M50 17H75C80 17 83 22 83 27V73C83 78 80 83 75 83H50" stroke="#C5A059" strokeWidth="2" />
    <line x1="50" y1="35" x2="50" y2="65" stroke="#C5A059" strokeWidth="1" opacity="0.3" />
  </svg>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-matter.png')` }} />
);

const SectionTitle = ({ subtitle, title }) => (
  <div className="mb-12 md:mb-20 text-left w-full max-w-4xl">
    <motion.p 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 0.7, x: 0 }}
      className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] text-[#C5A059] mb-4"
    >
      {subtitle}
    </motion.p>
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[1.1] break-keep"
    >
      {title}
    </motion.h2>
  </div>
);

const TactileButton = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative overflow-hidden px-8 md:px-10 py-4 md:py-5 border border-[#C5A059]/40 group bg-[#0A0E14]/60 backdrop-blur-md ${className}`}
  >
    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent pointer-events-none" />
    <span className="relative z-10 text-[9px] md:text-[10px] font-black tracking-[0.5em] uppercase text-[#C5A059] group-hover:text-white transition-colors duration-500">
      {children}
    </span>
  </motion.button>
);

const FlowingScrollIndicator = () => (
  <div className="fixed right-1.5 md:right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-10 mix-blend-difference pointer-events-none">
    <motion.div 
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 2.2, duration: 1.5 }}
      className="relative h-32 md:h-64 w-[1px] bg-white/10 overflow-hidden"
    >
      <motion.div 
        animate={{ y: ["-100%", "400%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent shadow-[0_0_15px_#C5A059]"
      />
    </motion.div>
    <span className="text-[7px] font-black uppercase tracking-[0.6em] transform rotate-90 origin-center whitespace-nowrap text-white/20">
      Explore
    </span>
  </div>
);

const DetailView = ({ item, onClose, type = "concept" }) => (
  <motion.div 
    variants={slideIn} initial="hidden" animate="visible" exit="exit"
    className="fixed inset-0 z-[60] bg-[#0A0E14] overflow-y-auto"
  >
    <div className="min-h-screen flex flex-col">
      <nav className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0A0E14]/95 backdrop-blur-md z-10 text-left">
        <button onClick={onClose} className="flex items-center gap-4 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A059] hover:text-white transition-colors">
          <LucideArrowLeft size={16} /> Back
        </button>
        <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
          {type === "concept" ? item.eng : item.category}
        </span>
      </nav>

      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 text-left">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white uppercase break-words">{item.title}</h2>
            <p className="text-lg md:text-xl font-bold leading-relaxed text-[#C5A059]">
              {type === "concept" ? item.detailCatch : item.location}
            </p>
          </div>
          <div className="space-y-6 text-white/60 text-base md:text-lg leading-relaxed font-medium break-keep">
            {type === "concept" ? (
              item.fullText.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{item.description}</p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden border border-white/5 shadow-2xl">
            <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-[#C5A059] p-8 md:p-12 text-[#0A0E14]">
            <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none italic uppercase">
              {type === "concept" ? `0${item.id}` : "View"}
            </span>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto py-16 md:py-24 px-6 border-t border-white/5 text-left">
        <div className="max-w-screen-xl mx-auto">
          <SectionTitle subtitle="Inquiry" title="理想を、確かな形に。" />
          <TactileButton onClick={() => { onClose(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>
            Consultation Request
          </TactileButton>
        </div>
      </footer>
    </div>
  </motion.div>
);

// --- Main Application ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailType, setDetailType] = useState("concept");

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.12]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const concepts = [
    { 
      id: 1,
      img: IMAGES.concept1, 
      title: "静寂と光", 
      eng: "Silence", 
      desc: "光を設計することは、影を設計すること。陰影が空間に深い思索をもたらします。",
      detailCatch: "影が主役となる、精神の安息所。",
      fullText: [
        "CASA DESIGN STUDIOが考える「光」とは、単に明るさを確保するためのものではありません。私たちは、空間に落ちる「影」をデザインすることから始めます。",
        "住宅では安らぎを、店舗では劇的な高揚を。時間と共に刻々と変化する自然の移ろいを、建築というフィルターを通して取り込みます。"
      ]
    },
    { 
      id: 2,
      img: IMAGES.concept2, 
      title: "素材の真実", 
      eng: "Material", 
      desc: "嘘のない本物の素材だけが持つ重厚感と、経年変化による愛着を約束します。",
      detailCatch: "時間を味方につける、素材選びの美学。",
      fullText: [
        "流行を追うのではなく、10年後、20年後にさらに美しくなる素材を厳選します。石、木、鉄。それぞれの質感を最大限に引き出すディテール設計。",
        "店舗設計においては、ブランドの品格を物語るための「触覚的な信頼」を素材によって構築します。"
      ]
    },
    { 
      id: 3,
      img: IMAGES.concept3, 
      title: "自然との調和", 
      eng: "Harmony", 
      desc: "内と外の境界を曖昧にし、季節の移ろいを空間の一部として取り込みます。",
      detailCatch: "境界線を溶かし、自然の呼吸と同期する。",
      fullText: [
        "建築は土地の一部であるべきだと考えます。光や風の通り道を読み解き、自然と一体化する暮らしを提案します。",
        "中庭を通して移り変わる四季を愉しむ。それは都市生活における最大の贅沢です。"
      ]
    }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=大阪府大阪市西区江之子島1-7-3', '_blank');
  };

  return (
    <div className="bg-[#0A0E14] text-white font-sans selection:bg-[#C5A059] selection:text-[#0A0E14] overflow-x-hidden">
      <GrainOverlay />
      
      {/* 1. Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 md:py-10 flex justify-between items-center transition-all bg-gradient-to-b from-[#0A0E14]/90 to-transparent backdrop-blur-[1px]">
        <motion.div 
          variants={breatheFade} initial="hidden" animate="visible"
          className="flex items-center gap-4 cursor-pointer group text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="shrink-0 flex items-center justify-center p-1 bg-[#0A0E14]/40 rounded-sm border border-[#C5A059]/20">
            <BrandLogo />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] md:text-2xl font-black uppercase leading-tight group-hover:text-[#C5A059] transition-all text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
              CASA DESIGN STUDIO
            </span>
            <span className="text-[7px] font-bold tracking-[0.5em] uppercase mt-1 text-[#C5A059]/80 drop-shadow-sm">
              Architecture & Space Design
            </span>
          </div>
        </motion.div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border border-[#C5A059]/20 rounded-full hover:border-[#C5A059] transition-all group bg-[#0A0E14]/60 backdrop-blur-md shadow-lg"
        >
          <div className="flex flex-col gap-1.5 items-end">
            <span className={`h-px bg-[#C5A059] transition-all ${isMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-5 md:w-7'}`} />
            <span className={`h-px bg-[#C5A059] transition-all ${isMenuOpen ? 'opacity-0' : 'w-3 md:w-4'}`} />
            <span className={`h-px bg-[#C5A059] transition-all ${isMenuOpen ? 'w-6 -translate-y-2.5 -rotate-45' : 'w-4 md:w-5'}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0E14]/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 md:p-12"
          >
            <div className="flex flex-col gap-8 md:gap-12 text-center">
              {[
                { name: 'Philosophy', id: 'philosophy' },
                { name: 'Concept', id: 'concept' },
                { name: 'Archives', id: 'archives' },
                { name: 'Contact', id: 'contact' },
              ].map((link, i) => (
                <motion.button
                  key={link.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-4xl md:text-7xl font-black tracking-tighter hover:text-[#C5A059] transition-colors relative group uppercase"
                >
                  <span className="absolute -left-10 md:-left-16 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.4em] opacity-0 group-hover:opacity-40 transition-all">0{i+1}</span>
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FlowingScrollIndicator />

      <AnimatePresence>
        {selectedItem && (
          <DetailView item={selectedItem} onClose={() => setSelectedItem(null)} type={detailType} />
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black text-center overflow-hidden px-6">
        <motion.div style={{ scale: heroScale, filter: `blur(${heroBlur}px)` }} className="absolute inset-0">
          <img src={IMAGES.hero} className="w-full h-full object-cover opacity-60" alt="Hero Architecture" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0E14]/30 to-[#0A0E14]" />
        </motion.div>
        
        <motion.div style={{ opacity: heroTextOpacity }} className="relative z-10 w-full max-w-full overflow-hidden">
          <motion.div
            variants={breatheFade} initial="hidden" animate="visible"
            className="flex flex-col items-center"
          >
            <h1 className="text-[10px] sm:text-[11px] md:text-xs font-black uppercase text-[#C5A059] mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] whitespace-nowrap" style={{ letterSpacing: '0.45em' }}>
              Aesthetics of Silence
            </h1>
            <div className="w-[1px] h-20 md:h-24 bg-gradient-to-b from-[#C5A059] to-transparent mb-12 shadow-[0_0_15px_rgba(197,160,89,0.7)]" />
          </motion.div>
          
          <div className="overflow-hidden flex flex-col items-center">
            <motion.p
              initial={{ y: "130%", opacity: 0 }}
              animate={{ y: isLoaded ? 0 : "130%", opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[8.5px] sm:text-[9.5px] md:text-[11px] font-medium tracking-[0.3em] sm:tracking-[0.4em] text-white/20 italic leading-relaxed uppercase max-w-[85vw] mx-auto break-keep"
            >
              Defining life through <br className="md:hidden" /> the frame of architecture.
            </motion.p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, delay: 2.4 }} className="w-16 md:w-24 h-[1px] bg-white/5 mt-10" />
          </div>
        </motion.div>
      </section>

      {/* 3. Philosophy */}
      <section id="philosophy" className="relative py-32 md:py-56 px-6 md:px-12 lg:px-24 overflow-hidden text-left">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          <div className="lg:col-span-7 relative order-2 lg:order-1 w-full">
            <motion.div initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 2.5 }} className="aspect-[16/10] overflow-hidden rounded-sm border border-white/5 shadow-2xl">
              <img src={IMAGES.philosophy} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1500" alt="Philosophy Space" />
            </motion.div>
          </div>
          <div className="lg:col-span-5 z-10 order-1 lg:order-2">
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" className="space-y-10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black tracking-[0.6em] text-[#C5A059] uppercase">Philosophy</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white break-keep">
                  想いを、確かな<br className="hidden md:block" />
                  空間へと昇華させる。
                </h2>
              </div>
              <div className="space-y-6 text-base md:text-lg font-medium text-white/60 leading-relaxed max-w-xl break-keep">
                <p>
                  設計とは、単なる図面の作成ではありません。<br className="hidden md:block" />
                  それは、住まう人の静謐な日常、あるいは商う人の研ぎ澄まされた志を、<br className="hidden md:block" />
                  一つの「背景」として確立すること。
                </p>
                <p>
                  住宅設計から商空間デザインまで。言葉にできない微細なこだわりを、<br className="hidden md:block" />
                  マテリアルと光、そして豊かな余白によって、唯一無二の形へと導きます。
                </p>
              </div>
              <TactileButton onClick={() => scrollTo('archives')}>Explore Works</TactileButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Concepts */}
      <section id="concept" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-white/[0.01] text-left">
        <div className="max-w-screen-2xl mx-auto">
          <SectionTitle subtitle="Core Values" title="世界観を構成する三柱。" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {concepts.map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 }}
                onClick={() => { setDetailType("concept"); setSelectedItem(item); }}
                className="bg-[#0A0E14] p-8 sm:p-12 md:p-16 lg:p-20 group relative overflow-hidden cursor-pointer min-h-[480px] sm:min-h-[500px]"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 scale-105 group-hover:scale-100 transition-transform">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="relative z-10 h-full flex flex-col items-start">
                  <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[#C5A059] mb-8">{item.eng}</span>
                  <h3 className="text-2xl md:text-3xl font-black mb-10 tracking-tighter text-white break-keep">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium mb-12 md:mb-16 w-full max-w-full lg:max-w-[320px] break-keep">
                    {item.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-[9px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all text-white">
                    Read Story <LucideArrowRight size={14} />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-[#C5A059] w-0 group-hover:w-full transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Portfolio: 見切れと改行の修正 */}
      <section id="archives" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 text-left">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
            <SectionTitle subtitle="Portfolio" title="Selected Works." />
            <motion.button whileHover={{ x: 10 }} className="flex items-center gap-4 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A059] mb-4">
              Follow Instagram <LucideInstagram size={18} />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PROJECTS.map((proj, i) => (
              <motion.div 
                key={i} whileHover={{ y: -10 }} 
                onClick={() => { setDetailType("portfolio"); setSelectedItem(proj); }}
                className="aspect-square bg-[#0A0E14] relative group overflow-hidden rounded-sm cursor-pointer shadow-xl border border-white/5"
              >
                <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                  <img src={proj.img} className="w-full h-full object-cover" alt={proj.title} />
                </div>
                {/* 修正：paddingの最適化とテキストの幅制限を解除 */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent text-left overflow-hidden">
                  <span className="text-[8px] font-black tracking-[0.4em] text-[#C5A059] mb-3 uppercase opacity-90 block">
                    {proj.category}
                  </span>
                  <p className="text-sm sm:text-base font-black tracking-tighter uppercase text-white break-keep leading-tight w-full">
                    {proj.title}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[8px] font-bold tracking-widest text-white/40 uppercase opacity-0 group-hover:opacity-100 transition-all">
                    Details <LucideArrowRight size={10} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact: ADDRESSとMAILの被り解消 */}
      <section id="contact" className="py-32 md:py-56 px-6 md:px-12 lg:px-24 bg-[#0A0E14] relative overflow-hidden text-left">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none text-[35vw] font-black flex items-center justify-center select-none uppercase tracking-tighter">Studio</div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 relative z-10">
          <div className="space-y-16">
            <div className="space-y-8">
              <span className="text-[10px] font-black tracking-[0.6em] text-[#C5A059] uppercase">Consultation</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-white uppercase drop-shadow-lg">CONTACT.</h2>
              <p className="text-xl md:text-2xl font-bold leading-tight text-white/80 max-w-lg break-keep">
                妥協のない美意識を形にするために。<br className="hidden md:block"/>
                住宅から店舗まで、人生の背景を共に創る、<br className="hidden md:block" />
                濃密なプライベートセッション。
              </p>
            </div>
            
            {/* 修正：gapを広げ、モバイルでの配置を最適化 */}
            <div className="flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:gap-16 font-bold pt-12 md:pt-16 border-t border-white/10 text-white">
              <div className="flex gap-6 items-start group">
                <button 
                  onClick={handleMapClick}
                  className="shrink-0 w-10 h-10 border border-[#C5A059]/30 rounded-full flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all duration-500 shadow-lg"
                >
                  <LucideMapPin size={18} className="text-[#C5A059] group-hover:text-[#0A0E14] transition-colors" />
                </button>
                <div className="cursor-pointer" onClick={handleMapClick}>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059] mb-2 flex items-center gap-2 group-hover:text-white transition-colors">
                    Address <LucideExternalLink size={10} className="opacity-40" />
                  </p>
                  <p className="text-base font-medium leading-relaxed break-keep">大阪府大阪市西区<br />江之子島1-7-3</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="shrink-0 w-10 h-10 border border-[#C5A059]/30 rounded-full flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all duration-500 shadow-lg">
                  <LucideMail size={18} className="text-[#C5A059] group-hover:text-[#0A0E14] transition-colors" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C5A059] mb-2">Mail</p>
                  <p className="text-base font-black tracking-widest uppercase break-all">studio@casa-design.jp</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 md:p-16 shadow-2xl relative rounded-sm text-left">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059]" />
            <h3 className="text-xl md:text-2xl font-black mb-12 tracking-tighter uppercase text-white">Request a Private Session</h3>
            <form className="space-y-12 md:space-y-16" onSubmit={(e) => e.preventDefault()}>
              <div className="group space-y-3 text-left">
                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Your Identity</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#C5A059] outline-none transition-all placeholder:text-white/10 text-white font-medium font-sans" placeholder="お名前 / 企業名" />
              </div>
              <div className="group space-y-3 text-left">
                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Core Aesthetics</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-5 focus:border-[#C5A059] outline-none transition-all resize-none placeholder:text-white/10 text-white font-medium break-keep font-sans" placeholder="理想の空間、譲れない美学、ビジネスの志を教えてください"></textarea>
              </div>
              <motion.button whileHover={{ scale: 1.02, backgroundColor: "#C5A059", color: "#0A0E14" }} whileTap={{ scale: 0.98 }} className="w-full border border-[#C5A059] text-[#C5A059] py-6 md:py-7 text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                Book Your Consultation
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-16 md:py-24 bg-[#0A0E14] border-t border-white/5 px-6 md:px-12 lg:px-24 text-left">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-sm overflow-hidden bg-white/10">
                <BrandLogo />
              </div>
              <p className="text-lg md:text-xl font-black tracking-[0.3em] uppercase text-white">CASA DESIGN STUDIO</p>
            </div>
            <p className="text-[7px] md:text-[8px] font-bold text-[#C5A059] uppercase tracking-[0.6em] mt-4 italic text-center md:text-left break-keep">Precision Architecture for High-End Living & Business</p>
          </div>
          <div className="flex gap-12 md:gap-16 text-[9px] md:text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <span>© 2026 CASA DESIGN STUDIO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
