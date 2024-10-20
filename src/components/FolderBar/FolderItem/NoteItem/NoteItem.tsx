import React from 'react';
import note from '@/assets/webps/FolderBar/note.webp';
import kebabWhite from '@/assets/webps/FolderBar/kebabWhite.webp';
import dragGray from '@/assets/webps/FolderBar/dragGray.webp';

interface NoteItemProps {
  noteItem: string;
}

export const NoteItem: React.FC<NoteItemProps> = ({ noteItem }) => (
  <div className="mb-1 mr-[10px] flex justify-between items-center group hover:bg-mainBlack ml-[22px] hover:ml-[0px] py-2 rounded-[10px] cursor-pointer">
    <div className="flex items-center">
      <img src={dragGray} alt="move" className="w-2 h-[15px] ml-2 hidden group-hover:block" />
      <img className={`w-5 h-5 ml-[0] group-hover:ml-[6px] mr-[11px]`} src={note} alt="note" />
      <span className="font-[350] w-[170px] text-[14px] text-white cursor-pointer active:scale-[97%]">
        {noteItem}
      </span>
    </div>
    <img
      src={kebabWhite}
      alt="kebab menu"
      className="w-[2.5px] h-[13px] mr-[11.5px] hidden group-hover:block"
    />
  </div>
);
