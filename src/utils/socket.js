import { io } from "socket.io-client";
import { BASE_URL } from "./constant";

export const creatSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.i0" });
  }
};
