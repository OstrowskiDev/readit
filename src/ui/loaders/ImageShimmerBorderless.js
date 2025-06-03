export function ImageShimmerBorderless() {
  return (
    <svg
      className="image-shimmer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <defs>
        <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="8%" stopColor="#bfdbfe" />
          <stop offset="18%" stopColor="#93c5fd" />
          <stop offset="23%" stopColor="#bfdbfe" />
          <stop offset="43%" stopColor="#bfdbfe" />
          <stop offset="53%" stopColor="#93c5fd" />
          <stop offset="68%" stopColor="#bfdbfe" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-0.6 0"
            to="1 0"
            dur="1s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <path
        d="M323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
        fill="none"
        stroke="url(#shimmerGradient)"
        strokeWidth="4"
      />
    </svg>
  )
}
