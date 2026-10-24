"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ProjectDetailsModal = ({
  isOpen,
  onClose,
  title,
  type,
  description,
  details,
  tags,
  gitUrl,
  previewUrl,
  videoUrl,
  imgUrl,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  const hasGitLink = Boolean(gitUrl && gitUrl.trim() && gitUrl !== "/" && gitUrl !== "#");
  const hasPreviewLink = Boolean(previewUrl && previewUrl.trim() && previewUrl !== "/" && previewUrl !== "#");
  const hasVideoLink = Boolean(videoUrl && videoUrl.trim() && videoUrl !== "/" && videoUrl !== "#");
  const normalizedVideoUrl = hasVideoLink
    ? videoUrl.includes("youtube.com/watch?v=")
      ? videoUrl.replace("watch?v=", "embed/").split("&")[0]
      : videoUrl.includes("youtu.be/")
        ? videoUrl.replace("youtu.be/", "youtube.com/embed/").split("?")[0]
        : videoUrl
    : "";
  const visibleTags = Array.isArray(tags)
    ? tags.filter((tag) => tag && tag !== "All").filter((tag, index, array) => array.indexOf(tag) === index)
    : [];

  const renderDetailsContent = (content) => {
    if (!content) return null;

    if (typeof content === "string") {
      return <p className="whitespace-pre-line text-[#ADB7BE]">{content}</p>;
    }

    if (content.sections && Array.isArray(content.sections)) {
      return (
        <div className="space-y-6">
          {content.sections.map((section, index) => {
            if (!section) return null;

            if (section.type === "list") {
              return (
                <div key={`${section.title || "section"}-${index}`} className="space-y-3">
                  {section.title && <h3 className="text-lg font-semibold text-white">{section.title}</h3>}
                  <ul className="list-disc space-y-2 pl-5 text-[#ADB7BE]">
                    {(section.items || []).map((item, itemIndex) => (
                      <li key={`${item}-${itemIndex}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div key={`${section.title || "section"}-${index}`} className="space-y-3">
                {section.title && <h3 className="text-lg font-semibold text-white">{section.title}</h3>}
                <p className="whitespace-pre-line text-[#ADB7BE]">{section.body || section.text || ""}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return <p className="whitespace-pre-line text-[#ADB7BE]">{String(content)}</p>;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 h-full w-full bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            className="relative z-10 max-h-[85vh] w-[85vw] max-w-5xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-[#33353F] bg-[#181818] p-6 text-white shadow-2xl sm:p-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-white/70 bg-[#121212]/70 px-3 py-1.5 text-sm text-white transition hover:bg-white hover:text-[#121212]"
            >
              Close
            </button>
            <div className="mx-auto w-[85%] max-w-4xl">
              <div className="relative mb-6 mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">

                <div
                  className="h-64 w-full bg-cover bg-center md:h-80"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/60 to-black/20" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                    {type}
                  </p>
                  <h2 id="project-details-title" className="text-2xl font-bold text-white md:text-3xl">
                    {title}
                  </h2>
                </div>
              </div>

              {visibleTags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/70 bg-[#121212] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-6">
                {renderDetailsContent(details || description)}
              </div>

              {hasVideoLink && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-white">Video Demo</h3>
                  {normalizedVideoUrl.includes("youtube.com/embed/") || normalizedVideoUrl.includes("youtu.be/") ? (
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                      <iframe
                        src={normalizedVideoUrl}
                        title="Project video demo"
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video controls className="w-full rounded-xl border border-white/10 bg-black" src={normalizedVideoUrl} />
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {hasGitLink && (
                  <Link
                    href={gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md border border-[#ADB7BE] px-4 py-2 font-medium text-white hover:bg-white hover:text-black"
                  >
                    View GitHub
                  </Link>
                )}
                {hasPreviewLink && (
                  <Link
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md bg-[#ADB7BE] px-4 py-2 font-medium text-black hover:bg-white"
                  >
                    Visit Live Preview
                  </Link>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailsModal;
