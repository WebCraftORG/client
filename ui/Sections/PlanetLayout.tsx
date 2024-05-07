import React, { ReactNode } from "react";
import { Button } from "@/ui/ui/button";
import RoverDisplaySection from "./RoverDisplaySection";

interface PlanetLayoutProps {
    children: ReactNode;
};

export function PlanetLayout({ children }: PlanetLayoutProps) {
    return (
        <>
            <Header />
            <MainContent>
                {children}
                <RoverDisplaySection />
            </MainContent>
            <Footer />
        </>
    );
};

interface HeaderProps {
  planetName: string;
};

export function Header({ planetName }: HeaderProps) {
  return (
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur-md dark:bg-gray-950/80 dark:text-gray-50">
          <div className="flex items-center gap-4">
              <Button className="rounded-full p-2" size="icon" variant="outline">
                  <CompassIcon className="h-5 w-5" />
              </Button>
              <Button className="rounded-full p-2" size="icon" variant="outline">
                  <ArrowLeftIcon className="h-5 w-5" />
              </Button>
          </div>
          <div className="flex flex-col items-center">
              <div className="inline-block rounded-lg bg-gray-100/80 px-3 py-1 text-sm backdrop-blur-md dark:bg-gray-800/80">
                  Home
              </div>
              <h1 className="text-lg font-semibold">{planetName}</h1>
          </div>
          <div className="flex items-center gap-4 relative">
              <Button className="rounded-full p-2" size="icon" variant="outline">
                  <ArrowRightIcon className="h-5 w-5" />
              </Button>
              <Button className="rounded-full p-2" size="icon" variant="outline">
                  <BookOpenIcon className="h-5 w-5" />
              </Button>
          </div>
      </header>
  );
};

interface MainContentProps {
    children: ReactNode;
    backgroundImage?: string;
}

export function MainContent({ children, backgroundImage }: MainContentProps) {
    return (
        <main className="pt-20 pb-20 md:pb-0" style={{ backgroundImage }}>
            {children}
            <RoverDisplaySection />
        </main>
    );
}

export function Footer() {
    return (
      <>
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-center bg-white/80 px-4 shadow-sm backdrop-blur-md dark:bg-gray-950/80 dark:text-gray-50 md:hidden">
          <Button className="rounded-full p-2" size="icon" variant="outline">
            <HomeIcon className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Button>
        </footer>
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur-md dark:bg-gray-950/80 dark:text-gray-50 hidden md:flex">
          <div className="flex items-center gap-4">
            <Button className="rounded-full p-2" size="icon" variant="outline">
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
            <Button className="rounded-full p-2" size="icon" variant="outline">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </nav>
      </>
    );
};

// Icons components remain unchanged