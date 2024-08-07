/**
 * @see https://cz-git.qbb.sh/zh/config
 * @type {import('czg').UserConfig}
 */
export default {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'perf', 'refactor', 'chore', 'build', 'ci', 'style', 'test', 'docs', 'revert', 'wip', 'init']],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围:',
      subject: '填写简短精炼的变更描述:\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行:\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行:\n',
      footerPrefixesSelect: '选择关联 issue 前缀（可选）:',
      customFooterPrefix: '输入自定义 issue 前缀:',
      footer: '列举关联 issue (可选) 例如: #31, #34:\n',
      generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '是否提交或修改 commit?',
    },
    types: [
      { value: 'feat', name: '新增功能', emoji: ':sparkles:', symbol: '✨' },
      { value: 'fix', name: '修复缺陷', emoji: ':bug:', symbol: '🐛' },
      { value: 'perf', name: '性能优化', emoji: ':zap:', symbol: '⚡️' },
      { value: 'refactor', name: '代码重构（不包括 bug 修复、功能新增）', emoji: ':recycle:', symbol: '♻️ ' },
      { value: 'chore', name: '对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: ':hammer:', symbol: '🔨' },
      { value: 'build', name: '构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）', emoji: ':package:', symbol: '📦️' },
      { value: 'ci', name: '修改 CI 配置、脚本', emoji: ':building_construction:', symbol: '🏗️ ' },
      { value: 'style', name: '代码格式（不影响功能，例如空格、分号等格式修正）', emoji: ':art:', symbol: '🎨' },
      { value: 'test', name: '添加疏漏测试或已有测试改动', emoji: ':test_tube:', symbol: '🧪' },
      { value: 'docs', name: '文档变更', emoji: ':memo:', symbol: '📝' },
      { value: 'revert', name: '回滚 commit', emoji: ':rewind:', symbol: '⏪️' },
      { value: 'wip', name: '正在进行中的工作', emoji: ':construction:', symbol: '🚧' },
      { value: 'init', name: '初始化提交', emoji: ':tada:', symbol: '🎉' },
    ].map(({ value, name, emoji, symbol }) => {
      return { value, name: `${symbol} ${value.concat(':').padEnd(20)}${name}`, emoji };
    }),
    scopes: [
      { value: 'core', name: '引擎核心相关' },
      { value: 'components', name: '组件相关' },
      { value: 'hooks', name: 'hook 相关' },
      { value: 'utils', name: 'utils 相关' },
      { value: 'styles', name: '样式相关' },
      { value: 'deps', name: '项目依赖' },
      { value: 'other', name: '其他修改' },
    ].map(({ value, name }) => {
      return { value, name: `${value.padEnd(20)}${name}` };
    }),
    enableMultipleScopes: true,
    customScopesAlias: '以上都不是？我要自定义',
    emptyScopesAlias: '跳过',
    issuePrefixes: [
      { value: 'link', name: '链接 ISSUES 进行中' },
      { value: 'closed', name: '标记 ISSUES 已完成' },
    ].map(({ value, name }) => {
      return { value, name: `${value.concat(':').padEnd(20)}${name}` };
    }),
    emptyIssuePrefixAlias: '跳过',
    customIssuePrefixAlias: '自定义前缀',
    useEmoji: true,
  },
};
