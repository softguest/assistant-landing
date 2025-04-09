"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

import LandingSections from "@/components/LandingSections";
import { MouseEventHandler } from "react";

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen">
      <LandingSections />

      {/* Chat Icon */}
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="rounded-full size-14 p-2 shadow-[0_0_15px_#ff0059] bg-black border border-fuchsia-600 hover:scale-105 transition-all duration-200"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-16 text-fuchsia-400" />
              ) : (
                <ArrowDownCircleIcon className="text-fuchsia-400" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border border-fuchsia-700 bg-black text-white shadow-[0_0_30px_#ff0059]/40 rounded-2xl backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-fuchsia-700">
                <CardTitle className="text-lg font-extrabold text-fuchsia-400">
                  Chat With Softguest Support 👨🏾‍💻
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="px-2 py-0 text-white hover:text-fuchsia-400"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[300px] pr-4 custom-scrollbar">
                  {messages?.length === 0 && (
                    <div className="w-full mt-32 text-gray-500 flex justify-center items-center gap-3">
                      No message yet
                    </div>
                  )}

                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 mt-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`inline-block p-2 rounded-lg max-w-[80%] ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white self-end"
                            : "bg-zinc-900 text-fuchsia-300"
                        } shadow-[0_0_10px_#ff0059]/40`}
                    >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ inline, children, ...props }) {
                              return inline ? (
                                <code {...props} className="bg-gray-200 px-1 rounded">
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...props}
                                  className="bg-gray-200 px-2 py-1 rounded overflow-x-auto"
                                  style={{ width: "100%" }} 
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 space-y-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-4 space-y-1">{children}</ol>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="w-full flex justify-center items-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-primary" />
                      <button
                        className="underline"
                        type="button"
                        onClick={stop}
                      >
                        Abort
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="w-full flex justify-center items-center gap-3">
                      <div>An error occurred: {error.message}</div>
                      <button
                        className="underline"
                        type="button"
                        onClick={reload as MouseEventHandler<HTMLButtonElement>}
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1 bg-zinc-800 border border-fuchsia-600 text-white placeholder-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500 rounded-xl"
                    placeholder="Type a message..."
                  />
                  <Button
                    type="submit"
                    className="size-9 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl shadow-[0_0_10px_#ff0059]"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}