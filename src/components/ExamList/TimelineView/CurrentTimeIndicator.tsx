type CurrentTimeIndicatorProps = {
  position: number;
};

export function CurrentTimeIndicator({ position }: CurrentTimeIndicatorProps) {
  return (
    <div 
      className="absolute top-0 bottom-8 w-0.5 bg-primary"
      style={{ left: `${position}%` }}
    >
      <div className="w-2 h-2 rounded-full bg-primary -translate-x-[3px]" />
    </div>
  );
}