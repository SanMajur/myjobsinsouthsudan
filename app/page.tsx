'use client';

import Link from "next/link"; 
import { useRouter } from "next/navigation";
import SearchHero from "@/components/SearchHero";
import JobFeed from "@/components/JobFeed";
import FeedHeader from "@/components/FeedHeader";
import { useJobs } from "../hooks/useJobs";

export default function HomePage() {
  const router = useRouter();
  const { jobs, loading, error, activeWhat, activeWhere, handleClearFilters } = useJobs({ limit: 5 });

  const handleHomepageSearch = (what: string, where: string) => {
    const params = new URLSearchParams();
    if (what) params.set("what", what.trim());
    if (where) params.set("where", where.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <SearchHero onSearch={handleHomepageSearch} />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <FeedHeader 
          activeWhat={activeWhat} 
          activeWhere={activeWhere} 
          onClear={handleClearFilters} 
        />
        
        {loading ? (
          <p className="text-center text-sm font-medium text-gray-500 animate-pulse py-10">
            Fetching active listings from the database...
          </p>
        ) : error ? (
          <p className="text-center text-sm font-semibold text-red-500 bg-red-50 p-4 border border-red-200 rounded-xl">
            ⚠️ {error}
          </p>
        ) : (
          <div className="space-y-6">
            <JobFeed jobs={jobs} />
            <div className="mt-8 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                Explore All Job Openings →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
