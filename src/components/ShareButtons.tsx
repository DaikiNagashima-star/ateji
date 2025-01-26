import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link2, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import type { KanjiResult } from '../types';

interface ShareButtonsProps {
  kanji: KanjiResult;
}

export function ShareButtons({ kanji }: ShareButtonsProps) {
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const shareText = `Check out my Japanese name in kanji: ${kanji.kanji} (${kanji.reading}) - ${kanji.meaning}`;
  const shareUrl = window.location.href;
  const isFavorited = isFavorite(kanji);

  const handleFavoriteClick = async () => {
    if (!user) return;
    await toggleFavorite(kanji);
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
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={handleFavoriteClick}
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
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('My Japanese Name in Kanji')}&summary=${encodeURIComponent(shareText)}`}
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