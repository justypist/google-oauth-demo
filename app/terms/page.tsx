import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务条款 | OAuth Demo",
  description: "OAuth Demo 服务条款",
};

export default function TermsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_24%),linear-gradient(180deg,_#000000_0%,_#040404_44%,_#000000_100%)] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-[32px] border border-white/12 bg-white/[0.05] p-8 shadow-2xl shadow-black/40 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-white/55">
                Terms Of Service
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                服务条款
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/64">
                本页面是示例站点的基础服务条款模板。你在正式上线前，应根据自己的业务模式、责任边界和联系方式自行补充完善。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                返回首页
              </Link>
              <Link
                href="/privacy"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                查看隐私政策
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/30 sm:p-8">
          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. 服务说明</h2>
            <p className="text-sm leading-7 text-white/64">
              本站提供基于第三方 OAuth 的登录能力、本地账号识别、账号绑定及基础账号信息展示功能。站点运营者可随时调整、暂停或终止部分功能。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. 用户责任</h2>
            <p className="text-sm leading-7 text-white/64">
              你应合法、合规地使用本服务，不得借助本站进行欺诈、攻击、滥用第三方登录接口或其他违法违规行为。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. 账号与绑定关系</h2>
            <p className="text-sm leading-7 text-white/64">
              当你在已登录状态下继续绑定其他第三方平台账号时，这些平台账号会关联到同一个本地用户。你应确保自己有权使用并绑定这些第三方账号。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. 责任限制</h2>
            <p className="text-sm leading-7 text-white/64">
              对于因第三方平台故障、网络异常、服务中断、身份提供商策略变化等原因造成的登录失败、绑定失败或访问受限，站点运营者将在合理范围内处理，但不对间接损失承担责任。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. 条款调整</h2>
            <p className="text-sm leading-7 text-white/64">
              当业务流程、支持的平台或服务规则发生变化时，站点运营者可以更新本条款，并在页面中发布最新版本。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. 联系方式</h2>
            <p className="text-sm leading-7 text-white/64">
              请将下面的占位邮箱替换成你的真实联系邮箱：
            </p>
            <code className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
              contact@example.com
            </code>
          </article>
        </section>
      </div>
    </main>
  );
}
