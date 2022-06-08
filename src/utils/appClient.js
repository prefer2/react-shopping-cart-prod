import axios from "axios";
import { BASE_URL } from "@/constants";

const appClient = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  responseType: "json",
});

export default appClient;
