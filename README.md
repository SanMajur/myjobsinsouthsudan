# myjobsinsouthsudan

Connecting job seekers and employers in South Sudan

**Live:**  Pending

### **Stack**
- **Framework**: Next.js 14 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deploy**: Vercel

### **Building in Public**

**Started**: May 22, 2026
**Build schedule**: Mon–Fri 9:30–11:00am CAT, Sat–Sun 10:00am–2:00pm CAT with breaks
**Current**: Day 1 - Job Types + TypeScript Fundamentals
**Progress**: 16 commits shipped. See [LEARNINGS.md](https://github.com/SanMajur/myjobsinsouthsudan/blob/main/LEARNINGS.md)

### **Roadmap**

**Week 1: Core Domain + UI**
- [x] Day 0: Setup Next.js + TS + Tailwind
- [x] Day 1: Job types + postedAt + isRemote + employmentType
- [x] Day 2: JobCard component + list view
- [x]Day 3: Filters: Remote + Full-time
- [x] Day 4: Deploy to Vercel

**Week 2: Database + Real Data**
- [x] Day 5: Supabase setup + Job table schema
- [x] Day 6: Seed data + fetch jobs
- [x] Day 7: Server Components + loading states

**Week 3: Employer Flow**
- [x] Day 8: Post Job form + validation
- [x] Day 9: Insert to Supabase + RLS
- [x] Day 10: Form errors + success states

**Week 4: Auth + MVP**
- [x] Day 11: Supabase Auth + middleware
- [x] Day 12: Protected /post-job route
- [x] Day 13: User profiles + my-jobs
- [x] Day 14: MVP live + share

### **Why**
Job boards in South Sudan have broken data models. Titles mixed with locations. String dates. No filters.

Building the standard: proper types, ISO dates, boolean flags, union types. TS prevents runtime bugs before users in Juba see them.

### **Local Setup**
```bash
git clone https://github.com/SanMajur/myjobsinsouthsudan.git
cd myjobsinsouthsudan
npm install
npm run dev

```
### Contributing
This is a learning project. Follow daily progress in [LEARNINGS.md](https://github.com/SanMajur/myjobsinsouthsudan/blob/main/LEARNINGS.md). PRs welcome after MVP.
