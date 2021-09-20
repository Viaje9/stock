import request from "@/utils/request";

export function getISData(id) {
  return request({
    url: "/api/getIS",
    method: "get",
    params: { id },
  });
}

export function getTMCData(id) {
  return request({
    url: "/api/getTMC",
    method: "get",
    params: { id },
  });
}

export function getMenu() {
  return request({
    url: "/api/getMenu",
    method: "get",
  });
}
