import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../css/app.css';

/* ── Flash Système SL ────────────────────────────────────── */
function SystemFlash({ show }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="flash"
                    initial={{ top: '-2%', opacity: 1 }}
                    animate={{ top: '102%', opacity: [1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, #00a8ff, #7df9ff, #00a8ff, transparent)',
                        boxShadow: '0 0 18px 4px rgba(0,168,255,0.8)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </AnimatePresence>
    );
}

/* ── Protection images ───────────────────────────────────── */
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

/* ── App root ────────────────────────────────────────────── */
function Root({ App, props }) {
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            setFlash(true);
            setTimeout(() => setFlash(false), 400);
        };

        document.addEventListener('inertia:start', handleStart);
        return () => document.removeEventListener('inertia:start', handleStart);
    }, []);

    return (
        <>
            <SystemFlash show={flash} />
            <App {...props} />
        </>
    );
}

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<Root App={App} props={props} />);
    },
});
