"use client";

type Props = {
  tags: string[];
  className?: string;
};

export default function EvTags({ tags, className = "" }: Props) {
  return (
    <div className={`ev-tags-container ${className}`}>
      {tags.map((tag, index) => (
        <div key={index} className="ev-tag">
          {tag}
        </div>
      ))}
    </div>
  );
}
