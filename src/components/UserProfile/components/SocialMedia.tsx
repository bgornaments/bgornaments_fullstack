import React from "react";
import { InstagramIcon, WebsiteIcon } from "./Icons";

const SocialMedia: React.FC = () => {
    return (
        <div className="social-card border border-[#E0AE2A]/30 rounded-xl p-4 bg-white/95 shadow-sm hover:border-[#EA0E2A] hover:shadow-md transition-all">
            <h2 className="font-serif text-lg text-[#6B5B3E] mb-1">
                Our Social Media (Temp...)
            </h2>
            <p className="text-sm text-[#8E7C5A] mb-4">Stay connected with us on various platforms.</p>
            <div className="flex flex-col items-center gap-4">
                <a href="https://kinmitra.in" className="p-2 hover:bg-[#F8F5ED] rounded-full transition-colors">
                    <WebsiteIcon className="w-6 h-6 text-[#6B5B3E]" />
                </a>
                <a href="https://instagram.com" className="p-2 hover:bg-[#F8F5ED] rounded-full transition-colors">
                    <InstagramIcon className="w-6 h-6 text-[#6B5B3E]" />
                </a>
            </div>
        </div>
    );
};

export default SocialMedia;
