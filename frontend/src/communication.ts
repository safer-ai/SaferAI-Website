const backend_url = process.env.REACT_APP_COUNTERGEN_BACK_URL ?? "";
const getperf = (input: string, output: string) => {
  return fetch(backend_url + "/get_perf", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: input,
      output: output,
    }),
  }).then((response) => response.json());
};
export default getperf;
