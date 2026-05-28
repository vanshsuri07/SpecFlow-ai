import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-copy-primary mb-4">Ghost AI</h1>
        <p className="text-copy-secondary mb-8">Real-time collaborative system design workspace</p>
        <Link href="/editor">
          <Button>Enter Editor</Button>
        </Link>
      </div>
    </main>
  );
}
