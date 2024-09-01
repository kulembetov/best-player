export function ProgressBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (percentage: number) => void;
}) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const clickPercentage = (clickPosition / rect.width) * 100;
    onSeek(clickPercentage);
  };

  return (
    <div
      className="absolute -top-0.5 left-0 w-full bg-dark-100 cursor-pointer"
      onClick={handleClick}
    >
      <div
        style={{
          width: `${progress}%`,
        }}
        className="h-2 bg-primary relative"
      >
        <div className="absolute -top-1.5 right-0 w-5 h-5 bg-primary rounded-full border-2 border-solid border-white shadow" />
      </div>
    </div>
  );
}
