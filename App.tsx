
import React, { useState, useEffect } from 'react';
import { StepCard } from './components/StepCard';
import { CodeBlock } from './components/CodeBlock';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepComplete = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const progress = (completedSteps.length / 5) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <h1 className="text-lg font-bold text-gray-900">GitHub Pages 公開ガイド</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-gray-500 font-medium">
              進捗状況: {Math.round(progress)}%
            </div>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Mentor Introduction */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-indigo-100">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👋</div>
            <div>
              <h2 className="text-xl font-bold mb-1">こんにちは！あなたのメンターです</h2>
              <p className="text-indigo-100 opacity-90 leading-relaxed">
                今日はあなたが作った素晴らしいWebアプリを、GitHub Pagesを使って世界中に無料公開するお手伝いをします。
                プログラミングが初めての方でも大丈夫。一つずつ一緒に進めていきましょう！
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 no-scrollbar">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentStep(num)}
              className={`flex-none px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === num
                  ? 'bg-indigo-600 text-white shadow-md'
                  : completedSteps.includes(num)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              ステップ {num}
            </button>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <StepCard title="事前準備" icon="🛠️">
            <p>まずは、作業に必要な「道具」を揃えましょう。</p>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-gray-800 mb-2">1. GitHubアカウントの作成</h3>
                <p className="text-sm">
                  まだ持っていない方は <a href="https://github.com/join" target="_blank" className="text-indigo-600 underline">GitHub公式サイト</a> から作成しましょう。
                  これはあなたの「作品ポートフォリオ」を置くための世界最大のプラットフォームです。
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-gray-800 mb-2">2. Gitのインストール確認</h3>
                <p className="text-sm mb-3">
                  Gitは「コードの変更履歴を記録する魔法のノート」です。
                  PCの**ターミナル**（Macなら「ターミナル」、Windowsなら「コマンドプロンプト」や「PowerShell」）を開いて、以下のコマンドを入力してみてください。
                </p>
                <CodeBlock code="git --version" />
                <p className="text-xs text-gray-500 mt-2">
                  ※バージョン番号が表示されればOKです。表示されない場合は、<a href="https://git-scm.com/downloads" target="_blank" className="text-indigo-600 underline">公式サイト</a>からダウンロードしてインストールしてください。
                </p>
              </div>
            </div>
          </StepCard>
        )}

        {currentStep === 2 && (
          <StepCard title="ローカルリポジトリの作成" icon="📁">
            <p>PCの中にプロジェクト専用のフォルダを作成し、Gitを使えるようにします。</p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="text-sm text-yellow-800 font-bold">⚠️ セキュリティの最重要ルール</p>
              <p className="text-xs text-yellow-700 mt-1">
                AIアプリを開発する場合、**APIキーをコードの中に直接書き込まない**ようにしましょう。
                今回は公開用に「APIキーを使わずに動くデモ版」を作成する前提で進めます。本番のキーがGitHubに流出すると悪用される危険があるため、将来的な注意点として覚えておいてくださいね。
              </p>
            </div>

            <p className="text-sm">ターミナルで以下の順にコマンドを実行し、フォルダを作成します。</p>
            <CodeBlock code={`mkdir my-ai-app\ncd my-ai-app\ngit init`} />
            <p className="text-xs text-gray-500 italic">
              ※ `git init` を実行すると、そのフォルダが「履歴管理対象」になります。
            </p>

            <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
              <h4 className="font-bold text-indigo-900 mb-2">ファイルの配置</h4>
              <p className="text-sm text-indigo-800">
                作成した `my-ai-app` フォルダの中に、あなたのHTMLやJavaScriptファイルを入れましょう。
                このガイドでは、`index.html` という名前のメインファイルがあることを想定しています。
              </p>
            </div>
          </StepCard>
        )}

        {currentStep === 3 && (
          <StepCard title="GitHubへのアップロード" icon="📤">
            <p>作成したファイルを、クラウド上のGitHubへ送りましょう（プッシュと言います）。</p>

            <h3 className="font-bold text-gray-800 mt-4 mb-2">1. GitHub上でリポジトリを作成</h3>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4">
              <li>GitHubにログインし、右上の「＋」ボタンから「New repository」を選択。</li>
              <li>Repository nameに `my-ai-app` と入力。</li>
              <li>「Public」を選択（Pagesで公開するため）。</li>
              <li>一番下の「Create repository」をクリック。</li>
            </ul>

            <h3 className="font-bold text-gray-800 mt-4 mb-2">2. コマンドでアップロード</h3>
            <p className="text-sm mb-3">GitHubで作成した後に表示される「or push an existing repository...」の部分を参考にコマンドを打ちます。</p>
            <CodeBlock code={`git add .\ngit commit -m "first commit"\ngit branch -M main\ngit remote add origin https://github.com/あなたのユーザー名/my-ai-app.git\ngit push -u origin main`} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-mono text-indigo-600 font-bold">git add .</span>
                <p className="text-xs mt-1 text-gray-600">変更を「記録待ち」状態にする</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-mono text-indigo-600 font-bold">git commit</span>
                <p className="text-xs mt-1 text-gray-600">メッセージを添えて履歴を「確定」する</p>
              </div>
            </div>
          </StepCard>
        )}

        {currentStep === 4 && (
          <StepCard title="GitHub Pagesによる公開" icon="🌐">
            <p>いよいよ公開設定です！設定画面からワンクリックで完了します。</p>

            <div className="space-y-6 mt-4">
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold">Settingsを開く</h3>
                  <p className="text-sm">GitHubのリポジトリ画面上部にあるタブから「Settings」をクリックします。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold">Pages設定へ移動</h3>
                  <p className="text-sm">左側のメニューから「Code and automation」の下にある「Pages」を選択します。</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold">ブランチの選択</h3>
                  <p className="text-sm">Build and deploymentセクションの「Branch」で `main` (もしくは master) を選択し、横の「Save」をクリックします。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <h4 className="font-bold text-green-900 mb-2">🎉 これで完了です！</h4>
              <p className="text-sm text-green-800">
                数分待つと、同じ画面のトップに <strong>"Your site is live at..."</strong> というメッセージとURLが表示されます。
                そのURLにアクセスすれば、あなたのアプリが世界中に公開されています！
              </p>
            </div>
          </StepCard>
        )}

        {currentStep === 5 && (
          <StepCard title="READMEの作成" icon="📝">
            <p>最後に見栄えを整えましょう。`README.md` はプロジェクトの顔です。</p>
            
            <p className="text-sm">
              プロジェクトフォルダに `README.md` というファイルを作り、以下の内容をコピーして貼り付けてみてください。
              （マークダウン形式という書き方で、GitHub上で綺麗に表示されます）
            </p>

            <CodeBlock language="markdown" code={`# 🤖 My AI Application\n\nこのプロジェクトはAIを使ったWebアプリケーションです。\n\n## 🚀 デモ\n[GitHub PagesのURLをここに貼る]\n\n## 🛠️ 技術スタック\n- HTML / CSS / JavaScript\n- Gemini API (Mock Mode)\n\n## 📝 使い方\n1. ブラウザでURLを開きます。\n2. 入力欄に質問を入力して送信ボタンを押します。`} />

            <div className="mt-6">
              <p className="text-sm font-bold text-gray-700 mb-2">作成したら再度アップロードを忘れずに：</p>
              <CodeBlock code={`git add README.md\ngit commit -m "Add README"\ngit push`} />
            </div>

            <div className="mt-12 text-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-xl">
              <div className="text-4xl mb-4">🎖️</div>
              <h3 className="text-2xl font-bold mb-2">おめでとうございます！</h3>
              <p className="opacity-90">
                あなたはエンジニアとしての大きな第一歩を踏み出しました。<br/>
                世界中にあなたのアイデアを発信する準備が整いました。
              </p>
            </div>
          </StepCard>
        )}

        {/* Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium transition-all ${
                currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              戻る
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 5}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium transition-all ${
                currentStep === 5 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
              }`}
            >
              次へ
            </button>
          </div>
          
          <button
            onClick={() => toggleStepComplete(currentStep)}
            className={`w-full sm:w-auto px-8 py-2.5 rounded-xl font-bold transition-all border-2 ${
              completedSteps.includes(currentStep)
                ? 'bg-green-500 border-green-500 text-white'
                : 'bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            {completedSteps.includes(currentStep) ? '✓ ステップ完了！' : 'このステップを完了にする'}
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm pb-12">
          <p>© 2024 GitHub Publishing Mentor Guide</p>
          <p className="mt-1">あなたの挑戦をいつでも応援しています！🚀</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
