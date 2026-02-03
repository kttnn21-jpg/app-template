export default function AboutPage() {
  return (
    <div className="container section">
      <section className="card section">
        <h1>このテンプレについて</h1>
        <p>
          ログインなしで公開でき、データは端末内に保存されます。公開サイトを
          荒らしにくくしつつ、個人のメモやチェックリスト用途に使えます。
        </p>
        <ul>
          <li>スマホ優先のレスポンシブUI</li>
          <li>localStorageに保存</li>
          <li>JSONのバックアップ/復元</li>
        </ul>
      </section>
    </div>
  );
}
