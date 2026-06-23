// components/JobFeed.tsx
import { Job } from "../types/job";
import JobCard from "./JobCard";

interface JobFeedProps {
    jobs: Job[];
}

export default function JobFeed({ jobs }: JobFeedProps) {
    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl">
                No jobs match your exact search criteria. Try adjusting your keywords!
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    )
}