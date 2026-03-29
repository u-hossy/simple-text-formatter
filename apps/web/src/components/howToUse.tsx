export default function HowToUse() {
  return (
    <div className="space-y-6 text-sm text-foreground">
      <section className="space-y-2">
        <h3 className="text-base font-semibold">できること</h3>
        <p className="text-muted-foreground">
          2026年3月現在以下の機能に対応しています
        </p>
        <ul className="list-disc list-outside space-y-2 text-muted-foreground ml-5">
          <li>テキストの置換 （正規表現を使用することも可能です）</li>
          <li>
            全角と半角の変換（数字、アルファベット、カタカナ、空白、記号）
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold">使い方</h3>

        <div className="space-y-2">
          <h4 className="font-medium">はじめて使用される方</h4>
          <ol className="list-decimal list-outside space-y-2 text-muted-foreground ml-5">
            <li>
              画面上部の
              <strong className="font-semibold">テキストの入力</strong>
              に変換したいテキストを入力します
            </li>
            <li>
              <strong className="font-semibold">処理設定</strong>
              の中にある
              <strong className="font-semibold">処理の追加</strong>
              から変換したい処理を追加・設定します
            </li>
            <li>
              変換されたテキストが
              <strong className="font-semibold">結果確認</strong>
              に表示されます
            </li>
            <li>
              今後も同じ設定で変換するなら、
              <strong className="font-semibold">処理設定</strong>
              の中の
              <strong className="font-semibold">変換処理のエクスポート</strong>
              から処理設定をデバイスに保存しておくと便利です
            </li>
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">変換処理設定ファイルをお持ちの方</h4>
          <ol className="list-decimal list-outside space-y-2 text-muted-foreground ml-5">
            <li>
              画面上部の
              <strong className="font-semibold">テキストの入力</strong>
              に変換したいテキストを入力します
            </li>
            <li>
              <strong className="font-semibold">処理設定</strong>
              の中にある
              <strong className="font-semibold">処理のインポート</strong>
              から変換処理設定ファイル（JSON形式）を読み込みます
            </li>
            <li>
              変換されたテキストが
              <strong className="font-semibold">結果確認</strong>
              に表示されます
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">バグや不具合を見つけたら</h3>
        <p className="text-muted-foreground">
          お気軽にGithubのIssueに書き込んでいただければ幸いです。Pull
          Requestも大歓迎です。
        </p>
      </section>
    </div>
  );
}
