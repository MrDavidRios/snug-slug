import React, { useEffect, useState } from "react";

interface PersonCardMessageBoxProps {
  message: string;
}

export const PersonCardMessageBox: React.FC<PersonCardMessageBoxProps> = ({ message }) => {

  const [truncatedMessage, setTruncatedMessage] = useState(message);

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("font-size", "16"); // Set to your desired font size
    textElement.textContent = message;
    svg.appendChild(textElement);
    document.body.appendChild(svg);

    // Check if the text width is wider than the SVG width
    const maxWidth = 220; // Set to the width of your SVG where the text should be truncated
    if (textElement.getComputedTextLength() > maxWidth) {
      let truncated = message;
      while (textElement.getComputedTextLength() > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
        textElement.textContent = truncated + "...";
      }
      setTruncatedMessage(truncated + "...");
    }

    // Clean up
    document.body.removeChild(svg);
  }, [message]);



  return (
    <>
      <svg width="250" height="63" viewBox="0 0 285 63" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Existing SVG elements */}
        <text
        x="50%"
        y="40%"
        fontSize="12"
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        alignmentBaseline="central"
      >
        {truncatedMessage}
      </text>
      <mask id="path-1-inside-1_11_2332" fill="white">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71573 0 0 6.71573 0 15V35.9122C0 44.1965 6.71572 50.9122 15 50.9122H24.1288L30.622 62.9668L37.1153 50.9122H270C278.284 50.9122 285 44.1965 285 35.9122V15C285 6.71573 278.284 0 270 0H15Z"/>
</mask>
<path d="M24.1288 50.9122L25.0092 50.438L24.726 49.9122H24.1288V50.9122ZM30.622 62.9668L29.7416 63.441L30.622 65.0755L31.5024 63.441L30.622 62.9668ZM37.1153 50.9122V49.9122H36.5181L36.2349 50.438L37.1153 50.9122ZM1 15C1 7.26802 7.26801 1 15 1V-1C6.16344 -1 -1 6.16345 -1 15H1ZM1 35.9122V15H-1V35.9122H1ZM15 49.9122C7.26801 49.9122 1 43.6442 1 35.9122H-1C-1 44.7488 6.16344 51.9122 15 51.9122V49.9122ZM24.1288 49.9122H15V51.9122H24.1288V49.9122ZM31.5024 62.4926L25.0092 50.438L23.2484 51.3865L29.7416 63.441L31.5024 62.4926ZM36.2349 50.438L29.7416 62.4926L31.5024 63.441L37.9957 51.3865L36.2349 50.438ZM270 49.9122H37.1153V51.9122H270V49.9122ZM284 35.9122C284 43.6442 277.732 49.9122 270 49.9122V51.9122C278.837 51.9122 286 44.7488 286 35.9122H284ZM284 15V35.9122H286V15H284ZM270 1C277.732 1 284 7.26802 284 15H286C286 6.16345 278.837 -1 270 -1V1ZM15 1H270V-1H15V1Z" fill="#979797" mask="url(#path-1-inside-1_11_2332)"/>
      </svg>
    </>
  );
};
