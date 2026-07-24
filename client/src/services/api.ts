import ky from "ky";
import type { Ficha } from "../types";

const apiInstance = ky.create({
  prefix: "/api",
  timeout: 60_000,
});

interface UploadResponse {
  fichas: Ficha[];
  total: number;
  fileName: string;
}

export const api = {
  async uploadExcel(formData: FormData): Promise<UploadResponse> {
    return apiInstance
      .post("excel/upload", { body: formData })
      .json<UploadResponse>();
  },

  async health() {
    return apiInstance.get("health").json<{ status: string }>();
  },
};
