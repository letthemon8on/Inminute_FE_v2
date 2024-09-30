import { FolderBar } from '@/components/FolderBar/FolderBar';
import { NavBar } from '@/components/NavBar/NavBar';

export const ListPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg">
        <FolderBar />
        <section>
          <NavBar />
          List 페이지입니다.
        </section>
      </div>
    </>
  );
};
