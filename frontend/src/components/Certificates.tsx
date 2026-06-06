"use client";

import { useEffect, useState } from "react";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  image: string;
  date: string;
  link?: string;
};

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "https://arya-portfolio-backend-d4hmfqbjfpfrb2dv.southindia-01.azurewebsites.net"}/api/certificates/`
        );
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading certificates...
      </div>
    );
  }

  return (
    <section className="py-20 px-6 md:px-16 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Certificates
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#111] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">
                  {cert.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  Issued by: {cert.issuer}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {cert.date}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View Certificate 
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No link available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}