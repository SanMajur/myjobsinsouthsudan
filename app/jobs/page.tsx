'use client';

import { Suspense, useEffect, useRef } from "react";
import { useJobsWorkspace } from "@/hooks/useJobsWorkspace";
import JobCard from "@/components/JobCard";
import JobsWorkspaceHeader from "@/components/JobsWorkspaceHeader";
import JobDetailPanel from "@/components/JobDetailPanel";
import WorkspacePagination from "@/components/WorkspacePagination";

function JobsWorkspaceContent() {
  const {
    displayedJobs,
    filteredCount,
    loading,
    error,
    urlWhat,
    urlWhere,
    selectedJob,
    currentPage,
    setCurrentPage,
    totalPages,
    handleWorkspaceSearch,
    handleJobSelection,
  } = useJobsWorkspace();

  const detailPaneRef = useRef<HTMLDivElement>(null);

  // Scroll preview pane back to top when active job selections shift
  useEffect(() => {
    if (detailPaneRef.current) {
      detailPaneRef.current.scrollTop = 0;
    }
  }, [selectedJob?.id]);

  return (
    <div className="w-full min-h-screen bg-slate-50/30">
      
      {/* Renders SearchHero via encapsulated abstraction boundaries */}
      <JobsWorkspaceHeader
        initialWhat={urlWhat}
        initialWhere={urlWhere}
        onSearch={handleWorkspaceSearch}
      />

      <main className="mx-auto max-w-7xl px-4 py-8">
        
        <div className="mb-8 flex justify-between items-center text-xs text-gray-500 font-medium px-1">
          <span>Found <strong className="text-slate-800 font-bold">{filteredCount}</strong> matching openings</span>
          {totalPages > 1 && <span>Page {currentPage} of {totalPages}</span>}
        </div>

        {/* 💻 DESKTOP GRID LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Feed Column */}
          <section className="lg:col-span-5 space-y-1">
            {loading ? (
              <p className="text-sm text-gray-400 animate-pulse py-6 text-center">Refreshing job feed indexes...</p>
            ) : error ? (
              <p className="text-sm text-red-500 text-center py-6">⚠️ {error}</p>
            ) : displayedJobs.length === 0 ? (
              <p className="text-sm text-gray-400 py-12 text-center border border-dashed rounded-xl bg-white">No matching positions found.</p>
            ) : (
              displayedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobSelection(job)}
                  className={`rounded-xl transition-all p-1 ${
                    selectedJob?.id === job.id ? "bg-blue-600/10 ring-2 ring-blue-600 " : "hover:bg-gray-100/50"
                  }`}
                >
                  {/* Stripped link layouts out of cards inside workspace grid to prioritize click functions */}
                  <div className="pointer-events-none">
                    <JobCard job={job} />
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Right Presentation Viewport */}
          <section 
            ref={detailPaneRef}
            className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto"
          >
            <JobDetailPanel selectedJob={selectedJob} />
          </section>
        </div>

        {/* 📱 MOBILE VIEWPORT STREAM */}
        <div className="block lg:hidden space-y-2">
          {loading ? (
            <p className="text-center text-sm font-medium text-gray-500 animate-pulse py-10">Syncing indexes...</p>
          ) : error ? (
            <p className="text-center text-sm text-red-500 bg-red-50 p-4 rounded-xl">⚠️ {error}</p>
          ) : displayedJobs.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-10">No matches found.</p>
          ) : (
            displayedJobs.map((job) => (
              <div key={job.id} onClick={() => handleJobSelection(job)}>
                <JobCard job={job} />
              </div>
            ))
          )}
        </div>

        {/* Workspace Nav controls */}
        <WorkspacePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm py-20 text-gray-400 animate-pulse">Initializing Layout...</p>}>
      <JobsWorkspaceContent />
    </Suspense>
  );
}