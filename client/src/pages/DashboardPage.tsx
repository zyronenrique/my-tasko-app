import SkeletonCard from '../components/SkeletonCard';
import { useTaskStats } from '../hooks/useTasks';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  const skeletonCard = Array.from({ length: 4 }, (_, index) => (
    <SkeletonCard key={`card-${index}`} />
  ));
  const { data: stats, isPending, error } = useTaskStats();
  return (
    <main>
      <div>
        <Header />
        <section className='grid gap-4 md:grid-cols-4 p-4'>
          {isPending ? (
            skeletonCard
          ) : (
            <>
              <div className="flex flex-col text-left items-start justify-between p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <div className="pb-2">
                  <div className="text-sm font-medium">Total Tasks</div>
                </div>
                <div>
                  <div className="flex gap-1 items-center text-2xl font-bold">
                    {stats?.total}
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-left items-start justify-between p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <div className="pb-2">
                  <div className="text-sm font-medium">In Complete</div>
                </div>
                <div>
                  <div className="flex gap-1 items-center text-2xl font-bold">
                    {stats?.incomplete}
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-left items-start justify-between p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <div className="pb-2">
                  <div className="text-sm font-medium">Complete</div>
                </div>
                <div className="w-full">
                  <div className="text-2xl font-bold">{stats?.complete}</div>
                </div>
              </div>
              <div className="flex flex-col text-left items-start justify-between p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <div className="pb-2">
                  <div className="text-sm font-medium">Overdue</div>
                </div>
                <div className="w-full">
                  <div className="text-2xl font-bold">{stats?.overdue}</div>
                </div>
              </div>
            </>
          )}
        </section>
        <section className='grid gap-4 grid-cols-1 px-4'>
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default DashboardPage;
