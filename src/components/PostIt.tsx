import React from "react";
import "../styles/PostIt.css";

interface PostItProps {
  note?: string;
  link?: string;
  icon?: React.ReactNode;
}

const PostIt: React.FC<PostItProps> = ({ note, link, icon }) => {
  return (
    <div className="sticky-container">
      <div className="sticky-outer">
        <div className="sticky">
          <svg width="0" height="0">
            <defs>
              <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                <path d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0" />
              </clipPath>
            </defs>
          </svg>
          <a href={link} target="_blank">
            <div
              className="sticky-content"
              style={{ clipPath: "url(#stickyClip)" }}
            >
              {icon && <span className="sticky-icon">{icon}</span>}
              {note}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostIt;
