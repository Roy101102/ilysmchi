import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Music,
  Pause,
  Play,
  Sparkles,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Gift,
  Mail,
  MailOpen,
  SlidersHorizontal,
  Copy,
  Check,
  RotateCcw,
  Eye,
  Layers,
  GalleryHorizontal,
  Bookmark,
  Feather,
  Star,
  Image as ImageIcon,
} from 'lucide-react';

// ============================================================================
// CENTRALIZED PERSONALIZATION CONFIGURATION
// ============================================================================
// Replace any placeholder string or image URL below with your own personal
// memories, photos, captions, and letter text. You can also tap the subtle
// "Customize" button in the top-right corner of the live app to upload photos
// from your device, preview your text live, and copy the updated config.
// ============================================================================

export interface MemoryPhotoItem {
  id: string;
  placeholderLabel: string;
  imageUrl: string; // Provide a path/URL (e.g., "/photos/memory1.jpg") or leave "" for the framed placeholder
  caption: string;
  rotation: number;
  tapeColor: 'blush' | 'champagne' | 'sage' | 'crimson';
}

export interface TimelineMilestoneItem {
  id: string;
  label: string;
  detail: string;
}

export interface ThingToKnowItem {
  id: string;
  numberLabel: string;
  message: string;
  theme: 'velvet' | 'botanical' | 'postmark' | 'linen';
}

export interface SpecialReasonItem {
  id: string;
  style: 'envelope' | 'locket' | 'ribbon';
  label: string;
  message: string;
}

export interface LoveLetterConfig {
  recipientName: string;
  senderName: string;
  dateLabel: string;
  openingHeadline: string;
  shortIntroductoryMessage: string;
  openingButtonText: string;
  personalIntroduction: string;
  timelineMilestones: TimelineMilestoneItem[];
  memories: MemoryPhotoItem[];
  thingsToKnow: ThingToKnowItem[];
  specialReasons: SpecialReasonItem[];
  loveLetterParagraphs: string[];
  finalSurpriseMessage: string;
  surprisePhotoUrl: string;
  surprisePhotoPlaceholder: string;
  closingMessage: string;
}

export const LOVE_LETTER_CONTENT: LoveLetterConfig = {
  // Names & Header Metadata
  recipientName: 'my baby, Chrizel',
  senderName: 'royroy',
  dateLabel: '11/18/2026',

  // Opening Envelope Screen
  openingHeadline: 'para sau to bibiko...',
  shortIntroductoryMessage: 'to the prettiest girl in the world, i love you so much and i hope you enjoy this little love letter i made for you. i love you, baby ko.',
  openingButtonText: 'opin mo na?',

  // Section 1: A Little Introduction
  personalIntroduction: 'Happy monthsary, my babbyyyy! I wanted to take a moment to express just how much you mean to me. From the moment nakilala kita sa ml, you have brought so much joy and love into my life. You might not know it, but araw araw mo ako pinapasaya. I am so grateful to be with you. I am sooo lucky, I love you so muuchhh!!',

  // Section 2A: Compact Memory Timeline
  timelineMilestones: [
    {
      id: 'milestone-1',
      label: 'Chapter I',
      detail: '[INSERT TIMELINE MILESTONE 1]',
    },
    {
      id: 'milestone-2',
      label: 'Chapter II',
      detail: '[INSERT TIMELINE MILESTONE 2]',
    },
    {
      id: 'milestone-3',
      label: 'Chapter III',
      detail: '[INSERT TIMELINE MILESTONE 3]',
    },
  ],

  // Section 2B: Our Memories (Scrapbook & Interactive Carousel)
  memories: [
    {
      id: 'photo-1',
      placeholderLabel: '[INSERT PHOTO 1]',
      imageUrl: '/photos/1st.jpg',
      caption: 'First chat sa imsg hh',
      rotation: -2.2,
      tapeColor: 'blush',
    },
    {
      id: 'photo-2',
      placeholderLabel: '[INSERT PHOTO 2]',
      imageUrl: '/photos/2nd.jpg',
      caption: 'My global 1 Minotaur',
      rotation: 2.0,
      tapeColor: 'champagne',
    },
    {
      id: 'photo-3',
      placeholderLabel: '[INSERT PHOTO 3]',
      imageUrl: '/photos/3rd.jpg',
      caption: 'Partners 4 life',
      rotation: -1.6,
      tapeColor: 'sage',
    },
    {
      id: 'photo-4',
      placeholderLabel: '[INSERT PHOTO 4]',
      imageUrl: '/photos/4th.jpg',
      caption: 'I love watching w/ you',
      rotation: 2.4,
      tapeColor: 'crimson',
    },
    {
      id: 'photo-5',
      placeholderLabel: '[INSERT PHOTO 5]',
      imageUrl: '/photos/5th.jpg',
      caption: 'I miss you moree, baby kooo',
      rotation: -2.0,
      tapeColor: 'champagne',
    },
    {
      id: 'photo-6',
      placeholderLabel: '[INSERT PHOTO 6]',
      imageUrl: '/photos/6th.jpg',
      caption: 'Halata ba?',
      rotation: 1.5,
      tapeColor: 'blush',
    },
        {
      id: 'photo-7',
      placeholderLabel: '[INSERT PHOTO 7]',
      imageUrl: '/photos/7th.jpg',
      caption: 'Certified bolera',
      rotation: -1.8,
      tapeColor: 'blush',
    },
        {
      id: 'photo-8',
      placeholderLabel: '[INSERT PHOTO 8]',
      imageUrl: '/photos/8th.jpg',
      caption: 'Kiss enjoyer?',
      rotation: 2.1,
      tapeColor: 'blush',
    },
  ],

  // Section 3: Things I Want You to Know (4 Interactive Flip Cards)
  thingsToKnow: [
    {
      id: 'know-1',
      numberLabel: '01',
      message: 'You are irreplaceable',
      theme: 'velvet',
    },
    {
      id: 'know-2',
      numberLabel: '02',
      message: 'You are sooo beautiful, inside and out',
      theme: 'botanical',
    },
    {
      id: 'know-3',
      numberLabel: '03',
      message: 'You are one of a kind',
      theme: 'postmark',
    },
    {
      id: 'know-4',
      numberLabel: '04',
      message: 'You are my buseng',
      theme: 'linen',
    },
  ],

  // Section 4: Reasons Why You're Special (6 Interactive Keepsakes)
  specialReasons: [
    {
      id: 'reason-2',
      style: 'locket',
      label: 'Keepsake II',
      message: 'I dont know why, but you become extra cute whenever you get tampo. Even when youre upset with me, I cant help but find your little reactions adorable.',
    },
    {
      id: 'reason-3',
      style: 'ribbon',
      label: 'Keepsake III',
      message: 'Sa pag uupdate sakin, I really appreciate how you always keep me updated, kahit sa mga simpleng bagay lang na ginagawa mo or kung nasaan ka. ',
    },
    {
      id: 'reason-4',
      style: 'locket',
      label: 'Keepsake IV',
      message: 'Ewan ko ba, pero youre just so perfect in my eyes. Stop saying panget pls',
    },
  ],

  // Section 5: A Personal Love Letter (Emotional Centerpiece)
  loveLetterParagraphs: [
    '⠀⠀⠀⠀Hi babbyyy, this is my first time creating a love letter for a special someone, and I wanted to make it as heartfelt and personal as possible. Kaya pagpasensyahan mo na kung may mali mali kase hindi talaga sanay. ',
    '⠀⠀⠀⠀I hope you know how happy and grateful I am to have you in my life. I feel so lucky na naging gf kita. Honestly, I never expected to find someone who would make me feel this way, but here we are. Every moment spent with you, whether its something special or just our ordinary everyday conversations, means so much to me. You make even the simplest days feel a little more special, and Im super thankful for that.',
    '⠀⠀⠀⠀I know were not perfect, and there might be times na palagi tayo nag aaway (wag mo nako away pls). But even if lagi tayo nag aaway, I hope we continue to understand each other, communicate, and choose to work things out no matter what. I dont expect everything to be perfect. I just want us to keep growing together, learning more about each other, and I wanna make memories with you pa that well look back on someday.',
    '⠀⠀⠀⠀Thank you for being you, for your patience, your efforts sa pag uupdate, and for making me feel appreciated in ways you might not even realize. I hope I make you feel just as special and loved as you make me feel.',
    '⠀⠀⠀⠀I may not always know the right words to say, and I might not be the best at expressing my feelings, but please know that what I feel for you is genuine. I look forward to more months, more memories, more laughter, and more little moments with you.',
    '⠀⠀⠀⠀Once again, haaappyy monthssaaarrry, babyyy!! I love youuu!!! I hope this letter brings a smile to your face and warmth to your heart, just like you do for me every day.',
  ],

};

// ============================================================================
// SUBTLE AMBIENT MUSIC-BOX / SOFT FELT PIANO ENGINE (WEB AUDIO API)
// ============================================================================
// Generates a warm, gentle music-box melody without relying on external MP3s.
// Never autoplays; triggered strictly by user tap on the Play/Pause control.
function useAmbientMusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manuallyPausedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio('music/song.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    audioRef.current = audio;

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('keydown', attemptPlay);
    };

    const attemptPlay = () => {
      if (manuallyPausedRef.current || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          cleanupListeners();
        })
        .catch(() => {
          // Browsers like iOS Safari block audio until the first tap;
          // listeners stay active so her first tap starts the music.
        });
    };

    // 1. Attempt immediate autoplay on page load
    attemptPlay();

    // 2. Fallback: start immediately on her first tap anywhere on the page
    window.addEventListener('pointerdown', attemptPlay, { passive: true });
    window.addEventListener('touchstart', attemptPlay, { passive: true });
    window.addEventListener('keydown', attemptPlay);

    return () => {
      cleanupListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      manuallyPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      manuallyPausedRef.current = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  return { isPlaying, toggleMusic };
}

// ============================================================================
// GLOBAL TYPOGRAPHY & TEXTURE STYLES
// ============================================================================
function GlobalTypographyAndStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

      :root {
        --bg-cream: #FDF8F5;
        --bg-blush: #F9E8EA;
        --ink-primary: #2D2123;
        --ink-muted: #765B60;
        --accent-crimson: #9E3349;
        --accent-crimson-dark: #7E2437;
        --accent-gold: #C59B6D;
      }

      html {
        scroll-behavior: smooth;
        background-color: #FDF8F5;
        color: #2D2123;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        -webkit-tap-highlight-color: transparent;
      }

      body {
        margin: 0;
        overflow-x: hidden;
        background-color: #FDF8F5;
      }

      .font-serif-editorial {
        font-family: 'Cormorant Garamond', Georgia, serif;
      }

      .font-handwritten {
        font-family: 'Caveat', cursive;
      }

      .font-body-clean {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      /* Subtle fine cotton paper grain overlay */
      .paper-grain {
        background-image: radial-gradient(rgba(158, 51, 73, 0.045) 1px, transparent 0),
                          radial-gradient(rgba(197, 155, 109, 0.04) 1px, transparent 0);
        background-size: 28px 28px;
        background-position: 0 0, 14px 14px;
      }

      /* Ruled journal lines for Section 1 */
      .journal-ruled-lines {
        background-image: repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent 31px,
          rgba(197, 155, 109, 0.22) 32px
        );
      }

      /* 3D Flip Card Helpers */
      .perspective-1200 {
        perspective: 1200px;
      }
      .preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }

      /* Hide scrollbars cleanly where horizontal pills scroll */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  );
}

// ============================================================================
// AMBIENT FLOATING HEARTS & SPARKLES BACKDROP
// ============================================================================
function AmbientFloatingDecor() {
  const particles = [
    { id: 1, left: '8%', top: '14%', size: 13, delay: 0, duration: 7.5, kind: 'heart' },
    { id: 2, left: '84%', top: '18%', size: 11, delay: 1.4, duration: 8.2, kind: 'sparkle' },
    { id: 3, left: '16%', top: '46%', size: 10, delay: 2.1, duration: 9.0, kind: 'sparkle' },
    { id: 4, left: '88%', top: '54%', size: 14, delay: 0.8, duration: 8.6, kind: 'heart' },
    { id: 5, left: '12%', top: '78%', size: 12, delay: 3.0, duration: 7.8, kind: 'heart' },
    { id: 6, left: '82%', top: '82%', size: 11, delay: 1.9, duration: 8.4, kind: 'sparkle' },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {/* Soft atmospheric radial blush glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#F5D6DC]/45 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#F7E5D4]/55 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-[#F4D3D9]/40 blur-3xl" />

      {particles.map((item) => (
        <motion.div
          key={item.id}
          style={{ left: item.left, top: item.top }}
          className="absolute text-[#9E3349]/25"
          animate={{
            y: [-10, 12, -10],
            x: [-4, 5, -4],
            opacity: [0.22, 0.52, 0.22],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.kind === 'heart' ? (
            <Heart style={{ width: item.size, height: item.size }} fill="currentColor" />
          ) : (
            <Sparkles style={{ width: item.size, height: item.size }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// BOTANICAL LINE ART DIVIDER
// ============================================================================
function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-3 my-2 ${className}`}>
      <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C59B6D]/60" />
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-[#9E3349]/75">
        <path
          d="M12 14C12 9 8.5 5 3 4C4.5 9.5 8 12.5 12 14Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C12 9 15.5 5 21 4C19.5 9.5 16 12.5 12 14Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="3" r="1.4" fill="#C59B6D" />
      </svg>
      <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C59B6D]/60" />
    </div>
  );
}

// ============================================================================
// REUSABLE PHOTO SLOT WITH DIRECT FILE UPLOAD
// ============================================================================
interface PhotoSlotProps {
  imageUrl: string;
  placeholderLabel: string;
  altText: string;
  aspectClass?: string;
  onUploadFile: (dataUrl: string) => void;
  showUploadButton?: boolean;
}

function PhotoSlot({
  imageUrl,
  placeholderLabel,
  altText,
  aspectClass = 'aspect-[4/5]',
  onUploadFile,
  showUploadButton = false,
}: PhotoSlotProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadFile(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-sm bg-gradient-to-br from-[#F9ECEE] via-[#F6E6E1] to-[#EFE0D8] border border-[#E7CFD3]`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className="h-full w-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center select-none">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDFB]/85 text-[#9E3349]/75 shadow-xs border border-[#E9D1D5]">
            <ImageIcon className="h-5 w-5" />
          </div>
          <span className="font-body-clean text-[11px] sm:text-xs font-semibold tracking-wide text-[#7E2437] bg-[#FFFDFB]/80 px-2.5 py-1 rounded-full border border-[#E7CFD3]">
            {placeholderLabel}
          </span>
          <span className="mt-1.5 text-[11px] text-[#8C6D73]">
            Tap camera to add photo
          </span>
        </div>
      )}

      {showUploadButton && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label={`Upload image for ${placeholderLabel}`}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Upload photo from device"
            aria-label={`Upload photo for ${placeholderLabel}`}
            className="absolute bottom-2 right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDFB]/95 text-[#9E3349] shadow-md border border-[#E8CFD3] active:scale-95 transition-transform"
          >
            <Camera className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

// ============================================================================
// OPENING EXPERIENCE: INTERACTIVE WAX-SEALED ENVELOPE STAGE (100dvh)
// ============================================================================
interface OpeningEnvelopeStageProps {
  content: LoveLetterConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenCustomize: () => void;
  onEnterWorld: () => void;
}

function OpeningEnvelopeStage({
  content,
  isPlayingMusic,
  onToggleMusic,
  onOpenCustomize,
  onEnterWorld,
}: OpeningEnvelopeStageProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <motion.div
      key="opening-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-x-hidden"
    >
      {/* Top minimal utility controls (Music + Discreet Customize) */}
      <div className="flex w-full max-w-lg mx-auto items-center justify-between pt-1">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlayingMusic ? 'Pause ambient music' : 'Play ambient music'}
          className="flex min-h-[44px] items-center gap-2 rounded-full bg-[#FFFDFB]/85 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-[#7E2437] border border-[#EAD2D6] shadow-xs active:scale-95 transition-transform"
        >
          {isPlayingMusic ? (
            <>
              <Pause className="h-3.5 w-3.5 text-[#9E3349]" />
              <span>Music On</span>
              <span className="flex items-end gap-0.5 h-3 ml-0.5" aria-hidden="true">
                <motion.span
                  animate={{ height: [4, 11, 5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-0.5 bg-[#9E3349] rounded-full"
                />
                <motion.span
                  animate={{ height: [10, 4, 12] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="w-0.5 bg-[#9E3349] rounded-full"
                />
                <motion.span
                  animate={{ height: [5, 10, 4] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="w-0.5 bg-[#9E3349] rounded-full"
                />
              </span>
            </>
          ) : (
            <>
              <Music className="h-3.5 w-3.5 text-[#9E3349]" />
              <span>Play Music</span>
            </>
          )}
        </button>

      </div>

      {/* Center Envelope Stage */}
      <div className="my-auto flex w-full max-w-md mx-auto flex-col items-center text-center py-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F9E8EA] px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-[#9E3349] border border-[#EED3D8]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>For {content.recipientName}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-editorial text-[34px] sm:text-[42px] font-semibold leading-[1.15] text-[#2D2123] px-2"
        >
          {content.openingHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2.5 text-sm sm:text-base text-[#765B60]"
        >
          {isEnvelopeOpen
            ? ''
            : ''}
        </motion.p>

        {/* Interactive 3D Envelope Assembly */}
        <div className="relative mt-8 sm:mt-10 w-[320px] sm:w-[376px] flex flex-col items-center">
          {/* Revealed Stationery Letter Card sliding upward out of envelope */}
          <AnimatePresence>
            {isEnvelopeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-30 mb-[-26px] w-[296px] sm:w-[344px] rounded-2xl bg-[#FFFDFB] p-5 sm:p-6 shadow-[0_18px_45px_-12px_rgba(126,36,55,0.22)] border border-[#EBD6DA] text-center"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F9E8EA] text-[#9E3349]">
                  <Heart className="h-4 w-4" fill="currentColor" />
                </div>

                <p className="font-serif-editorial italic text-lg text-[#9E3349]">
                  hi bibi ko,
                </p>

                <p className="mt-2.5 font-body-clean text-base leading-relaxed text-[#2D2123]">
                  {content.shortIntroductoryMessage}
                </p>

                <BotanicalDivider className="my-3.5" />

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onEnterWorld}
                  className="mt-1 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9E3349] to-[#832539] px-6 py-3 text-base font-medium text-[#FFFDFB] shadow-[0_10px_24px_-6px_rgba(158,51,73,0.5)] active:opacity-95 transition-all"
                >
                  <span>{content.openingButtonText}</span>
                  <Sparkles className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Body */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label={isEnvelopeOpen ? 'Opened love letter envelope' : 'Tap to open envelope'}
            onClick={() => {
              if (!isEnvelopeOpen) setIsEnvelopeOpen(true);
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !isEnvelopeOpen) {
                e.preventDefault();
                setIsEnvelopeOpen(true);
              }
            }}
            animate={
              isEnvelopeOpen
                ? { scale: 0.97, opacity: 0.92 }
                : { y: [0, -5, 0] }
            }
            transition={
              isEnvelopeOpen
                ? { duration: 0.5 }
                : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
            }
            className={`relative w-full h-[206px] sm:h-[232px] rounded-2xl bg-gradient-to-b from-[#F6E2E5] to-[#EED1D6] shadow-[0_22px_50px_-15px_rgba(126,36,55,0.28)] border border-[#E4C2C8] select-none ${
              isEnvelopeOpen ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Subtle inner envelope lining pattern */}
            <div
              className="absolute inset-2 rounded-xl border border-[#C59B6D]/30 bg-[#FDF6F7]/60"
              aria-hidden="true"
            />

            {/* Top Triangular Flap (3D Rotate on Open) */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                rotateX: isEnvelopeOpen ? 180 : 0,
                zIndex: isEnvelopeOpen ? 5 : 25,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformOrigin: 'top center',
                clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
              }}
              className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#F1D2D7] via-[#E9C3CA] to-[#DFB3BC] shadow-md"
            />

            {/* Left & Right Envelope Side Folds */}
            <div
              aria-hidden="true"
              style={{ clipPath: 'polygon(0 0, 52% 52%, 0 100%)' }}
              className="absolute inset-0 z-10 rounded-l-2xl bg-gradient-to-r from-[#F7E5E8] to-[#EED3D8]"
            />
            <div
              aria-hidden="true"
              style={{ clipPath: 'polygon(100% 0, 48% 52%, 100% 100%)' }}
              className="absolute inset-0 z-10 rounded-r-2xl bg-gradient-to-l from-[#F7E5E8] to-[#EED3D8]"
            />

            {/* Bottom Envelope Pocket Fold */}
            <div
              aria-hidden="true"
              style={{ clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)' }}
              className="absolute inset-0 z-20 rounded-b-2xl bg-gradient-to-t from-[#E9C5CC] via-[#F2D8DD] to-[#F8E7EA] border-t border-[#DFB9C0]"
            />

            {/* Address / Keepsake Stamp on Envelope Front */}
            {!isEnvelopeOpen && (
              <div className="absolute bottom-4 left-0 right-0 z-20 text-center pointer-events-none">
                <span className="font-handwritten text-xl text-[#7E2437]/85">
                  A personal note for {content.recipientName}
                </span>
              </div>
            )}

            {/* Crimson & Gold Wax Seal Button in Center */}
            <AnimatePresence>
              {!isEnvelopeOpen && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.35, opacity: 0, rotate: 18 }}
                  transition={{ duration: 0.45 }}
                  className="absolute left-1/2 top-[48%] z-30 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#B03A52] via-[#9E3349] to-[#741F31] shadow-[0_8px_20px_rgba(116,31,49,0.45)] ring-4 ring-[#C59B6D]/45"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F5D6DC]/45 text-[#FDF8F5]">
                      <Heart className="h-5 w-5" fill="currentColor" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Subtle Footer Hint */}
      <div className="text-center pb-1">
        <p className="text-xs tracking-wide text-[#8C6D73]">
          Made thoughtfully with love
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// STICKY TOP NAVIGATION & SECTION PROGRESS BAR
// ============================================================================
interface StickyTopNavProps {
  activeSectionIndex: number;
  totalSections: number;
  sectionTitles: string[];
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onReplayEnvelope: () => void;
  onOpenCustomize: () => void;
  onSelectSection: (index: number) => void;
}

function StickyTopNav({
  activeSectionIndex,
  totalSections,
  sectionTitles,
  isPlayingMusic,
  onToggleMusic,
  onReplayEnvelope,
  onOpenCustomize,
  onSelectSection,
}: StickyTopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDF8F5]/88 backdrop-blur-md border-b border-[#EED9DD] pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-3.5 py-2">
        {/* Left: Replay Envelope Button + Section Step Pill */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            onClick={onReplayEnvelope}
            title="Replay opening envelope"
            aria-label="Replay opening envelope"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F9E8EA] text-[#9E3349] border border-[#EED2D7] active:scale-95 transition-transform"
          >
            <Mail className="h-4 w-4" />
          </button>

          <div className="flex flex-col min-w-0 pl-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9E3349]">
              Chapter {activeSectionIndex + 1} of {totalSections}
            </span>
            <span className="truncate font-serif-editorial text-sm sm:text-base font-semibold text-[#2D2123]">
              {sectionTitles[activeSectionIndex] || 'Our Story'}
            </span>
          </div>
        </div>

        {/* Right: Audio Toggle + Customize Trigger */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
            className={`flex h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium border transition-all active:scale-95 ${
              isPlayingMusic
                ? 'bg-[#9E3349] text-[#FFFDFB] border-[#9E3349] shadow-xs'
                : 'bg-[#FFFDFB] text-[#7E2437] border-[#E8CFD3]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Playing</span>
                <span className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  <motion.span
                    animate={{ height: [3, 10, 4] }}
                    transition={{ duration: 0.75, repeat: Infinity }}
                    className="w-0.5 bg-[#FFFDFB] rounded-full"
                  />
                  <motion.span
                    animate={{ height: [9, 3, 11] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                    className="w-0.5 bg-[#FFFDFB] rounded-full"
                  />
                </span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>Music</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCustomize}
            title="Customize content and photos"
            aria-label="Customize content and photos"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDFB] text-[#765B60] border border-[#E8CFD3] active:scale-95 transition-transform"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#9E3349]" />
          </button>
        </div>
      </div>

      {/* Interactive 6-Step Progress Bar */}
      <div className="mx-auto flex max-w-2xl items-center gap-1.5 px-4 pb-2">
        {Array.from({ length: totalSections }).map((_, idx) => {
          const isCurrent = idx === activeSectionIndex;
          const isPast = idx < activeSectionIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSection(idx)}
              aria-label={`Jump to ${sectionTitles[idx]}`}
              className="group relative flex-1 py-1.5 focus:outline-none"
            >
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#9E3349]'
                    : isPast
                    ? 'bg-[#C59B6D]'
                    : 'bg-[#EAD6DA]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </header>
  );
}

// ============================================================================
// SECTION 1: A LITTLE INTRODUCTION (JOURNAL PAGE)
// ============================================================================
function IntroJournalSection({ content }: { content: LoveLetterConfig }) {
  return (
    <motion.section
      id="section-intro"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3349]">
          Chapter I
        </span>
        <h2 className="mt-1 font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#2D2123]">
          A Little Introduction
        </h2>
        <BotanicalDivider />
      </div>

      {/* Cotton Journal Sheet */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FFFDFB] p-6 sm:p-9 shadow-[0_16px_40px_-16px_rgba(126,36,55,0.16)] border border-[#ECD6DA]">
        {/* Decorative Corner Flourishes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-[#C59B6D]/50 rounded-tl-lg"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-[#C59B6D]/50 rounded-br-lg"
        />

        {/* Date & Recipient Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1E1E4] pb-3.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C6D73]">
            <Bookmark className="h-3.5 w-3.5 text-[#C59B6D]" />
            <span>{content.dateLabel}</span>
          </div>
          <span className="font-handwritten text-xl text-[#9E3349]">
            For {content.recipientName}
          </span>
        </div>

        {/* Journal Ruled Body */}
        <div className="mt-4 journal-ruled-lines py-1">
          <p className="font-body-clean text-base sm:text-[17px] leading-[32px] text-[#2D2123] whitespace-pre-line">
            {content.personalIntroduction}
          </p>
        </div>

        {/* Journal Footer Sign-off */}
        <div className="mt-5 flex items-center justify-end gap-2 text-[#9E3349]">
          <Feather className="h-4 w-4 text-[#C59B6D]" />
          <span className="font-handwritten text-2xl">
            — {content.senderName}
          </span>
        </div>
      </div>
    </motion.section>
  );
}

// ============================================================================
// SECTION 2: OUR MEMORIES (TIMELINE + SCRAPBOOK + SWIPE CAROUSEL + LIGHTBOX)
// ============================================================================
interface MemoriesGallerySectionProps {
  content: LoveLetterConfig;
  onUpdatePhoto: (photoId: string, newDataUrl: string) => void;
}

function MemoriesGallerySection({ content, onUpdatePhoto }: MemoriesGallerySectionProps) {
  const [viewMode, setViewMode] = useState<'scrapbook' | 'carousel'>('scrapbook');
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const tapeStyles: Record<MemoryPhotoItem['tapeColor'], string> = {
    blush: 'bg-[#F2C6CE]/80 border-[#E5B3BC]/60',
    champagne: 'bg-[#E8D3B9]/80 border-[#D9C0A3]/60',
    sage: 'bg-[#D6E2D5]/80 border-[#C3D3C2]/60',
    crimson: 'bg-[#E2B4BE]/80 border-[#D19FA9]/60',
  };

  const handleNextSlide = () => {
    setCarouselIdx((prev) => (prev + 1) % content.memories.length);
  };

  const handlePrevSlide = () => {
    setCarouselIdx((prev) => (prev - 1 + content.memories.length) % content.memories.length);
  };

  return (
    <motion.section
      id="section-memories"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3349]">
          Chapter II
        </span>
        <h2 className="mt-1 font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#2D2123]">
          Our Memories
        </h2>
        <BotanicalDivider />
      </div>

      {/* Compact Interactive Timeline Ribbon */}
      

      {/* View Mode Switcher: Scrapbook vs Carousel */}
      <div className="mb-5 flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Gallery display mode"
          className="inline-flex rounded-full bg-[#F5E3E6] p-1 border border-[#E8CFD4]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'scrapbook'}
            onClick={() => setViewMode('scrapbook')}
            className={`flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              viewMode === 'scrapbook'
                ? 'bg-[#FFFDFB] text-[#9E3349] shadow-xs'
                : 'text-[#765B60]'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Scrapbook</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'carousel'}
            onClick={() => setViewMode('carousel')}
            className={`flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              viewMode === 'carousel'
                ? 'bg-[#FFFDFB] text-[#9E3349] shadow-xs'
                : 'text-[#765B60]'
            }`}
          >
            <GalleryHorizontal className="h-4 w-4" />
            <span>Slideshow</span>
          </button>
        </div>
      </div>

      {/* Gallery Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'scrapbook' ? (
          <motion.div
            key="scrapbook-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-3.5 sm:gap-5 px-0.5"
          >
            {content.memories.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileTap={{ scale: 0.98 }}
                style={{ rotate: `${photo.rotation}deg` }}
                onClick={() => setLightboxIdx(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIdx(index);
                  }
                }}
                aria-label={`View memory ${index + 1}: ${photo.caption}`}
                className="group relative cursor-pointer rounded-md bg-[#FFFDFB] p-2.5 pb-4 sm:p-3.5 sm:pb-5 shadow-[0_12px_28px_-10px_rgba(45,33,35,0.22)] border border-[#EBD6DA] transition-transform"
              >
                {/* Decorative Pastel Washi Tape Strip */}
                <div
                  aria-hidden="true"
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-14 sm:w-16 -rotate-2 border backdrop-blur-xs shadow-2xs ${
                    tapeStyles[photo.tapeColor]
                  }`}
                />

                <PhotoSlot
                  imageUrl={photo.imageUrl}
                  placeholderLabel={photo.placeholderLabel}
                  altText={photo.caption}
                  aspectClass="aspect-[4/5]"
                  onUploadFile={(dataUrl) => onUpdatePhoto(photo.id, dataUrl)}
                />

                <p className="mt-2.5 text-center font-handwritten text-lg sm:text-xl leading-snug text-[#2D2123] line-clamp-2">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="carousel-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto max-w-sm"
          >
            {/* Touch-Swipeable Polaroid Slide */}
            <motion.div
              key={content.memories[carouselIdx].id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNextSlide();
                else if (info.offset.x > 50) handlePrevSlide();
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={() => setLightboxIdx(carouselIdx)}
              className="cursor-pointer rounded-2xl bg-[#FFFDFB] p-4 pb-6 shadow-[0_18px_40px_-14px_rgba(126,36,55,0.22)] border border-[#EBD6DA]"
            >
              <PhotoSlot
                imageUrl={content.memories[carouselIdx].imageUrl}
                placeholderLabel={content.memories[carouselIdx].placeholderLabel}
                altText={content.memories[carouselIdx].caption}
                aspectClass="aspect-[4/4]"
                onUploadFile={(dataUrl) =>
                  onUpdatePhoto(content.memories[carouselIdx].id, dataUrl)
                }
              />

              <div className="mt-4 text-center px-2">
                <p className="font-handwritten text-2xl sm:text-[26px] leading-snug text-[#2D2123]">
                  {content.memories[carouselIdx].caption}
                </p>
                <span className="mt-1.5 inline-block text-xs text-[#8C6D73]">
                  Swipe or tap photo to enlarge ({carouselIdx + 1} of {content.memories.length})
                </span>
              </div>
            </motion.div>

            {/* Carousel Controls */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous photo"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDFB] text-[#9E3349] border border-[#E8CFD3] shadow-xs active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {content.memories.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCarouselIdx(idx)}
                    aria-label={`Go to photo ${idx + 1}`}
                    className="p-1.5"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all ${
                        idx === carouselIdx
                          ? 'w-5 bg-[#9E3349]'
                          : 'w-2 bg-[#DFC1C7]'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next photo"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDFB] text-[#9E3349] border border-[#E8CFD3] shadow-xs active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2123]/80 backdrop-blur-sm p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-[#FFFDFB] p-4 sm:p-6 shadow-2xl border border-[#EBD6DA]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9E3349]">
                  Memory {lightboxIdx + 1} of {content.memories.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Close photo view"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9E8EA] text-[#9E3349] active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <PhotoSlot
                imageUrl={content.memories[lightboxIdx].imageUrl}
                placeholderLabel={content.memories[lightboxIdx].placeholderLabel}
                altText={content.memories[lightboxIdx].caption}
                aspectClass="aspect-[4/4]"
                onUploadFile={(dataUrl) =>
                  onUpdatePhoto(content.memories[lightboxIdx].id, dataUrl)
                }
              />

              <p className="mt-4 text-center font-handwritten text-2xl sm:text-[28px] leading-snug text-[#2D2123]">
                {content.memories[lightboxIdx].caption}
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx(
                      (lightboxIdx - 1 + content.memories.length) % content.memories.length
                    )
                  }
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-full bg-[#FDF8F5] text-sm font-medium text-[#7E2437] border border-[#E8CFD3]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx((lightboxIdx + 1) % content.memories.length)
                  }
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-full bg-[#9E3349] text-sm font-medium text-[#FFFDFB]"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// ============================================================================
// SECTION 3: THINGS I WANT YOU TO KNOW (4 UNIQUE 3D FLIP CARDS)
// ============================================================================
function ThingsToKnowSection({ content }: { content: LoveLetterConfig }) {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFrontThemeClasses = (theme: ThingToKnowItem['theme']) => {
    switch (theme) {
      case 'velvet':
        return 'bg-gradient-to-br from-[#9E3349] via-[#89283C] to-[#6E1D2E] text-[#FFFDFB] border-[#C59B6D]/50';
      case 'botanical':
        return 'bg-gradient-to-br from-[#F9E8EA] via-[#F5DCE0] to-[#EED0D6] text-[#2D2123] border-[#DFB9C0]';
      case 'postmark':
        return 'bg-gradient-to-br from-[#FFFDFB] via-[#FAF0E8] to-[#F3E2D4] text-[#2D2123] border-[#DFC7B2]';
      case 'linen':
        return 'bg-gradient-to-br from-[#F4E6E8] via-[#EAD4D8] to-[#E0C2C8] text-[#2D2123] border-[#D3AEB6]';
    }
  };

  return (
    <motion.section
      id="section-things-to-know"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3349]">
          Chapter III
        </span>
        <h2 className="mt-1 font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#2D2123]">
          Things I Want You to Know
        </h2>
        <BotanicalDivider />
        <p className="mt-1 text-sm text-[#765B60]">
          Tap each keepsake card to turn it over
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {content.thingsToKnow.map((card) => {
          const isFlipped = !!flippedIds[card.id];
          const isDarkFront = card.theme === 'velvet';

          return (
            <div key={card.id} className="perspective-1200">
              <motion.div
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`Card ${card.numberLabel}. ${
                  isFlipped ? card.message : 'Tap to flip and reveal message'
                }`}
                onClick={() => toggleCard(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(card.id);
                  }
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[216px] w-full cursor-pointer preserve-3d select-none"
              >
                {/* FRONT OF CARD */}
                <div
                  className={`backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl p-6 shadow-[0_14px_34px_-14px_rgba(126,36,55,0.2)] border ${getFrontThemeClasses(
                    card.theme
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-serif-editorial text-sm italic tracking-wider ${
                        isDarkFront ? 'text-[#F6D7DC]' : 'text-[#9E3349]'
                      }`}
                    >
                      Note No. {card.numberLabel}
                    </span>

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                        isDarkFront
                          ? 'border-[#F6D7DC]/30 bg-[#FFFDFB]/10 text-[#F6D7DC]'
                          : 'border-[#C59B6D]/40 bg-[#FFFDFB]/75 text-[#9E3349]'
                      }`}
                    >
                      {card.theme === 'velvet' && <Heart className="h-4 w-4" fill="currentColor" />}
                      {card.theme === 'botanical' && <Sparkles className="h-4 w-4" />}
                      {card.theme === 'postmark' && <Mail className="h-4 w-4" />}
                      {card.theme === 'linen' && <Star className="h-4 w-4" />}
                    </span>
                  </div>

                  <div className="my-auto text-center py-2">
                    <p
                      className={`font-serif-editorial text-2xl font-semibold ${
                        isDarkFront ? 'text-[#FFFDFB]' : 'text-[#2D2123]'
                      }`}
                    >
                      A Little Truth #{card.numberLabel}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs font-medium opacity-85">
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Tap to flip open</span>
                  </div>
                </div>

                {/* BACK OF CARD (REVEALED MESSAGE) */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-3xl bg-[#FFFDFB] p-6 text-center shadow-[0_16px_38px_-14px_rgba(126,36,55,0.24)] border-2 border-[#E3C1C7]">
                  <div className="flex items-center justify-between text-xs text-[#9E3349]">
                    <span className="font-semibold tracking-wider uppercase">
                      #{card.numberLabel}
                    </span>
                    <Heart className="h-3.5 w-3.5" fill="currentColor" />
                  </div>

                  <div className="my-auto py-2">
                    <p className="font-body-clean text-base sm:text-[17px] leading-relaxed text-[#2D2123]">
                      {card.message}
                    </p>
                  </div>

                  <span className="text-[11px] font-medium text-[#8C6D73]">
                    Tap to flip back
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ============================================================================
// SECTION 4: REASONS WHY YOU'RE SPECIAL (6 INTERACTIVE KEEPSAKE TOKENS)
// ============================================================================
function ReasonsSpecialSection({ content }: { content: LoveLetterConfig }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [focusedReasonId, setFocusedReasonId] = useState<string | null>(null);

  const handleTapToken = (id: string) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id]);
    }
    setFocusedReasonId(id);
  };

  const handleRevealAll = () => {
    const allIds = content.specialReasons.map((r) => r.id);
    setUnlockedIds(allIds);
    if (!focusedReasonId && allIds.length > 0) {
      setFocusedReasonId(allIds[0]);
    }
  };

  const focusedReason = content.specialReasons.find((r) => r.id === focusedReasonId);

  return (
    <motion.section
      id="section-reasons"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3349]">
          Chapter IV
        </span>
        <h2 className="mt-1 font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#2D2123]">
          Reasons Why You&apos;re Special
        </h2>
        <BotanicalDivider />

        {/* Progress Counter & Reveal All Pill */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F9E8EA] px-3.5 py-1.5 text-xs font-semibold text-[#9E3349] border border-[#EBD1D6]">
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            <span>
              {unlockedIds.length} of {content.specialReasons.length} unlocked
            </span>
          </span>

          {unlockedIds.length < content.specialReasons.length && (
            <button
              type="button"
              onClick={handleRevealAll}
              className="min-h-[36px] rounded-full bg-[#FFFDFB] px-3 py-1 text-xs font-medium text-[#765B60] border border-[#E8CFD3] active:scale-95"
            >
              Unlock all
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Mobile Grid of Interactive Keepsake Tokens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {content.specialReasons.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id);
          const isSelected = focusedReasonId === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => handleTapToken(item.id)}
              aria-label={`${item.label}: ${
                isUnlocked ? item.message : 'Tap to unlock reason'
              }`}
              className={`relative flex min-h-[116px] flex-col items-center justify-center rounded-2xl p-3.5 text-center transition-all border ${
                isSelected
                  ? 'bg-[#9E3349] text-[#FFFDFB] border-[#9E3349] shadow-[0_12px_26px_-10px_rgba(158,51,73,0.45)]'
                  : isUnlocked
                  ? 'bg-[#FFFDFB] text-[#2D2123] border-[#DFB9C0] shadow-xs'
                  : 'bg-gradient-to-b from-[#FFFDFB] to-[#F9ECEE] text-[#7E2437] border-[#ECD6DA]'
              }`}
            >
              {/* Token Icon Variant */}
              <div
                className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  isSelected
                    ? 'bg-[#FFFDFB]/20 text-[#FFFDFB]'
                    : isUnlocked
                    ? 'bg-[#F9E8EA] text-[#9E3349]'
                    : 'bg-[#F4DCE0] text-[#9E3349]'
                }`}
              >
                {item.style === 'envelope' &&
                  (isUnlocked ? (
                    <MailOpen className="h-5 w-5" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  ))}
                {item.style === 'locket' && (
                  <Heart
                    className="h-5 w-5"
                    fill={isUnlocked ? 'currentColor' : 'none'}
                  />
                )}
                {item.style === 'ribbon' && <Sparkles className="h-5 w-5" />}
              </div>

              <span
                className={`font-serif-editorial text-base font-semibold ${
                  isSelected ? 'text-[#FFFDFB]' : 'text-[#2D2123]'
                }`}
              >
                {item.label}
              </span>

              <span
                className={`mt-0.5 text-[11px] ${
                  isSelected
                    ? 'text-[#F9E8EA]'
                    : isUnlocked
                    ? 'text-[#9E3349] font-medium'
                    : 'text-[#8C6D73]'
                }`}
              >
                {isUnlocked ? 'Opened • Tap to read' : 'Tap to open'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Dedicated Keepsake Reader Box for Comfortable Mobile Legibility */}
      <AnimatePresence mode="wait">
        {focusedReason ? (
          <motion.div
            key={focusedReason.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-3xl bg-[#FFFDFB] p-5 sm:p-6 text-center shadow-[0_14px_34px_-14px_rgba(126,36,55,0.18)] border border-[#E5C4CA]"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#9E3349]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{focusedReason.label}</span>
            </div>
            <p className="mt-2.5 font-body-clean text-base sm:text-[17px] leading-relaxed text-[#2D2123]">
              {focusedReason.message}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty-reason-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-2xl border border-dashed border-[#DFBFC5] bg-[#FFFDFB]/60 px-4 py-3.5 text-center"
          >
            <p className="text-sm text-[#765B60]">
              Tap any heart, envelope, or ribbon above to reveal what makes you so special.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// ============================================================================
// SECTION 5: A PERSONAL LOVE LETTER (EMOTIONAL CENTERPIECE)
// ============================================================================
function PersonalLoveLetterSection({ content }: { content: LoveLetterConfig }) {
  const [revealedCount, setRevealedCount] = useState(1);
  const totalParagraphs = content.loveLetterParagraphs.length;
  const allRevealed = revealedCount >= totalParagraphs;

  return (
    <motion.section
      id="section-love-letter"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="mb-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E3349]">
          Chapter V
        </span>
        <h2 className="mt-1 font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#2D2123]">
          A Letter From My Heart
        </h2>
        <BotanicalDivider />
      </div>

      {/* Textured Heirloom Stationery Paper */}
      <article className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF6EE] to-[#F9EFE3] px-5 py-7 sm:px-9 sm:py-10 shadow-[0_20px_50px_-16px_rgba(126,36,55,0.22)] border border-[#E6D2BE]">
        {/* Subtle Horizontal Paper Fold Creases */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#C59B6D]/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#C59B6D]/25 to-transparent"
        />

        {/* Top Wax Seal Emblem */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-medium tracking-wider uppercase text-[#8C6D73]">
            {content.dateLabel}
          </span>
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#A6364D] to-[#7B2134] text-[#FDF8F5] shadow-sm ring-2 ring-[#C59B6D]/40"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
          </div>
        </div>

        {/* Salutation */}
        <p className="font-handwritten text-[28px] sm:text-[32px] font-semibold text-[#9E3349]">
          Dearest Chrizel,
        </p>

        {/* Gradual Line-by-Line / Paragraph-by-Paragraph Handwritten Body */}
        <div className="mt-4 space-y-5">
          {content.loveLetterParagraphs.slice(0, revealedCount).map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-justify font-handwritten text-[23px] sm:text-[26px] leading-[1.6] text-[#2D2123] whitespace-pre-line"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Gradual Reveal Controls or Final Signature */}
        {!allRevealed ? (
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 border-t border-[#E8D7C5]">
            <button
              type="button"
              onClick={() => setRevealedCount((prev) => Math.min(prev + 1, totalParagraphs))}
              className="flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#9E3349] px-5 py-2.5 text-sm font-medium text-[#FFFDFB] shadow-sm active:scale-95 transition-transform"
            >
              <span>Continue Reading ({revealedCount}/{totalParagraphs})</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setRevealedCount(totalParagraphs)}
              className="flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-[#FFFDFB] px-4 py-2 text-xs font-medium text-[#765B60] border border-[#DFC9B4] active:scale-95"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Show Full Letter</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-7 pt-4 border-t border-[#E8D7C5]/70 text-right"
          >
            <p className="font-handwritten text-2xl text-[#765B60]">
              With all my love,
            </p>
            <p className="mt-1 font-handwritten text-[30px] font-bold text-[#9E3349]">
              {content.senderName}
            </p>
          </motion.div>
        )}
      </article>
    </motion.section>
  );
}

// ============================================================================
// SECTION 6: A FINAL SURPRISE (INTERACTIVE RIBBON GIFT BOX)
// ============================================================================
interface FinalSurpriseSectionProps {
  content: LoveLetterConfig;
  onUpdateSurprisePhoto: (newDataUrl: string) => void;
}

function FinalSurpriseSection({
  content,
  onUpdateSurprisePhoto,
}: FinalSurpriseSectionProps) {
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const celebratoryHearts = [
    { id: 1, x: -95, y: -115, scale: 1.1, delay: 0.05 },
    { id: 2, x: -45, y: -145, scale: 0.9, delay: 0.12 },
    { id: 3, x: 0, y: -160, scale: 1.2, delay: 0.08 },
    { id: 4, x: 50, y: -140, scale: 0.95, delay: 0.15 },
    { id: 5, x: 95, y: -110, scale: 1.05, delay: 0.1 },
    { id: 6, x: -70, y: -80, scale: 0.85, delay: 0.2 },
    { id: 7, x: 72, y: -85, scale: 0.85, delay: 0.18 },
  ];
}

// ============================================================================
// DISCREET LIVE CUSTOMIZATION DRAWER (EDIT PLACEHOLDERS & UPLOAD PHOTOS)
// ============================================================================
interface CustomizeDrawerProps {
  isOpen: boolean;
  content: LoveLetterConfig;
  onChangeContent: (updated: LoveLetterConfig) => void;
  onResetDefault: () => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

function CustomizeDrawer({
  isOpen,
  content,
  onChangeContent,
  onResetDefault,
  onClose,
  onNotify,
}: CustomizeDrawerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyConfig = async () => {
    const serialized = `export const LOVE_LETTER_CONTENT: LoveLetterConfig = ${JSON.stringify(
      content,
      null,
      2
    )};`;
    try {
      await navigator.clipboard.writeText(serialized);
      setCopied(true);
      onNotify('Configuration copied to clipboard');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      onNotify('Select and copy your edits anytime');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#2D2123]/60 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Personalize Love Letter Content"
            className="flex h-[100dvh] w-full max-w-md flex-col bg-[#FDF8F5] shadow-2xl border-l border-[#EBD6DA] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#EAD4D8] bg-[#FFFDFB] px-4 py-3.5">
              <div>
                <h2 className="font-serif-editorial text-xl font-semibold text-[#2D2123]">
                  Personalize Your Letter
                </h2>
                <p className="text-xs text-[#765B60]">
                  Edit placeholders or upload photos live
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close customization drawer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9E8EA] text-[#9E3349]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Form Fields */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
              {/* Names & Date */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Names & Opening
                </h3>

                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">Recipient Name</span>
                  <input
                    type="text"
                    value={content.recipientName}
                    onChange={(e) =>
                      onChangeContent({ ...content, recipientName: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2.5 text-base text-[#2D2123]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">Your Name</span>
                  <input
                    type="text"
                    value={content.senderName}
                    onChange={(e) =>
                      onChangeContent({ ...content, senderName: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2.5 text-base text-[#2D2123]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">Date</span>
                  <input
                    type="text"
                    value={content.dateLabel}
                    onChange={(e) =>
                      onChangeContent({ ...content, dateLabel: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2.5 text-base text-[#2D2123]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">
                    Envelope Card Message
                  </span>
                  <textarea
                    rows={2}
                    value={content.shortIntroductoryMessage}
                    onChange={(e) =>
                      onChangeContent({
                        ...content,
                        shortIntroductoryMessage: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                  />
                </label>
              </div>

              {/* Section 1: Introduction */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 1: Introduction
                </h3>
                <textarea
                  rows={3}
                  value={content.personalIntroduction}
                  onChange={(e) =>
                    onChangeContent({ ...content, personalIntroduction: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                />
              </div>

              {/* Section 2: Milestones & Photos */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 2: Timeline & Memories
                </h3>
                {content.timelineMilestones.map((m, idx) => (
                  <label key={m.id} className="block">
                    <span className="text-xs font-medium text-[#765B60]">
                      Milestone {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={m.detail}
                      onChange={(e) => {
                        const next = [...content.timelineMilestones];
                        next[idx] = { ...m, detail: e.target.value };
                        onChangeContent({ ...content, timelineMilestones: next });
                      }}
                      className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                    />
                  </label>
                ))}

                <div className="pt-2 space-y-3">
                  {content.memories.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="rounded-xl bg-[#FDF8F5] p-3 border border-[#EAD5D9]"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-[#9E3349]">
                          Photo {idx + 1}
                        </span>
                        <label className="cursor-pointer rounded-full bg-[#F9E8EA] px-3 py-1 text-xs font-medium text-[#9E3349]">
                          <span>{photo.imageUrl ? 'Replace Photo' : 'Upload Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  const next = [...content.memories];
                                  next[idx] = { ...photo, imageUrl: reader.result };
                                  onChangeContent({ ...content, memories: next });
                                }
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => {
                          const next = [...content.memories];
                          next[idx] = { ...photo, caption: e.target.value };
                          onChangeContent({ ...content, memories: next });
                        }}
                        className="w-full rounded-lg border border-[#E6CFD4] bg-[#FFFDFB] px-2.5 py-2 text-base text-[#2D2123]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Things I Want You to Know */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 3: Flip Cards
                </h3>
                {content.thingsToKnow.map((card, idx) => (
                  <label key={card.id} className="block">
                    <span className="text-xs font-medium text-[#765B60]">
                      Card {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      value={card.message}
                      onChange={(e) => {
                        const next = [...content.thingsToKnow];
                        next[idx] = { ...card, message: e.target.value };
                        onChangeContent({ ...content, thingsToKnow: next });
                      }}
                      className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                    />
                  </label>
                ))}
              </div>

              {/* Section 4: Reasons Why You're Special */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 4: Special Reasons
                </h3>
                {content.specialReasons.map((reason, idx) => (
                  <label key={reason.id} className="block">
                    <span className="text-xs font-medium text-[#765B60]">
                      Reason {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      value={reason.message}
                      onChange={(e) => {
                        const next = [...content.specialReasons];
                        next[idx] = { ...reason, message: e.target.value };
                        onChangeContent({ ...content, specialReasons: next });
                      }}
                      className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                    />
                  </label>
                ))}
              </div>

              {/* Section 5: Love Letter Paragraphs */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 5: Love Letter
                </h3>
                {content.loveLetterParagraphs.map((para, idx) => (
                  <label key={idx} className="block">
                    <span className="text-xs font-medium text-[#765B60]">
                      Paragraph {idx + 1}
                    </span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const next = [...content.loveLetterParagraphs];
                        next[idx] = e.target.value;
                        onChangeContent({ ...content, loveLetterParagraphs: next });
                      }}
                      className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                    />
                  </label>
                ))}
              </div>

              {/* Section 6: Final Surprise */}
              <div className="space-y-3 rounded-2xl bg-[#FFFDFB] p-4 border border-[#ECD6DA]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9E3349]">
                  Section 6: Final Surprise
                </h3>
                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">
                    Final Surprise Message
                  </span>
                  <textarea
                    rows={3}
                    value={content.finalSurpriseMessage}
                    onChange={(e) =>
                      onChangeContent({
                        ...content,
                        finalSurpriseMessage: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-medium text-[#765B60]">
                    Closing Message
                  </span>
                  <textarea
                    rows={2}
                    value={content.closingMessage}
                    onChange={(e) =>
                      onChangeContent({ ...content, closingMessage: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-[#E6CFD4] bg-[#FDF8F5] px-3 py-2 text-base text-[#2D2123]"
                  />
                </label>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="flex items-center gap-2 border-t border-[#EAD4D8] bg-[#FFFDFB] px-4 py-3">
              <button
                type="button"
                onClick={onResetDefault}
                className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#FDF8F5] px-4 py-2 text-xs font-medium text-[#765B60] border border-[#E6CFD4]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleCopyConfig}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-[#9E3349] px-4 py-2 text-sm font-medium text-[#FFFDFB]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Config!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Config Code</span>
                  </>
                )}
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export function App() {
  const [content, setContent] = useState<LoveLetterConfig>(LOVE_LETTER_CONTENT);
  const [hasEnteredWorld, setHasEnteredWorld] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isPlaying, toggleMusic } = useAmbientMusicBox();

  const sectionIds = [
    'section-intro',
    'section-memories',
    'section-things-to-know',
    'section-reasons',
    'section-love-letter',
    'section-final-surprise',
  ];

  const sectionTitles = [
    'A Little Introduction',
    'Our Memories',
    "Things I Want You to Know",
    "Reasons Why You're Special",
    'A Personal Love Letter',
    'A Final Surprise',
  ];

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  }, []);

  // Track active section while scrolling through the main world
  useEffect(() => {
    if (!hasEnteredWorld) return;

    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.36;
      let currentIdx = 0;

      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            currentIdx = idx;
          }
        }
      });

      setActiveSectionIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEnteredWorld]);

  const handleSelectSection = (index: number) => {
    const id = sectionIds[index];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpdateMemoryPhoto = (photoId: string, newDataUrl: string) => {
    setContent((prev) => ({
      ...prev,
      memories: prev.memories.map((m) =>
        m.id === photoId ? { ...m, imageUrl: newDataUrl } : m
      ),
    }));
    showToast('Memory photo added');
  };

  const handleUpdateSurprisePhoto = (newDataUrl: string) => {
    setContent((prev) => ({
      ...prev,
      surprisePhotoUrl: newDataUrl,
    }));
    showToast('Surprise photo added');
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#FDF8F5] paper-grain text-[#2D2123]">
      <GlobalTypographyAndStyles />
      <AmbientFloatingDecor />

      {/* Non-Blocking Toast Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2D2123]/92 px-4 py-2 text-xs font-medium text-[#FFFDFB] shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Flow: Opening Envelope -> 6 Interactive Chapters */}
      <AnimatePresence mode="wait">
        {!hasEnteredWorld ? (
          <OpeningEnvelopeStage
            key="opening-envelope"
            content={content}
            isPlayingMusic={isPlaying}
            onToggleMusic={toggleMusic}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            onEnterWorld={() => {
              setHasEnteredWorld(true);
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
          />
        ) : (
          <motion.div
            key="main-world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex min-h-[100dvh] w-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))]"
          >
            <StickyTopNav
              activeSectionIndex={activeSectionIndex}
              totalSections={sectionIds.length}
              sectionTitles={sectionTitles}
              isPlayingMusic={isPlaying}
              onToggleMusic={toggleMusic}
              onReplayEnvelope={() => setHasEnteredWorld(false)}
              onOpenCustomize={() => setIsCustomizeOpen(true)}
              onSelectSection={handleSelectSection}
            />

            {/* Main Single-Column Editorial Container (Optimized for 390px iPhone 13 & Desktop) */}
            <main className="mx-auto flex w-full max-w-xl flex-col gap-16 sm:gap-24 px-5 pt-8 sm:pt-12">
              <IntroJournalSection content={content} />

              <MemoriesGallerySection
                content={content}
                onUpdatePhoto={handleUpdateMemoryPhoto}
              />

              <ThingsToKnowSection content={content} />

              <ReasonsSpecialSection content={content} />

              <PersonalLoveLetterSection content={content} />

              <FinalSurpriseSection
                content={content}
                onUpdateSurprisePhoto={handleUpdateSurprisePhoto}
              />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Personalization & Photo Upload Drawer */}
      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        content={content}
        onChangeContent={setContent}
        onResetDefault={() => {
          setContent(LOVE_LETTER_CONTENT);
          showToast('Reset to default placeholders');
        }}
        onClose={() => setIsCustomizeOpen(false)}
        onNotify={showToast}
      />
    </div>
  );
}

export default App;