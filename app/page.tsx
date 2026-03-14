import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { ProviderAuthButton, SignOutButton } from "@/components/auth-actions";
import { getAccountCenterSummary } from "@/lib/account";
import { authOptions, isAuthConfigured } from "@/lib/auth";
import {
  authBaseEnvNames,
  enabledAuthProviders,
  supportedAuthProviders,
} from "@/lib/auth-providers";

export default async function Home(): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions);
  const accountSummary = session?.user?.id
    ? await getAccountCenterSummary(session.user.id)
    : null;
  const authBaseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const linkedProviderIds = new Set(
    accountSummary?.linkedAccounts.map((account) => account.provider) ?? [],
  );
  const providerCallbackUrls = supportedAuthProviders.map((provider) => ({
    callbackUrl: `${authBaseUrl}${provider.callbackPath}`,
    envNames: [
      ...provider.envNameGroups.clientId,
      ...provider.envNameGroups.clientSecret,
    ],
    id: provider.id,
    name: provider.name,
  }));
  const sessionJson = session ? JSON.stringify(session, null, 2) : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_26%),linear-gradient(180deg,_#000000_0%,_#050505_48%,_#000000_100%)] px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.05] p-8 shadow-2xl shadow-black/40 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-white/55">
                OAuth Demo
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                多平台 OAuth 登录与账号绑定示例
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/74 sm:text-lg">
                当前实现基于 PostgreSQL 维护本地用户与账号绑定关系。第三方 OAuth 登录成功后，会落本地用户表和账号绑定表；后续在已登录状态下继续授权，可把多个平台挂到同一个本地账号。
                你也可以访问
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-sm text-white">
                  /api/demo/session
                </code>
                和
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-sm text-white">
                  /api/account/links
                </code>
                验证当前会话与绑定关系。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isAuthConfigured ? (
                session ? (
                  <>
                    <Link
                      href="/account"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 text-sm font-semibold text-white transition hover:bg-white/12"
                    >
                      账号中心
                    </Link>
                    <SignOutButton />
                  </>
                ) : (
                  enabledAuthProviders.map((provider) => (
                    <ProviderAuthButton
                      key={provider.id}
                      provider={provider}
                    />
                  ))
                )
              ) : (
                <span className="rounded-full border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/78">
                  先完成数据库和 OAuth 环境变量配置
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">当前登录状态</h2>
                <p className="mt-1 text-sm text-white/62">
                  这里展示服务端读取到的 session 数据。
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/62">
                {session ? "Authenticated" : "Guest"}
              </span>
            </div>

            {session ? (
              <div className="mt-6 space-y-6">
                <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/5 p-5 sm:flex-row sm:items-center">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User avatar"}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-2xl border border-white/10 object-cover grayscale"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-2xl font-semibold text-white">
                      {(session.user?.name ?? "U").slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-white">
                      {session.user?.name ?? "未返回昵称"}
                    </p>
                    <p className="text-sm text-white/68">
                      {session.user?.email ?? "未返回邮箱"}
                    </p>
                    <p className="text-xs text-white/45">
                      本地用户 ID：{session.user.id}
                    </p>
                    <p className="text-xs text-white/45">
                      角色 / 状态：{session.user.role} / {session.user.status}
                    </p>
                    <p className="text-xs text-white/45">
                      Session 过期时间：{session.expires}
                    </p>
                  </div>
                </div>

                {accountSummary ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/42">
                        Linked Providers
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-white">
                        {accountSummary.linkedAccounts.length}
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/42">
                        Account Created
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/74">
                        {new Date(accountSummary.user.createdAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60">
                  <div className="border-b border-white/10 px-4 py-3 text-sm text-white/62">
                    Session JSON
                  </div>
                  <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-white/86">
                    <code>{sessionJson}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-sm leading-7 text-white/68">
                还没有检测到登录态。完成任一已启用平台的 OAuth 配置后，点击上方按钮即可跳转到对应授权页。
              </div>
            )}
          </article>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">
                {session ? "平台关联入口" : "平台登录入口"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/64">
                {session
                  ? "保持当前登录态后，点击未绑定平台即可把新 OAuth 账号关联到当前本地用户。"
                  : "这里会直接显示当前可用的平台登录按钮；未配置的平台会展示缺失的环境变量。"}
              </p>
              <div className="mt-6 space-y-4">
                {supportedAuthProviders.map((provider) => {
                  const isLinked = linkedProviderIds.has(provider.id);

                  return (
                    <div
                      key={provider.id}
                      className="rounded-3xl border border-white/10 bg-black/45 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {provider.name}
                          </p>
                          <p className="mt-1 text-sm text-white/64">
                            {session
                              ? isLinked
                                ? "当前账号已经绑定"
                                : provider.enabled
                                  ? "已配置，可直接绑定"
                                  : "尚未配置环境变量"
                              : provider.enabled
                                ? "已配置，可直接登录"
                                : "尚未配置环境变量"}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${
                            session
                              ? isLinked
                                ? "border border-white/14 bg-white/8 text-white"
                                : provider.enabled
                                  ? "border border-white/14 bg-white/8 text-white"
                                  : "border border-white/10 bg-white/5 text-white/48"
                              : provider.enabled
                                ? "border border-white/14 bg-white/8 text-white"
                                : "border border-white/10 bg-white/5 text-white/48"
                          }`}
                        >
                          {session
                            ? isLinked
                              ? "已绑定"
                              : provider.enabled
                                ? "可绑定"
                                : "未启用"
                            : provider.enabled
                              ? "可登录"
                              : "未启用"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {session ? (
                          isLinked ? (
                            <span className="text-sm text-white/64">
                              当前账号已经绑定了 {provider.name}。
                            </span>
                          ) : provider.enabled ? (
                            <ProviderAuthButton
                              provider={provider}
                              callbackUrl="/"
                              mode="link"
                            />
                          ) : (
                            <code className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/62">
                              {provider.requiredEnvNames.join(", ")}
                            </code>
                          )
                        ) : provider.enabled ? (
                          <ProviderAuthButton provider={provider} />
                        ) : (
                          <code className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/62">
                            {provider.requiredEnvNames.join(", ")}
                          </code>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">基础环境变量</h2>
              <p className="mt-2 text-sm leading-7 text-white/64">
                缺少下面任意一项，数据库会话和账号绑定都无法工作。
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/84">
                {authBaseEnvNames.map((name) => (
                  <li
                    key={name}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">平台配置状态</h2>
              <div className="mt-4 space-y-3">
                {supportedAuthProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="rounded-2xl border border-white/8 bg-black/45 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-white">{provider.name}</span>
                      <span
                        className={`text-xs uppercase tracking-[0.2em] ${
                          provider.enabled ? "text-white" : "text-white/40"
                        }`}
                      >
                        {provider.enabled ? "enabled" : "disabled"}
                      </span>
                    </div>
                    <code className="mt-2 block text-xs text-white/62">
                      {provider.requiredEnvNames.join(", ")}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">OAuth 回调地址</h2>
              <p className="mt-2 text-sm leading-7 text-white/74">
                回调路径遵循
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  /api/auth/callback/&lt;provider&gt;
                </code>
                ，把
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  &lt;provider&gt;
                </code>
                替换成目标平台标识即可。
              </p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/74">
                当前
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  NEXTAUTH_URL
                </code>
                为
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  {authBaseUrl}
                </code>
                。
              </div>
              <code className="mt-4 block rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-sm text-white">
                {authBaseUrl}/api/auth/callback/&lt;provider&gt;
              </code>
              <div className="mt-4 space-y-3">
                {providerCallbackUrls.map((provider) => (
                  <div
                    key={provider.id}
                    className="rounded-3xl border border-white/10 bg-black/45 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-white">
                        {provider.name}
                      </span>
                      <code className="text-xs text-white/52">
                        {provider.envNames.join(", ")}
                      </code>
                    </div>
                    <code className="mt-3 block rounded-2xl border border-amber-400/30 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
                      {provider.callbackUrl}
                    </code>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/64">
                如果平台控制台提示回调地址不匹配，就把上面对应平台的地址原样填入其 OAuth 应用配置中，并确保域名、协议、端口和
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  NEXTAUTH_URL
                </code>
                完全一致。
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold text-white">验证方式</h2>
              <p className="mt-2 text-sm leading-7 text-white/64">
                登录后访问
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  /api/demo/session
                </code>
                或
                <code className="mx-1 rounded border border-white/10 bg-white/8 px-2 py-1 text-xs text-white">
                  /api/account/links
                </code>
                ，未登录会返回 401，已登录会返回当前 session 和绑定关系。
              </p>
            </div>
          </aside>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/64 sm:flex-row sm:items-center">
          <p className="leading-7">
            正式上线前，请把隐私政策和服务条款页面地址填入第三方开放平台控制台。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/16 bg-white/6 px-4 font-medium text-white transition hover:bg-white/12"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/16 bg-white/6 px-4 font-medium text-white transition hover:bg-white/12"
            >
              服务条款
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
