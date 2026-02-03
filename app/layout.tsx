import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "App Template",
  description: "Login-free, mobile-first template with local storage."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <main>
          <header className="header">
            <div>
              <div className="badge">Login-free</div>
              <div className="header-title">量産できる公開テンプレ</div>
            </div>
            <nav className="nav">
              <Link href="/">トップ</Link>
              <Link href="/about">About</Link>
            </nav>
          </header>
          {children}
          <footer className="footer">Data stored locally · Built with Next.js</footer>
        </main>
      </body>
    </html>
  );
}
