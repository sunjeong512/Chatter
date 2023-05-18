// 입력창, 로딩 3점 표시, 채팅 말풍선 컴포넌트 가져오기
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatBubble } from "./ChatBubble";


export const Chat = ({ messages, loading, onSendMessage, handleReset, setMessages, previousMessages }) => {
  const ResetCancel = () => {
    setMessages(previousMessages);
  };


  return (
    <>
      <div className="flex flex-col rounded-3xl px-1 mt-2 sm:px-1 sm:mt-2 border bg-white border-1 border-neutral-300 mx-auto">
        {messages.map((message, index) => (
          <div key={index} className="my-2 sm:my-2 pl-2 py-2 pr-2 sm:py-2 sm:pl-2 sm:pr-2">
            <ChatBubble message={message} />
          </div>
        ))}
        {loading && (
          <div className="my-2 sm:my-2 pl-2 py-2 sm:py-2 sm:pl-2">
            <ChatLoader />
          </div>
        )}
        <div className="mt-4 sm:mt-4 py-2 sm:py-2 px-2 sm:px-2 bottom-[56px] left-0 w-full">
          <ChatInput onSendMessage={onSendMessage} />
        </div>
      </div>

      <button onClick={handleReset}
        className="rounded-3xl ml-2 mt-3 py-1.5 px-6 text-white bg-[#84cc16]/80 hover:animate-pulse">
          초기화</button>

      <button onClick={ResetCancel}
        className="rounded-3xl ml-2 mt-3 py-1.5 px-6 text-[#84cc16]/80 bg-white border border-[#84cc16]/80 hover:animate-pulse">
          초기화 취소</button> 

    </>
  );
};
