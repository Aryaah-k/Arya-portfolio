"use client";

import { useMemo } from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { useFetch } from "@/app/hooks/useFetch";
import { ENDPOINTS } from "@/app/services/endpoints";

// Explicit cleanly decoupled fallback base address extraction
const BACKEND_BASE_URL = "http://127.0.0.1:8000";

interface AboutResponse {
  id: number;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
}

interface UserProfileResponse {
  adminImage?: string;
  resumeUrl?: string;
}

export default function Home() {
  // Pulling historical content blocks explicitly from your Django About App endpoint
  const { data, loading } = useFetch<AboutResponse[]>(ENDPOINTS.ABOUT.LIST);
  const { data: profileData, loading: profileLoading } = useFetch<UserProfileResponse>(ENDPOINTS.USERS.PROFILE);

  const heroData = useMemo(() => data?.[0] ?? null, [data]);

  // ================= SECURE URL STRUCTURING ENGINE =================
  const adminImageUrl = useMemo(() => {
    // Prefer the User's profile image, fallback to About's hero image
    const rawImage = profileData?.adminImage || heroData?.hero_image;

    // 1. Fallback placeholder if database field is blank
    if (!rawImage) {
      return "/fallback-placeholder.png"; 
    }

    // 2. Safely accept absolute production links
    if (rawImage.startsWith("http://") || rawImage.startsWith("https://") || rawImage.startsWith("//")) {
      return rawImage;
    }

    // 3. Extract the clean path string without accidental duplication patterns
    // Strip leading slashes to manage clean concatenation
    let cleanPath = rawImage.replace(/^\//, "");

    // If Django sends back just 'profile/image.png' without the media prefix, add it manually
    if (!cleanPath.startsWith("media/")) {
      cleanPath = `media/${cleanPath}`;
    }

    // Construct the explicit target URL: http://127.0.0.1:8000/media/profile/filename.png
    return `${BACKEND_BASE_URL}/${cleanPath}`;
  }, [heroData, profileData]);

  const statusLoading = loading || profileLoading;
  const adminTitle = heroData?.hero_title || undefined;
  const adminSubtitle = heroData?.hero_subtitle || undefined;
  const adminResume = profileData?.resumeUrl || "/resume.pdf";

  return (
    <div className="space-y-24 md:space-y-32 pb-24">

      {/* ================= HERO SECTION ================= */}
      <section id="home" className="scroll-mt-20">
        <Hero
          adminImage={adminImageUrl}
          adminTitle={adminTitle}
          adminSubtitle={adminSubtitle}
          adminResume={adminResume}
          isLoading={statusLoading}
        />
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section id="skills" className="scroll-mt-20">
        <Skills />
      </section>

    </div>
  );
}