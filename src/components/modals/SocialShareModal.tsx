
import React from 'react';
import { X, Link, MessageCircle, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type SocialShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  recipeTitle: string;
  shareUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    whatsapp: string;
    linkedin: string;
    email: string;
  };
};

const SocialShareModal = ({ 
  isOpen, 
  onClose, 
  recipeTitle,
  shareUrl, 
  socialLinks 
}: SocialShareModalProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const socialButtons = [
    { 
      name: 'Facebook', 
      color: 'bg-blue-600 hover:bg-blue-700', 
      icon: <MessageCircle className="w-5 h-5" />,
      url: socialLinks.facebook 
    },
    { 
      name: 'Twitter', 
      color: 'bg-sky-500 hover:bg-sky-600', 
      icon: <MessageCircle className="w-5 h-5" />,
      url: socialLinks.twitter
    },
    { 
      name: 'WhatsApp', 
      color: 'bg-green-500 hover:bg-green-600', 
      icon: <MessageCircle className="w-5 h-5" />,
      url: socialLinks.whatsapp
    },
    { 
      name: 'LinkedIn', 
      color: 'bg-blue-700 hover:bg-blue-800', 
      icon: <MessageCircle className="w-5 h-5" />,
      url: socialLinks.linkedin 
    },
    { 
      name: 'Email', 
      color: 'bg-gray-600 hover:bg-gray-700', 
      icon: <MessageCircle className="w-5 h-5" />,
      url: socialLinks.email 
    }
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Recipe</DialogTitle>
          <DialogDescription>
            Share "{recipeTitle}" with friends and family
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <p className="text-xs text-gray-500">Recipe Link</p>
              <div className="flex items-center border rounded-md pl-3 bg-gray-50">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 py-2 bg-transparent text-sm outline-none overflow-hidden text-ellipsis"
                />
                <button 
                  onClick={copyToClipboard}
                  className="px-3 py-2 h-full border-l bg-white hover:bg-gray-100 text-gray-600 rounded-r-md transition"
                >
                  <Link className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <p className="text-xs text-gray-500">Share via</p>
            <div className="grid grid-cols-5 gap-2">
              {socialButtons.map((btn) => (
                <button
                  key={btn.name}
                  onClick={() => handleSocialClick(btn.url)}
                  className={`px-2 py-3 rounded-md text-white flex flex-col items-center justify-center gap-1 transition-colors ${btn.color}`}
                >
                  {btn.icon}
                  <span className="text-xs">{btn.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-center">
          <DialogClose asChild>
            <button className="rounded-md border-2 border-primary text-primary hover:bg-primary/5 px-4 py-2 text-sm font-medium transition-colors">
              Done
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;
