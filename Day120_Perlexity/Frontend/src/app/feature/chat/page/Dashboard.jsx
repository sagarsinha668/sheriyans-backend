import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "../hook/useChat";

const Dashboard = () => {
  const chat = useChat();
  const socketRef = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    { id: "m1", sender: "user", text: "Hi! Can you help me with something today?" },
    { id: "m2", sender: "ai", text: "Sure! Ask me anything and I'll help you." },
    { id: "m3", sender: "user", text: "Draft a quick plan for building a chat UI." },
    {
      id: "m4",
      sender: "ai",
      text: "Start with a sidebar for chats, a scrollable message list, and an input bar with a send button. Then wire it to your socket/API.",
    },
  ]);

  const bottomRef = useRef(null);

  // Placeholder list for the left sidebar.
  const chatTitles = useMemo(
    () => ["Chat title", "Chat title", "Chat title", "Chat title", "Chat title"],
    []
  );

  useEffect(() => {
    socketRef.current = chat.initializedSocketConnection();
    return () => socketRef.current?.disconnect?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Dummy AI reply (replace with socket/API call later).
    const aiMessage = {
      id: `a_${Date.now() + 1}`,
      sender: "ai",
      text: "Thanks! This is a dummy AI response. Wire me to your backend for real messages.",
    };

    window.setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full text-white" style={{ backgroundColor: "#1d1d1d" }}>
      <div className="mx-auto h-screen max-w-screen-2xl flex">
        {/* Sidebar */}
        <aside
          className="w-80 flex flex-col border-r"
          style={{ borderColor: "#1db8cc", borderWidth: "1px" }}
        >
          <div className="p-4">
            <div className="mb-2 text-sm font-semibold" style={{ color: "#1db8cc" }}>
              Perplexity
            </div>
            <div className="text-xs" style={{ color: "#a7a7a7" }}>
              Chats
            </div>
          </div>

          <div className="px-4 pb-4 overflow-y-auto space-y-2 flex-1 pr-1">
            {chatTitles.map((title, idx) => (
              <div
                key={`${title}-${idx}`}
                className="rounded-lg border px-3 py-2 text-sm bg-transparent"
                style={{ borderColor: "#3a3a3a" }}
              >
                {title}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          <header className="px-6 py-4 border-b" style={{ borderColor: "#2d2d2d" }}>
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Chat</div>
              <div className="text-xs" style={{ color: "#a7a7a7" }}>
                Dummy UI
              </div>
            </div>
          </header>

          {/* Message area */}
          <section className="flex-1 overflow-y-auto px-6 py-4" style={{ backgroundColor: "#0f0f0f" }}>
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="rounded-xl px-4 py-2 text-sm max-w-[72%] whitespace-pre-wrap wrap-break-word"
                    style={{
                      borderColor: "#3a3a3a",
                      backgroundColor: m.sender === "user" ? "#111111" : "#0b0b0b",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </section>

          {/* Input area */}
          <footer className="px-6 py-4 border-t" style={{ borderColor: "#2d2d2d" }}>
            <div
              className="flex items-end gap-3 rounded-lg"
              style={{ backgroundColor: "#0f0f0f", border: "1px solid #2d2d2d" }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Chat input area"
                className="flex-1 resize-none p-3 text-sm outline-none"
                style={{ backgroundColor: "transparent", color: "#f0f0f0" }}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-3 text-sm font-semibold rounded-tr-lg rounded-br-lg transition-all duration-200 disabled:opacity-40"
                style={{ backgroundColor: "#1db8cc", color: "#0f0f0f" }}
              >
                Send
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
