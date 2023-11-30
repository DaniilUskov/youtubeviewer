import { request as req } from "@umijs/max";
// import Role from "./enums/Role";

export async function getInitialState(): Promise<{ userId: number | null, login: string | null, role: string | null }> {

  // const user = await req("/api/users/profile");
  // const role: Role = user?.role === 1 ? Role.admin : Role.manager;
  
  var user = {
    id: 1,
    login: "test",
    role: "user"
  }

  return { userId: user.id, login: user.login, role : user.role };
}

export const request = {
  timeout: 5000,
  errorConfig: {
    errorHandler: () => { },
    errorThrower: () => { }
  },
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem('token');
      const authHeaders = token && (config.url.substring(0, 5) == '/api/') ?
        { Authorization: 'Bearer ' + token } :
        {};
      const testHeaders = { 'X-Test': 'yes' };

      config.headers = { ...config.headers, ...authHeaders, ...testHeaders };

      return config;
    }
  ],
  responseInterceptors: []
};