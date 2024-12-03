import React, { useState, useEffect } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { KanjiResult } from '../types';

interface ShareButtonsProps {
  kanji: KanjiResult;
}

export function ShareButtons({ kanji }: ShareButtonsProps) {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
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

  const toggleFavorite = () => {
    if (!user) return;
    
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`) || '[]');
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav: KanjiResult) => fav.kanji !== kanji.kanji);
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(updatedFavorites));
    } else {
      favorites.push({ ...kanji, savedAt: new Date() });
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
    
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    if (user) {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`) || '[]');
      setIsFavorited(favorites.some((fav: KanjiResult) => fav.kanji === kanji.kanji));
    }
  }, [user, kanji]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        )}
        
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Copy link"
        >
          <Link2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Share2 className="w-4 h-4" />
        <span>Share this name</span>
      </div>
    </div>
  );
}