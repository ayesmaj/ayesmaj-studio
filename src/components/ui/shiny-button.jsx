import './shiny-button.css';

/**
 * ShinyButton — animated gold-border conic-gradient CTA button
 * Themed to AYESMAJ dark green + gold palette.
 *
 * Props:
 *   children   ReactNode   — button label
 *   onClick    function    — click handler
 *   className  string      — extra Tailwind/CSS classes
 *   as         string      — render as 'button' (default) or 'a' for link usage
 *   href       string      — used when as='a'
 */
export function ShinyButton({ children, onClick, className = '', as: Tag = 'button', href }) {
  const props = {
    className: `shiny-cta ${className}`,
    onClick,
    ...(Tag === 'a' ? { href } : {}),
  };

  return (
    <Tag {...props}>
      <span>{children}</span>
    </Tag>
  );
}
