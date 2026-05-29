import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-base px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-border-default bg-surface shadow-2xl shadow-black/20">
          <div className="grid min-h-170 grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <aside className="hidden border-r border-border-default bg-surface p-10 lg:flex lg:flex-col lg:justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-elevated text-sm">
                    S
                  </span>
                  SpecFlow
                </Link>
                <h1 className="mt-8 text-3xl font-semibold leading-tight text-copy-primary">
                  A focused workspace for collaborative system design
                </h1>
                <p className="mt-4 max-w-md text-copy-secondary">
                  Keep architecture decisions, AI-assisted editing, and team feedback in one controlled environment.
                </p>
              </div>

              <ul className="space-y-4 text-sm text-copy-secondary">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent-primary" />
                  Real-time collaboration across projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent-primary" />
                  Persistent workspace state and history
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent-primary" />
                  Secure authentication powered by Clerk
                </li>
              </ul>
            </aside>

            <section className="flex items-center justify-center bg-elevated/30 p-6 sm:p-10">
              <div className="w-full max-w-md">
                <div className="mb-6 lg:hidden">
                  <Link href="/" className="text-lg font-semibold tracking-tight">
                    SpecFlow
                  </Link>
                  <p className="mt-2 text-sm text-copy-secondary">Sign in to continue to your workspace.</p>
                </div>

                <div className="rounded-2xl border border-border-default bg-surface p-1">
                  <SignIn />
                </div>

                <p className="mt-5 text-center text-xs text-copy-muted">
                  By continuing, you agree to use this workspace according to your organization policies.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
