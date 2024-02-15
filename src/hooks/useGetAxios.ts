import axios from "axios";
import { useState } from "react";

export interface IGetAxiosRes {
  data: any;
  error: string;
}

async function useGetAxios(path: string): Promise<IGetAxiosRes> {
  const [data, setData] = useState({});
  const [error, setError] = useState<string>("");

  await axios.get(path).then(async (res) => {
    setData(res.data);
  }).catch((err) => {
    setError(err);
  })

  return {
    data,
    error,
  }
}

export default useGetAxios
