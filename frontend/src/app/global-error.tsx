"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              <h1 className="text-xl font-bold">Application Error</h1>
            </div>
            
            <p className="text-muted-foreground">
              A critical error occurred in the application. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-4">
                <details className="text-sm">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="bg-muted p-3 rounded-md overflow-auto">
                    <p className="font-mono text-xs break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="font-mono text-xs text-muted-foreground mt-2">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                </details>
              </div>
            )}

            <button
              onClick={() => reset()}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
