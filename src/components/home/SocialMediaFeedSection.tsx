import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { INITIAL_SOCIAL_POSTS } from '../../config/socialPosts';
import { SocialPost, SocialPlatform } from '../../types';
import {
  Heart,
  Share2,
  ExternalLink,
  MessageCircle,
  Repeat,
  RefreshCw,
  CheckCircle2,
  Play,
  MapPin,
  Calendar,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Video,
  Radio,
  X
} from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const SocialMediaFeedSection: React.FC = () => {
  const { config, notify } = useCampaign();
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | SocialPlatform>('all');
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeMediaModal, setActiveMediaModal] = useState<SocialPost | null>(null);

  // Filter posts
  const filteredPosts = selectedPlatform === 'all'
    ? posts
    : posts.filter((p) => p.platform === selectedPlatform);

  // Handle like toggle
  const handleLike = (postId: string) => {
    const isCurrentlyLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likesCount: isCurrentlyLiked ? post.likesCount - 1 : post.likesCount + 1,
          };
        }
        return post;
      })
    );
  };

  // Handle share
  const handleShare = (post: SocialPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.postUrl);
    }
    notify(
      'Post Link Copied',
      `Direct link to update from ${post.handle} copied to clipboard!`,
      'success'
    );
  };

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      notify('Feed Updated', 'Real-time campaign updates refreshed successfully.', 'info');
    }, 700);
  };

  // Platform icon helper
  const getPlatformIcon = (platform: SocialPlatform, className = 'w-4 h-4') => {
    switch (platform) {
      case 'twitter':
        return <Twitter className={className} />;
      case 'facebook':
        return <Facebook className={className} />;
      case 'instagram':
        return <Instagram className={className} />;
      case 'youtube':
        return <Youtube className={className} />;
      case 'tiktok':
        return <Video className={className} />;
    }
  };

  // Platform color badge
  const getPlatformBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter':
        return { name: 'X (Twitter)', bg: 'bg-stone-900 text-stone-100 border-stone-700' };
      case 'facebook':
        return { name: 'Facebook', bg: 'bg-blue-900/40 text-blue-300 border-blue-700/50' };
      case 'instagram':
        return { name: 'Instagram', bg: 'bg-pink-900/40 text-pink-300 border-pink-700/50' };
      case 'youtube':
        return { name: 'YouTube', bg: 'bg-red-900/40 text-red-300 border-red-700/50' };
      case 'tiktok':
        return { name: 'TikTok', bg: 'bg-teal-900/40 text-teal-300 border-teal-700/50' };
    }
  };

  return (
    <section id="social-feed-section" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden border-t border-stone-800">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Grassroots Pulse</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Social Media Feed & Live Campaign Activity
            </h2>
            
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Stay connected with <strong>{config.candidateName}</strong> on the campaign trail across Khana and Gokana. Experience real-time town hall addresses, community consultations, and grassroots mobilization moments.
            </p>
          </div>

          {/* Right Action: Live Refresh Button & Official Party Badge */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <button
              id="social-feed-refresh-btn"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-200 transition shadow-sm hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Live Feed'}</span>
            </button>

            {config.partyLogoUrl && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300">
                <img src={config.partyLogoUrl} alt="NNPP" className="w-4 h-4 rounded-full bg-white object-contain p-0.5" referrerPolicy="no-referrer" />
                <span>NNPP Official Feed</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-stone-800">
          <button
            id="social-filter-all"
            onClick={() => setSelectedPlatform('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>All Platforms ({posts.length})</span>
          </button>

          <button
            id="social-filter-twitter"
            onClick={() => setSelectedPlatform('twitter')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'twitter'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>X / Twitter</span>
          </button>

          <button
            id="social-filter-facebook"
            onClick={() => setSelectedPlatform('facebook')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'facebook'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </button>

          <button
            id="social-filter-instagram"
            onClick={() => setSelectedPlatform('instagram')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'instagram'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </button>

          <button
            id="social-filter-youtube"
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'youtube'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube Videos</span>
          </button>

          <button
            id="social-filter-tiktok"
            onClick={() => setSelectedPlatform('tiktok')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedPlatform === 'tiktok'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>TikTok</span>
          </button>
        </div>

        <CollapsibleSection
          theme="dark"
          collapsedHeightMobile="480px"
          expandLabel="View More Campaign Social Updates"
          collapseLabel="Collapse Social Feed"
          badge="Live Dispatches"
        >
          {/* Post Grid (Masonry / 3 Columns Responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const badge = getPlatformBadge(post.platform);
            const isLiked = !!likedPosts[post.id];

            return (
              <article
                key={post.id}
                id={`social-post-${post.id}`}
                className="bg-stone-800/90 rounded-2xl border border-stone-700/70 overflow-hidden flex flex-col justify-between hover:border-emerald-600/60 transition duration-300 shadow-lg hover:shadow-2xl group"
              >
                {/* Post Top Bar: Author & Platform Badge */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={post.authorAvatarUrl || '/engr-buradum-portrait.svg'}
                          alt={post.authorName}
                          className="w-10 h-10 rounded-full object-cover border border-emerald-500/50 bg-stone-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-stone-900 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">
                            {post.authorName}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-400 font-mono">
                          {post.handle}
                        </p>
                      </div>
                    </div>

                    {/* Platform Tag Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${badge.bg}`}>
                      {getPlatformIcon(post.platform, 'w-3 h-3')}
                      <span>{badge.name}</span>
                    </div>
                  </div>

                  {/* Location & Time Indicator */}
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-stone-400">
                    {post.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{post.location}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-500 shrink-0" />
                      <span>{post.timeAgo}</span>
                    </span>
                  </div>

                  {/* Post Text Content */}
                  <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Media Attachment (if present) */}
                {post.mediaUrl && (
                  <div
                    onClick={() => setActiveMediaModal(post)}
                    className="relative mx-5 mb-4 rounded-xl overflow-hidden bg-stone-900 border border-stone-700/60 cursor-pointer group/media max-h-56"
                  >
                    <img
                      src={post.mediaUrl}
                      alt="Campaign update media"
                      className="w-full h-48 sm:h-52 object-cover transition duration-300 group-hover/media:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {post.mediaType === 'video' ? (
                      <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center group-hover/media:bg-stone-950/30 transition">
                        <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg border border-white/40 group-hover/media:scale-110 transition">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-stone-950/80 rounded text-[10px] font-semibold text-stone-200">
                          Video Playback
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-stone-950/10 opacity-0 group-hover/media:opacity-100 transition flex items-center justify-center">
                        <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 text-[10px] font-medium text-white border border-stone-700">
                          Click to View Media
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Footer: Engagement Stats & Action Buttons */}
                <div className="px-5 py-3 border-t border-stone-700/70 bg-stone-900/50 flex items-center justify-between text-xs text-stone-400">
                  {/* Left: Like & Share Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      id={`like-btn-${post.id}`}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition font-medium ${
                        isLiked ? 'text-rose-400 font-semibold' : 'hover:text-rose-400'
                      }`}
                      title="Like / Applaud Update"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likesCount.toLocaleString()}</span>
                    </button>

                    <button
                      id={`repost-btn-${post.id}`}
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-1.5 hover:text-emerald-400 transition"
                      title="Shares / Reposts"
                    >
                      <Repeat className="w-4 h-4" />
                      <span>{post.sharesCount.toLocaleString()}</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-stone-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Right: Direct Platform Link */}
                  <div className="flex items-center gap-2">
                    <button
                      id={`share-btn-${post.id}`}
                      onClick={() => handleShare(post)}
                      className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition"
                      title="Share / Copy Link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-emerald-400 transition"
                      title="Open on Platform"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </CollapsibleSection>

        {/* Official Channels Banner Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-emerald-950/40 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-base font-bold text-white flex items-center justify-center lg:justify-start gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Follow the Official Campaign Across All Networks</span>
            </h3>
            <p className="text-xs text-stone-400 max-w-xl">
              Join thousands of voters and volunteers receiving direct dispatches from Engr. Buradum Baribefe Daniel and the Khana/Gokana campaign team.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              id="social-link-twitter"
              href={config.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold transition"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>@engr_buradum</span>
            </a>

            <a
              id="social-link-facebook"
              href={config.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold transition"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>buradumdaniel</span>
            </a>

            <a
              id="social-link-instagram"
              href={config.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold transition"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a
              id="social-link-youtube"
              href={config.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold transition"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube Channel</span>
            </a>
          </div>
        </div>

      </div>

      {/* Enlarged Media Modal */}
      {activeMediaModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                {getPlatformIcon(activeMediaModal.platform, 'w-4 h-4 text-emerald-400')}
                <span className="font-bold text-xs text-white">{activeMediaModal.authorName}</span>
                <span className="text-stone-400 text-xs">({activeMediaModal.timeAgo})</span>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-sm bg-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeMediaModal.mediaUrl && (
              <div className="mt-4 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 max-h-[60vh] flex items-center justify-center">
                <img
                  src={activeMediaModal.mediaUrl}
                  alt="Full preview"
                  className="w-full h-auto max-h-[55vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <p className="mt-4 text-xs sm:text-sm text-stone-200 leading-relaxed">
              {activeMediaModal.content}
            </p>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>{activeMediaModal.location || 'Khana/Gokana Constituency'}</span>
              <a
                href={activeMediaModal.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition flex items-center gap-1"
              >
                <span>View on Platform</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
