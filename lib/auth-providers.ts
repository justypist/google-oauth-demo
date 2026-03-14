import type { Provider } from "next-auth/providers/index";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export type AuthProviderId = "github" | "google";

type ProviderEnvNames = {
  clientId: readonly string[];
  clientSecret: readonly string[];
};

export type AuthProviderMeta = {
  callbackPath: string;
  enabled: boolean;
  envNameGroups: ProviderEnvNames;
  id: AuthProviderId;
  name: string;
  requiredEnvNames: readonly string[];
};

type AuthProviderDefinition = AuthProviderMeta & {
  createProvider: (credentials: {
    clientId: string;
    clientSecret: string;
  }) => Provider;
};

function getEnvValue(names: readonly string[]): string | null {
  for (const name of names) {
    const value = process.env[name];

    if (value) {
      return value;
    }
  }

  return null;
}

function resolveProviderCredentials(
  envNameGroups: ProviderEnvNames,
): {
  clientId: string | null;
  clientSecret: string | null;
} {
  return {
    clientId: getEnvValue(envNameGroups.clientId),
    clientSecret: getEnvValue(envNameGroups.clientSecret),
  };
}

const providerDefinitions: AuthProviderDefinition[] = [
  {
    callbackPath: "/api/auth/callback/google",
    createProvider: (credentials) =>
      GoogleProvider({
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      }),
    envNameGroups: {
      clientId: ["GOOGLE_CLIENT_ID"],
      clientSecret: ["GOOGLE_CLIENT_SECRET"],
    },
    enabled: false,
    id: "google",
    name: "Google",
    requiredEnvNames: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  },
  {
    callbackPath: "/api/auth/callback/github",
    createProvider: (credentials) =>
      GitHubProvider({
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      }),
    envNameGroups: {
      clientId: ["GITHUB_CLIENT_ID"],
      clientSecret: ["GITHUB_CLIENT_SECRET"],
    },
    enabled: false,
    id: "github",
    name: "GitHub",
    requiredEnvNames: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
  },
];

export const authBaseEnvNames = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
] as const;

export const supportedAuthProviders: AuthProviderMeta[] = providerDefinitions.map(
  (provider) => {
    const credentials = resolveProviderCredentials(provider.envNameGroups);

    return {
      callbackPath: provider.callbackPath,
      enabled: Boolean(credentials.clientId && credentials.clientSecret),
      envNameGroups: provider.envNameGroups,
      id: provider.id,
      name: provider.name,
      requiredEnvNames: provider.requiredEnvNames,
    };
  },
);

export const enabledAuthProviders = supportedAuthProviders.filter(
  (provider) => provider.enabled,
);

export const oauthProviders = providerDefinitions
  .map((provider) => {
    const credentials = resolveProviderCredentials(provider.envNameGroups);

    if (!credentials.clientId || !credentials.clientSecret) {
      return null;
    }

    return provider.createProvider({
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
    });
  })
  .filter((provider): provider is Provider => provider !== null);

export const isAuthConfigured = Boolean(
  process.env.DATABASE_URL &&
    process.env.NEXTAUTH_SECRET &&
    process.env.NEXTAUTH_URL &&
    oauthProviders.length > 0,
);
