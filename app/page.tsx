"use client";

import { useEffect, useMemo, useState } from "react";

type Entry = {
  id: string;
  title: string;
  note: string;
  createdAt: string;
};

type StoredData = {
  entries: Entry[];
  updatedAt: string;
};

const STORAGE_KEY = "app-template-data";

const emptyData: StoredData = {
  entries: [],
  updatedAt: new Date().toISOString()
};

function loadFromStorage(): StoredData {
  if (typeof window === "undefined") {
    return emptyData;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return emptyData;
  }
  try {
    const parsed = JSON.parse(raw) as StoredData;
    if (!parsed.entries || !Array.isArray(parsed.entries)) {
      return emptyData;
    }
    return parsed;
  } catch {
    return emptyData;
  }
}

export default function HomePage() {
  const [data, setData] = useState<StoredData>(emptyData);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setData(loadFromStorage());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const exportJson = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleAdd = () => {
    if (!title.trim()) {
      setMessage("タイトルは必須です");
      return;
    }
    const nextEntry: Entry = {
      id: crypto.randomUUID(),
      title: title.trim(),
      note: note.trim(),
      createdAt: new Date().toISOString()
    };
    const nextData: StoredData = {
      entries: [nextEntry, ...data.entries],
      updatedAt: new Date().toISOString()
    };
    setData(nextData);
    setTitle("");
    setNote("");
    setMessage("保存しました");
  };

  const handleReset = () => {
    setData(emptyData);
    setMessage("リセットしました");
  };

  const handleImport = (text: string) => {
    if (!text.trim()) {
      setMessage("JSONを入力してください");
      return;
    }
    try {
      const parsed = JSON.parse(text) as StoredData;
      if (!parsed.entries || !Array.isArray(parsed.entries)) {
        setMessage("JSON形式が不正です");
        return;
      }
      setData({
        entries: parsed.entries,
        updatedAt: new Date().toISOString()
      });
      setMessage("復元しました");
    } catch {
      setMessage("JSONが読み込めませんでした");
    }
  };

  return (
    <div className="container section">
      <section className="card section">
        <h1>ログイン不要の公開テンプレ</h1>
        <p className="helper">
          端末内保存 + JSONバックアップで、公開しても荒れにくい構成です。
        </p>
        {message ? <div className="badge">{message}</div> : null}
        <div className="grid">
          <label className="section">
            <span className="helper">タイトル</span>
            <input
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="今日やること"
            />
          </label>
          <label className="section">
            <span className="helper">メモ</span>
            <textarea
              className="textarea"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="補足を入れてください"
            />
          </label>
        </div>
        <div className="section" style={{ flexDirection: "row", gap: 12 }}>
          <button className="button" onClick={handleAdd}>
            追加する
          </button>
          <button className="button secondary" onClick={handleReset}>
            すべて削除
          </button>
        </div>
      </section>

      <section className="grid">
        <div className="card section">
          <h2>一覧</h2>
          {data.entries.length === 0 ? (
            <p className="helper">まだデータがありません。</p>
          ) : (
            <div className="list">
              {data.entries.map((entry) => (
                <div className="list-item" key={entry.id}>
                  <strong>{entry.title}</strong>
                  {entry.note ? <p>{entry.note}</p> : null}
                  <span className="list-meta">
                    {new Date(entry.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card section">
          <h2>バックアップ</h2>
          <p className="helper">
            JSONをコピーして保存、または貼り付けて復元します。
          </p>
          <label className="section">
            <span className="helper">エクスポート</span>
            <textarea className="textarea" readOnly value={exportJson} />
          </label>
          <label className="section">
            <span className="helper">インポート</span>
            <textarea
              className="textarea"
              placeholder="ここにJSONを貼り付け"
              onBlur={(event) => handleImport(event.target.value)}
            />
            <span className="helper">※フォーカスを外すと読み込みます</span>
          </label>
        </div>
      </section>
    </div>
  );
}
