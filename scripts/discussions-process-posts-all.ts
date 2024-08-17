import fs from 'node:fs';

import { getDiscussionIdSet, writeDiscussion, type IGithubEventPath } from './utils';

const discussionsProcessPosts = async (githubEventPath: string) => {
  const event: IGithubEventPath = JSON.parse(fs.readFileSync(githubEventPath, 'utf-8'));
  const repoId = event.repository.node_id;
  const repoOwner = event.repository.owner.login;
  const repoName = event.repository.name;
  const firstDiscussionsNums = process.env.FIRST_DISCUSSIONS_NUMS || '0';

  const ids = await getDiscussionIdSet(repoOwner, repoName, firstDiscussionsNums);
  ids.forEach(async itm => {
    await writeDiscussion(repoOwner, repoName, itm, repoId);
  });
};

const init = () => {
  const args = process.argv;
  const githubEventPath = args[2];
  if (githubEventPath === undefined) {
    console.error('未提供任何参数');
    return process.exit(1);
  }
  if (!fs.existsSync(githubEventPath)) {
    console.error('文件不存在');
    return process.exit(1);
  }

  discussionsProcessPosts(githubEventPath);
};
init();
