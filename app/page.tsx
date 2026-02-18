"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  ArrowRight,
  MoveRight,
} from "lucide-react";
import Lenis from "lenis";

import "swiper/css";
import "swiper/css/effect-fade";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Página Inicial", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Produtos", href: "/produtos" },
    { name: "Blog", href: "/blog" },
    { name: "Contato", href: "/contato" },
  ];

  const slides = [
    {
      title: "Mel Artesanal",
      subtitle: "Da Serra da Mantiqueira",
      description: "Produzido com amor e consciência pela natureza",
      cta: "Descobrir",
      ctaLink: "/produtos",
    },
    {
      title: "Apicultura Consciente",
      subtitle: "Manejo Sustentável",
      description: "Respeitando o ciclo natural das abelhas",
      cta: "Nossa História",
      ctaLink: "/quem-somos",
    },
    {
      title: "Pureza em Cada Gota",
      subtitle: "100% Natural & Orgânico",
      description: "Qualidade garantida desde a colmeia até você",
      cta: "Explorar",
      ctaLink: "/blog",
    },
  ];

  return (
    <div className="min-h-screen bg-clr2">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-clr2/60 backdrop-blur-xl shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-450 mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="relative z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/logo1.png"
                  alt="Apiário Mantikeira"
                  width={400}
                  height={70}
                  className="lg:h-60 h-20 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative font-normal transition-colors duration-300 text-sm tracking-wide uppercase ${
                      scrolled ? "text-clr1" : "text-white"
                    }`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-clr1 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://www.instagram.com/apiariomantikeira.mel/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="p-2.5 rounded-full bg-clr1 text-clr2 hover:bg-clr3 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-clr1 relative z-50"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </motion.button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-clr2 border-t border-clr1/10"
          >
            <div className="px-6 pt-4 pb-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-clr1 hover:bg-clr1/5 rounded-lg font-medium transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* HERO SLIDER */}
      <div className="h-screen relative overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1500}
          className="h-full w-full"
          fadeEffect={{ crossFade: true }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-clr1 via-clr1/95 to-clr1/85" />

              <div className="absolute inset-0 opacity-5">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-clr4"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-clr3"
                />
              </div>

              <div className="relative h-full max-w-450 mx-auto px-6 lg:px-12 flex items-center">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-block mb-4 px-4 py-2 rounded-full border border-clr4/30 backdrop-blur-sm">
                      <span className="text-clr4 text-sm font-medium tracking-widest uppercase">
                        {slide.subtitle}
                      </span>
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-clr2 mb-6 leading-[0.95] tracking-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl text-clr2/80 mb-10 leading-relaxed font-light"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="group inline-flex items-center gap-3 bg-clr4 text-clr1 px-10 py-5 rounded-full font-semibold text-lg hover:bg-clr3 transition-all duration-500 shadow-2xl hover:shadow-clr4/50"
                    >
                      {slide.cta}
                      <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 right-12 hidden lg:block"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Image
                    src={`/images/icone${(index % 8) + 1}.png`}
                    alt=""
                    width={120}
                    height={120}
                  />
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <main>
        <FeaturesSection />
        <AboutSection />
        <ValuesSection />
        <CTASection />
      </main>

      <Footer navItems={navItems} />
    </div>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: 1, title: "100% Natural", desc: "Sem aditivos" },
    { icon: 2, title: "Orgânico", desc: "Certificado" },
    { icon: 3, title: "Artesanal", desc: "Feito à mão" },
    { icon: 4, title: "Rastreável", desc: "Da colmeia à mesa" },
    { icon: 5, title: "Sustentável", desc: "Manejo consciente" },
    { icon: 6, title: "Local", desc: "Serra da Mantiqueira" },
    { icon: 7, title: "Puro", desc: "Sem misturas" },
    { icon: 8, title: "Premium", desc: "Qualidade superior" },
  ];

  return (
    <section ref={ref} className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-clr1 to-transparent" />
      </div>

      <div className="max-w-450 mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-clr3 text-sm font-semibold tracking-widest uppercase mb-4">
            Nossos Diferenciais
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-clr1 mb-6 tracking-tight">
            Por Que Escolher
            <br />
            Nosso Mel?
          </h2>
          <p className="text-xl text-clr1/60 max-w-2xl mx-auto font-light">
            Compromisso com a qualidade, sustentabilidade e amor pelas abelhas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-linear-to-br from-clr2 to-white border border-clr1/5 hover:border-clr3/30 transition-all duration-500 hover:shadow-xl">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={`/images/icone${item.icon}.png`}
                    alt={item.title}
                    width={1480}
                    height={1480}
                    className="w-54 h-54 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-clr1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-clr1/60">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-clr1 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full border-2 border-clr4"
        />
      </div>

      <div className="max-w-450 mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-clr4 text-sm font-semibold tracking-widest uppercase mb-4">
              Nossa Missão
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-clr2 mb-8 leading-tight">
              Tem Amor em
              <br />
              Cada Gota 🍯
            </h2>
            <div className="space-y-6 text-lg text-clr2/80 leading-relaxed font-light">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sodales nulla vitae ligula pulvinar, eget sodales lacus
                pharetra. Aenean porttitor tortor quam, mollis eleifend eros
                viverra in. In eu eros urna. Nunc ex sem, varius sit amet odio
                quis, ultrices venenatis tortor. Nullam vitae turpis et purus
                porttitor semper. Fusce scelerisque, nulla quis maximus
                pulvinar, odio tortor mollis leo, et facilisis ex justo quis
                tellus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                sodales nulla vitae ligula pulvinar.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <Link
                href="/quem-somos"
                className="inline-flex items-center gap-3 bg-clr4 text-clr1 px-8 py-4 rounded-full font-semibold hover:bg-clr3 transition-all duration-300 group"
              >
                Conheça Nossa História
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {[1, 3, 5, 7].map((num, idx) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`aspect-square rounded-3xl bg-clr4/40 backdrop-blur-sm p-8 flex items-center justify-center ${
                    idx % 2 === 0 ? "mt-8" : ""
                  }`}
                >
                  <Image src={`/images/icone${num}.png`} alt="" fill />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 bg-clr2">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-clr1 mb-6">
            Nossos Valores
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Sustentabilidade",
              desc: "Práticas que respeitam o meio ambiente e protegem as abelhas",
              icon: 2,
            },
            {
              title: "Qualidade",
              desc: "Produtos premium, 100% naturais e cuidadosamente produzidos",
              icon: 4,
            },
            {
              title: "Transparência",
              desc: "Rastreabilidade completa do apiário até sua mesa",
              icon: 6,
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="h-full p-10 rounded-3xl bg-white border border-clr1/10 hover:border-clr3/50 transition-all duration-500 hover:shadow-2xl">
                <Image
                  src={`/images/icone${value.icon}.png`}
                  alt={value.title}
                  width={4480}
                  height={4480}
                  className="w-56 h-56 object-contain"
                />

                <h3 className="text-2xl font-bold text-clr1 mb-4">
                  {value.title}
                </h3>
                <p className="text-clr1/60 leading-relaxed">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-32 bg-linear-to-br from-clr1 to-clr1/90 relative overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-clr4/10 rounded-full blur-3xl"
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-clr4 text-sm font-semibold tracking-widest uppercase mb-6">
            Pronto Para Experimentar?
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-clr2 mb-8 leading-tight">
            Descubra o Sabor
            <br />
            Autêntico do Mel
          </h2>
          <p className="text-xl text-clr2/80 mb-12 max-w-2xl mx-auto font-light">
            Entre em contato e conheça nossos produtos artesanais
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/produtos"
                className="inline-flex items-center gap-3 bg-clr4 text-clr1 px-10 py-5 rounded-full font-semibold text-lg hover:bg-clr2 transition-all duration-300 shadow-2xl group"
              >
                Ver Produtos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 bg-transparent border-2 border-clr2 text-clr2 px-10 py-5 rounded-full font-semibold text-lg hover:bg-clr2 hover:text-clr1 transition-all duration-300"
              >
                Fale Conosco
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ navItems }: { navItems: { name: string; href: string }[] }) {
  return (
    <footer className="bg-clr1 text-clr2 pt-24 pb-8">
      <div className="max-w-450 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <Image
              src="/images/logo2.png"
              alt="Apiário Mantikeira"
              width={440}
              height={40}
              className="h-40 w-auto object-contain mb-8" // h-16 = 64px, h-20 = 80px, h-24 = 96px
            />
            <p className="text-clr2/70 mb-6 leading-relaxed text-lg font-light max-w-md">
              Apicultora e meliponicultora apaixonada pelo mundo das abelhas.
              Mel artesanal e orgânico com manejo consciente.
            </p>
            <motion.a
              href="https://www.instagram.com/apiariomantikeira.mel/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 text-clr4 hover:text-clr3 transition-colors text-lg font-medium"
            >
              <Instagram className="w-6 h-6" />
              @apiariomantikeira.mel
            </motion.a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold text-clr4 mb-6 tracking-wide">
              Navegação
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-clr2/70 hover:text-clr4 transition-colors text-lg inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-clr4 group-hover:w-4 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold text-clr4 mb-6 tracking-wide">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 shrink-0 text-clr4 mt-1" />
                <a
                  href="tel:+5512991737331"
                  className="text-clr2/70 hover:text-clr4 transition-colors text-lg"
                >
                  +55 12 99173-7331
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-6 h-6 shrink-0 text-clr4 mt-1" />
                <a
                  href="mailto:mantiqueiraapiario@gmail.com"
                  className="text-clr2/70 hover:text-clr4 transition-colors text-lg break-all"
                >
                  mantiqueiraapiario@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 shrink-0 text-clr4 mt-1" />
                <span className="text-clr2/70 text-lg leading-relaxed">
                  Rua Professor Anísio Novaes, 101
                  <br />
                  Pedreira, Guaratinguetá - SP
                  <br />
                  CEP 12503-025
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-clr2/20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <p className="text-clr2/50 text-sm">
              © {new Date().getFullYear()} Apiário Mantikeira. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
