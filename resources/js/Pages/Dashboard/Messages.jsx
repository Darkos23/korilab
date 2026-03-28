import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2, Mail, MailOpen, Building2, DollarSign, Calendar } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysDivider, StatusBar, SysWin } from "@/Components/dashboard/SystemLayout";

/* ─── Palette Washi soft ─────────────────────────────────── */
const BG     = '#F8F5EF';
const CARD   = '#FDFBF7';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.06)';
const TERRA  = '#B43028';
const TERRA2 = '#C84030';
const GOLD   = '#8A5A18';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function DashboardMessages({ admin, messages }) {
  const [collapsed, setCollapsed] = useState(false);
  const unread = messages.filter(m => !m.read_at);
  const read   = messages.filter(m => m.read_at);

  const markRead = (id) => router.patch(`/dashboard/messages/${id}/read`);
  const destroy  = (id) => { if (confirm("Supprimer ce message ?")) router.delete(`/dashboard/messages/${id}`); };

  const MessageCard = ({ msg }) => {
    const isUnread = !msg.read_at;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative p-5 transition-all duration-200 paper-card"
        style={{
          background: CARD, borderRadius: 12,
          border: `1px solid ${isUnread ? 'rgba(200,72,24,0.25)' : INK3}`,
          borderLeft: `4px solid ${isUnread ? TERRA : INK3}`,
          boxShadow: '0 2px 12px rgba(30,14,4,0.07)',
        }}
      >
        {isUnread && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
            style={{ background: TERRA, boxShadow: `0 0 8px 2px rgba(200,72,24,0.5)` }} />
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0"
            style={{
              border: isUnread ? `1px solid rgba(180,48,40,0.25)` : `1px solid ${INK3}`,
              background: isUnread ? 'rgba(180,48,40,0.07)' : 'rgba(30,14,4,0.04)',
            }}>
            {isUnread
              ? <Mail className="w-4 h-4" style={{ color: TERRA }} />
              : <MailOpen className="w-4 h-4" style={{ color: INK2 }} />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 13, color: isUnread ? INK : INK2 }}>
              {msg.name}
            </div>
            <a href={`mailto:${msg.email}`}
              style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11, color: TERRA, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = TERRA2; }}
              onMouseLeave={e => { e.currentTarget.style.color = TERRA; }}>
              {msg.email}
            </a>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3">
          {msg.company && (
            <span className="flex items-center gap-1"
              style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 10, color: INK2 }}>
              <Building2 className="w-3 h-3" /> {msg.company}
            </span>
          )}
          <span className="flex items-center gap-1"
            style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 10, color: INK2 }}>
            <DollarSign className="w-3 h-3" /> {msg.budget}
          </span>
          <span className="flex items-center gap-1"
            style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 10, color: INK2 }}>
            <Calendar className="w-3 h-3" /> {formatDate(msg.created_at)}
          </span>
        </div>

        {/* Message */}
        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: isUnread ? 400 : 300, fontSize: 13, color: isUnread ? INK : INK2, lineHeight: 1.6, marginBottom: 16 }}>
          {msg.message}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isUnread && (
            <button onClick={() => markRead(msg.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: '#FFFFFF', background: TERRA, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = TERRA2; }}
              onMouseLeave={e => { e.currentTarget.style.background = TERRA; }}>
              <MailOpen className="w-3 h-3" /> Marquer comme lu
            </button>
          )}
          <a href={`mailto:${msg.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 10, color: INK2, background: 'transparent', border: `1px solid ${INK3}`, borderRadius: 8, textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,48,40,0.25)'; e.currentTarget.style.color = TERRA; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = INK3; e.currentTarget.style.color = INK2; }}>
            <Mail className="w-3 h-3" /> Répondre
          </a>
          <button onClick={() => destroy(msg.id)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 10, color: INK2, background: 'transparent', border: `1px solid transparent`, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.color = TERRA; e.currentTarget.style.borderColor = 'rgba(180,48,40,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK2; e.currentTarget.style.borderColor = 'transparent'; }}>
            <Trash2 className="w-3 h-3" /> Supprimer
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: BG }}>
      <SLSystemBG />
      <Sidebar admin={admin} collapsed={collapsed} />

      <main className="relative z-10 flex-1 overflow-auto flex flex-col">
                <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
                <div className="p-4 md:p-8 flex-1">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 4 }}>
            Boîte de réception
          </div>
          <h1 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 24, color: INK, marginBottom: 6 }}>
            Messages
          </h1>
          <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2 }}>
            {unread.length} non lu{unread.length !== 1 ? "s" : ""} · {messages.length} au total
          </p>
        </motion.div>

        {messages.length === 0 ? (
          <SysWin title="Boîte de réception" subtitle="Aucun message reçu">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="w-12 h-12 mb-4" style={{ color: INK3 }} />
              <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 13, color: INK2 }}>
                Aucun message pour l'instant.
              </p>
              <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 11, color: INK2, marginTop: 4 }}>
                Les demandes via le formulaire apparaîtront ici.
              </p>
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
                </div>
      </main>
      <StatusBar admin={admin} />
    </div>
  );
}
