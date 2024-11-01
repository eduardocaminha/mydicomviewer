import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2" href="/">
              <span className="text-xl font-bold">DICOM Viewer</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center px-8">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name, ID, or description..."
                  className="h-10 pl-10"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button>Upload DICOM</Button>
          </div>
        </div>
      </div>
    </header>
  );
}