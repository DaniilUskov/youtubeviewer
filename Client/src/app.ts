import { request as req } from "@umijs/max";
import Role from "./enums/Role";

export async function getInitialState(): Promise<{
  userId: number | null;
  login: string | null;
  role: string | null;
  nickNameColor: string | null;
  avatarImageUrl: string | null;
  nickName: string | null;
}> {
  const user = await req("/api/auth/profile");
  var role: Role;

  switch (user?.role) {
    case 0:
      role = Role.admin;
      break;
    case 2:
      role = Role.ordinaryUser;
      break;
    case 3:
      role = Role.premiumUser;
      break;
    default:
      role = Role.guest;
      break;
  }

  console.log(user);

  return {
    userId: user.id,
    login: user.login,
    role,
    nickNameColor: user.nickNameColor,
    avatarImageUrl: user.avatarImageUrl,
    nickName: user.nickName
  };
}

export const request = {
  timeout: 5000,
  errorConfig: {
    errorHandler: () => {},
    errorThrower: () => {},
  },
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem("token");
      const authHeaders =
        token && config.url.substring(0, 5) == "/api/"
          ? { Authorization: "Bearer " + token }
          : {};
      const testHeaders = { "X-Test": "yes" };

      config.headers = { ...config.headers, ...authHeaders, ...testHeaders };

      return config;
    },
  ],
  responseInterceptors: [],
};
