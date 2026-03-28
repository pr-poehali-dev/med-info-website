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
      {/* Сердце */}
      <path
        d="M12 20 C12 20 3 14 3 8.5 C3 5.4 5.4 3 8.5 3 C10.2 3 11.7 3.9 12 5 C12.3 3.9 13.8 3 15.5 3 C18.6 3 21 5.4 21 8.5 C21 14 12 20 12 20 Z"
        fill="currentColor"
      />
      {/* Трубка фонендоскопа — идёт из правой части сердца вниз и вправо */}
      <path
        d="M17 9 C18.5 9.5 19.5 11 19.5 12.5 C19.5 14.5 18 16 16 16 C14 16 12.5 14.5 12.5 12.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Наконечник фонендоскопа (мембрана) */}
      <circle cx="12.5" cy="12.5" r="1.3" stroke="white" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
