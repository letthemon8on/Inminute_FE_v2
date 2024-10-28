import { useState, useEffect } from 'react';
import { Logo } from '@/components/FolderBar/Logo/Logo';
import { Logout } from '@/components/FolderBar/Logout/Logout';
import { UnassignedNotes } from '@/components/FolderBar/UnassignedNotes/UnassignedNotes';
import { NewFolderInput } from '@/components/FolderBar/NewFolderInput/NewFolderInput';
import { FolderItem } from '@/components/FolderBar/FolderItem/FolderItem';
import { addFolder } from '@/apis/Folder/addFolder';
import { getFolder } from '@/apis/Folder/getFolder';
import { Folder, Note } from '@/components/FolderBar/dto';


export const FolderBar: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [unassignedNotes, setUnassignedNotes] = useState<Note[]>([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<boolean[]>(folders.map(() => false));
  const [hoveredFolderName, setHoveredFolderName] = useState<number | null>(null); // 폴더 이름 호버 상태 관리
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [activeFolderIndex, setActiveFolderIndex] = useState<number | null>(null); // 활성화된 폴더 인덱스 상태

  const handleFolderClick = (index: number) => {
    setActiveFolderIndex((prevIndex) => (prevIndex === index ? null : index)); // 클릭한 폴더 인덱스 활성화
  };

  const fetchData = async () => {
    const data = await getFolder(); // 폴더와 노트 데이터 가져오기
    if (data?.isSuccess) {
      const fetchedFolders = data.result.folders.map(
        (folder: { id: number; name: string; create_at: Date; notes: string }) => ({
          id: folder.id,
          name: folder.name,
          create_at: folder.create_at,
          notes: folder.notes,
        })
      );
      setFolders(fetchedFolders);
      setUnassignedNotes(data.result.notes); // API로부터 받은 노트 데이터 설정
      setExpandedFolders(fetchedFolders.map(() => false)); // 모든 폴더의 확장 상태 초기화
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 폴더 및 노트 데이터 가져오기
  }, []);

  // 드래그 시작
  const handleDragStart = (index: number) => {
    setDraggedIndex(index); // 드래그 시작 시 인덱스 저장
  };

  // 드래그 drop
  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;

    const updatedFolders = [...folders];
    const [draggedFolder] = updatedFolders.splice(draggedIndex, 1); // 드래그된 폴더 삭제
    updatedFolders.splice(index, 0, draggedFolder); // 드랍된 위치에 삽입

    setFolders(updatedFolders); // 업데이트된 폴더 배열 저장
    setDraggedIndex(null); // 드래그 인덱스 초기화
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // 드래그 오버 시 기본 동작 방지
  };

  // 폴더 toggle
  const toggleFolder = (index: number) => {
    setExpandedFolders((prevExpandedFolders) => {
      const updatedFolders = [...prevExpandedFolders];
      updatedFolders[index] = !updatedFolders[index]; // 열리고 접히는 상태 toggle
      return updatedFolders;
    });
  };

  // 폴더 삭제 핸들러
  const handleDeleteFolder = (index: number) => {
    setFolders((prevFolders) => prevFolders.filter((_, i) => i !== index)); // 해당 폴더 삭제
  };

  // 폴더 이름 변경 함수
  const handleRenameFolder = (index: number, newName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder, i) => (i === index ? { ...folder, name: newName } : folder))
    );
  };

  // 폴더 추가
  const handleAddFolder = async () => {
    if (newFolderName.trim() !== '' && !isAddingFolder) {
      setIsAddingFolder(true);
      const result = await addFolder(newFolderName.trim());
      if (result) {
        setFolders((prevFolders) => [
          ...prevFolders,
          { id: result.id, name: newFolderName.trim(), create_at: result.create_at, notes: [] },
        ]);
      }
      setIsAddingFolder(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFolder();
    }
  };

  // 폴더가 추가된 후 입력 값 초기화
  useEffect(() => {
    if (isAddingFolder) {
      setNewFolderName('');
      setIsAddingFolder(false);
      setExpandedFolders((prev) => [...prev, false]); // 새 폴더에 대해 확장 여부를 추가
    }
  }, [folders, isAddingFolder]);

  return (
    <aside>
      <div className="w-[280px] h-full bg-subBlack flex flex-col font-nanum leading-[22px]">
        <Logo />

        <section className="flex-1 overflow-y-auto mt-3 scrollbar-hide">
          {folders.map((folderItem, index) => (
            <FolderItem
              key={index}
              index={index}
              folderItem={folderItem}
              expanded={expandedFolders[index]}
              hoveredFolderName={hoveredFolderName}
              toggleFolder={toggleFolder}
              setHoveredFolderName={setHoveredFolderName}
              onRenameFolder={handleRenameFolder}
              onDeleteFolder={handleDeleteFolder}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              isActive={activeFolderIndex === index} // 현재 활성화된 폴더 인덱스와 비교
              setActiveFolder={() => handleFolderClick(index)} // 클릭 핸들러 전달
            />
          ))}
          <UnassignedNotes notes={unassignedNotes} />
          <NewFolderInput
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
            handleKeyDown={handleKeyDown}
          />
        </section>

        <Logout />
      </div>
    </aside>
  );
};
