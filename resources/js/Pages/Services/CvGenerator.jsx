import { useState, useCallback } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Plus, X, Check,
  User, Briefcase, GraduationCap, Palette, CreditCard,
  Download, Eye,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import {
  Document, Page, Text, View, StyleSheet, Font, pdf,
} from "@react-pdf/renderer";

/* ─── Themes ─────────────────────────────────────────── */
const THEMES = [
  {
    id: "classic",
    label: "Classic",
    desc: "Sidebar navy & or, style corporate premium",
    preview: { sidebar: "#1a1a2e", accent: "#c9a84c", bg: "#ffffff", text: "#1a1a2e" },
  },
  {
    id: "modern",
    label: "Modern",
    desc: "Header bleu pleine largeur, two-column",
    preview: { sidebar: "#0057ff", accent: "#0057ff", bg: "#f0f4ff", text: "#0a0a1a" },
  },
  {
    id: "dark",
    label: "Dark",
    desc: "Fond nuit, accents cyan électrique",
    preview: { sidebar: "#0a1628", accent: "#00c8ff", bg: "#060d1a", text: "#c8d8f0" },
  },
  {
    id: "minimal",
    label: "Minimal",
    desc: "Typographie pure, indigo, double règle",
    preview: { sidebar: "#ffffff", accent: "#6366f1", bg: "#ffffff", text: "#111111" },
  },
];

const LANGUAGE_LEVELS = ["Débutant", "Intermédiaire", "Courant", "Bilingue/Natif"];
const STEPS = [
  { id: 1, label: "Profil",      icon: User },
  { id: 2, label: "Parcours",    icon: Briefcase },
  { id: 3, label: "Compétences", icon: GraduationCap },
  { id: 4, label: "Thème",       icon: Palette },
  { id: 5, label: "Paiement",    icon: CreditCard },
];

const INIT = {
  prenom: "", nom: "", titre: "",
  email: "", telephone: "", localisation: "",
  portfolio: "", resume: "",
  experiences: [{ poste: "", entreprise: "", periode: "", description: "" }],
  formations: [{ diplome: "", etablissement: "", annee: "" }],
  competences: [],
  langues: [{ langue: "", niveau: "Courant" }],
  theme: "modern",
};

/* ─── PDF Documents ──────────────────────────────────── */

function ClassicPdf({ data }) {
  const s = StyleSheet.create({
    page:       { flexDirection: "row", backgroundColor: "#ffffff", fontFamily: "Helvetica" },
    sidebar:    { width: "30%", backgroundColor: "#1a1a2e", flexDirection: "column" },
    sbTop:      { backgroundColor: "#c9a84c", padding: "22 14 16", alignItems: "center" },
    sbInitial:  { width: 48, height: 48, borderRadius: 24, backgroundColor: "#1a1a2e", borderWidth: 2, borderColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
    sbInitTxt:  { color: "#c9a84c", fontSize: 18, fontFamily: "Helvetica-Bold" },
    sbName:     { color: "#1a1a2e", fontSize: 11, fontFamily: "Helvetica-Bold", textAlign: "center" },
    sbTitre:    { color: "rgba(26,26,46,0.65)", fontSize: 6.5, textTransform: "uppercase", letterSpacing: 1, marginTop: 4, textAlign: "center" },
    sbBody:     { padding: "14 12", flex: 1 },
    sbSec:      { color: "#c9a84c", fontSize: 6.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, borderBottomWidth: 1, borderBottomColor: "rgba(201,168,76,0.3)", paddingBottom: 3, marginBottom: 7, marginTop: 14 },
    sbLabel:    { color: "rgba(201,168,76,0.7)", fontSize: 6, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 5 },
    sbContact:  { color: "rgba(255,255,255,0.65)", fontSize: 7.5, marginTop: 1 },
    skillRow:   { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    skillBullet:{ color: "rgba(201,168,76,0.6)", fontSize: 8, marginRight: 5 },
    skillName:  { color: "rgba(255,255,255,0.8)", fontSize: 7.5 },
    langName:   { color: "rgba(255,255,255,0.85)", fontSize: 8, fontFamily: "Helvetica-Bold" },
    langLevel:  { color: "rgba(201,168,76,0.7)", fontSize: 7, marginBottom: 4 },
    main:       { flex: 1, padding: "26 22" },
    mainHdr:    { borderBottomWidth: 3, borderBottomColor: "#c9a84c", paddingBottom: 12, marginBottom: 18 },
    mainName:   { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#1a1a2e", letterSpacing: -0.5 },
    mainTitre:  { fontSize: 8.5, color: "#c9a84c", fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 5 },
    sec:        { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#1a1a2e", textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 1.5, borderBottomColor: "#1a1a2e", paddingBottom: 3, marginBottom: 10, marginTop: 18 },
    resumeTxt:  { fontSize: 9, color: "#4a4a6a", lineHeight: 1.65 },
    expRole:    { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1a1a2e" },
    expRow:     { flexDirection: "row", justifyContent: "space-between" },
    expCompany: { fontSize: 8.5, color: "#c9a84c", fontFamily: "Helvetica-Bold", marginTop: 2 },
    expPeriod:  { fontSize: 7.5, color: "#9a9ab0" },
    expDesc:    { fontSize: 8, color: "#4a4a6a", marginTop: 3, lineHeight: 1.55 },
    expBlock:   { marginBottom: 10 },
    dot:        { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#c9a84c", marginRight: 6, marginTop: 3 },
    formRole:   { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#1a1a2e" },
    formSchool: { fontSize: 8, color: "#c9a84c", fontFamily: "Helvetica-Bold", marginTop: 2 },
    formBlock:  { marginBottom: 8 },
  });
  const exps = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const langs = data.langues.filter(l => l.langue);

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.sidebar}>
        <View style={s.sbTop}>
          <View style={s.sbInitial}><Text style={s.sbInitTxt}>{(data.prenom||"?").charAt(0).toUpperCase()}</Text></View>
          <Text style={s.sbName}>{data.prenom} {data.nom}</Text>
          {data.titre ? <Text style={s.sbTitre}>{data.titre}</Text> : null}
        </View>
        <View style={s.sbBody}>
          {(data.email||data.telephone||data.localisation||data.portfolio) ? <>
            <Text style={s.sbSec}>Contact</Text>
            {data.email ? <><Text style={s.sbLabel}>Email</Text><Text style={s.sbContact}>{data.email}</Text></> : null}
            {data.telephone ? <><Text style={s.sbLabel}>Téléphone</Text><Text style={s.sbContact}>{data.telephone}</Text></> : null}
            {data.localisation ? <><Text style={s.sbLabel}>Localisation</Text><Text style={s.sbContact}>{data.localisation}</Text></> : null}
            {data.portfolio ? <><Text style={s.sbLabel}>Portfolio</Text><Text style={s.sbContact}>{data.portfolio}</Text></> : null}
          </> : null}
          {data.competences.length > 0 ? <>
            <Text style={s.sbSec}>Compétences</Text>
            {data.competences.map((sk, i) => (
              <View key={i} style={s.skillRow}>
                <Text style={s.skillBullet}>›</Text>
                <Text style={s.skillName}>{sk}</Text>
              </View>
            ))}
          </> : null}
          {langs.length > 0 ? <>
            <Text style={s.sbSec}>Langues</Text>
            {langs.map((l, i) => (
              <View key={i}>
                <Text style={s.langName}>{l.langue}</Text>
                <Text style={s.langLevel}>{l.niveau}</Text>
              </View>
            ))}
          </> : null}
        </View>
      </View>

      <View style={s.main}>
        <View style={s.mainHdr}>
          <Text style={s.mainName}>{data.prenom} {data.nom}</Text>
          {data.titre ? <Text style={s.mainTitre}>{data.titre}</Text> : null}
        </View>
        {data.resume ? <><Text style={s.sec}>Profil</Text><Text style={s.resumeTxt}>{data.resume}</Text></> : null}
        {exps.length > 0 ? <>
          <Text style={s.sec}>Expériences</Text>
          {exps.map((e, i) => (
            <View key={i} style={s.expBlock}>
              <View style={s.expRow}>
                <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                  <View style={s.dot} />
                  <Text style={s.expRole}>{e.poste}</Text>
                </View>
                {e.periode ? <Text style={s.expPeriod}>{e.periode}</Text> : null}
              </View>
              <Text style={s.expCompany}>{e.entreprise}</Text>
              {e.description ? <Text style={s.expDesc}>{e.description}</Text> : null}
            </View>
          ))}
        </> : null}
        {forms.length > 0 ? <>
          <Text style={s.sec}>Formation</Text>
          {forms.map((f, i) => (
            <View key={i} style={s.formBlock}>
              <Text style={s.formRole}>{f.diplome}</Text>
              <Text style={s.formSchool}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</Text>
            </View>
          ))}
        </> : null}
      </View>
    </Page></Document>
  );
}

function ModernPdf({ data }) {
  const blue = "#0057ff";
  const s = StyleSheet.create({
    page:       { backgroundColor: "#f0f4ff", fontFamily: "Helvetica" },
    hero:       { backgroundColor: blue, padding: "28 26 0" },
    heroName:   { fontSize: 28, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: -1, lineHeight: 0.95 },
    heroTitre:  { fontSize: 8.5, color: "rgba(255,255,255,0.78)", textTransform: "uppercase", letterSpacing: 1.8, marginTop: 6, fontFamily: "Helvetica" },
    chipBar:    { flexDirection: "row", backgroundColor: "#fff", padding: "9 26", flexWrap: "wrap" },
    chip:       { fontSize: 7.5, color: blue, fontFamily: "Helvetica-Bold", marginRight: 18 },
    chipLabel:  { fontSize: 6, color: "#9a9ab0", textTransform: "uppercase", letterSpacing: 0.6 },
    body:       { flexDirection: "row", flex: 1 },
    colMain:    { flex: 1, padding: "20 22", borderRightWidth: 1, borderRightColor: "#dde3f0", backgroundColor: "#fff" },
    colAside:   { width: "34%", padding: "20 16", backgroundColor: "#f0f4ff" },
    sec:        { fontSize: 7, fontFamily: "Helvetica-Bold", color: blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4, marginTop: 18 },
    secLine:    { height: 2, backgroundColor: blue, width: 28, marginBottom: 10 },
    resumeTxt:  { fontSize: 9, color: "#4a4a6a", lineHeight: 1.65 },
    expRole:    { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: "#0a0a1a" },
    expBadge:   { fontSize: 6.5, color: "#fff", backgroundColor: blue, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, marginLeft: 6 },
    expRow:     { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
    expCompany: { fontSize: 8.5, color: blue, fontFamily: "Helvetica-Bold", marginTop: 2 },
    expDesc:    { fontSize: 8, color: "#4a4a6a", marginTop: 4, lineHeight: 1.6 },
    expBlock:   { marginBottom: 12 },
    formRole:   { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0a0a1a" },
    formSchool: { fontSize: 8, color: blue, fontFamily: "Helvetica-Bold", marginTop: 2 },
    formBlock:  { marginBottom: 9 },
    pill:       { fontSize: 7, color: "#fff", backgroundColor: blue, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3, marginRight: 4, marginBottom: 5 },
    pillWrap:   { flexDirection: "row", flexWrap: "wrap" },
    langName:   { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#0a0a1a" },
    langLevel:  { fontSize: 7, color: "#9a9ab0", marginBottom: 2 },
    barBg:      { height: 4, backgroundColor: "#dde3f0", borderRadius: 2, marginBottom: 9, marginTop: 3 },
    barFill:    { height: 4, backgroundColor: blue, borderRadius: 2 },
  });

  const langWidth = (n) => ({ "Bilingue/Natif": "100%", "Courant": "80%", "Intermédiaire": "55%" }[n] || "30%");
  const exps  = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const langs = data.langues.filter(l => l.langue);

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.hero}>
        <Text style={s.heroName}>{data.prenom}{"\n"}{data.nom}</Text>
        {data.titre ? <Text style={s.heroTitre}>{data.titre}</Text> : null}
      </View>
      <View style={s.chipBar}>
        {data.email      ? <View style={{ marginRight: 18 }}><Text style={s.chipLabel}>Email</Text><Text style={s.chip}>{data.email}</Text></View> : null}
        {data.telephone  ? <View style={{ marginRight: 18 }}><Text style={s.chipLabel}>Tél</Text><Text style={s.chip}>{data.telephone}</Text></View> : null}
        {data.localisation ? <View style={{ marginRight: 18 }}><Text style={s.chipLabel}>Lieu</Text><Text style={s.chip}>{data.localisation}</Text></View> : null}
        {data.portfolio  ? <View><Text style={s.chipLabel}>Portfolio</Text><Text style={s.chip}>{data.portfolio}</Text></View> : null}
      </View>
      <View style={s.body}>
        <View style={s.colMain}>
          {data.resume ? <><Text style={[s.sec, { marginTop: 0 }]}>À propos</Text><View style={s.secLine}/><Text style={s.resumeTxt}>{data.resume}</Text></> : null}
          {exps.length > 0 ? <>
            <Text style={s.sec}>Expériences</Text><View style={s.secLine}/>
            {exps.map((e, i) => (
              <View key={i} style={s.expBlock}>
                <View style={s.expRow}>
                  <Text style={s.expRole}>{e.poste}</Text>
                  {e.periode ? <Text style={s.expBadge}>{e.periode}</Text> : null}
                </View>
                <Text style={s.expCompany}>{e.entreprise}</Text>
                {e.description ? <Text style={s.expDesc}>{e.description}</Text> : null}
              </View>
            ))}
          </> : null}
          {forms.length > 0 ? <>
            <Text style={s.sec}>Formation</Text><View style={s.secLine}/>
            {forms.map((f, i) => (
              <View key={i} style={s.formBlock}>
                <Text style={s.formRole}>{f.diplome}</Text>
                <Text style={s.formSchool}>{f.etablissement}{f.annee ? ` — ${f.annee}` : ""}</Text>
              </View>
            ))}
          </> : null}
        </View>
        <View style={s.colAside}>
          {data.competences.length > 0 ? <>
            <Text style={[s.sec, { marginTop: 0 }]}>Compétences</Text><View style={s.secLine}/>
            <View style={s.pillWrap}>
              {data.competences.map((sk, i) => <Text key={i} style={s.pill}>{sk}</Text>)}
            </View>
          </> : null}
          {langs.length > 0 ? <>
            <Text style={s.sec}>Langues</Text><View style={s.secLine}/>
            {langs.map((l, i) => (
              <View key={i}>
                <Text style={s.langName}>{l.langue}</Text>
                <Text style={s.langLevel}>{l.niveau}</Text>
                <View style={s.barBg}><View style={[s.barFill, { width: langWidth(l.niveau) }]}/></View>
              </View>
            ))}
          </> : null}
        </View>
      </View>
    </Page></Document>
  );
}

function DarkPdf({ data }) {
  const cyan  = "#00c8ff";
  const bg    = "#060d1a";
  const sb    = "#0a1628";
  const s = StyleSheet.create({
    page:      { flexDirection: "row", backgroundColor: bg, fontFamily: "Helvetica" },
    sidebar:   { width: "31%", backgroundColor: sb, borderRightWidth: 1, borderRightColor: "#1a3050" },
    sbHero:    { backgroundColor: "#0d1f3c", padding: "22 13 16", alignItems: "center", borderBottomWidth: 2, borderBottomColor: cyan },
    sbGlyph:   { width: 46, height: 46, borderRadius: 23, backgroundColor: bg, borderWidth: 2, borderColor: cyan, alignItems: "center", justifyContent: "center", marginBottom: 8 },
    sbGlyphTx: { color: cyan, fontSize: 16, fontFamily: "Helvetica-Bold" },
    sbName:    { color: "#fff", fontSize: 10.5, fontFamily: "Helvetica-Bold", textAlign: "center" },
    sbTitre:   { color: cyan, fontSize: 6.5, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 4, textAlign: "center", opacity: 0.8 },
    sbBody:    { padding: "14 12", flex: 1 },
    sbSec:     { color: cyan, fontSize: 6.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: "rgba(0,200,255,0.2)", paddingBottom: 3, marginBottom: 7, marginTop: 16 },
    sbLabel:   { color: "rgba(0,200,255,0.55)", fontSize: 6, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 5 },
    sbContact: { color: "rgba(200,216,240,0.7)", fontSize: 7.5, marginTop: 1 },
    tag:       { fontSize: 7, color: cyan, backgroundColor: "rgba(0,200,255,0.1)", borderWidth: 1, borderColor: "rgba(0,200,255,0.25)", paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, marginRight: 3, marginBottom: 4, fontFamily: "Helvetica-Bold" },
    tagWrap:   { flexDirection: "row", flexWrap: "wrap" },
    langName:  { color: "rgba(200,216,240,0.9)", fontSize: 8, fontFamily: "Helvetica-Bold" },
    langLevel: { color: "rgba(0,200,255,0.6)", fontSize: 7, marginBottom: 4 },
    main:      { flex: 1, padding: "24 20" },
    mainHdr:   { borderLeftWidth: 4, borderLeftColor: cyan, backgroundColor: "#0a1628", padding: "12 14", marginBottom: 20 },
    mainName:  { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: -0.5 },
    mainTitre: { fontSize: 8, color: cyan, textTransform: "uppercase", letterSpacing: 1.8, marginTop: 5, opacity: 0.85 },
    sec:       { fontSize: 6.5, fontFamily: "Helvetica-Bold", color: cyan, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4, marginTop: 18 },
    secRule:   { height: 1, backgroundColor: "rgba(0,200,255,0.15)", marginBottom: 10 },
    resumeBox: { backgroundColor: "rgba(0,200,255,0.06)", borderLeftWidth: 2, borderLeftColor: cyan, padding: "7 10", marginBottom: 14 },
    resumeTxt: { fontSize: 9, color: "rgba(200,216,240,0.7)", lineHeight: 1.65 },
    tlWrap:    { flexDirection: "row", marginBottom: 12 },
    tlDot:     { width: 8, height: 8, borderRadius: 4, backgroundColor: cyan, marginRight: 10, marginTop: 3, flexShrink: 0 },
    expRole:   { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#fff" },
    expCompany:{ fontSize: 8.5, color: cyan, fontFamily: "Helvetica-Bold", marginTop: 2 },
    expBadge:  { fontSize: 6.5, color: "rgba(0,200,255,0.8)", backgroundColor: "rgba(0,200,255,0.1)", borderWidth: 1, borderColor: "rgba(0,200,255,0.22)", paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, marginTop: 3, alignSelf: "flex-start" },
    expDesc:   { fontSize: 8, color: "rgba(200,216,240,0.55)", marginTop: 3, lineHeight: 1.55 },
    formRole:  { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#fff" },
    formSchool:{ fontSize: 8, color: cyan, marginTop: 2, opacity: 0.8 },
    formBlock: { marginBottom: 9, paddingLeft: 16 },
  });

  const exps  = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const langs = data.langues.filter(l => l.langue);

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.sidebar}>
        <View style={s.sbHero}>
          <View style={s.sbGlyph}><Text style={s.sbGlyphTx}>{(data.prenom||"?").charAt(0).toUpperCase()}</Text></View>
          <Text style={s.sbName}>{data.prenom} {data.nom}</Text>
          {data.titre ? <Text style={s.sbTitre}>{data.titre}</Text> : null}
        </View>
        <View style={s.sbBody}>
          {(data.email||data.telephone||data.localisation||data.portfolio) ? <>
            <Text style={s.sbSec}>Contact</Text>
            {data.email ? <><Text style={s.sbLabel}>Email</Text><Text style={s.sbContact}>{data.email}</Text></> : null}
            {data.telephone ? <><Text style={s.sbLabel}>Tél</Text><Text style={s.sbContact}>{data.telephone}</Text></> : null}
            {data.localisation ? <><Text style={s.sbLabel}>Lieu</Text><Text style={s.sbContact}>{data.localisation}</Text></> : null}
            {data.portfolio ? <><Text style={s.sbLabel}>Portfolio</Text><Text style={s.sbContact}>{data.portfolio}</Text></> : null}
          </> : null}
          {data.competences.length > 0 ? <>
            <Text style={s.sbSec}>Stack</Text>
            <View style={s.tagWrap}>
              {data.competences.map((sk, i) => <Text key={i} style={s.tag}>{sk}</Text>)}
            </View>
          </> : null}
          {langs.length > 0 ? <>
            <Text style={s.sbSec}>Langues</Text>
            {langs.map((l, i) => (
              <View key={i}>
                <Text style={s.langName}>{l.langue}</Text>
                <Text style={s.langLevel}>{l.niveau}</Text>
              </View>
            ))}
          </> : null}
        </View>
      </View>

      <View style={s.main}>
        <View style={s.mainHdr}>
          <Text style={s.mainName}>{data.prenom} {data.nom}</Text>
          {data.titre ? <Text style={s.mainTitre}>{data.titre}</Text> : null}
        </View>
        {data.resume ? <><View style={s.resumeBox}><Text style={s.resumeTxt}>{data.resume}</Text></View></> : null}
        {exps.length > 0 ? <>
          <Text style={[s.sec, { marginTop: 0 }]}>Expériences</Text><View style={s.secRule}/>
          {exps.map((e, i) => (
            <View key={i} style={s.tlWrap}>
              <View style={s.tlDot}/>
              <View style={{ flex: 1 }}>
                <Text style={s.expRole}>{e.poste}</Text>
                <Text style={s.expCompany}>{e.entreprise}</Text>
                {e.periode ? <Text style={s.expBadge}>{e.periode}</Text> : null}
                {e.description ? <Text style={s.expDesc}>{e.description}</Text> : null}
              </View>
            </View>
          ))}
        </> : null}
        {forms.length > 0 ? <>
          <Text style={s.sec}>Formation</Text><View style={s.secRule}/>
          {forms.map((f, i) => (
            <View key={i} style={s.formBlock}>
              <Text style={s.formRole}>{f.diplome}</Text>
              <Text style={s.formSchool}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</Text>
            </View>
          ))}
        </> : null}
      </View>
    </Page></Document>
  );
}

function MinimalPdf({ data }) {
  const indigo = "#6366f1";
  const s = StyleSheet.create({
    page:      { backgroundColor: "#fff", padding: "36 42", fontFamily: "Helvetica" },
    hdrRow:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 0, paddingBottom: 14 },
    nameFirst: { fontSize: 32, fontFamily: "Helvetica-Bold", color: "#111", letterSpacing: -1, lineHeight: 0.9 },
    nameLast:  { fontSize: 32, color: "#111", letterSpacing: -1, lineHeight: 0.9 },
    titre:     { fontSize: 9, color: indigo, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2.5, marginTop: 10 },
    contactBlk:{ alignItems: "flex-end" },
    cLabel:    { fontSize: 6, color: indigo, textTransform: "uppercase", letterSpacing: 1, fontFamily: "Helvetica-Bold", marginTop: 5 },
    cVal:      { fontSize: 7.5, color: "#6b7280" },
    ruleTop:   { height: 3, backgroundColor: "#111", marginBottom: 3 },
    ruleBtm:   { height: 1, backgroundColor: "#111", marginBottom: 20 },
    body:      { flexDirection: "row" },
    colLeft:   { flex: 1, paddingRight: 24, borderRightWidth: 1, borderRightColor: "#e5e7eb" },
    colRight:  { width: "36%", paddingLeft: 22 },
    sec:       { fontSize: 6.5, fontFamily: "Helvetica-Bold", color: indigo, textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 4, marginTop: 20 },
    secLine:   { height: 1, backgroundColor: "#e5e7eb", marginBottom: 10 },
    resumeTxt: { fontSize: 9, color: "#374151", lineHeight: 1.7 },
    expRow:    { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    expLeft:   { flex: 1 },
    expRole:   { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: "#111" },
    expCompany:{ fontSize: 8.5, color: indigo, fontStyle: "italic", marginTop: 2 },
    expPeriod: { fontSize: 7.5, color: "#9ca3af" },
    expDesc:   { fontSize: 8, color: "#6b7280", marginTop: 4, lineHeight: 1.65 },
    formRole:  { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#111" },
    formSchool:{ fontSize: 8, color: indigo, fontStyle: "italic", marginTop: 2 },
    formBlock: { marginBottom: 9 },
    skillItem: { fontSize: 9, color: "#374151", paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: "#f3f4f6", flexDirection: "row" },
    skillBullet:{ color: indigo, fontFamily: "Helvetica-Bold", marginRight: 6 },
    langName:  { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#111" },
    langLevel: { fontSize: 7, color: "#9ca3af", marginBottom: 2 },
    barBg:     { height: 3, backgroundColor: "#f3f4f6", borderRadius: 2, marginBottom: 9, marginTop: 3 },
    barFill:   { height: 3, backgroundColor: indigo, borderRadius: 2 },
  });

  const langWidth = (n) => ({ "Bilingue/Natif": "100%", "Courant": "80%", "Intermédiaire": "55%" }[n] || "30%");
  const exps  = data.experiences.filter(e => e.poste || e.entreprise);
  const forms = data.formations.filter(f => f.diplome || f.etablissement);
  const langs = data.langues.filter(l => l.langue);

  return (
    <Document><Page size="A4" style={s.page}>
      <View style={s.hdrRow}>
        <View>
          <Text style={s.nameFirst}>{data.prenom.toUpperCase()}</Text>
          <Text style={s.nameLast}>{data.nom.toUpperCase()}</Text>
          {data.titre ? <Text style={s.titre}>{data.titre}</Text> : null}
        </View>
        <View style={s.contactBlk}>
          {data.email      ? <><Text style={s.cLabel}>Email</Text><Text style={s.cVal}>{data.email}</Text></> : null}
          {data.telephone  ? <><Text style={s.cLabel}>Téléphone</Text><Text style={s.cVal}>{data.telephone}</Text></> : null}
          {data.localisation ? <><Text style={s.cLabel}>Localisation</Text><Text style={s.cVal}>{data.localisation}</Text></> : null}
          {data.portfolio  ? <><Text style={s.cLabel}>Portfolio</Text><Text style={s.cVal}>{data.portfolio}</Text></> : null}
        </View>
      </View>
      <View style={s.ruleTop}/><View style={s.ruleBtm}/>

      <View style={s.body}>
        <View style={s.colLeft}>
          {data.resume ? <><Text style={[s.sec, { marginTop: 0 }]}>Profil</Text><View style={s.secLine}/><Text style={s.resumeTxt}>{data.resume}</Text></> : null}
          {exps.length > 0 ? <>
            <Text style={s.sec}>Expériences</Text><View style={s.secLine}/>
            {exps.map((e, i) => (
              <View key={i} style={s.expRow}>
                <View style={s.expLeft}>
                  <Text style={s.expRole}>{e.poste}</Text>
                  <Text style={s.expCompany}>{e.entreprise}</Text>
                  {e.description ? <Text style={s.expDesc}>{e.description}</Text> : null}
                </View>
                {e.periode ? <Text style={s.expPeriod}>{e.periode}</Text> : null}
              </View>
            ))}
          </> : null}
          {forms.length > 0 ? <>
            <Text style={s.sec}>Formation</Text><View style={s.secLine}/>
            {forms.map((f, i) => (
              <View key={i} style={s.formBlock}>
                <Text style={s.formRole}>{f.diplome}</Text>
                <Text style={s.formSchool}>{f.etablissement}{f.annee ? `, ${f.annee}` : ""}</Text>
              </View>
            ))}
          </> : null}
        </View>

        <View style={s.colRight}>
          {data.competences.length > 0 ? <>
            <Text style={[s.sec, { marginTop: 0 }]}>Compétences</Text><View style={s.secLine}/>
            {data.competences.map((sk, i) => (
              <View key={i} style={s.skillItem}>
                <Text style={s.skillBullet}>+</Text>
                <Text>{sk}</Text>
              </View>
            ))}
          </> : null}
          {langs.length > 0 ? <>
            <Text style={s.sec}>Langues</Text><View style={s.secLine}/>
            {langs.map((l, i) => (
              <View key={i}>
                <Text style={s.langName}>{l.langue}</Text>
                <Text style={s.langLevel}>{l.niveau}</Text>
                <View style={s.barBg}><View style={[s.barFill, { width: langWidth(l.niveau) }]}/></View>
              </View>
            ))}
          </> : null}
        </View>
      </View>
    </Page></Document>
  );
}

const PDF_COMPONENTS = {
  classic: ClassicPdf,
  modern:  ModernPdf,
  dark:    DarkPdf,
  minimal: MinimalPdf,
};

/* ─── Form UI helpers ────────────────────────────────── */
function Label({ children }) {
  return <span className="block font-mono text-[10px] tracking-widest mb-1.5" style={{ color: "rgba(56,189,248,0.7)" }}>{children}</span>;
}
function Input({ value, onChange, placeholder, type = "text", textarea, rows = 3, onKeyDown }) {
  const base = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: "0.625rem", color: "white", fontSize: "0.875rem", width: "100%", outline: "none", transition: "border-color 0.2s" };
  if (textarea) return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="px-3.5 py-2.5 resize-none placeholder:text-slate-600 focus:border-sky-500/50" style={base} />;
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown} className="px-3.5 py-2.5 placeholder:text-slate-600 focus:border-sky-500/50" style={base} />;
}
function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} className="px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: "0.625rem", color: "white", fontSize: "0.875rem", width: "100%", outline: "none" }}>
      {options.map(o => <option key={o} value={o} style={{ background: "#040d1a" }}>{o}</option>)}
    </select>
  );
}
function SectionTitle({ children }) {
  return <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2"><span className="font-mono text-sky-400/40 text-xs">—</span>{children}</h3>;
}
function AddBtn({ onClick, label }) {
  return <button onClick={onClick} type="button" className="flex items-center gap-2 text-xs font-semibold mt-3 px-3 py-2 rounded-lg transition-all" style={{ color: "#38bdf8", background: "rgba(56,189,248,0.07)", border: "1px dashed rgba(56,189,248,0.2)" }}><Plus className="w-3.5 h-3.5" /> {label}</button>;
}
function RemoveBtn({ onClick }) {
  return <button onClick={onClick} type="button" className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:bg-red-500/10" style={{ border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }}><X className="w-3.5 h-3.5" /></button>;
}

/* ─── Steps ──────────────────────────────────────────── */
function StepProfil({ data, set }) {
  const u = f => e => set({ ...data, [f]: e.target.value });
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Informations personnelles</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>PRÉNOM</Label><Input value={data.prenom} onChange={u("prenom")} placeholder="Ibrahima" /></div>
        <div><Label>NOM</Label><Input value={data.nom} onChange={u("nom")} placeholder="Sarr" /></div>
      </div>
      <div><Label>TITRE PROFESSIONNEL</Label><Input value={data.titre} onChange={u("titre")} placeholder="Développeur Full Stack" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>EMAIL</Label><Input value={data.email} onChange={u("email")} placeholder="ibrahima@email.com" type="email" /></div>
        <div><Label>TÉLÉPHONE</Label><Input value={data.telephone} onChange={u("telephone")} placeholder="+221 77 000 00 00" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>LOCALISATION</Label><Input value={data.localisation} onChange={u("localisation")} placeholder="Dakar, Sénégal" /></div>
        <div><Label>LINKEDIN / PORTFOLIO</Label><Input value={data.portfolio} onChange={u("portfolio")} placeholder="linkedin.com/in/ibrahima" /></div>
      </div>
      <div><Label>RÉSUMÉ / À PROPOS</Label><Input value={data.resume} onChange={u("resume")} placeholder="Développeur passionné avec 3 ans d'expérience..." textarea rows={4} /></div>
    </div>
  );
}

function StepParcours({ data, set }) {
  const addExp = () => set({ ...data, experiences: [...data.experiences, { poste: "", entreprise: "", periode: "", description: "" }] });
  const removeExp = i => set({ ...data, experiences: data.experiences.filter((_, idx) => idx !== i) });
  const updateExp = (i, f, v) => { const a = [...data.experiences]; a[i] = { ...a[i], [f]: v }; set({ ...data, experiences: a }); };
  const addForm = () => set({ ...data, formations: [...data.formations, { diplome: "", etablissement: "", annee: "" }] });
  const removeForm = i => set({ ...data, formations: data.formations.filter((_, idx) => idx !== i) });
  const updateForm = (i, f, v) => { const a = [...data.formations]; a[i] = { ...a[i], [f]: v }; set({ ...data, formations: a }); };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Expériences professionnelles</SectionTitle>
        <div className="flex flex-col gap-4">
          {data.experiences.map((exp, i) => (
            <div key={i} className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-sky-400/50 tracking-widest">EXPÉRIENCE {i + 1}</span>
                {data.experiences.length > 1 && <RemoveBtn onClick={() => removeExp(i)} />}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>POSTE</Label><Input value={exp.poste} onChange={e => updateExp(i, "poste", e.target.value)} placeholder="Développeur Web" /></div>
                <div><Label>ENTREPRISE</Label><Input value={exp.entreprise} onChange={e => updateExp(i, "entreprise", e.target.value)} placeholder="KoriLab" /></div>
              </div>
              <div><Label>PÉRIODE</Label><Input value={exp.periode} onChange={e => updateExp(i, "periode", e.target.value)} placeholder="Jan 2023 – Présent" /></div>
              <div><Label>DESCRIPTION</Label><Input value={exp.description} onChange={e => updateExp(i, "description", e.target.value)} placeholder="Développement et maintenance..." textarea rows={2} /></div>
            </div>
          ))}
        </div>
        <AddBtn onClick={addExp} label="Ajouter une expérience" />
      </div>
      <div>
        <SectionTitle>Formations</SectionTitle>
        <div className="flex flex-col gap-4">
          {data.formations.map((form, i) => (
            <div key={i} className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-sky-400/50 tracking-widest">FORMATION {i + 1}</span>
                {data.formations.length > 1 && <RemoveBtn onClick={() => removeForm(i)} />}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>DIPLÔME</Label><Input value={form.diplome} onChange={e => updateForm(i, "diplome", e.target.value)} placeholder="Licence Informatique" /></div>
                <div><Label>ÉTABLISSEMENT</Label><Input value={form.etablissement} onChange={e => updateForm(i, "etablissement", e.target.value)} placeholder="UCAD" /></div>
              </div>
              <div><Label>ANNÉE</Label><Input value={form.annee} onChange={e => updateForm(i, "annee", e.target.value)} placeholder="2021" /></div>
            </div>
          ))}
        </div>
        <AddBtn onClick={addForm} label="Ajouter une formation" />
      </div>
    </div>
  );
}

function StepCompetences({ data, set }) {
  const [skill, setSkill] = useState("");
  const addSkill = () => { const s = skill.trim(); if (s && !data.competences.includes(s)) set({ ...data, competences: [...data.competences, s] }); setSkill(""); };
  const removeSkill = s => set({ ...data, competences: data.competences.filter(c => c !== s) });
  const addLang = () => set({ ...data, langues: [...data.langues, { langue: "", niveau: "Courant" }] });
  const removeLang = i => set({ ...data, langues: data.langues.filter((_, idx) => idx !== i) });
  const updateLang = (i, f, v) => { const a = [...data.langues]; a[i] = { ...a[i], [f]: v }; set({ ...data, langues: a }); };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Compétences techniques</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input value={skill} onChange={e => setSkill(e.target.value)} placeholder="React, Laravel, Figma..." onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} />
          <button onClick={addSkill} type="button" className="px-4 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0" style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}>+</button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {data.competences.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}>
              {c}<button onClick={() => removeSkill(c)} type="button" className="hover:text-white transition-colors"><X className="w-3 h-3" /></button>
            </span>
          ))}
          {data.competences.length === 0 && <span className="text-xs text-slate-600 italic">Entrée pour ajouter...</span>}
        </div>
      </div>
      <div>
        <SectionTitle>Langues</SectionTitle>
        <div className="flex flex-col gap-3">
          {data.langues.map((l, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1"><Input value={l.langue} onChange={e => updateLang(i, "langue", e.target.value)} placeholder="Français" /></div>
              <div className="w-40"><Select value={l.niveau} onChange={e => updateLang(i, "niveau", e.target.value)} options={LANGUAGE_LEVELS} /></div>
              {data.langues.length > 1 && <RemoveBtn onClick={() => removeLang(i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={addLang} label="Ajouter une langue" />
      </div>
    </div>
  );
}

function ThemeMiniPreview({ id }) {
  /* Classic — sidebar navy/gold, main white */
  if (id === "classic") return (
    <div style={{ height: 90, display: "flex", borderRadius: 6, overflow: "hidden", background: "#fff" }}>
      <div style={{ width: "32%", background: "#1a1a2e", padding: "6px 5px", flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: "#c9a84c", margin: "0 auto 5px" }} />
        <div style={{ height: 3, background: "rgba(201,168,76,0.5)", borderRadius: 2, marginBottom: 3 }} />
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, marginBottom: 2 }} />
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, width: "70%", marginBottom: 7 }} />
        <div style={{ height: 2, background: "rgba(201,168,76,0.4)", borderRadius: 2, marginBottom: 3 }} />
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, marginBottom: 2 }} />
        <div style={{ height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, width: "60%", marginBottom: 2 }} />
      </div>
      <div style={{ flex: 1, padding: "7px 6px" }}>
        <div style={{ height: 7, background: "#1a1a2e", borderRadius: 1, width: "60%", marginBottom: 2 }} />
        <div style={{ height: 3, background: "#c9a84c", borderRadius: 1, width: "40%", marginBottom: 5 }} />
        <div style={{ height: 1.5, background: "#1a1a2e", marginBottom: 5 }} />
        <div style={{ height: 2.5, background: "#1a1a2e", borderRadius: 1, width: "50%", marginBottom: 2 }} />
        <div style={{ height: 2, background: "rgba(26,26,46,0.2)", borderRadius: 1, marginBottom: 1.5 }} />
        <div style={{ height: 2, background: "rgba(26,26,46,0.2)", borderRadius: 1, width: "80%", marginBottom: 1.5 }} />
        <div style={{ height: 2, background: "rgba(26,26,46,0.2)", borderRadius: 1, width: "65%", marginBottom: 5 }} />
        <div style={{ height: 2.5, background: "#1a1a2e", borderRadius: 1, width: "45%", marginBottom: 2 }} />
        <div style={{ height: 2, background: "rgba(26,26,46,0.2)", borderRadius: 1, width: "90%", marginBottom: 1.5 }} />
      </div>
    </div>
  );

  /* Modern — header bleu pleine largeur, deux colonnes */
  if (id === "modern") return (
    <div style={{ height: 90, borderRadius: 6, overflow: "hidden", background: "#f0f4ff", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0057ff", padding: "6px 7px 0" }}>
        <div style={{ height: 6, background: "rgba(255,255,255,0.95)", borderRadius: 1, width: "45%", marginBottom: 2 }} />
        <div style={{ height: 3, background: "rgba(255,255,255,0.5)", borderRadius: 1, width: "30%", marginBottom: 0 }} />
        <div style={{ background: "#fff", marginTop: 5, padding: "3px 5px", display: "flex", gap: 8 }}>
          {["35%","30%","25%"].map((w,i) => <div key={i} style={{ height: 2.5, background: "#0057ff", borderRadius: 1, width: w }} />)}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1, padding: "5px 6px", background: "#fff", borderRight: "1px solid #e8eaf0" }}>
          <div style={{ height: 2.5, background: "#0057ff", borderRadius: 1, width: "40%", marginBottom: 2 }} />
          <div style={{ height: 1.5, background: "rgba(10,10,26,0.15)", borderRadius: 1, marginBottom: 1.5 }} />
          <div style={{ height: 1.5, background: "rgba(10,10,26,0.15)", borderRadius: 1, width: "80%", marginBottom: 4 }} />
          <div style={{ height: 2.5, background: "#0a0a1a", borderRadius: 1, width: "55%", marginBottom: 1.5 }} />
          <div style={{ display: "inline-block", height: 5, background: "#0057ff", borderRadius: 2, width: "28%", marginBottom: 2 }} />
          <div style={{ height: 1.5, background: "rgba(10,10,26,0.15)", borderRadius: 1, width: "90%", marginBottom: 1.5 }} />
        </div>
        <div style={{ width: "35%", padding: "5px 5px", background: "#f0f4ff" }}>
          <div style={{ height: 2.5, background: "#0057ff", borderRadius: 1, width: "60%", marginBottom: 3 }} />
          {["#0057ff","#0057ff","#0057ff"].map((c,i) => (
            <div key={i} style={{ height: 6, background: c, borderRadius: 10, width: ["55%","70%","45%"][i], marginBottom: 3, opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </div>
  );

  /* Dark — fond nuit, sidebar, accents cyan */
  if (id === "dark") return (
    <div style={{ height: 90, display: "flex", borderRadius: 6, overflow: "hidden", background: "#060d1a" }}>
      <div style={{ width: "32%", background: "#0a1628", padding: "6px 5px", flexShrink: 0, borderRight: "1px solid #1a3050" }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: "#060d1a", border: "2px solid #00c8ff", margin: "0 auto 5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 6, height: 6, background: "#00c8ff", borderRadius: 3 }} />
        </div>
        <div style={{ height: 2.5, background: "#00c8ff", borderRadius: 1, opacity: 0.6, marginBottom: 3 }} />
        {[2,1.5,1.5].map((h,i) => <div key={i} style={{ height: h, background: "rgba(200,216,240,0.2)", borderRadius: 1, marginBottom: 3, width: ["90%","70%","80%"][i] }} />)}
        <div style={{ height: 2, background: "rgba(0,200,255,0.4)", borderRadius: 1, marginBottom: 3 }} />
        {[4,4,4].map((h,i) => (
          <div key={i} style={{ display: "inline-block", height: h, background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 2, width: ["45%","40%","35%"][i], marginRight: 2, marginBottom: 2 }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: "7px 6px" }}>
        <div style={{ borderLeft: "3px solid #00c8ff", paddingLeft: 5, marginBottom: 6, background: "#0a1628", padding: "4px 5px" }}>
          <div style={{ height: 6, background: "#fff", borderRadius: 1, width: "55%", marginBottom: 2 }} />
          <div style={{ height: 2.5, background: "#00c8ff", borderRadius: 1, width: "35%", opacity: 0.7 }} />
        </div>
        <div style={{ height: 2, background: "#00c8ff", borderRadius: 1, width: "40%", marginBottom: 3, opacity: 0.6 }} />
        {[1.5,1.5,1.5].map((h,i) => <div key={i} style={{ height: h, background: "rgba(200,216,240,0.2)", borderRadius: 1, marginBottom: 2, width: ["95%","80%","70%"][i] }} />)}
        <div style={{ height: 2, background: "#00c8ff", borderRadius: 1, width: "40%", marginBottom: 3, marginTop: 3, opacity: 0.6 }} />
        <div style={{ display: "flex", gap: 3, alignItems: "center", marginBottom: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: 2.5, background: "#00c8ff" }} />
          <div style={{ height: 2.5, background: "#fff", borderRadius: 1, width: "50%" }} />
        </div>
      </div>
    </div>
  );

  /* Minimal — blanc, indigo, typographie */
  if (id === "minimal") return (
    <div style={{ height: 90, borderRadius: 6, overflow: "hidden", background: "#fff", padding: "7px 7px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "flex-end" }}>
        <div>
          <div style={{ height: 9, background: "#111", borderRadius: 1, width: 70, marginBottom: 2, fontWeight: 900 }} />
          <div style={{ height: 9, background: "#111", borderRadius: 1, width: 55, opacity: 0.2 }} />
          <div style={{ height: 2.5, background: "#6366f1", borderRadius: 1, width: 45, marginTop: 3 }} />
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ height: 2, background: "rgba(107,114,128,0.4)", borderRadius: 1, width: 40, marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(107,114,128,0.4)", borderRadius: 1, width: 55, marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(107,114,128,0.4)", borderRadius: 1, width: 35 }} />
        </div>
      </div>
      <div style={{ height: 2, background: "#111", marginBottom: 1 }} />
      <div style={{ height: 1, background: "#111", marginBottom: 5, opacity: 0.3 }} />
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 2.5, background: "#6366f1", borderRadius: 1, width: "50%", marginBottom: 2 }} />
          <div style={{ height: 1.5, background: "rgba(55,65,81,0.25)", borderRadius: 1, marginBottom: 1.5 }} />
          <div style={{ height: 1.5, background: "rgba(55,65,81,0.25)", borderRadius: 1, width: "80%", marginBottom: 1.5 }} />
          <div style={{ height: 1.5, background: "rgba(55,65,81,0.25)", borderRadius: 1, width: "65%", marginBottom: 5 }} />
          <div style={{ height: 2.5, background: "#111", borderRadius: 1, width: "45%", marginBottom: 1.5 }} />
          <div style={{ height: 1.5, background: "rgba(55,65,81,0.25)", borderRadius: 1, width: "90%", marginBottom: 1.5 }} />
        </div>
        <div style={{ width: "32%" }}>
          <div style={{ height: 2.5, background: "#6366f1", borderRadius: 1, width: "70%", marginBottom: 3 }} />
          {["85%","65%","75%","55%"].map((w,i) => (
            <div key={i} style={{ height: 2.5, background: "rgba(99,102,241,0.12)", borderRadius: 1, width: w, marginBottom: 2.5, borderBottom: "1px solid rgba(243,244,246,1)", paddingBottom: 1 }}>
              <span style={{ display: "inline-block", width: 4, height: 4, background: "#6366f1", borderRadius: 1, marginRight: 2 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return null;
}

function StepTheme({ data, set }) {
  return (
    <div>
      <SectionTitle>Choisis ton thème</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {THEMES.map(theme => {
          const active = data.theme === theme.id;
          return (
            <button key={theme.id} type="button" onClick={() => set({ ...data, theme: theme.id })}
              className="relative rounded-xl p-3 text-left transition-all"
              style={{ background: active ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${active ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.06)"}`, boxShadow: active ? "0 0 20px rgba(56,189,248,0.08)" : "none" }}>
              {active && <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center z-10" style={{ background: "#38bdf8" }}><Check className="w-3 h-3 text-white" /></span>}
              <div className="mb-3 rounded-md overflow-hidden" style={{ border: `1px solid rgba(255,255,255,0.06)` }}>
                <ThemeMiniPreview id={theme.id} />
              </div>
              <div className="font-bold text-white text-sm">{theme.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{theme.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepPaiement({ data, onPaid, paid }) {
  const [ref, setRef] = useState("");
  const [method, setMethod] = useState("wave");
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Finaliser et payer</SectionTitle>
      <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}>
        <div>
          <div className="text-sm text-slate-400">Générateur de CV</div>
          <div className="text-xs text-slate-500 mt-0.5">Thème {THEMES.find(t => t.id === data.theme)?.label} · PDF vectoriel</div>
        </div>
        <div className="font-extrabold text-white text-xl">2 000 <span className="text-sm font-normal text-slate-500">FCFA</span></div>
      </div>
      <div>
        <Label>MÉTHODE DE PAIEMENT</Label>
        <div className="flex gap-3 mt-1.5">
          {[{ id: "wave", label: "Wave", color: "#2563eb" }, { id: "om", label: "Orange Money", color: "#f97316" }].map(m => (
            <button key={m.id} type="button" onClick={() => setMethod(m.id)} className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
              style={{ background: method === m.id ? `${m.color}18` : "rgba(255,255,255,0.02)", border: `1px solid ${method === m.id ? `${m.color}50` : "rgba(255,255,255,0.06)"}`, color: method === m.id ? m.color : "rgba(255,255,255,0.3)" }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-xs text-slate-400 font-semibold">Envoie <span className="text-white font-bold">2 000 FCFA</span> via {method === "wave" ? "Wave" : "Orange Money"} au :</div>
        <div className="font-mono text-lg font-bold tracking-widest" style={{ color: method === "wave" ? "#2563eb" : "#f97316" }}>+221 XX XXX XX XX</div>
        <div className="text-xs text-slate-500">Motif : <span className="text-slate-300">CV — {[data.prenom, data.nom].filter(Boolean).join(" ") || "Ton nom"}</span></div>
      </div>
      {!paid ? (
        <div>
          <Label>RÉFÉRENCE DE TRANSACTION</Label>
          <div className="flex gap-2">
            <Input value={ref} onChange={e => setRef(e.target.value)} placeholder="Ex: 7F4K2..." />
            <button onClick={() => ref.trim() && onPaid(ref.trim())} type="button" disabled={!ref.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all disabled:opacity-30"
              style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8" }}>
              Confirmer
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-4 flex items-center gap-3" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(52,211,153,0.15)" }}>
            <Check className="w-4 h-4" style={{ color: "#34d399" }} />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "#34d399" }}>Paiement confirmé</div>
            <div className="text-xs text-slate-500 mt-0.5">Réf : {paid} · PDF prêt à télécharger</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function CvGenerator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INIT);
  const [paid, setPaid] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const canNext = () => step !== 1 || (data.prenom.trim() && data.nom.trim() && data.titre.trim());

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const PdfDoc = PDF_COMPONENTS[data.theme];
      const blob = await pdf(<PdfDoc data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV-${data.prenom}-${data.nom}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la génération. Réessaie.");
    } finally {
      setDownloading(false);
    }
  }, [data]);

  return (
    <>
      <Head title="Générateur de CV — KoriLab" />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16" style={{ background: "#040d1a" }}>
        <div className="section-padding mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/services" className="font-mono text-[11px] tracking-widest text-sky-400/40 hover:text-sky-400/70 transition-colors" style={{ textDecoration: "none" }}>SERVICES</Link>
            <ChevronRight className="w-3 h-3 text-sky-400/20" />
            <span className="font-mono text-[11px] tracking-widest text-sky-400/70">GÉNÉRATEUR DE CV</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <button type="button" onClick={() => done && setStep(s.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
                    style={{ cursor: done ? "pointer" : "default", background: active ? "rgba(56,189,248,0.1)" : "transparent", border: active ? "1px solid rgba(56,189,248,0.2)" : "1px solid transparent" }}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: done ? "rgba(52,211,153,0.15)" : active ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.04)", border: done ? "1px solid rgba(52,211,153,0.3)" : active ? "1px solid rgba(56,189,248,0.3)" : "1px solid rgba(255,255,255,0.06)" }}>
                      {done ? <Check className="w-3 h-3" style={{ color: "#34d399" }} /> : <Icon className="w-3 h-3" style={{ color: active ? "#38bdf8" : "rgba(255,255,255,0.2)" }} />}
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: active ? "white" : done ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.2)" }}>{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && <div className="w-6 h-px mx-1" style={{ background: step > s.id ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.04)" }} />}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Form */}
            <div className="rounded-2xl p-8" style={{ background: "linear-gradient(135deg, rgba(4,13,26,0.95), rgba(5,8,20,0.98))", border: "1px solid rgba(56,189,248,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  {step === 1 && <StepProfil data={data} set={setData} />}
                  {step === 2 && <StepParcours data={data} set={setData} />}
                  {step === 3 && <StepCompetences data={data} set={setData} />}
                  {step === 4 && <StepTheme data={data} set={setData} />}
                  {step === 5 && <StepPaiement data={data} onPaid={setPaid} paid={paid} />}
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(56,189,248,0.07)" }}>
                <button onClick={() => setStep(s => s - 1)} disabled={step === 1} type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-0"
                  style={{ color: "rgba(148,163,184,0.7)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <ChevronLeft className="w-4 h-4" /> Retour
                </button>
                {step < 5 ? (
                  <button onClick={() => canNext() && setStep(s => s + 1)} type="button" disabled={!canNext()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8" }}>
                    Continuer <ChevronRight className="w-4 h-4" />
                  </button>
                ) : paid ? (
                  <button onClick={handleDownload} disabled={downloading} type="button"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
                    style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.08))", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399" }}>
                    <Download className="w-4 h-4" /> {downloading ? "Génération..." : "Télécharger PDF"}
                  </button>
                ) : null}
              </div>
            </div>

            {/* Preview info */}
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-widest text-sky-400/50">APERÇU THÈME</span>
                <button onClick={() => setShowPreview(v => !v)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors lg:hidden">
                  <Eye className="w-3.5 h-3.5" />{showPreview ? "Masquer" : "Afficher"}
                </button>
              </div>
              <div className={showPreview ? "block" : "hidden lg:block"}>
                {/* Theme colour preview */}
                {(() => {
                  const t = THEMES.find(th => th.id === data.theme);
                  const p = t?.preview;
                  return (
                    <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${p?.accent}22`, aspectRatio: "1/1.414", background: p?.bg, display: "flex" }}>
                      {data.theme !== "minimal" && (
                        <div style={{ width: data.theme === "modern" ? "100%" : "32%", background: p?.sidebar, padding: 12, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                          {data.theme === "modern" ? (
                            <>
                              <div style={{ height: 14, background: "rgba(255,255,255,0.9)", borderRadius: 3, width: "50%", marginBottom: 7 }} />
                              <div style={{ height: 8, background: "rgba(255,255,255,0.5)", borderRadius: 3, width: "35%", marginBottom: 20 }} />
                              <div style={{ display: "flex", gap: 6 }}>
                                {[60, 45, 55].map((w, i) => <div key={i} style={{ height: 5, background: "rgba(255,255,255,0.3)", borderRadius: 2, width: `${w}px` }} />)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ width: 30, height: 30, borderRadius: 15, background: p?.accent, margin: "0 auto 10px", opacity: 0.8 }} />
                              {[70, 55, 65, 50].map((w, i) => <div key={i} style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, width: `${w}%`, marginBottom: 5 }} />)}
                            </>
                          )}
                        </div>
                      )}
                      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                        {data.theme === "minimal" && (
                          <>
                            <div style={{ height: 14, background: "#111", borderRadius: 2, width: "60%" }} />
                            <div style={{ height: 14, background: "#111", borderRadius: 2, width: "45%", opacity: 0.3, marginBottom: 6 }} />
                            <div style={{ height: 2, background: "#111", marginBottom: 2 }} />
                            <div style={{ height: 1, background: "#111", marginBottom: 10, opacity: 0.4 }} />
                          </>
                        )}
                        <div style={{ height: 5, background: p?.accent, borderRadius: 1, width: "35%", marginBottom: 4 }} />
                        {[90, 75, 85, 70, 80, 65, 75, 60, 85, 70].map((w, i) => (
                          <div key={i} style={{ height: 4, background: p?.text, borderRadius: 1, width: `${w}%`, opacity: data.theme === "dark" ? 0.25 : 0.12 }} />
                        ))}
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-3 text-center">
                  <div className="text-xs font-bold text-white">{THEMES.find(t => t.id === data.theme)?.label}</div>
                  <p className="text-[10px] text-slate-600 mt-1">Le PDF sera généré côté navigateur, aucune donnée envoyée au serveur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
