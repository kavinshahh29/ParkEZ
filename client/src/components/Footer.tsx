export function Footer() {
    return (
      <footer className="py-6 md:px-8 md:py-0 border-t-2 mt-20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Kris Patel and Kavin Shah with ❤️
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/Kris0011/ParkEZ"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    )
  }