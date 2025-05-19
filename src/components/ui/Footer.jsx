import React from "react";

export default function Footer() {
  return (
    <footer className="bg-darkBg text-white text-center py-6 mt-8 border-t border-gray-700">
      <p className="text-sm">© 2025 Innofaith. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://twitter.com/innofaith" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com/innofaith" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
}