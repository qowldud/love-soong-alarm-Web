export const MapCanvas = () => {
  return (
    <div className="absolute inset-0 z-10">
      <div
        className="w-full h-full bg-center bg-cover opacity-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200')",
          filter: "grayscale(100%) brightness(1.15)",
        }}
      />
    </div>
  );
};
