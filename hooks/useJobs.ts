import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { fetchFilteredJobs } from "@/lib/services/jobService";

// Define an options configuration interface
interface UseJobsOptions {
  limit?: number;
}

export function useJobs(options?: UseJobsOptions) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeWhat, setActiveWhat] = useState("");
  const [activeWhere, setActiveWhere] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        
        let data = await fetchFilteredJobs(activeWhat, activeWhere);
        
        // If a limit is specified, slice the array safely here
        if (options?.limit) {
          data = data.slice(0, options.limit);
        }
        
        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error context inside useJobs hook:", err);
          setError("Failed to fetch jobs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [activeWhat, activeWhere, options?.limit]); // Added limit to dependency tracking

  const handleSearchSubmit = (what: string, where: string) => {
    setActiveWhat(what);
    setActiveWhere(where);
  };

  const handleClearFilters = () => {
    setActiveWhat("");
    setActiveWhere("");
  };

  return {
    jobs,
    loading,
    error,
    activeWhat,
    activeWhere,
    handleSearchSubmit,
    handleClearFilters,
  };
}