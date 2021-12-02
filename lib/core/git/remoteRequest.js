'use strict';

const { error } = require("../utils/colors");
const request = require("../request");
const getConfig = require("../getConfig");
const config = getConfig();
async function mergeRequest({
  source_branch,
  target_branch,
  token,
  description
}) {
  const params = {
    source_branch,
    target_branch,
    private_token: token,
    title: `Merge branch '${source_branch}' into '${target_branch}'`
  };
  if (description) {
    params.description = description;
  }
  const fetchData = await request.post({
    url: `${config.gitHost}/api/v4/projects/${config.gitID}/merge_requests`,
    data: params
  });
  if ("message" in fetchData) {
    const message = fetchData.message ? [].concat(fetchData.message).join("") : "\u8BF7\u6C42\u62A5\u9519\u4E86";
    return Promise.reject(error(message));
  }
  return fetchData;
}
module.exports = {
  mergeRequest
};