import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B5ED7",
          borderRadius: "50%"
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="24" r="7" fill="#F4B400" />
          <path
            d="M32 44 C 22 36, 16 30, 16 24 C 16 19, 20 15, 25 15 C 28 15, 30.5 17, 32 19.5 C 33.5 17, 36 15, 39 15 C 44 15, 48 19, 48 24 C 48 30, 42 36, 32 44 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M14 44 C 14 44, 18 50, 26 52 C 30 53, 34 53, 38 52 C 46 50, 50 44, 50 44"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
