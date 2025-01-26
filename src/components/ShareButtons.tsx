import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import type { KanjiResult } from '../types';

interface ShareButtonsProps {
  kanji: KanjiResult;
}

export function ShareButtons({ kanji }: ShareButtonsProps) {
  const shareText = `Check out my Japanese name in kanji: ${kanji.kanji} (${kanji.reading}) - ${kanji.meaning}`;
  const shareUrl = window.location.href;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('My Japanese Name in Kanji')}&summary=${encodeURIComponent(shareText)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share this name</span>
      </div>
      
      <div className="flex gap-4">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Copy link"
        >
          <Link2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}