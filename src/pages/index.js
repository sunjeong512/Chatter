import { Chat } from "@/components/Chat";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  // 메시지를 전송 중인지 여부를 저장하는 상태
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 메시지 목록을 끝으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 메시지를 전송하는 함수
  const handleSend = async (message) => {
    // message 를 받아 메시지 목록에 추가
    // message 형태 = { role: "user", content: string }
    // ChatInput.js 26번째 줄 참고
    const updatedMessages = [...messages, message];
    // console.log(updatedMessages);
    // console.log(updatedMessages.slice(-6));

    setMessages(updatedMessages);
    // 메시지 전송 중임을 표시
    setLoading(true);

    // /api/chat 에 메시지 목록을 전송하고 응답을 받음
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 메시지 목록의 마지막 6개만 전송
        messages: updatedMessages.slice(-6),
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    // 응답을 JSON 형태로 변환
    // 비동기 API 를 사용하여 응답을 받기 때문에 await 사용
    const result = await response.json();

    if (!result) {
      return;
    }

    // console.log(result);

    // 로딩 상태를 해제하고, 메시지 목록에 응답을 추가
    setLoading(false);
    setMessages((messages) => [...messages, result]);
  };

  // 메시지 목록을 초기화하는 함수
  // 처음 시작할 메시지를 설정
  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "자네 내 연구실에는 무슨 일인가?",
      },
    ]);
  };

  // 메시지 목록이 업데이트 될 때마다 맨 아래로 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 컴포넌트가 처음 렌더링 될 때 메시지 목록을 초기화
  useEffect(() => {
    handleReset();
  }, []);

  return (
    <>
      <Head>
        <title>교수연구실</title>
        <meta name="description" content="A Simple Chatbot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen bg-neutral-100">
      <div className="flex flex-col rounded-3xl px-4 py-1.5 mt-12 mb-0 sm:px-4 sm:py-1.5 sm:mb-0 bg-white border border-1 border-neutral-200 
      text-center outline outline-rounded-3xl outline-2 outline-offset-2 outline-[#a3e635] mx-auto w-48">
          <div className="font-semibold text-lg text-neutral-700" >
            <a
              className="flex-initial text-align:center hover:opacity-50"
              href="https://code-scaffold.vercel.app"
            >
              486동 1004호
            </a>
          </div>
        </div>

        <div className="flex-1 sm:px-16 pb-4 sm:pb-4 px-4 sm:px-4">
          <div className="max-w-[800px] mx-auto mt-12 sm:mt-12">
            {/*
              메인 채팅 컴포넌트
              messages: 메시지 목록
              loading: 메시지 전송 중인지 여부
              onSendMessage: 메시지 전송 함수
            */}
            <Chat
              messages={messages}
              loading={loading}
              onSendMessage={handleSend}
            />
            {/* 메시지 목록의 끝으로 스크롤하기 위해 참조하는 엘리먼트 */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center"></div>
      </div>
    </>
  );
}

