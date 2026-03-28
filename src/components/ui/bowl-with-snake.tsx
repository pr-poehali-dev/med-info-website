export default function BowlWithSnake({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Чаша */}
      <path
        d="M5 17 C5 20 8 22 12 22 C16 22 19 20 19 17 L17 17 C17 19 14.8 20.5 12 20.5 C9.2 20.5 7 19 7 17 Z"
        fill="currentColor"
      />
      {/* Ножка чаши */}
      <rect x="11" y="17" width="2" height="2" fill="currentColor" />
      {/* Основание */}
      <rect x="8" y="19" width="8" height="1.2" rx="0.6" fill="currentColor" />
      {/* Посох (вертикальная линия) */}
      <rect x="11.3" y="2" width="1.4" height="16" rx="0.7" fill="currentColor" />
      {/* Змея — тело (S-образная кривая вокруг посоха) */}
      <path
        d="M12 13 C9 13 7.5 11.5 8.5 10 C9.5 8.5 11 8.5 12 8 C13 7.5 14 7 13.5 5.5 C13 4 11.5 3.8 10.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Голова змеи */}
      <ellipse cx="10" cy="4.2" rx="1.1" ry="0.8" fill="currentColor" transform="rotate(-20 10 4.2)" />
      {/* Язык */}
      <path
        d="M9.2 3.6 L8.4 3.0 M9.2 3.6 L8.6 2.8"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
