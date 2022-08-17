#### 开发环境说明

| (｡･∀･)ﾉﾞ | 开发使用版本 | 需求 | 说明 |
| --- | --- | --- | --- |
| `windows` | Windows 10 专业版 `21H1` | - | 1. 界面仅作了`windows`适配<br/>2.`macOS`可用但无法保证行为(未进行验证) |
| `node` | `16.16.0` | `16.x` 或更高 | 1. 顶层 `await`<br/>2. `vite@3.x` 依赖 |
| `rustc` | `rustc 1.62.1 (e092d0b6b 2022-07-16)` | 必需 | 1. `rust` 工具链(`msvc`, `cargo` 等)<br/>2. 满足 `tauri` 版本依赖即可 |
| `rustup` | `rustup 1.25.1 (bb60b1e89 2022-07-12)` | 必需 | 同上 |
| `webview2` | - | 必需 | `tauri` 在 `windows` 端的解决方案 |
| `yarn` | `1.22.19` | - | 1. 个人习惯用 `yarn`<br/>2. `npm`, `yarn`, `pnpm` 等包管理工具均可 |

#### 其他说明

1. 可以选择使用 `node@14.3+`
    1. 开启 `--harmony-top-level-await`
    2. 对 `vite`, `@vitejs/plugin-vue` 等依赖降版本以兼容