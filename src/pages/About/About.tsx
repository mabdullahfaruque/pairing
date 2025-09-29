import { useVersion } from '../../hooks/useVersion';
import { motion } from 'framer-motion';

const aboutVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const AboutPage = () => {
  const { version, loading, error } = useVersion();
  return (
    <motion.section
      className="p-8 rounded-2xl border border-token shadow surface max-w-md mx-auto text-center animate-fade-in"
      initial="hidden"
      animate="visible"
      variants={aboutVariants}
      aria-label="about section"
    >
      <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">About</h1>
      <p className="text-lg text-subtle mb-4">This is a cheerful React + Vite + Tailwind starter with accessible design tokens.</p>
      <p className="text-base text-subtle">Built with accessibility and best practices in mind.</p>
      <div className="mt-6 space-y-2">
        {loading && <span className="text-subtle">Loading version...</span>}
        {error && <span className="text-[var(--color-danger)] font-semibold">{error}</span>}
        {version && (
          <span className="font-semibold text-[var(--color-accent)]" aria-label="Application version">Version: {version}</span>
        )}
      </div>
    </motion.section>
  );
};
