import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button variant="outline" onClick={toggle}>
      Toggle theme
    </Button>
  );
}
