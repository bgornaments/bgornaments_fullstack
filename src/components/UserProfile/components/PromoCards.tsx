import React from "react";
import { WebsiteIcon, InstagramIcon, ShareIcon } from "./Icons";

const PromoCards: React.FC = () => {
    return (
        <div className="promo-cards-container mt-8 lg:ml-4 space-y-6">
            {/* Referral Card */}
            <div className="referral-card border border-[#E0AE2A]/30 rounded-xl p-4 bg-white/95 backdrop-blur-sm shadow-sm hover:border-[#EA0E2A] hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-lg text-[#6B5B3E] mb-1">
                            Share the Luxury
                        </h2>
                        <p className="text-sm text-[#8E7C5A]">
                            Refer friends and earn exclusive rewards
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-[#F8F5ED] px-4 py-2 rounded-lg border border-[#E0AE2A]/20">
                            <span className="font-mono text-[#6B5B3E] text-sm">ABC@123</span>
                        </div>
                        <button className="bg-[#F8F5ED] hover:bg-[#EEE6D5] text-[#6B5B3E] px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                            <ShareIcon className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Social Media Card */}
            <div className="social-card border border-[#E0AE2A]/30 rounded-xl p-4 bg-white/95 backdrop-blur-sm shadow-sm hover:border-[#EA0E2A] hover:shadow-md transition-all">
                <div className="text-center md:text-left">
                    <h2 className="font-serif text-lg text-[#6B5B3E] mb-1">
                        Our Social Media (Temp....)
                    </h2>
                    <p className="text-sm text-[#8E7C5A] mb-4">
                        Stay connected with us on various platforms.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="font-serif text-md text-[#6B5B3E]">Work</h3>
                        <p className="text-sm text-[#8E7C5A]">
                            Stay updated with our latest collections. Visit our website.
                        </p>
                        <a
                            href="https://kinmitra.in"
                            aria-label="Visit Kinmitra Website"
                            className="p-2 hover:bg-[#F8F5ED] rounded-full transition-colors"
                        >
                            <WebsiteIcon className="w-6 h-6 text-[#6B5B3E] hover:text-[#8E7C5A]" />
                        </a>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <h3 className="font-serif text-md text-[#6B5B3E]">Social</h3>
                        <p className="text-sm text-[#8E7C5A]">Connect with us!</p>
                        <a
                            href="https://instagram.com"
                            aria-label="Follow us on Instagram"
                            className="p-2 hover:bg-[#F8F5ED] rounded-full transition-colors"
                        >
                            <InstagramIcon className="w-6 h-6 text-[#6B5B3E] hover:text-[#8E7C5A]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoCards;
