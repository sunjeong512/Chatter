export const ChatBubble = ({ message }) => {
    return (
      <div
        className={`flex flex-col ${
          /* message.role 이 assistant 인 경우 좌측 정렬, 그 외에는 우측 정렬 */
          message.role === "assistant" ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`flex items-center ${
            message.role === "assistant"
              ? "rounded-3xl bg-neutral-200 text-neutral-900"
              : "rounded-3xl bg-[#84cc16]/80 text-white"
          } rounded-2xl px-3 py-2  max-w-[67%] whitespace-pre-wrap`}
          style={{ overflowWrap: "anywhere" }}
        >
          {message.content}
        </div>
      </div>
    );
  };

