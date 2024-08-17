import fs from 'node:fs';
import path from 'node:path';

import { graphql } from '@octokit/graphql';

interface IDiscussionRes {
  repository: {
    pinnedDiscussions: {
      nodes: {
        discussion: {
          number: number;
        };
      }[];
    };
    discussion: {
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
      category: {
        slug: string;
      };
      labels: {
        nodes: { name: string }[];
      };
    };
  };
}

type TAction = 'created' | 'edited' | 'deleted' | 'pinned' | 'unpinned' | 'labeled' | 'unlabeled' | 'category_changed';
export interface IGithubEventPath {
  action: TAction;
  discussion: {
    number: number;
    category: {
      slug: string;
    };
  };
  repository: {
    node_id: string;
    name: string;
    owner: {
      login: string;
    };
  };
}

function getFrontMatter(lines: string[]) {
  const frontMatter: Record<string, string | string[]> = {};
  const remaining: string[] = [];

  let started = false;
  let ended = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    const trimedLine = line.trim();
    if (ended) {
      remaining.push(line);
      continue;
    }
    if (started) {
      if (trimedLine === '-->') {
        ended = true;
        continue;
      }
      const [key = '', value = ''] = trimedLine.split(':');
      frontMatter[key.trim()] = value.trim();
    } else if (trimedLine === '<!--') {
      started = true;
    } else {
      remaining.push(line);
    }
  }

  while (remaining.length > 0 && remaining[0]?.trim() === '') {
    remaining.shift();
  }
  return { frontMatter, remaining };
}
export async function writeDiscussion(repoOwner: string, repoName: string, discussionNumber: number, repoId: string) {
  console.log(`Write discussion https://github.com/${repoOwner}/${repoName}/discussions/${discussionNumber}`);

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const graphqlAuth = graphql.defaults({
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  const gql = String.raw;
  const res: IDiscussionRes = await graphqlAuth(
    gql`
        query {
          repository(owner: "${repoOwner}", name: "${repoName}") {
            pinnedDiscussions(last: 100) {
              nodes {
                discussion {
                  number
                }
              }
            }
            discussion(number: ${discussionNumber}) {
              title
              body
              createdAt
              updatedAt
              category{
              name
                slug
              }
              labels(last: 10) {
                nodes {
                  name
                }
              }
            }
          }
        }
    `,
  );

  const pinnedNumbers = res.repository.pinnedDiscussions.nodes.map(node => node.discussion.number);
  const discussion = res.repository.discussion;
  const category = discussion.category.slug;

  const dir = path.join('src/content/blog', category);
  fs.mkdirSync(dir, { recursive: true });

  const lines = discussion.body.split('\r\n');
  const { frontMatter, remaining } = getFrontMatter(lines);
  if (!frontMatter.title) frontMatter.title = `'${discussion.title}'`;
  if (!frontMatter.pubDatetime) frontMatter.pubDatetime = discussion.createdAt;
  if (!frontMatter.modDatetime) frontMatter.modDatetime = discussion.updatedAt;
  if (!frontMatter.tags) frontMatter.tags = discussion.labels.nodes.map(label => label.name);
  if (!frontMatter.featured) frontMatter.featured = `${pinnedNumbers.includes(discussionNumber)}`;
  if (!frontMatter.description) {
    const minLen = Math.min(remaining.length, 5);
    let description = '';
    for (let i = 0; i < minLen; i++) {
      if (i + 1 === minLen) {
        if (i + 1 < remaining.length) {
          description += remaining[i]?.concat('...');
        } else {
          description += remaining[i];
        }
      } else {
        description += remaining[i]?.concat('\n');
      }
    }
    frontMatter.description = `'${description || discussion.title}'`;
  }

  const result: string[] = [];
  result.push('---');
  const matterKeys = Object.keys(frontMatter).sort();
  for (const key of matterKeys) {
    const value = frontMatter[key];
    if (typeof value === 'string') {
      result.push(`${key}: ${value}`);
    } else if (typeof value === 'object' && value.length) {
      result.push(`${key}:`);
      for (const v of value) {
        result.push(`  - ${v}`);
      }
    } else {
      console.error(`Invalid value for ${key}: ${value}`);
    }
  }
  result.push('---');
  result.push(...remaining);
  result.push(
    `<script src="https://giscus.app/client.js"
      data-repo="${repoOwner}/${repoName}"
      data-repo-id="${repoId}"
      data-mapping="number"
      data-term="${discussionNumber}"
      data-reactions-enabled="1"
      data-emit-metadata="1"
      data-input-position="top"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      data-loading="lazy"
      crossorigin="anonymous"
      async />`,
  );

  fs.writeFileSync(path.join(dir, `${discussionNumber}.md`), result.join('\n'));
}
export function deleteDiscussion(categoryNmae: string, discussionNumber: number) {
  const filepath = path.join('src/content/blog', categoryNmae, `${discussionNumber}.md`);
  if (fs.existsSync(filepath)) {
    console.log(`Deleting ${filepath}`);
    fs.rmSync(filepath);
  }
}

interface IFirstDiscussionsRes {
  repository: {
    discussions: {
      nodes: { number: number }[];
    };
  };
}
export async function getDiscussionIdSet(repoOwner: string, repoName: string, firstDiscussionsNums: string): Promise<number[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const graphqlAuth = graphql.defaults({
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const gql = String.raw;
  const res: IFirstDiscussionsRes = await graphqlAuth(
    gql`
        query {
          repository(owner: "${repoOwner}", name: "${repoName}") {
            discussions(first: ${firstDiscussionsNums}) {
              nodes {
                number
              }
            }
          }
        }
    `,
  );
  return res.repository.discussions.nodes.map(itm => itm.number);
}
