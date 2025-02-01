"use client";
import { Review } from "@/payload-types";
// import { StarIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const ReviewComponent = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  // Check if the content is clamped
  useEffect(() => {
    if (contentRef.current) {
      const isOverflowing =
        contentRef.current.scrollHeight > contentRef.current.offsetHeight;
      setIsClamped(isOverflowing);
    }
  }, [review.content]);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex-col">
      <div className="flex justify-between">
        <span className="flex items-center gap-1">
          {Array.from({ length: review.rating }, (_, index) => (
            <StarIcon key={index} className="h-4 w-4 text-yellow-500" />
          ))}
        </span>
        <span>{review.createdAt.split("T")[0]}</span>
      </div>
      <h3 className="font-bold">{review.title}</h3>
      <p
        ref={contentRef}
        className={`overflow-hidden transition-all ${
          isExpanded
            ? "line-clamp-none"
            : "line-clamp-4" /* Clamp to 4 lines when not expanded */
        }`}
        style={{ display: "-webkit-box", WebkitBoxOrient: "vertical" }}
      >
        {review.content}
      </p>
      {isClamped && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-blue-600 hover:underline dark:text-blue-400"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default ReviewComponent;
