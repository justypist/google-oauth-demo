import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策 | OAuth Demo",
  description: "OAuth Demo 隐私政策",
};

export default function PrivacyPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_24%),linear-gradient(180deg,_#000000_0%,_#040404_44%,_#000000_100%)] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-[32px] border border-white/12 bg-white/[0.05] p-8 shadow-2xl shadow-black/40 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-white/55">
                Privacy Policy
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                隐私政策
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/64">
                本页面适用于当前示例站点的第三方登录、账号创建、账号绑定和会话管理流程。
                若你准备将该项目对外提供服务，应根据自己的真实业务、联系邮箱和数据处理方式继续完善本页面。
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
                href="/terms"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                查看服务条款
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/30 sm:p-8">
          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. 我们收集的数据</h2>
            <p className="text-sm leading-7 text-white/64">
              当你使用第三方 OAuth 平台登录时，系统可能收集并存储以下信息：昵称、邮箱、头像、第三方平台账号标识、本地用户 ID、登录会话信息，以及账号绑定关系。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. 数据用途</h2>
            <p className="text-sm leading-7 text-white/64">
              这些数据仅用于身份认证、创建本地账号、识别同一用户绑定的多个平台账号、展示基本个人信息，以及维持站点登录状态。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. 数据存储方式</h2>
            <p className="text-sm leading-7 text-white/64">
              登录相关数据会存储在站点服务端数据库中；浏览器端还会保存用于识别登录状态的会话 cookie。当前示例项目使用 PostgreSQL 保存账号与绑定关系。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. 数据共享</h2>
            <p className="text-sm leading-7 text-white/64">
              除实现登录所必需的第三方认证流程外，我们不会主动出售或向无关第三方共享你的个人信息。若未来接入新的外部服务，应在本政策中明确披露。
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. 数据保留与删除</h2>
            <p className="text-sm leading-7 text-white/64">
              我们会在账号存在期间保留与登录和绑定相关的数据。你可以通过联系站点运营者申请删除账号及相关数据，或要求解绑指定第三方平台账号。
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

          <article className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. 政策更新</h2>
            <p className="text-sm leading-7 text-white/64">
              如果登录方式、数据用途、存储位置或共享方式发生变化，我们会同步更新本页面内容。
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
