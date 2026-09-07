"use client";

import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { COPILOT_RESPONSES, KPI, VEHICLES, SHIPMENTS, ROADS, ALERTS } from "@/lib/demoData";
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  CornerDownLeft, 
  HelpCircle, 
  RefreshCw, 
  ShieldAlert, 
  Truck, 
  MapPin, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  quickActions?: { label: string; href: string }[];
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-0",
      sender: "copilot",
      text: "👋 **Welcome to NER-SHIELD AI Copilot.**\n\nI am your real-time logistics intelligence assistant for the North Eastern Region. I monitor **8 states**, **15 fleet vehicles**, and **active hazard feeds**.\n\nAsk me anything about route accessibility, delayed medicine shipments, or run disaster what-if scenarios.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: "View Control Tower", href: "/dashboard" },
        { label: "What-If Simulator", href: "/simulator" }
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_QUERIES = [
    "Which shipments are at risk?",
    "Show blocked routes",
    "Which vehicles are delayed?",
    "Safest route to Tawang",
    "Districts lowest accessibility",
    "What if NH-27 is blocked?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // AI Response generation
    setTimeout(() => {
      const normalized = query.toLowerCase().replace(/[^a-z0-9]/g, " ");
      let replyText = "";
      let actions: { label: string; href: string }[] | undefined = undefined;

      if (normalized.includes("shipment") && (normalized.includes("risk") || normalized.includes("critical") || normalized.includes("delay"))) {
        replyText = COPILOT_RESPONSES["which shipments are at risk"];
        actions = [{ label: "View Shipments Board", href: "/shipments" }];
      } else if (normalized.includes("block") || normalized.includes("closed") || (normalized.includes("road") && normalized.includes("status"))) {
        replyText = COPILOT_RESPONSES["show blocked routes"];
        actions = [{ label: "View Road Accessibility", href: "/accessibility" }];
      } else if (normalized.includes("vehicle") && (normalized.includes("delay") || normalized.includes("risk") || normalized.includes("stuck"))) {
        replyText = COPILOT_RESPONSES["which vehicles are delayed"];
        actions = [{ label: "Fleet Telemetry", href: "/fleet" }];
      } else if (normalized.includes("tawang") || normalized.includes("safest")) {
        replyText = COPILOT_RESPONSES["safest route to tawang"];
        actions = [{ label: "Compare Alternative Routes", href: "/routes" }];
      } else if (normalized.includes("district") || normalized.includes("low") || normalized.includes("vulnerable")) {
        replyText = COPILOT_RESPONSES["districts lowest accessibility"];
        actions = [{ label: "Districts Matrix", href: "/districts" }];
      } else if (normalized.includes("nh27") || normalized.includes("nh 27") || normalized.includes("what if")) {
        replyText = COPILOT_RESPONSES["what if nh27 blocked"];
        actions = [{ label: "Open Scenario Simulator", href: "/simulator" }];
      } else {
        replyText = `Based on live telemetry from the **NER Command Center**:\n\n- **Active Fleet:** ${KPI.activeVehicles} vehicles transmitting GPS\n- **Monitored Corridors:** 14 highways across 8 states\n- **Critical Hazards:** ${KPI.criticalIncidents} active road disruptions\n- **Recommendation:** Query specific routes (e.g. *NH-27*, *MDR-1*) or shipments (*SHP-MED-2041*) for deep AI analysis.`;
        actions = [
          { label: "View Live Map", href: "/dashboard" },
          { label: "Check Alerts", href: "/alerts" }
        ];
      }

      const copilotMsg: Message = {
        id: `c-${Date.now()}`,
        sender: "copilot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions
      };

      setMessages(prev => [...prev, copilotMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <AppLayout title="Autonomous AI Logistics Copilot" subtitle="Natural language queries, predictive disruption forecasting, and decision support powered by multimodal NER models">
      <div className="p-6 h-[calc(100vh-80px)] flex flex-col gap-4">
        
        {/* Main Chat Container */}
        <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          
          {/* Top Status Bar */}
          <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  NER-SHIELD Logistics LLM
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Telemetry Active
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Connected to 8 State Transit Nodes & IMD Weather Feeds</p>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Chat
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map(msg => {
              const isCopilot = msg.sender === "copilot";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isCopilot ? "" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isCopilot 
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-900/40" 
                      : "bg-slate-700 text-slate-200"
                  }`}>
                    {isCopilot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2">
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isCopilot 
                        ? "bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-tl-sm shadow-md" 
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-sm shadow-md shadow-cyan-950/30"
                    }`}>
                      <div className="whitespace-pre-wrap">
                        {msg.text.split("\n").map((line, idx) => {
                          // Simple bold parser
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <p key={idx} className={line === "" ? "h-2" : "mb-1"}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return <strong key={pIdx} className="font-semibold text-cyan-300">{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                            </p>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick action buttons attached to bot messages */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.quickActions.map(action => (
                          <Link
                            key={action.label}
                            href={action.href}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <span>{action.label}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className={`text-[10px] text-slate-500 px-1 ${isCopilot ? "" : "text-right"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-lg items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800/80 p-3 rounded-2xl rounded-tl-sm border border-slate-700/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Query Suggestion Chips */}
          <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested:
            </span>
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs shrink-0 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask about road status, delayed trucks, alternate passes, or Tawang accessibility..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-cyan-950/40"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
