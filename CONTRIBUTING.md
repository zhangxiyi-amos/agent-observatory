# Contributing to agent-observatory

欢迎贡献！

## Quick Start

```bash
# Clone
git clone https://github.com/zhangxiyi-amos/agent-observatory.git
cd agent-observatory

# Install
pnpm install

# Dev
pnpm dev

# Test
pnpm test
```

## How to Contribute

1. **Bug 修复 / 小改动** → 直接提 PR
2. **新功能 / 架构变更** → 先开 Issue 讨论
3. **问题咨询** → 开 Issue

## Before You PR

- [ ] 本地测试通过：`pnpm build && pnpm lint && pnpm test`
- [ ] PR 聚焦单一功能
- [ ] 描述清楚改了什么、为什么改

## Commit 规范

使用 Conventional Commits：

```
feat: add user authentication
fix: memory leak in websocket
docs: update API documentation
refactor: simplify auth logic
test: add edge case tests
chore: update dependencies
```

## AI 生成代码

用 AI 工具（Codex、Claude 等）生成的代码完全欢迎！请在 PR 中：

- [ ] 标注为 AI 辅助
- [ ] 说明测试程度（未测试 / 简单测试 / 完整测试）
- [ ] 确认理解代码逻辑
