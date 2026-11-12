/* A quiet looping background for a page hero. Decorative: no controls, no
   sound, hidden from screen readers. The still poster is shown instead when the
   visitor prefers reduced motion (see .hero-video in global.css). */
export default function HeroVideo({ name }: { name: string }) {
  return (
    <div className="hero-video" aria-hidden="true">
      <video autoPlay muted loop playsInline preload="metadata" poster={`/${name}.jpg`} tabIndex={-1}>
        <source src={`/${name}.webm`} type="video/webm" />
        <source src={`/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
