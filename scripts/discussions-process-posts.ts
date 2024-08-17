import fs from 'node:fs';

import { deleteDiscussion, type IGithubEventPath, writeDiscussion } from './utils';

const discussionsProcessPosts = (githubEventPath: string) => {
  const event: IGithubEventPath = JSON.parse(fs.readFileSync(githubEventPath, 'utf-8'));
  const action = event.action;
  const repoId = event.repository.node_id;
  const repoOwner = event.repository.owner.login;
  const repoName = event.repository.name;
  const discussionNumber = event.discussion.number;
  const categoryNmae = event.discussion.category.slug;

  switch (action) {
    case 'created':
    case 'edited':
    case 'pinned':
    case 'unpinned':
    case 'labeled':
    case 'unlabeled':
      writeDiscussion(repoOwner, repoName, discussionNumber, repoId);
      break;
    case 'deleted':
      deleteDiscussion(categoryNmae, discussionNumber);
      break;
    case 'category_changed':
      deleteDiscussion(categoryNmae, discussionNumber);
      writeDiscussion(repoOwner, repoName, discussionNumber, repoId);
      break;
  }
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
