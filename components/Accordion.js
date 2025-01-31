import { useState } from "react";

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Rectangle",
      content: "Next.js is a React framework that enables server-side rendering and static site generation.",
    },
    {
      title: "Why use Next.js?",
      content: "It provides better SEO, performance, and developer experience.",
    },
    {
      title: "How to install Next.js?",
      content: "Run `npx create-next-app@latest my-app` in your terminal.",
    },
  ];

  return (
    <div className="accordion">
      {accordionItems.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className={`accordion-header ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <span className="icon">{openIndex === index ? "−" : "+"}</span>
          </button>
          <div
            className="accordion-content"
            style={{ maxHeight: openIndex === index ? "100px" : "0" }}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}

      <style jsx>{`
        .accordion {
          width: 100%;
          max-width: 500px;
          margin: auto;
        }
        .accordion-item {
          border-bottom: 1px solid #ddd;
        }
        .accordion-header {
          color: #ededed;
          width: 100%;
          padding: 15px;
          font-size: 18px;
          font-weight: bold;
          text-align: left;
          border: none;
          background: rgba(48, 48, 48, 0.95);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s;
        }
        .accordion-header:hover {
          background: rgba(48, 48, 48, 0.95);
        }
        .accordion-content {
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          padding: 0 15px;
        }
        .accordion-content p {
          margin: 10px 0;
          font-size: 16px;
        }
        .icon {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}