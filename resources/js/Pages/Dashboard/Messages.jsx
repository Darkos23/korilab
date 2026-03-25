import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2, Mail, MailOpen, Building2, DollarSign, Calendar } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import WhatsAppFloat from "@/Components/WhatsAppFloat";
import { SystemGrid, SystemOrbs, ParticleNetwork, SysDivider, StatusBar, SysWin } from "@/Components/dashboard/SystemLayout";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function DashboardMessages({ admin, messages }) {
  const unread = messages.filter(m => !m.read_at);
  const read   = messages.filter(m => m.read_at);

  const markRead = (id) => router.patch(`/dashboard/messages/${id}/read`);
  const destroy  = (id) => { if (confirm("Supprimer ce message ?")) router.delete(`/dashboard/messages/${id}`); };

  const MessageCard = ({ msg }) => {
    const isUnread = !msg.read_at;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className={`relative rounded-xl border p-5 transition-all duration-200 ${
          isUnread
            ? "border-[#00a8ff]/30 bg-[#00a8ff]/[0.04]"
            : "border-white/5 bg-white/[0.01]"
        }`}
      >
        {isUnread && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#00a8ff] shadow-[0_0_8px_2px_rgba(0,168,255,0.8)] animate-pulse" />
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0 ${
            isUnread ? "border-[#00a8ff]/30 bg-[#00a8ff]/10" : "border-white/10 bg-white/5"
          }`}>
            {isUnread
              ? <Mail className="w-4 h-4 text-[#00a8ff]" />
              : <MailOpen className="w-4 h-4 text-white/30" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className={`font-bold text-sm ${isUnread ? "text-white" : "text-white/50"}`}>{msg.name}</div>
            <a href={`mailto:${msg.email}`} className="text-xs text-[#00a8ff]/60 hover:text-[#00a8ff] transition-colors font-mono">
              {msg.email}
            </a>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3">
          {msg.company && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-white/30">
              <Building2 className="w-3 h-3" /> {msg.company}
            </span>
          )}
          <span className="flex items-center gap-1 text-[10px] font-mono text-white/30">
            <DollarSign className="w-3 h-3" /> {msg.budget}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-white/20">
            <Calendar className="w-3 h-3" /> {formatDate(msg.created_at)}
          </span>
        </div>

        {/* Message */}
        <p className={`text-sm leading-relaxed mb-4 ${isUnread ? "text-white/70" : "text-white/30"}`}>
          {msg.message}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isUnread && (
            <button onClick={() => markRead(msg.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono
                border border-[#00a8ff]/20 text-[#00a8ff]/60 hover:border-[#00a8ff]/50 hover:text-[#00a8ff]
                hover:bg-[#00a8ff]/[0.06] transition-all duration-200">
              <MailOpen className="w-3 h-3" /> Marquer comme lu
            </button>
          )}
          <a href={`mailto:${msg.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono
              border border-white/10 text-white/30 hover:border-[#00a8ff]/20 hover:text-[#00a8ff]/60
              hover:bg-[#00a8ff]/[0.03] transition-all duration-200">
            <Mail className="w-3 h-3" /> Répondre
          </a>
          <button onClick={() => destroy(msg.id)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono
              border border-transparent text-white/20 hover:border-red-500/20 hover:text-red-400/60
              hover:bg-red-500/[0.04] transition-all duration-200">
            <Trash2 className="w-3 h-3" /> Supprimer
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0e2f4a] flex relative overflow-hidden">
      <SystemGrid />
      <SystemOrbs />
      <ParticleNetwork />
      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff]/40" />
            <span className="text-[10px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Inbox — Messages clients</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-1">
            Messages <span className="text-[#00a8ff]">reçus</span>
          </h1>
          <p className="text-xs font-mono text-white/20">
            {unread.length} non lu{unread.length !== 1 ? "s" : ""} · {messages.length} au total
          </p>
        </motion.div>

        {messages.length === 0 ? (
          <SysWin title="INBOX" subtitle="Aucun message reçu" delay={0.1}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="w-12 h-12 text-[#00a8ff]/10 mb-4" />
              <p className="text-white/20 text-sm font-mono">Aucun message pour l'instant.</p>
              <p className="text-white/10 text-xs font-mono mt-1">Les demandes via le formulaire apparaîtront ici.</p>
            </div>
          </SysWin>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <SysDivider label={`Non lus (${unread.length})`} />
                <div className="space-y-3 mb-8">
                  {unread.map((msg, i) => (
                    <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <MessageCard msg={msg} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {read.length > 0 && (
              <>
                <SysDivider label={`Lus (${read.length})`} />
                <div className="space-y-3">
                  {read.map((msg, i) => (
                    <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <MessageCard msg={msg} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

      </main>
      <WhatsAppFloat />
      <StatusBar admin={admin} />
    </div>
  );
}
