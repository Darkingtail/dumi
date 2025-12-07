# dumi Project Context

## Project Overview

**dumi** is a static site generator specifically designed for React component library development. It is part of the **umi** ecosystem and helps developers create documentation sites with ease.

### Key Technologies

- **Core:** TypeScript, Node.js
- **Framework:** [Umi](https://umijs.org/)
- **Build Tool:** [Father](https://github.com/umijs/father)
- **Testing:** Vitest
- **Rust/WASM:** Uses Rust (via SWC plugins) for high-performance tasks, specifically in `crates/swc_plugin_react_demo`.
- **Package Manager:** pnpm (Monorepo structure)

### Architecture

- **`bin/`**: CLI entry point (`dumi`).
- **`src/`**: Main source code for the dumi core.
- **`crates/`**: Rust source code for SWC plugins (requires `wasm32-wasi` target).
- **`docs/`**: Source for the official dumi documentation (built using dumi itself).
- **`suites/`**: Additional packages and test suites managed within the workspace.
- **`examples/`**: Example projects demonstrating dumi usage.
- **`theme-default/`**: The default theme for dumi sites.

## Building and Running

### Prerequisites

- **Node.js:** >= 14
- **PNPM:** >= 7
- **Rust:** Required for building the WASM components.
  - Install the WASM target: `rustup target add wasm32-wasi`

### Key Commands

- **Install Dependencies:**

  ```bash
  pnpm install
  ```

- **Start Development Server (Core):**

  ```bash
  pnpm dev
  ```

  Runs `father dev` to watch and compile the core libraries.

- **Start Documentation Dev Server:**

  ```bash
  pnpm docs:dev
  ```

  Starts the dumi website locally for previewing documentation changes.

- **Build Project:**

  ```bash
  pnpm build
  ```

  Builds the JS packages (via `father build`) and the Rust crates (via `npm run build:crates`).

- **Run Tests:**

  ```bash
  pnpm test
  ```

  Executes tests using Vitest.

- **Linting & Formatting:**
  ```bash
  pnpm lint    # Runs ESLint and Stylelint
  pnpm format  # Runs Prettier
  ```

## Development Conventions

- **Monorepo:** This project uses `pnpm` workspaces. Configuration is in `pnpm-workspace.yaml`.
- **Rust Integration:** Rust components are compiled to WASM. Ensure your Rust environment is set up correctly.
- **Contribution:**
  - Fork and clone the repo.
  - Create a topic branch.
  - Submit PRs to the `master` branch.
  - Follow the linting and formatting rules (`pnpm lint`, `pnpm format`).
- **Documentation:** The project's documentation is self-hosted in the `docs/` directory.
