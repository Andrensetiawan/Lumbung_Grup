"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown, Instagram, Facebook, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useSiteLocale, type SiteLocale } from "./useSiteLocale";

const navLinks = [
  { key: "home", href: "/home" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "partners", href: "/partners" },
  { key: "docs", href: "/gallery" },
] as const;

const languageOptions: Array<{ value: SiteLocale; label: string }> = [
  { value: "id", label: "Indonesia" },
  { value: "en", label: "English" },
];

function LanguageFlag({ value }: { value: SiteLocale }) {
  const src = value === "id" ? "/bendera/indo.png" : "/bendera/US.png";

  if (value === "id") {
    return (
      <Image src={src} alt="Bendera Indonesia" width={28} height={20} className="h-5 w-7 rounded-[4px] object-cover shadow-sm" />
    );
  }

  return (
    <Image src={src} alt="Bendera Inggris" width={28} height={20} className="h-5 w-7 rounded-[4px] object-cover shadow-sm" />
  );
}

const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      products: "Produk",
      partners: "Mitra",
      docs: "Galeri",
    },
    contact: "Hubungi Kami",
    menu: "Menu",
    follow: "Ikuti Kami",
    language: "Bahasa",
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      partners: "Partners",
      docs: "Gallery",
    },
    contact: "Contact Us",
    menu: "Menu",
    follow: "Follow Us",
    language: "Language",
  },
} as const;

interface NavbarProps {
  scrolled?: boolean;
  isHomePage?: boolean;
  hideMobileButton?: boolean;
}

export default function Navbar({
  scrolled = false,
  isHomePage = false,
  hideMobileButton = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { locale, setLocale } = useSiteLocale();

  const t = translations[locale];
  const activeLanguage = languageOptions.find((option) => option.value === locale) ?? languageOptions[0];

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle body overflow in useEffect to prevent state update during render
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsLanguageMenuOpen(false);
  }, [pathname, isOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden items-center lg:flex ${scrolled ? "gap-10 lg:gap-8" : isHomePage ? "gap-8 lg:gap-6" : "gap-10 lg:gap-8"}`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                scrolled
                  ? "text-[12px] " + (isActive 
                    ? "text-emerald-950" 
                    : "text-emerald-700 hover:text-emerald-950")
                  : isHomePage
                    ? "text-[13px] " + (isActive
                      ? "text-white"
                      : "text-white/85 hover:text-white")
                    : "text-[14px] " + (isActive
                    ? "text-gray-900"
                    : "text-gray-700 hover:text-gray-900")
              }`}
            >
              {t.nav[link.key]}
              {isActive && (
                <span className={`absolute -bottom-1 left-0 h-[2px] w-full transition-colors duration-300 ${
                  scrolled ? "bg-emerald-950" : isHomePage ? "bg-white" : "bg-gray-900"
                }`} />
              )}
            </Link>
          );
        })}

        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setIsLanguageMenuOpen((current) => !current)}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-bold uppercase tracking-[0.2em] shadow-sm transition ${
              isHomePage && !scrolled
                ? "border border-white/45 bg-white/12 text-white hover:bg-white/20"
                : "border border-stone-200 bg-white/90 text-stone-700 hover:bg-white"
            }`}
            aria-label={t.language}
          >
            <LanguageFlag value={activeLanguage.value} />
            <ChevronDown size={14} />
          </button>

          {isLanguageMenuOpen ? (
            <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setLocale(option.value);
                    setIsLanguageMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-base text-stone-700 transition hover:bg-stone-50"
                >
                  <span className="flex items-center gap-2">
                    <LanguageFlag value={option.value} />
                    <span>{option.label}</span>
                  </span>
                  {locale === option.value ? <Check size={16} className="text-emerald-700" /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all duration-300 active:scale-95 lg:hidden ${
          scrolled
            ? "border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50"
            : isHomePage
              ? "border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              : "border-gray-300 bg-white/95 text-gray-900 backdrop-blur-sm hover:bg-white"
        } ${hideMobileButton ? "pointer-events-none translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white lg:hidden flex flex-col">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Content */}
          <div className="relative z-50 w-full h-full flex flex-col bg-white overflow-hidden">
            {/* Mobile Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-stone-200 px-6 py-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-950">{t.menu}</span>
                <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-1">
                  {languageOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLocale(option.value)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                        locale === option.value ? "bg-emerald-900 text-white" : "text-stone-600"
                      }`}
                    >
                      <LanguageFlag value={option.value} />
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-emerald-950 transition-colors hover:bg-emerald-50"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition-all duration-200 mb-2 ${
                      isActive 
                        ? "bg-emerald-50 text-emerald-950" 
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {t.nav[link.key]}
                    <ChevronRight 
                      size={20} 
                      className={isActive ? "text-emerald-950" : "text-stone-400"} 
                    />
                  </Link>
                );
              })}
              {/* Social Media Links */}
              <div className="mt-10 border-t border-stone-200 pt-6 pb-20">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                  {t.follow}
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/kyohikari_officialstore/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 py-4 text-white shadow-lg transition-transform duration-300 active:scale-95 hover:shadow-xl"
                  >
                    <Instagram size={20} />
                    <span className="text-sm font-semibold">Instagram</span>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-white shadow-lg transition-transform duration-300 active:scale-95 hover:shadow-xl"
                  >
                    <Facebook size={20} />
                    <span className="text-sm font-semibold">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}