'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from '@/i18n/config';
import { getDictionary as loadDict } from '@/i18n/dictionaries';

type Dict = ReturnType<typeof loadDict>;
type CtxType = { lang: Lang; setLang: (l: Lang) => void; t: (key: string, vars?: Record<string, string | number>) => string };

const I18nCtx = createContext<CtxType | null>(null);

function deepGet(obj: any, path: string) {
  return path.split('.').reduce((o, p) => (o && p in o ? o[p] : undefined), obj);
}
function applyVars(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return Object.keys(vars).reduce((s, k) => s.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), String(vars[k])), str);
}

export function I18nProvider({
  children,
  initialLang,
  initialDict,
}: {
  children: React.ReactNode;
  initialLang: Lang;
  initialDict: Dict;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [dict, setDict] = useState<Dict>(initialDict);

  // Cookie bo'lsa, clientda bitta sinxronlashtirib olamiz
  useEffect(() => {
    const m = document.cookie.match(/(?:^|;)\s*lang=([^;]+)/);
    const cookieLang = (m ? decodeURIComponent(m[1]) : '') as Lang;
    if (cookieLang && cookieLang !== lang) {
      setLang(cookieLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    if (typeof document !== 'undefined') document.documentElement.lang = l;
    setDict(loadDict(l)); // getDictionary sync obyekt qaytaradi
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    const v = deepGet(dict, key);
    return applyVars(typeof v === 'string' ? v : key, vars);
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang, dict]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
