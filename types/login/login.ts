export interface ResponseLoginInterface {
  message: string;
  statusCode: number;
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
      user: UserInterface;
    };
    message: string;
  };
}
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  type: string;
  refreshToken: string | null;
}
