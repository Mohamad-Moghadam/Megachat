import { useEffect, useRef, useState } from "react";

type Message = {
	sender: "user" | "system";
	text: string;
};

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const sendMessage = () => {
		if (!input.trim()) return;

		setMessages((prev) => [
			...prev,
			{ sender: "user", text: input },
			{ sender: "system", text: "This is just a mock response 🤖" },
		]);
		setInput("");
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
			<div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
				<div className="flex items-center gap-3 px-6 py-4 border-b bg-white">
					<div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold">
						AI
					</div>
					<div>
						<h1 className="font-semibold leading-tight">Chatbot</h1>
						<p className="text-xs text-gray-500">Online</p>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-slate-50">
					{messages.length === 0 && (
						<div className="text-center mt-24 text-gray-400">
							<p className="text-lg font-medium">👋 Welcome</p>
							<p className="text-sm mt-1">Ask me anything</p>
						</div>
					)}

					{messages.map((msg, i) => (
						<div
							key={i}
							className={`flex gap-4 ${
								msg.sender === "user" ? "justify-end" : "justify-start"
							}`}
						>
							{/* Avatar */}
							{msg.sender === "system" && (
								<div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs">
									AI
								</div>
							)}

							<div
								className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${
										msg.sender === "user"
											? "bg-blue-600 text-white rounded-br-md"
											: "bg-white text-gray-800 rounded-bl-md border"
									}`}
							>
								{msg.text}
							</div>

							{msg.sender === "user" && (
								<div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
									You
								</div>
							)}
						</div>
					))}
					<div ref={bottomRef} />
				</div>

				<div className="border-t bg-white px-6 py-4">
					<div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-3">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && sendMessage()}
							placeholder="Type your message..."
							className="flex-1 bg-transparent text-sm focus:outline-none"
						/>
						<button
							onClick={sendMessage}
							className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-5 py-2 rounded-xl"
						>
							Send
						</button>
					</div>
					<p className="text-[11px] text-gray-400 text-center mt-2">
						This is a demo chatbot UI
					</p>
				</div>
			</div>
		</div>
	);
}
