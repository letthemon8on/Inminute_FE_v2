import { NoteTopBar } from '@/components/Note/NoteMain/NoteTopBar/NoteTopBar';
import { NoteTitle } from '@/components/Note/NoteMain/NoteTitle/NoteTitle';
import { ParticipantList } from '@/components/Note/NoteMain/ParticipantList/ParticipantList';
import { OneLineSummary } from '@/components/Note/NoteMain/OneLineSummary/OneLineSummary';
import { useEffect, useState } from 'react';
import { NoteDetail, SummaryByMember, ToDoByMember } from '@/pages/Note/dto';
import { useSocket } from '@/context/SocketContext';
import { getNoteDetail, getSummaryBySpeaker, getToDoList } from '@/apis/Note/getNote';
import { Loading } from '@/components/Common/Loading/Loading';
import { SummaryBySpeakerList } from '@/components/Note/NoteMain/SummaryBySpeakerList/SummaryBySpeakerList';
import { ToDoList } from '@/components/Note/NoteMain/ToDoList/ToDoList';
import chat from '@/assets/webps/Note/chatBlackSharp.webp';
import { QnAModal } from '@/components/Note/NoteMain/QnAModal/QnAModal';

interface NoteMainProps {
  initialNoteData: NoteDetail | null;
  uuid: string;
}

export const NoteMain: React.FC<NoteMainProps> = ({ initialNoteData, uuid }) => {
  const [noteData, setNoteData] = useState<NoteDetail | null>(initialNoteData);
  const [summaryBySpeaker, setSummaryBySpeaker] = useState<SummaryByMember[]>([]);
  const [toDoByMembers, setToDoByMembers] = useState<ToDoByMember[]>([]);

  const [isQnAModalOpen, setIsQnAModalOpen] = useState(false); // Q&A 모달 상태
  const [participants, setParticipants] = useState<string[]>([]); // participants 상태 선언
  const [isMeetingEnded, setIsMeetingEnded] = useState(false); // 회의 종료 상태
  const [isStart, setIsStart] = useState(false); // 회의 상태
  const { messages } = useSocket();

  // // 초기 로딩 시 nicknameList 데이터를 불러오기
  // useEffect(() => {
  //   const loadNoteData = async () => {
  //     try {
  //       const noteDetail = await getNoteDetail(uuid); // uuid로 노트 상세 정보 가져오기
  //       setNoteData(noteDetail.result); // noteData 상태 업데이트
  //       setParticipants(noteDetail.result.nicknameList); // nicknameList를 participants에 설정
  //     } catch (error) {
  //       console.error('Failed to load participants from note detail:', error);
  //     }
  //   };
  //   loadNoteData();
  // }, [uuid]);

  // DB에서 데이터를 가져오는 함수
  const fetchDataFromDB = async () => {
    try {
      const [noteDetail, summaryResponse, toDoResponse] = await Promise.all([
        getNoteDetail(uuid), // 회의 상세 데이터
        getSummaryBySpeaker(uuid), // 화자별 요약
        getToDoList(uuid), // To-Do 리스트
      ]);

      // 상태 업데이트
      setNoteData(noteDetail.result);
      setParticipants(noteDetail.result.nicknameList);
      setSummaryBySpeaker(summaryResponse.result.noteJoinMemberResponses);
      setToDoByMembers(toDoResponse.result.toDoResponseList);
    } catch (error) {
      console.error('DB에서 데이터 로드 중 오류 발생:', error);
    }
  };

  // 컴포넌트 로드 시 또는 회의 종료 후 데이터 로드
  useEffect(() => {
    fetchDataFromDB();
  }, [uuid]);

  // 소켓에서 JOIN 메시지 수신 처리
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.type === 'JOIN' && latestMessage.nickname) {
        setParticipants((prevParticipants) => {
          // 중복 참가자 확인 후 추가
          if (!prevParticipants.includes(latestMessage.nickname)) {
            return [...prevParticipants, latestMessage.nickname];
          }
          return prevParticipants;
        });
      }
    }
  }, [messages]);

  // NoteTitle에서 summary를 업데이트
  const handleSummaryUpdate = (
    summary: string,
    summaryByMemberList: SummaryByMember[],
    toDoResponseList: ToDoByMember[]
  ) => {
    setIsMeetingEnded(true);
    setNoteData((prevNoteData) => ({
      ...prevNoteData!,
      summary,
      summaryByMemberList,
      toDoResponseList,
    }));
    setSummaryBySpeaker(summaryByMemberList);
    setToDoByMembers(toDoResponseList);
  };

  const handleQnAClick = () => setIsQnAModalOpen(true); // Q&A 버튼 클릭 핸들러
  const handleCloseQnAModal = () => setIsQnAModalOpen(false); // Q&A 모달 닫기 핸들러

  return (
    <main className="relative flex flex-1 flex-col">
      <NoteTopBar noteData={noteData} />
      <NoteTitle
        noteData={noteData}
        uuid={uuid}
        onSummaryUpdate={handleSummaryUpdate}
        setIsMeetingEnded={setIsMeetingEnded}
        setIsStart={setIsStart}
      />
      <div className="overflow-y-auto scrollbar-hide">
        <ParticipantList participants={participants} />
        {isStart && <p className="ml-12 text-[16px] font-[500] mt-[18px] text-gray05">회의 중..</p>}
        {isMeetingEnded && !noteData?.summary ? ( // 회의 종료 후 summary가 업데이트될 때까지 Loading 표시
          <div className="flex flex-col justify-center items-center h-[50vh]">
            <div style={{ transform: 'scale(2)' }}>
              <Loading />
            </div>
            <p className="text-mainBlack font-[500] text-[15px] leading-[24px] mt-[22px]">
              회의 내용을 불러오고 있어요
            </p>
          </div>
        ) : summaryBySpeaker.length > 0 || toDoByMembers.length > 0 ? ( // DB 데이터가 있을 때
          <>
            <OneLineSummary noteData={noteData} />
            <SummaryBySpeakerList summaryBySpeaker={summaryBySpeaker} />
            <ToDoList toDoByMembers={toDoByMembers} />
          </>
        ) : noteData?.summary ? ( // 소켓 데이터를 기반으로 렌더링
          <>
            <OneLineSummary noteData={noteData} />
            <SummaryBySpeakerList noteData={noteData} />
            <ToDoList noteData={noteData} />
          </>
        ) : null}
      </div>

      {isMeetingEnded && (
        <button
          onClick={handleQnAClick}
          className={`absolute bottom-7 right-6 w-14 h-14  ${
            isQnAModalOpen ? 'bg-main04' : 'hover:bg-main02 bg-white'
          } flex justify-center items-center rounded-full transition-all duration-200 ease-in-out`}
          style={{
            boxShadow: '0px 0px 6px 0px rgba(96, 96, 96, 0.16)',
          }}
        >
          <img src={chat} alt="chat bot" className="w-[30px] h-[30px] ml-[2px] mb-[2px]" />
        </button>
      )}
      {isQnAModalOpen && <QnAModal onClose={handleCloseQnAModal} uuid={uuid} />}
    </main>
  );
};
