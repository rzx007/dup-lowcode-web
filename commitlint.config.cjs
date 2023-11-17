/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *     - ci: 持续集成修改
 *     - docs: 文档修改
 *     - feat: 新特性、新功能
 *     - fix: 修改bug
 *     - perf: 优化相关，比如提升性能、体验
 *     - refactor: 代码重构
 *     - revert: 回滚到上一个版本
 *     - style: 代码格式修改, 注意不是 css 修改
 *     - test: 测试用例修改
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'build', 'chore', 'revert', 'style', 'test']
    ],
    'type-empty': [2, 'never'], // <type> 不能为空
    // 'type-case': [2, 'always', 'lower-case'], // <type>格式小写
    'type-case': [0],
    'scope-empty': [0],
    // 'scope-case': [2, 'always', 'lower-case'], // <scope> 格式 小写
    'scope-case': [0],
    'subject-empty': [2, 'never'], // <subject> 不能为空 (默认)
    // 'subject-full-stop': [2, 'never', '.'], // <subject> 以.为结束标志
    'subject-full-stop': [0, 'never'],
    // 'subject-case': [2, 'never', 'lower-case'],
    'subject-case': [0, 'never'],

    'header-max-length': [0, 'always', 72] // header 最长72
  },
  prompt: {
    useEmoji: true,
    allowBreakingChanges: ['feat', 'fix'],
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    type: [
      { value: 'feat', name: '特性:   🚀  新增功能', emoji: '🚀' },
      { value: 'fix', name: '修复:   🧩  修复缺陷', emoji: '🧩' },
      { value: 'docs', name: '文档:   📚  文档变更', emoji: '📚' },
      {
        value: 'style',
        name: '格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）',
        emoji: '🎨'
      },
      { value: 'refactor', name: '重构:   ♻️  代码重构（不包括 bug 修复、功能新增）', emoji: '♻️' },
      { value: 'perf', name: '性能:    ⚡️  性能优化', emoji: '⚡️' },
      { value: 'test', name: '测试:   ✅  添加疏漏测试或已有测试改动', emoji: '✅' },
      {
        value: 'build',
        name: '构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
        emoji: '📦️'
      },
      { value: 'ci', name: '集成:   🎡  修改 CI 配置、脚本', emoji: '🎡' },
      { value: 'revert', name: '回退:   ⏪️  回滚 commit', emoji: '⏪️' },
      {
        value: 'chore',
        name: '其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
        emoji: '🔨'
      },
      { value: 'wip', name: '开发:   🕔  正在开发中', emoji: '🕔' },
      { value: 'workflow', name: '工作流:   📋  工作流程改进', emoji: '📋' },
      { value: 'types', name: '类型:   🔰  类型定义文件修改', emoji: '🔰' }
    ]
  }
}
