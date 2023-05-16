// 입력창, 로딩 3점 표시, 채팅 말풍선 컴포넌트 가져오기
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatBubble } from "./ChatBubble";


export const Chat = ({ messages, loading, onSendMessage }) => {
  return (
    <>
      <div className="flex flex-col rounded-3xl px-1 mt-2 sm:px-1 sm:mt-2 border 
      bg-white border-1 border-neutral-300 mx-auto">
        {/* messages 의 내용을 ChatBubble 컴포넌트를 통해 출력 */}
        {messages.map((message, index) => (
          <div key={index} className="my-2 sm:my-2 pl-2 py-2 pr-2 sm:py-2 sm:pl-2 sm:pr-2">
            <ChatBubble message={message} />
          </div>
        ))}

        {/* loading 이 true 면 ChatLoader 를 표시 */}
        {loading && (
          <div className="my-2 sm:my-2 pl-2 py-2 sm:py-2 sm:pl-2">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-4 py-2 sm:py-2 px-2 sm:px-2 bottom-[56px] left-0 w-full">
          {/* 채팅 입력창을 표시, 전송 액션을 실행하는 onSend 함수를 넘겨준다 */}
          <ChatInput onSendMessage={onSendMessage} />
        </div>
      </div>
    </>
  );
};

